import { Response, Request } from "express";
import { Post } from "../entity/Post";
import { User } from "../entity/User";
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError'; // Import EntityNotFoundError
import { sendApiResponse } from "../helper/apiResponseHelper";


export const getPosts = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const user = await User.findOneBy({ id: userId });
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    const posts = await Post.find({
        where: {
            author: { id: userId }
        },
    });
    return sendApiResponse(res, posts);
}

export const createPost = async (req: Request, res: Response) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({ error: "Title and content are required" });
        }
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const author = await User.findOneBy({ id: userId });
        if (!author) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Create a new post
        const post = Post.create({
            title: title,
            content: content,
            author: author,
        });
        const result = await Post.save(post);
        return sendApiResponse(res, result, "Post created", 201);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });

    }
}

export const getPost = async (req: Request, res: Response) => {
    const postId = parseInt(req.params.id);
    const userId = req.user?.id;
    console.log(userId, postId);
    const post = await Post.find({
        where: {
            id: postId,
            author: { id: userId }
        },
    });
    if (!post) {
        return res.status(404).json({ error: "Post not found" });
    }
    return sendApiResponse(res, post);
}

export const updatePost = async (req: Request, res: Response) => {
    try {
        const postId = parseInt(req.params.id);
        const userId = req.user?.id;
        const post = await Post.findOneOrFail({
            where: {
                id: postId,
                author: { id: userId }
            },
        });
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({ error: "Title and content are required" });
        }
        // Post.update(postId, { title, content });
        post.title = title;
        post.content = content;
        const result = await Post.save(post);
        return sendApiResponse(res, result, "Post updated");
    }
    catch (error) {
        console.error(error);
        // Handle EntityNotFoundError specifically to return 404
        if (error instanceof EntityNotFoundError) {
            return res.status(404).json({ error: "Post not found" });
        }
        return res.status(500).json({ error: "Internal server error" });

    }
}

export const deletePost = async (req: Request, res: Response) => {
    try {
        const postId = parseInt(req.params.id);
        const userId = req.user?.id;
        const post = await Post.findOneOrFail({
            where: {
                id: postId,
                author: { id: userId }
            },
        });
        const result = await Post.remove(post);
        return sendApiResponse(res, result, "Post deleted", 204);
    }
    catch (error) {
        console.error(error);
        // Handle EntityNotFoundError specifically to return 404
        if (error instanceof EntityNotFoundError) {
            return res.status(404).json({ error: "Post not found" });
        }
        return res.status(500).json({ error: "Internal server error" });

    }
}