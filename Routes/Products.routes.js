import { Router } from "express";
import { addProduct, deleteProduct, filterProducts, getAllProducts, getFilteredResults, getPageResults, getSingleProduct, getSortedResults, updateProduct, yourProducts } from "../Controllers/Products.controllers.js";
import { checkUserId } from "../Middlewares/AllMiddlewares.js";

const router = Router();

router.post('/add-product', checkUserId, addProduct);
router.post('/filter-products', filterProducts)
router.post('/get-all-products', getAllProducts);
router.post("/get-single-product", getSingleProduct);
router.get("/get-page-results", getPageResults);
router.get("/get-sorted-results", getSortedResults);
router.post("/get-filtered-results", getFilteredResults);
router.post("/your-Products", yourProducts);
router.post('/update-product', updateProduct)
router.delete('/delete-product', deleteProduct)

export default router;