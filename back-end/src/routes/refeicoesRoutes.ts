import { raw, Router } from 'express';

import pool from '../db'; // Conexão com o banco de dados
import { RefeicaoController } from '../controllers/refeicoesController';

const router = Router();
const refeicaoController = new RefeicaoController(pool);


//Rota para o calculo diario de caloria por periodo
router.get('/caloriasporperiodo', (req, res) => refeicaoController.calculoDeCaloriasPorPeriodo(req,res))

//Rota para adicionar registro diario de alimentos consumidos na refeiçao
router.post('/adicionarrefeicao', (req, res) => refeicaoController.registrarRefeicao(req,res))

//rota para pegar o historico das refeicoes
router.get('/historicorefeicao', (req, res ) => refeicaoController.consultarRefeicaoPorData(req,res))

export default router;
