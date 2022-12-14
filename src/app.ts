import express from 'express';
import OrderController from './controllers/order.controller';
import ProductController from './controllers/product.controller';
import UserController from './controllers/user.controller';
import LoginController from './controllers/login.controller';
import MiddLogin from './middleware/loginVerify';
import MiddProduct from './middleware/productsVerify';
import MiddUser from './middleware/userVerify';
import MiddRegister from './middleware/registerProduct';

const app = express();

const productController = new ProductController();
const userController = new UserController();
const orderController = new OrderController();
const loginController = new LoginController();
const middLogin = new MiddLogin();
const middProduct = new MiddProduct();
const middUser = new MiddUser();
const middRegister = new MiddRegister();

app.use(express.json());

app.post(
  '/products', 
  middProduct.productCheck,
  middProduct.productDoublecheck, 
  productController.postProduct,
);
app.get('/products', productController.getProducts);

app.post(
  '/users', 
  middUser.userNameCheck, 
  middUser.classeCheck,
  middUser.classeCheck,
  middUser.levelCheck,
  middUser.passwordCheck,
  userController.createUser,
);

app.get('/orders', orderController.getOrders);

app.post(
  '/orders', 
  middRegister.verifyToken,
  middRegister.verifyProducts,
  orderController.createOrder,
);
app.post('/login', middLogin.userLogin, loginController.userLogin);

export default app;
