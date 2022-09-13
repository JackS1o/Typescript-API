import connection from '../models/connection';
import UsertModel from '../models/user.model';
import IUser from '../interfaces/user.interface';

export default class UserService {
  public model: UsertModel;

  constructor() {
    this.model = new UsertModel(connection);
  }

  public async createUser(body: IUser): Promise<IUser> {
    const result = await this.model.createUser(body);
    return result;
  }
}
