import { Request, Response } from 'express';
import ProductService from '../services/product.service';

export default class ProductController {
  constructor(private productService = new ProductService()) {}

  public postProduct = async (req: Request, res: Response) => {
    const { name, amount } = req.body;
    const result = await this.productService.postProduct(name, amount);
    return res.status(201).json(result);
  };

  public getProducts = async (req: Request, res: Response) => {
    const result = await this.productService.getProducts();
    return res.status(200).json(result);
  };
}