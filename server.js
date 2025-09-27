import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectdb from './config/mongodb.js';
import auth from './routes/registerauth.js';
import product from './routes/productRoutes.js';
import authMiddleware from './middleware/authMiddleware.js';
import CategoryController from './routes/categoryRoutes.js';
import ReviewRouter from './routes/reviewRoutes.js';
import cart from './routes/cartRoutes.js';
import router from './routes/orderRoutes.js';
import wishRouter from './routes/wishlistRoutes.js';
import paymentRouter from './routes/paymentRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

(async () => {
  await connectdb();

  app.use(express.json());
  app.use(cookieParser());
  app.use(cors({ origin: "http://localhost:3000", credentials: true }));

  
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} at ${new Date().toISOString()}`);
    next();
  });

  app.use('/register', auth);
  app.use('/product', product);
  app.use('/cart',cart)
  app.use('/category' ,CategoryController),
  app.use("/review",ReviewRouter)
  app.use("/order",router)
  app.use("/wishlist",wishRouter)
  app.use("/payment",paymentRouter)


  app.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: "Access granted", user: req.user });
  });

  
  app.use((err, req, res, next) => {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Something went wrong!" });
  });

  app.listen(port, () => console.log(`Server started on port: ${port}`));
})();
