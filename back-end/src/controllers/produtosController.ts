import { Request, Response } from 'express';
import { Pool } from 'pg'; // Tipagem para o pool de conexão com o PostgreSQL

// Interface para valor nutricional
interface ValorNutricional {
    proteina: number;
    carboidrato: number;
    colesterol: number;
    lipidios: number;
    acucarTotal: number;
    caloria: number;
}

// Interface para preparo
interface Preparo {
    tipo: string;
    valorNutricional: ValorNutricional;
}

// Interface Produto com grupo e preparos
interface Produto {
    id: number;
    nome: string;
    grupo: string;
    preparos: Preparo[];
}

export class ProdutosController {
    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    // Método para listar todos os produtos com seus preparos
    public async listarProdutos(req: Request, res: Response): Promise<Response> {
        try {
            const query = `
                SELECT 
                    p.id AS produto_id, 
                    p.descricao AS nome, 
                    g.grupo, 
                    pr.descricao AS tipo_preparo, 
                    pp.proteina, 
                    pp.carboidrato, 
                    pp.colesterol, 
                    pp.lipidios, 
                    pp.acucartotal,
                    pp.energia
                FROM produtos p
                JOIN grupos g ON p.grupo_id = g.id
                JOIN prodprep pp ON p.id = pp.produto_id
                JOIN preparacao pr ON pp.preparacao_id = pr.id;
            `;
            
            const result = await this.pool.query(query);

            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Nenhum produto encontrado.' });
            }

            // Usando um Map para agrupar os preparos de cada produto
            const produtosMap = new Map<number, Produto>();

            result.rows.forEach(row => {
                const produtoId = row.produto_id;

                // Se o produto ainda não estiver no Map, adiciona-o
                if (!produtosMap.has(produtoId)) {
                    produtosMap.set(produtoId, {
                        id: produtoId,
                        nome: row.nome,
                        grupo: row.grupo,
                        preparos: []
                    });
                }

                // Adiciona o preparo ao produto
                produtosMap.get(produtoId)?.preparos.push({
                    tipo: row.tipo_preparo,
                    valorNutricional: {
                        proteina: row.proteina,
                        carboidrato: row.carboidrato,
                        colesterol: row.colesterol,
                        lipidios: row.lipidios,
                        acucarTotal: row.acucartotal,
                        caloria: row.energia
                    }
                });
            });

            // Converte o Map para um array de produtos
            const produtos = Array.from(produtosMap.values());

            return res.status(200).json(produtos);
        } catch (error) {
            console.error('Erro ao listar produtos:', error);
            return res.status(500).json({ message: 'Erro ao listar produtos.', error });
        }
    }

     // Método para buscar um produto por nome com seus preparos
     public async buscarProdutoPorNome(req: Request, res: Response): Promise<Response> {
        const { nome } = req.params;

        try {
            const query = `
                SELECT 
                    p.id AS produto_id, 
                    p.descricao AS nome, 
                    g.grupo, 
                    pr.descricao AS tipo_preparo, 
                    pp.proteina, 
                    pp.carboidrato, 
                    pp.colesterol, 
                    pp.lipidios, 
                    pp.acucartotal
                FROM produtos p
                JOIN grupos g ON p.grupo_id = g.id
                JOIN prodprep pp ON p.id = pp.produto_id
                JOIN preparacao pr ON pp.preparacao_id = pr.id
                WHERE p.descricao ILIKE $1;
            `;
            
            const result = await this.pool.query(query, [`%${nome}%`]);

            if (result.rows.length === 0) {
                return res.status(404).json({ message: `Produto com nome '${nome}' não encontrado.` });
            }

            // Agrupando os preparos do produto
            const produto: Produto = {
                id: result.rows[0].produto_id,
                nome: result.rows[0].nome,
                grupo: result.rows[0].grupo,
                preparos: result.rows.map(row => ({
                    tipo: row.tipo_preparo,
                    valorNutricional: {
                        proteina: row.proteina,
                        carboidrato: row.carboidrato,
                        colesterol: row.colesterol,
                        lipidios: row.lipidios,
                        acucarTotal: row.acucartotal,
                        caloria: row.energia
                    }
                }))
            };

            return res.status(200).json(produto);
        } catch (error) {
            console.error(`Erro ao buscar produto pelo nome '${nome}':`, error);
            return res.status(500).json({ message: 'Erro ao buscar produto.', error });
        }
    }

    // Método para adicionar um novo produto (opcional se precisar)
    public async adicionarProduto(req: Request, res: Response): Promise<Response> {
        const { descricao, grupo_id } = req.body;

        try {
            // Verificar se já existe um produto com a mesma descrição
            const produtoExistente = await this.pool.query('SELECT * FROM produtos WHERE descricao = $1', [descricao]);

            if (produtoExistente.rows.length > 0) {
                return res.status(409).json({ message: `O produto '${descricao}' já existe.` });
            }

            // Inserir o novo produto
            const result = await this.pool.query(
                'INSERT INTO produtos (descricao, grupo_id) VALUES ($1, $2) RETURNING *',
                [descricao, grupo_id]
            );

            return res.status(201).json(result.rows[0]);
        } catch (error) {
            console.error('Erro ao adicionar produto:', error);
            return res.status(500).json({ message: 'Erro ao adicionar produto.', error });
        }
    }
}
