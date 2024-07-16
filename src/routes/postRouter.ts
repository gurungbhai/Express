import express from 'express';
import { createPost, deletePost, getPost, getPosts, updatePost } from '../controller/postController';

const router = express.Router();

router.get('/', getPosts);
router.post('/',createPost);
router.get('/:id', getPost);
router.delete('/:id', deletePost);
router.put('/:id', updatePost);

export default router;