import express from "express";


import { Category} from "../entities/Categories";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const categories = await Category.find();
        return res.json(categories);
    }
    catch (err) {
        console.log(err)
      res.status(400).json({ msg: 'something went wrong', details: err })
    }
})
    export { router as categoryRouter };
