import express from 'express'
import {Request, Response} from 'express'
import Router from 'express'
import { User } from '../entities/user';
import { Comment } from '../entities/comment';
import{Post} from '../entities/post'

const router = express.Router();


router.get('/', async (req, res) => {
})

router.post('/:userId/:postId', async (req, res) => {
    const { userId,postId } = req.params;
    const user = await User.findOneBy({ id: parseInt(userId) });
    const post= await Post.findOneBy({ id: parseInt(postId) });
    const {
     body,
    } = req.body;
    const comment = Comment.create({
        body: body,
    });
    await comment.save()
    return res.json (comment)
    
    })


    router.delete('/', async (req, res) => {
    })


    export { router as createComments }
