import { Request, Response } from 'express';
import OrderService from '../services/order.service';

export default class OrderController {
  constructor(private orderService = new OrderService()) {}

  public getOrders = async (req: Request, res: Response) => {
    const result = await this.orderService.getOrders();
    return res.status(200).json(result);
  };
}
