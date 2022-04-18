import  express  from "express";
import { User } from "../entities/User";
import { Request, Response } from 'express'
import bCrypt from 'bcryptjs'
const router = express.Router();
// create user router

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);

    
    
  } catch (err) {
   
    res.json({ msg: "user not found" });
  


  }

});

router.post("/", async (req, res) => {
  const { firstName, lastName, email, password, userName } = req.body;
  const user = User.create({
    firstName,
    lastName,
    email,
    password,
    userName,
  });
  const hashedPassword = await bCrypt.hash(user.password, 12);
  const ValidPass = await bCrypt.compare(password, user.password); 
  try {
    await user.save();
    return res.json({ message: "User created successfully" });
    if (!user) {
      return res.json({ message: "User already exists" });
    }
  } catch (err) {

 
   
    res.json({ message: err });


  
  }
});

export { router as userRouter };