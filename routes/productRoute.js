import express from "express";
import {
    getProduct,
    getProductById,
    saveProduct,
    updateProduct,
    deleteProduct
} from "../controllers/productController.js"

const router = express.Router();

router.get("/products", getProduct);
router.get('/products/:id', getProductById);
router.post("/products", saveProduct);
router.patch("/products", updateProduct);
router.delete("/products/:id", deleteProduct);




export default router;