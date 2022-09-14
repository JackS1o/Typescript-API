import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import OrderService from '../services/order.service';
import IPayload from '../interfaces/payload.interface';

export default class OrderController {
  constructor(private orderService = new OrderService()) {}

  public getOrders = async (req: Request, res: Response) => {
    const result = await this.orderService.getOrders();
    return res.status(200).json(result);
  };

  public createOrder = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    const { productsIds } = req.body;
    
    const { username } = jwt.verify(authorization as any, 'secreta') as IPayload;
    
    const result = await this.orderService.createOrder(username, productsIds);
    
    return res.status(201).json(result);
  };
}
