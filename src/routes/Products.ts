import express from "express";

import { Product } from "../entities/Products";
import { Category} from "../entities/Categories";
import { Order } from "../entities/Orders";
const router = express.Router();

router.get("/", async (req, res) => {
  
  const products = await Product.find({
    relations: {
      category: true,

      },
  });
  return res.json(products);


});

export { router as productRouter };
