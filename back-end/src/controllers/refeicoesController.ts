import { Request, Response } from 'express';
import { Pool } from 'pg';

export class RefeicaoController {
    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    

    public async calculoDeCaloriasPorPeriodo(req: Request, res: Response): Promise<void> {
        const { usuario_id, data_inicio, data_fim } = req.body; // Espera-se que as datas sejam enviadas no formato YYYY-MM-DD
    
        try {
            const result = await this.pool.query(
                `SELECT DATE(data) AS dia, SUM(calorias_total) AS total_calorias
                 FROM refeicoes
                 WHERE usuario_id = $1 AND DATE(data) BETWEEN $2 AND $3
                 GROUP BY DATE(data)
                 ORDER BY DATE(data) ASC`,
                [usuario_id, data_inicio, data_fim]
            );
    
            const caloriasPorDia = result.rows.map((row: any) => ({
                data: row.dia,
                total_calorias: parseFloat(row.total_calorias).toFixed(2) // Arredondando para 2 casas decimais
            }));
    
            res.status(200).json(caloriasPorDia);
        } catch (error) {
            console.error('Erro ao calcular as calorias por período:', error);
            res.status(500).json({ message: 'Erro ao calcular as calorias por período', error });
        }
    }

    public async historicoRefeicoes(req: Request, res: Response): Promise<void> {
        const { usuario_id, data_inicio, data_fim } = req.body;


    //Matematica Computacional - Funções Matemáticas Algébricas e suas Aplicações
    try {
        const result = await this.pool.query(
            `SELECT rc.data, r.descricao AS nome_refeicao,
                SUM(CAST(pp.proteina AS FLOAT) * cd.quantidade / 100) AS proteina_total,
                SUM(CAST(pp.carboidrato AS FLOAT) * cd.quantidade / 100) AS carboidrato_total,
                SUM(CAST(pp.colesterol AS FLOAT) * cd.quantidade / 100) AS colesterol_total,
                SUM(CAST(pp.lipidios AS FLOAT) * cd.quantidade / 100) AS lipidios_total,
                SUM(CAST(pp.acucartotal AS FLOAT) * cd.quantidade / 100) AS acucar_total
            FROM refeicao_consumo rc
            JOIN refeicoes r ON rc.refeicao_id = r.id
            JOIN consumo_detalhado cd ON rc.id = cd.refeicao_consumo_id
            JOIN prodprep pp ON cd.produto_id = pp.produto_id
            WHERE rc.usuario_id = $1
            AND rc.data BETWEEN $2 AND $3
            GROUP BY rc.data, r.descricao
            ORDER BY rc.data`,
            [usuario_id, data_inicio, data_fim]
        );

        const historicoRefeicoes = result.rows.map(row => ({
            data: row.data,
            nome_refeicao: row.nome_refeicao,
            valorNutricional: {
                proteina: row.proteina_total ? row.proteina_total.toFixed(2) : '0.00',
                carboidrato: row.carboidrato_total ? row.carboidrato_total.toFixed(2) : '0.00',
                colesterol: row.colesterol_total ? row.colesterol_total.toFixed(2) : '0.00',
                lipidios: row.lipidios_total ? row.lipidios_total.toFixed(2) : '0.00',
                acucarTotal: row.acucar_total ? row.acucar_total.toFixed(2) : '0.00'
            }
        }));

        res.status(200).json({
            usuario_id,
            refeicoes: historicoRefeicoes
        });
    } catch (error) {
        console.error('Erro ao obter histórico de refeições:', error);
        res.status(500).json({ message: 'Erro ao obter histórico de refeições', error });
        }
    }

    public async registrarRefeicao(req: Request, res: Response): Promise<void> {
        const { usuario_id, data, tipo_refeicao, alimentos } = req.body;
    
        try {
            // Insere a refeição principal
            const insertRefeicao = await this.pool.query(
                `INSERT INTO refeicoes (usuario_id, data, tipo_refeicao, calorias_total)
                VALUES ($1, $2, $3, 0) RETURNING id`,
                [usuario_id, data, tipo_refeicao]
            );
            const refeicaoId = insertRefeicao.rows[0].id;
    
            let totalCalorias = 0;
    
            // Processa cada alimento e insere detalhes
            for (const alimento of alimentos) {
                const { produto_id, quantidade } = alimento;
                // Consulta valores nutricionais do produto
                const result = await this.pool.query(
                    `SELECT 
                        pp.proteina * $1 / 100 AS proteina,
                        pp.carboidrato * $1 / 100 AS carboidrato,
                        pp.colesterol * $1 / 100 AS colesterol,
                        pp.lipidios * $1 / 100 AS lipidios,
                        pp.acucartotal * $1 / 100 AS acucar_total,
                        pp.energia * $1 / 100 AS calorias
                    FROM prodprep pp
                    WHERE pp.produto_id = $2`,
                    [quantidade, produto_id]

                );
                const valoresNutricionais = result.rows[0];
                totalCalorias += valoresNutricionais.calorias;
    
                // Insere o detalhe de consumo
                await this.pool.query(
                    `INSERT INTO refeicao_detalhe (refeicao_id, produto_id, quantidade, proteina, carboidrato, colesterol, lipidios, acucar_total)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
                    [refeicaoId, produto_id, quantidade, valoresNutricionais.proteina, valoresNutricionais.carboidrato, valoresNutricionais.colesterol, valoresNutricionais.lipidios, valoresNutricionais.acucar_total]
                );
            }
    
            // Atualiza calorias totais na refeição
            await this.pool.query(
                `UPDATE refeicoes SET calorias_total = $1 WHERE id = $2`,
                [totalCalorias, refeicaoId]
            );
    
            res.status(201).json({ message: "Refeição registrada com sucesso" });
        } catch (error) {
            console.error('Erro ao registrar refeição:', error);
            res.status(500).json({ message: 'Erro ao registrar a refeição' });
        }
    }

    public async consultarRefeicaoPorData(req: Request, res: Response): Promise<void> {
        const { usuario_id, data } = req.query;
       
        try {
            // Consulta as refeições do usuário para a data
            const result = await this.pool.query(
                `SELECT r.id AS refeicao_id, r.tipo_refeicao, r.calorias_total,
                    rd.produto_id, rd.quantidade,
                    p.descricao AS produto_nome,
                    rd.proteina, rd.carboidrato, rd.colesterol, rd.lipidios, rd.acucar_total
                FROM refeicoes r
                JOIN refeicao_detalhe rd ON r.id = rd.refeicao_id
                JOIN produtos p ON rd.produto_id = p.id
                WHERE r.usuario_id = $1 AND r.data = $2
                ORDER BY r.tipo_refeicao`,
                [usuario_id, data]
            );
    
            // Organiza o resultado em um JSON estruturado
            const refeicoes: any = {};
            result.rows.forEach(row => {
                if (!refeicoes[row.tipo_refeicao]) {
                    refeicoes[row.tipo_refeicao] = {
                        tipo_refeicao: row.tipo_refeicao,
                        alimentos: [],
                        calorias_total: row.calorias_total
                    };
                }
    
                refeicoes[row.tipo_refeicao].alimentos.push({
                    produto_id: row.produto_id,
                    nome: row.produto_nome,
                    quantidade: row.quantidade,
                    valorNutricional: {
                        proteina: row.proteina,
                        carboidrato: row.carboidrato,
                        colesterol: row.colesterol,
                        lipidios: row.lipidios,
                        acucarTotal: row.acucar_total
                    }
                });
            });
    
            res.json({ data, refeicoes: Object.values(refeicoes) });
        } catch (error) {
            console.error('Erro ao consultar refeições:', error);
            res.status(500).json({ message: 'Erro ao consultar refeições' });
        }
    }
    
    

    
}
