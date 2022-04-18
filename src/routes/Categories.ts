import express from "express";

import { Product } from "../entities/Products";
import { Category} from "../entities/Categories";
import { Order } from "../entities/Orders";
const router = express.Router();

router.get("/", async (req, res) => {
    const categories = await Category.find();
    return res.json(categories);
    
})
    export { router as categoryRouter };
