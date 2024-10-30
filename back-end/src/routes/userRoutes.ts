import express, { Request, Response } from 'express';
import pool from '../db'; // Seu arquivo de conexão com o banco
import UserController from '../controllers/usersController';

const router = express.Router();
const userController = new UserController(pool);

// Rota para criação de usuário
router.post('/register', async (req: Request, res: Response) => {
    const { name, birthdate, gender, weight, height, email, password } = req.body;
  
    try {
      const result = await userController.createUser({
        name,
        birthdate,
        gender,
        weight,
        height,
        email,
        password,
      });
  
      res.status(201).json({ message: result });
    } catch (error) {
      // Verifica se o erro é uma instância de Error
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        // Lidar com erros inesperados que não são do tipo Error
        res.status(500).json({ message: 'Ocorreu um erro desconhecido.' });
      }
    }
});

router.get('/usuario/:id', (req, res) => userController.pegarUsuarioPorId(req, res));
  
export default router;