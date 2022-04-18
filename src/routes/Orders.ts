
import express from "express";
import { AppDataSource } from "../data-source";
import { Order } from "../entities/Orders";
import { LineItem } from "../entities/LineItems";
import { Product } from "../entities/Products";

const router = express.Router();

// Create Order
router.post("/order", async (req, res) => {
  try {
    const { lineItems, name, address, mobile, city } = req.body;
    const order = Order.create({
      name,
      address,
      mobile,
      city,
    });
    await order.save();
    for (let i = 0; i < lineItems.length; i++) {
        const item=lineItems[i]
      const product = await Product.findOneBy({ id: +item.id});
      //should move if !product to the beginning  as to avoid creating an empty order
      if (!product) {
        return res.status(404).json({ msg: "product doesn't exist" });
      }
        const lineItem = LineItem.create({
            product,
            quantity: item.quantity,
            order,
      })
      await lineItem.save();
    }
    const createdOrder = await Order.find({
      where: { id: +order.id },
      relations: { lineItems: true },
    });
    return res.json(createdOrder);
  } catch {
    return res.status(404);
  }
});

//Fetch order by id
router.get("/order/:order_id", async (req, res) => {
  try {
    const { order_id } = req.params;
    const order = await Order.find({
      where: { id: +order_id },
      relations: { lineItems: { product: true } },
    });
    if (order.length === 0) {
      return res.status(404).json({ msg: "order doesn't exist" });
    }
    return res.json(order);
  } catch {
    return res.status(404);
  }
});

// Fetch all orders and their products
router.get("/order", async (req, res) => {
  try {
    const orders = await Order.find({
      relations: { lineItems: {product:true}  },
    });
    return res.json(orders);
  } catch {
    return res.status(404);
  }
});


// FETCH COMPLETED order
router.get("/order/completed", async (req, res) => {
  try {
    const orders = await Order.find({
      where: { completed:true },
      relations: { lineItems: true },
    });
    if (orders.length === 0) {
      return res.status(404).json({ msg: "no completed orders" });
    }
    return res.json(orders);
  } catch {
    return res.status(404);
  }
});

// UPDATE order status to completed
router.get("/order/:order_id/completed", async (req, res) => {
  try {
    const { order_id } = req.params;
    const order = await Order.findOneBy({ id: +order_id });
    if (!order) {
      return res.status(404).json({ msg: "order doesn't exist" });
    }
    order.completed=true
    await  order.save();
  const updatedOrders = await Order.find({
    where: { id: +order_id },
    relations: { lineItems: { product: true } },
  });
    return res.json(updatedOrders);
  } catch {
    return res.status(404);
  }
});


export { router as orderRouter };



























// import express from "express";

// import { Order } from "../entities/Orders";
// import { LineItem } from "../entities/LineItems";
// import { Product } from "../entities/Products";

// const router = express.Router();

// router.get("/", async (req, res) => {
//     const orders = await Order.find({
//         relations: {
//             lineItems: { product: true }
//         }
//     });
//     return res.json(orders);
// } 
// );

// router.post("/", async (req, res) => {
    
//     try { const { lineItems, name, address, city, mobile } 
//         = req.body;
//     const order = Order.create({
//         name,
//         address,
//         city,
//         mobile,

        
    
//     });
    
//         await order.save();
//         const products = await Product.
            

//         return res.json({ message: "Order created successfully" });
//     } catch (err) {
//         return res.json({ message: err });

//     }
// }
// );
 


 





//     export { router as orderRouter };


