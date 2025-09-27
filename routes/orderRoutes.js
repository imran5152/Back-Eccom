import express from 'express';
import { createOrder, deleteOrder, getAllOrders, getOrderById, updateOrderStatus } from '../controllers/orderController.js';

const router = express.Router();

router.post('/create', createOrder);

router.get('/',getAllOrders)

router.get('/:id',getOrderById)

router.put('/:id',updateOrderStatus)

router.delete('/:id',deleteOrder)
export default router;
