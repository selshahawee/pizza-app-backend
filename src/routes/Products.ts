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

  //   // if (!post){
  //   return res.json({ msg: "post not found" })
  //   //
});
// router.post("/:categoryId", async (req, res) => {
//   const { categoryId } = req.params;
//   const category = await Category.findOne({
//     where: { id: +categoryId },
//   });
//   if (!category) {
//     res.json({ msg: "category doesn't exist" });
//   }
//     const { name, description, price, image , categories } = req.body;
    
//     const CategoriesToSave: category[] = [];
    
    

//   const product = product.create({
//     name: name, 
//     category: category,
//     price : price,
//     description: description,
//     image: image,
//   });

//   await product.save();
//   return res.json(product);
// });

// router.put("/update/:productId", async (req, res) => {
//   const { productId } = req.params;
//   const product = await Product.findOne({
//     where: { id: +productId },
//   });
//   Product.merge(product, req.body);
//   const results = await Product.save(product);
//   return res.send(results);
// });

// router.delete("/", async (req, res) => {});

export { router as productRouter };
