import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import IOrder from '../interfaces/order.interface';
import IUser from '../interfaces/user.interface';

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

  public async createOrder(username: string, productsIds: number[]): Promise<IUser> {
    const [user] = await this.connection.execute<RowDataPacket[]>(`
    SELECT id FROM Trybesmith.Users WHERE username = ?
    `, [username]);
    const order = await this.connection.execute<ResultSetHeader>(`
    INSERT INTO Trybesmith.Orders (userId) VALUES(?);
    `, [user[0].id]);
    const [rows] = order;
    const { insertId } = rows;
    
    await Promise.all(productsIds.map(async (ids) => {
      await this.connection.execute(`
      UPDATE Trybesmith.Products AS P
      SET P.orderId = ?
      WHERE P.id = ?;
      `, [insertId, ids]);
    }));
    return { userId: user[0].id, productsIds } as unknown as IUser;
  }
}
