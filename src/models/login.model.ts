import { Pool } from 'mysql2/promise';
import ILogin from '../interfaces/login.interface';

export default class LoginModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async userLogin(username: string, password: string): Promise<ILogin | false> {
    const [result] = await this.connection.execute(`
    SELECT * FROM Trybesmith.Users WHERE username = ? AND password = ?;
    `, [username, password]);
    if ((result as any).length === 0) return false;
    return result as unknown as ILogin;
  }
}
