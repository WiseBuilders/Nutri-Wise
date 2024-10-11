import { Pool } from 'pg';
import bcrypt from 'bcrypt';

interface LoginDTO {
  email: string;
  password: string;
}

class AuthController {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  // Método para realizar o login
  async login(userData: LoginDTO): Promise<any> {
    const { email, password } = userData;

    try {
      // Verificar se o usuário existe
      const userResult = await this.pool.query('SELECT * FROM "users" WHERE email = $1', [email]);

      if (userResult.rowCount === 0) {
        throw new Error('Usuário não encontrado');
      }

      const user = userResult.rows[0];

      // Comparar a senha fornecida com a senha armazenada
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new Error('Senha incorreta');
      }

      // Retornar as informações do usuário (exceto a senha)
      const { id, name, birthdate, gender, weight, height, email: userEmail } = user;
      return { id, name, birthdate, gender, weight, height, email: userEmail };
    } catch (error) {
      // Tratar os erros e retorná-los de forma apropriada
      if (error instanceof Error) {
        console.error('Erro no login:', error.message);
        throw new Error(error.message);
      } else {
        console.error('Erro desconhecido no login:', error);
        throw new Error('Ocorreu um erro desconhecido.');
      }
    }
  }
}

export default AuthController;
