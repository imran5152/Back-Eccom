import express from "express";
import { addToCart, deleteCart, getCart, removeFromCart, updateCartProduct } from "../controllers/cartController.js"; 

const router = express.Router();

router.post("/add", addToCart);

router.get('/:userId',getCart)

router.put('/update',updateCartProduct)

router.put('/remove',removeFromCart)

router.delete('/:userId',deleteCart)
export default router;
