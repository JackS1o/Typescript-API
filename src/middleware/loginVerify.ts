import { Request, Response, NextFunction } from 'express';
import LoginService from '../services/login.service';

export default class MiddLogin {
  constructor(private loginService = new LoginService()) {}

  public userLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    if (!username) return res.status(400).json({ message: '"username" is required' });
    if (!password) return res.status(400).json({ message: '"password" is required' });

    const result = await this.loginService.userLogin(username, password);
    if (!result) return res.status(401).json({ message: 'Username or password invalid' });
    next();
  };
}