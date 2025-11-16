import {Router} from "express";
import { getAllProducts, createProduct, updateProduct, deleteProduct } from "../controllers/productController.js";

const router = Router();

router.get('/',getAllProducts);
export default router;