import { Pool } from 'mysql2/promise';
import ILogin from '../interfaces/login.interface';

export default class LoginModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async userLogin(username: string, password: string): Promise<ILogin[]> {
    const [result] = await this.connection.execute(`
    SELECT * FROM Trybesmith.Users WHERE username = ? AND password = ?;
    `, [username, password]);
    return result as ILogin[];
  }
}
