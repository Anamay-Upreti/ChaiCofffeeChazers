import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct  
} from "../controllers/productController.js";
import protect from "../middlewares/authMiddleware.js";
import adminOnly from "../middlewares/isAdmin.js";

const router = express.Router();

router.post("/", protect, adminOnly, upload.single("image"), createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", protect, adminOnly, upload.single("image"), updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;