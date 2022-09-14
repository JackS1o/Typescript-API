import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import LoginService from '../services/login.service';

export default class LoginController {
  constructor(private loginService = new LoginService()) {}

  public userLogin = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const result = await this.loginService.userLogin(username, password);
    
    if (!result || result.length === 0) {
      return res.status(401).json({ message: 'Username or password invalid' });
    }
    const { id } = result[0];
    const token = jwt.sign({ id, username }, 'secreta', {
      expiresIn: '20d',
    });
    return res.status(200).json({ token });
  };
}
