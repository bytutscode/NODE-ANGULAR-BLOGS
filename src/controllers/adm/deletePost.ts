import { Request, Response } from "express";
import Post from "../../models/Post";

export const deletePostAdm = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (isNaN(+id)) {
        return res.status(404).json({
            message: 'Post not found'
        })
    }

    try {
        const post = await Post.findOne({ where: { id } });
        if (!post) {
            return res.status(404).json({
                message: 'post not found'
            })
        }

        await post.destroy();
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({
            message: 'There was an internal error while processing your request'
        })
    }
}