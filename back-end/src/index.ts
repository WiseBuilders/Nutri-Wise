import express from 'express';
import userRoutes from './routes/userRoutes';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import cors from 'cors';  // Importe o pacote cors

dotenv.config();


const app = express();

// Middleware para interpretar JSON
app.use(express.json());

// Habilita CORS para todas as origens
app.use(cors()); 

// Registrar rotas de usuário
app.use('/api/users', userRoutes);

// Rota para login de usuário
app.use('/api/auth', authRoutes);

// Porta onde o servidor vai rodar
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
