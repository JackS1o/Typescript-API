import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UserService from '../services/userservice';

export default class UserController {
  constructor(private userService = new UserService()) {}

  public createUser = async (req: Request, res: Response) => {
    const { body } = req;
    const token = jwt.sign({ body }, 'secreta', {
      expiresIn: '20d',
    });
    
    const result = await this.userService.createUser(body);

    if (!result) return res.status(400).json('deu ruim'); 
    return res.status(201).json({ token });
  };
}