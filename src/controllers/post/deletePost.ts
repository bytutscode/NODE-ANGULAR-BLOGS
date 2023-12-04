import { Request, Response } from "express";
import Post from "../../models/Post";
import View from "../../models/View";

export const deletePost = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (isNaN(+id)) {
        return res.status(404).json({
            message: 'Post not found'
        })
    }

    try {

        await View.destroy({ where: { post_id: id } });
        const post = await Post.findOne({ where: { id, user_id: req.user.id } });
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