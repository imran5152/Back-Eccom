import express from 'express'
import { createPayment, deletePayment, getpayment, getPaymentById, updatePayment } from '../controllers/paymentController.js'
const paymentRouter=express.Router()
 
paymentRouter.post('/create',createPayment)

paymentRouter.get('/',getpayment)

paymentRouter.get('/:id',getPaymentById)

paymentRouter.put('/update/:id',updatePayment)

paymentRouter.delete('/delete/:id',deletePayment)
export default paymentRouter