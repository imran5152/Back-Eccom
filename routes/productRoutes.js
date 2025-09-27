    import express from "express";
    import { getprodcut, getidproduct, createProducts, updateProducts, deleteProducts } from "../controllers/productControllers.js";

    const router = express.Router();

    router.get("/", getprodcut);
    router.get("/:id", getidproduct);
    router.post("/create",createProducts)
    router.put('/update/:id',updateProducts)
    router.delete('/delete/:id',deleteProducts)

    export default router;
