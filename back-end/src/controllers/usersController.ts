import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';


interface CreateUserDTO {
  name: string;
  birthdate: string;
  gender: string;
  weight: number;
  height: number;
  email: string;
  password: string;
}

interface UsuarioData{
  id: number,
  name: string;
  birthdate: string;
  gender: string;
  weight: number;
  height: number;
  email: string;
}
class UserController {
  private pool: Pool;
  
  constructor(pool: Pool) {
    this.pool = pool;
  }
  
  // Método para criar um novo usuário
  async createUser(userData: CreateUserDTO): Promise<string> {
    const { name, birthdate, gender, weight, height, email, password } = userData;
  
    try {
      // Verificar se o usuário já existe
      const userExists = await this.pool.query('SELECT * FROM "users" WHERE email = $1', [email]);
  
      if (userExists?.rowCount && userExists.rowCount > 0) {
        throw new Error('Usuário já cadastrado');
      }
  
      // Criptografar a senha
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Inserir o novo usuário no banco de dados
      await this.pool.query(
        'INSERT INTO "users" (name, birthdate, gender, weight, height, email, password) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [name, birthdate, gender, weight, height, email, hashedPassword]
      );
  
      return 'Usuário criado com sucesso!';
    } catch (error) {
      // Verifica se o erro é uma instância de Error
      if (error instanceof Error) {
        console.error('Erro ao criar o usuário:', error.message);
        throw new Error(error.message);
      } else {
        // Lidar com erros inesperados que não são do tipo Error
        console.error('Erro desconhecido:', error);
        throw new Error('Ocorreu um erro desconhecido.');
      }
    }
  }

  async pegarUsuarioPorId(req: Request, res: Response): Promise<void>{
    const {id } = req.params;

    try {
      const result = await this.pool.query('SELECT * FROM users WHERE id = $1', [id]);

      if (result.rows.length === 0) {
          res.status(404).json({ message: 'Usuario não encontrada.' });
      } else {
        
        const usuario: UsuarioData = {
          id: result.rows[0].id,
          name: result.rows[0].name,
          birthdate: result.rows[0].birthdate,
          email: result.rows[0].email,
          gender: result.rows[0].gender,
          height: result.rows[0].height,
          weight: result.rows[0].weight
        }
        

      res.status(200).json(usuario);
    }
  } catch (error) {
      console.error('Erro ao buscar usuario:', error);
      res.status(500).json({ message: 'Erro ao buscar usuario.', error });
  }

  }


}

export default UserController;