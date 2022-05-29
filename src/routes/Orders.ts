import express from "express";
import { AppDataSource } from "../data-source";
import { Order } from "../entities/Orders";
import { LineItem } from "../entities/LineItems";
import { Product } from "../entities/Products";

const router = express.Router();

router.post("/sendorder", async (req, res) => {
  try {
    const { items, name, address, mobile, city } = req.body;
    console.log("in send order api");
    console.log({ items, name, address, mobile, city });
    const order = Order.create({
      name,
      address,
      mobile,
      city,
    });

    await order.save();
    console.log("saved");
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const product = await Product.findOneBy({ id: +item.id });
      
      if (!product) {
        return res.status(404).json({ msg: "product doesn't exist" });
      }
      const lineItem = LineItem.create({
        product,
        quantity: item.quantity,
        order,
      });
      await lineItem.save();
    }
    const createdOrder = await Order.find({
      where: { id: +order.id },
      relations: { lineItems: true },
    });
    return res.json(createdOrder);
  } catch (error) {
    console.log({ error });
    return res.status(404);
  }
});

router.get("/:order_id", async (req, res) => {
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


router.get("/", async (req, res) => {
  try {
    const orders = await Order.find({
      relations: { lineItems: { product: true } },
    });
    return res.json(orders);
  } catch {
    return res.status(404);
  }
});


router.get("/completed", async (req, res) => {
  try {
    const orders = await Order.find({
      where: { completed: true },
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

router.get("/:order_id/completed", async (req, res) => {
  try {
    const { order_id } = req.params;
    const order = await Order.findOneBy({ id: +order_id });
    if (!order) {
      return res.status(404).json({ msg: "order doesn't exist" });
    }
    order.completed = true;
    await order.save();
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

