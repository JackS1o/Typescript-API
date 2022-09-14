import express from 'express';
import OrderController from './controllers/order.controller';
import ProductController from './controllers/product.controller';
import UserController from './controllers/user.controller';
import LoginController from './controllers/login.controller';

const app = express();

const productController = new ProductController();
const userController = new UserController();
const orderController = new OrderController();
const loginController = new LoginController();

app.use(express.json());

app.post('/products', productController.postProduct);
app.get('/products', productController.getProducts);

app.post('/users', userController.createUser);

app.get('/orders', orderController.getOrders);

app.post('/login', loginController.userLogin);

export default app;
