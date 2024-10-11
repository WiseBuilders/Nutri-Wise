import express, { Request, Response } from 'express';
import pool from '../db'; // Arquivo de conexão com o banco
import AuthController from '../controllers/authController';

const router = express.Router();
const authController = new AuthController(pool);

// Rota para realizar o login
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await authController.login({ email, password });
    res.status(200).json(user);
  } catch (error) {
    // Tratar erros de login
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Ocorreu um erro desconhecido.' });
    }
  }
});

export default router;
