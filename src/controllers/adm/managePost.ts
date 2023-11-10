import { Request, Response } from "express";
import Post from "../../models/Post";

export const managePost = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.query;

    if (!id || !status) {
        return res.status(400).json({
            message: 'ID and status must be sent!'
        });
    }

    try {
        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).json({
                message: 'Post not found'
            });
        }

        if (String(status).toLowerCase() === "true") {
            post.status = true;
            await post.save();
        }

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({
            message: 'There was an internal error while processing your request'
        })
    }
}