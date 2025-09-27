import express from "express"
import { addWishlist, deleteWishlist, getwishlist, updateWishlist } from "../controllers/wishlistController.js"

const wishRouter=express.Router()

wishRouter.post('/add',addWishlist)

wishRouter.get('/:id',getwishlist)

wishRouter.put('/update/:id',updateWishlist)

wishRouter.delete('/delete/:id',deleteWishlist)

export default wishRouter