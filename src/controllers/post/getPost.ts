import { Request, Response } from "express";
import Post from "../../models/Post";

export const getPost = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (isNaN(+id)) {
        return res.status(404).json({
            message: 'Post not found'
        })
    }

    try {
        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).json({
                message: 'Post not found'
            })
        }

        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({
            message: 'There was an internal error while processing your request'
        })
    }
}