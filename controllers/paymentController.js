import paymentModel from "../model/paymentModel.js";

export const createPayment = async (req, res) => {
    const { user, order, amount, method, status } = req.body;

    
    if (!user || !order || !amount) {
        return res.status(400).json({ message: "User, Order, and Amount are required" });
    }

    try {
       
        const paymentCreated = await paymentModel.create({
            user,
            order,
            amount,
            method: method || "COD",
            status: status || "Pending",
        });

      
        const payment = await paymentModel
            .findById(paymentCreated._id)
            .populate("user", "name email")
            .populate("order", "items totalPrice orderStatus"); 

    
        res.status(201).json(payment);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getpayment=async(req,res)=>{
    try {
        const getpayment=await paymentModel.find().populate("user","name email")
                                                  .populate("order", "items totalPrice orderStatus")

     res.status(201).json(getpayment)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
export const getPaymentById = async (req, res) => {
    try {
        const payment = await paymentModel.findById(req.params.id)
            .populate("user", "name email")
            .populate("order", "items totalPrice orderStatus");
        if (!payment) return res.status(404).json({ message: "Payment not found" });
        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updatePayment = async (req, res) => {
    try {
        const payment = await paymentModel.findById(req.params.id);
        if (!payment) return res.status(404).json({ message: "Payment not found" });

        const { method, status, amount } = req.body;
        if (method) payment.method = method;
        if (status) payment.status = status;
        if (amount) payment.amount = amount;

        await payment.save();

      
        const updatedPayment = await paymentModel.findById(payment._id)
            .populate("user", "name email")
            .populate("order", "items totalPrice orderStatus");

        res.status(200).json(updatedPayment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const deletePayment=async(req,res)=>{
    try {
        const payment=await paymentModel.findByIdAndDelete(req.params.id)
        if (!payment) {
            return res.status(400).json({message: "Payment not found"})
        }
        res.status(201).json({ message: "Payment deleted successfully" });
    } catch (error) {
     res.status(500).json({message:error.message})   
    }
}