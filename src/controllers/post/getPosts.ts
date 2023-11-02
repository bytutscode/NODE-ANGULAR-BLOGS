import { Request, Response } from "express";
import Post from "../../models/Post";

export const getPosts = async (req: Request, res: Response) => {
    try {
        const posts = await Post.findAll({});
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({
            message: 'There was an internal error while processing your request'
        })
    }
}