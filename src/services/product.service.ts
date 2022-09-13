import connection from '../models/connection';
import ProductModel from '../models/products.model';
import IProduct from '../interfaces/product.interface';

export default class ProductService {
  public model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  public async postProduct(name: string, amount: string): Promise<IProduct> {
    const result = await this.model.postProduct(name, amount);
    return result;
  }

  public async getProducts(): Promise<IProduct> {
    const result = await this.model.getProducts();
    return result;
  }
}
