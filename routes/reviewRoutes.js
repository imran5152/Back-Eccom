import express from "express";
import { allReviews, createReview, deleteReview, reviewById, updateReview } from "../controllers/reviewController.js";

const ReviewRouter = express.Router();

ReviewRouter.get("/", allReviews);

ReviewRouter.get('/:id',reviewById)

ReviewRouter.post('/create',createReview)

ReviewRouter.put('/update/:id',updateReview)

ReviewRouter.delete('/delete/:id',deleteReview)

export default ReviewRouter;
