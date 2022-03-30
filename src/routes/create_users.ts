import express from 'express'
import {Request, Response} from 'express'
import Router from 'express'
import {User} from '../entities/user'

const router = express.Router();


router.get('/', async (req, res) => {
    
})

router.post('/', async (req, res) => {
    const {
        firstName,
        lastName,
    } = req.body;
    const user = User.create({
        firstName: firstName,
        lastName: lastName,
    });
    await user.save()
    return res.json (user)
});


    router.delete('/', async (req, res) => {
    })


    export { router as createUsers }
