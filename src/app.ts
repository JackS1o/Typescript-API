import express from 'express';
import ProductController from './controllers/product.controller';

const app = express();

const productController = new ProductController();

app.use(express.json());

app.post('/products', productController.postProduct);

export default app;
