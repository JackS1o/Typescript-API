import express from 'express';
import ProductController from './controllers/product.controller';
import UserController from './controllers/user.controller';

const app = express();

const productController = new ProductController();
const userController = new UserController();

app.use(express.json());

app.post('/products', productController.postProduct);
app.get('/products', productController.getProducts);

app.post('/users', userController.createUser);

export default app;
