import { Pool } from "pg";
import { Request, Response } from 'express';
import { format } from "date-fns";


export class HistoricoPesoController{
    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    //Metodo para gravar o historico do peso
    public async pegarHistoricoPeso(req: Request, res: Response): Promise<void>{
        const { id } = req.params;

        try {
            const result = await this.pool.query(
                `SELECT peso, data, metaAlcancar
                FROM HistoricoDePeso
                WHERE usuario_id = $1 
                AND data >= NOW() - INTERVAL '7 days'
                ORDER BY data DESC;`,[id]
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

    public async salvarPeso(req: Request, res: Response): Promise<void>{
        const { usuario_id, peso, metaAlcancar } = req.body;

        try {
            const result = await this.pool.query(
                `INSERT INTO HistoricoDePeso (usuario_id, peso, data, metaAlcancar)
                VALUES ($1, $2, NOW(), $3)
                RETURNING *;`,[usuario_id, peso, metaAlcancar]
            )
            res.status(201).json(result.rows[0]);
        } catch (error) {
            console.error('Erro ao salvar peso:', error);
            res.status(500).json({ error: 'Erro ao salvar peso' });
        }
    }
}