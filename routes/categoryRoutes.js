import express from "express";
import { allCategory, createCategory, deleteCategory, getCategoryById, updateCategory } from "../controllers/categoryController.js";

const CategoryRouter = express.Router();

CategoryRouter.get("/", allCategory);

CategoryRouter.get("/:id",getCategoryById)

CategoryRouter.post("/create",createCategory)

CategoryRouter.put("/update/:id",updateCategory)

CategoryRouter.delete("/delete/:id",deleteCategory)
export default CategoryRouter;