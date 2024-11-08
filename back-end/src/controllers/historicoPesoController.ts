import { Pool } from "pg";
import { Request, Response } from 'express';
import { format } from "date-fns";

// Estrutura de dados para o registro de peso
interface RegistroPeso {
    usuario_id: number;
    peso: number;
    metaAlcancar: number;
    data: Date;
}

//Estrutura de dados - Estrutura lineares (lista encadeada, fila e pilhas)
export class HistoricoPesoController {
    private pool: Pool;
    private filaPeso: RegistroPeso[] = []; // Fila para armazenar registros temporariamente

    constructor(pool: Pool) {
        this.pool = pool;
    }

    //Método para processar a fila e salvar os dados no banco de dados
    public async processarFila(): Promise<void> {
        while (this.filaPeso.length > 0) {
            const { usuario_id, peso, metaAlcancar, data } = this.filaPeso.shift()!;
            try {
                await this.pool.query(
                    `INSERT INTO HistoricoDePeso (usuario_id, peso, data, metaAlcancar)
                    VALUES ($1, $2, $3, $4);`,
                    [usuario_id, peso, data, metaAlcancar]
                );
            } catch (error) {
                console.error('Erro ao processar item na fila:', error);
                // Você pode adicionar o item de volta na fila em caso de erro, se desejar.
            }
        }
    }

    // Método para salvar peso, adicionando à fila
    public adicionarPesoAFila(req: Request, res: Response): void {
        const { usuario_id, peso, metaAlcancar } = req.body;

        // Adiciona o registro de peso à fila com a data atual
        this.filaPeso.push({
            usuario_id,
            peso,
            metaAlcancar,
            data: new Date()  // Adiciona a data atual
        });

        res.status(202).json({ message: "Registro de peso adicionado à fila para processamento." });
    }

    // Método para pegar o histórico de peso de acordo com o usuário
    public async pegarHistoricoPeso(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const result = await this.pool.query(
                `SELECT peso, data, metaAlcancar
                FROM HistoricoDePeso
                WHERE usuario_id = $1 
                AND data >= NOW() - INTERVAL '7 days'
                ORDER BY data DESC;`,
                [id]
            );

            if (result.rows.length === 0) {
                res.status(404).json({ message: "Histórico de peso não encontrado para este usuário." });
            } else {
                // Formatar a data para DD/MM/AAAA
                const historicoFormatado = result.rows.map(item => ({
                    ...item,
                    data: format(new Date(item.data), 'dd/MM/yyyy'),
                }));
                res.status(200).json(historicoFormatado);
            }
        } catch (error) {
            console.error('Erro ao obter o histórico de peso:', error);
            res.status(500).json({ message: "Erro ao obter o histórico de peso." });
        }
    }
}
