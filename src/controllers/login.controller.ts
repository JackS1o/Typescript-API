import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import LoginService from '../services/login.service';

export default class LoginController {
  constructor(private loginService = new LoginService()) {}

  public userLogin = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const result = await this.loginService.userLogin(username, password);
    if (!result) return false;
    const token = jwt.sign({ username, password }, 'secreta', {
      expiresIn: '20d',
    });
    return res.status(200).json({ token });
  };
}
