import express from 'express';
import userRoutes from './routes/userRoutes';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import produtosRoutes from './routes/produtosRoutes';
import refeicoesRoutes from './routes/refeicoesRoutes';
import historicoPesoRoutes from './routes/historicoPesoRoutes';

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

// Rota para grupos
app.use('/api/produtos', produtosRoutes);

// Rota para refeições
app.use('/api/refeicoes', refeicoesRoutes);

// Rota para historico de peso
app.use('/api/historicoPeso', historicoPesoRoutes);


// Porta onde o servidor vai rodar
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
