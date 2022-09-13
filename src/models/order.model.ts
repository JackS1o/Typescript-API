import { Pool } from 'mysql2/promise';
import IOrder from '../interfaces/order.interface';

export default class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getOrders(): Promise<IOrder[]> {
    const [result] = await this.connection
      .execute(`
      SELECT O.id, O.userId, JSON_ARRAYAGG(P.id) AS productsIds FROM Trybesmith.Orders AS O
      INNER JOIN Trybesmith.Products AS P
      ON P.orderId = O.id
      WHERE P.orderId = O.id
      GROUP BY O.id
      ORDER BY O.userId;
      `);
    
    return result as IOrder[];
  }
}
