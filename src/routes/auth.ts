import bcrypt from 'bcryptjs';
import express from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User }  from '../entities/User';
import { isAuthenticated } from '../middleware/auth';
import { AuthRequest } from '../types/auth'
import { MyToken}        from '../types/auth'

const router = express.Router()


router.post('/signup', async (req, res) => {
    try {
      
        
    const { email, password, firstName, lastName, userName } = req.body

    const userExists = await User.findOne({ where: [{ email }, { userName }] })
     
    if (userExists) {
      return res.status(400).json({
        message: 'User already exists',
      })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      userName,
    })
    await user.save()

    return res.status(200).json({ user })
  } catch (error) {
    res.status(500).json({ error })
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res
        .status(400)
        .json({ message: 'User with that email does not exist' })
    }

    const validPass = await bcrypt.compare(password, user.password)

    if (!validPass) {
      return res.status(400).json({ message: 'Invalid password' })
    }

    const token = jwt.sign({ email: user.email }, process.env.HASHING_KEY, {
      expiresIn: '1d',
    })

    return res.status(200).json({ message: 'Logged in successfully', token })
  } catch (error) {
    res.status(500).json({ error })
  }
})

router.get('/me', isAuthenticated, async (req, res) => {
  try {
    const { authorization } = req.headers

    jwt.verify(authorization, process.env.HASHING_KEY, async (err, token: MyToken) => {
      if (err) {
        return res.status(401).json({
          message: 'Invalid token',
        })
      }

      const email = token.email
      const user = await User.findOne({ where: { email } })

      res.json({ user })
      // check if token is expired
    })
  } catch (error) {
    res.status(500).json({ error })
  }
})

router.delete('/', async (req, res) => {})

export { router as authRouter }