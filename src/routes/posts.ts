import express from "express";
import { Request, Response } from "express";
import Router from "express";
import { Post } from "../entities/post";
import { User } from "../entities/user";

const router = express.Router();

router.get("/", async (req, res) => {
  // // if (!post){
  // return res.json({ msg: "post not found" })
  // //
});
router.post("/:userId", async (req, res) => {
  const { userId } = req.params;
  const user = await User.findOneBy({ id: parseInt(userId) });
  const { title, body,tag } = req.body;
  const post = Post.create({
    title: title,
      body: body,
        tag:tag,
  });
  await post.save();
  return res.json(post);
});

router.put("/", async (req, res) => {});

router.delete("/", async (req, res) => {});

export { router as postRouter };
