import { Request, Response } from 'express';
import LoginService from '../services/login.service';

export default class LoginController {
  constructor(private loginService = new LoginService()) {}

  public userLogin = async (req: Request, res: Response) => {
    const { username } = req.body;
    const result = await this.loginService.userLogin(username);
    return res.status(200).json(result);
  };
}