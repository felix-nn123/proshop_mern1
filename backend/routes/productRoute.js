import express from 'express'
import { createProduct, createProductReview, deleteProduct, getProductById, getProducts, getTopProducts, updateProduct } from "../controllers/productControllers.js"
import {protect, admin} from "../middleware/authMiddleware.js"


const router=express.Router()


//@desc FETCH ALL PRODUCTS
//route GET /api/products
//@access Public

router.route("/").get(getProducts).post(protect, admin, createProduct)
 
router.get('/top', getTopProducts)

//@desc FETCH SINGLE PRODUCTS
//route GET /api/products/:id
//@access Public


router.route("/:id").get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct)


router.route('/:id/reviews').post(protect, createProductReview)

    


export default router
