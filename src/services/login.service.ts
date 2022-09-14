import connection from '../models/connection';
import LoginModel from '../models/login.model';
import ILogin from '../interfaces/login.interface';

export default class LoginService {
  public model: LoginModel;

  constructor() {
    this.model = new LoginModel(connection);
  }

  public async userLogin(username: string): Promise<ILogin> {
    const result = await this.model.userLogin(username);
    return result;
  }
}