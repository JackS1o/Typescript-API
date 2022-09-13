import connection from '../models/connection';
import OrderModel from '../models/order.model';
import IOrder from '../interfaces/order.interface';

export default class OrderService {
  public model: OrderModel;

  constructor() {
    this.model = new OrderModel(connection);
  }

  public async getOrders(): Promise<IOrder[]> {
    const result = await this.model.getOrders();
    return result;
  }
}
