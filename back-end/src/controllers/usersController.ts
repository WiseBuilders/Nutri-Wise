import { Pool } from 'pg';
import bcrypt from 'bcrypt';


interface CreateUserDTO {
    name: string;
    birthdate: string;
    gender: string;
    weight: number;
    height: number;
    email: string;
    password: string;
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
}

export default UserController;