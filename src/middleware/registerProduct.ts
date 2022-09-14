import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default class MiddRegister {
  public verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    try {
      jwt.verify(authorization, 'secreta');
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    next();
  };

  public verifyProducts = async (req: Request, res: Response, next: NextFunction) => {
    const { productsIds } = req.body;
    if (!productsIds) return res.status(400).json({ message: '"productsIds" is required' });
    if (typeof productsIds !== 'object') {
      return res.status(422).json({ message: '"productsIds" must be an array' });
    }
    if (productsIds.length === 0) {
      return res.status(422).json({ message: '"productsIds" must include only numbers' });
    }
    next();
  };
}
