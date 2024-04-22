import { Request, Response } from "express";
import Post from "../../models/Post";
import View from "../../models/View";

export const getPost = async (req: Request, res: Response) => {
    const { id } = req.params;
    
    if (isNaN(+id)) {
        return res.status(404).json({
            message: 'Post not found'
        })
    }
     const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
    console.log('houve algum erro');
    return res.status(500).json({ip,headers:req.headers});
    try {
        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).json({
                message: 'Post not found'
            })
        }
        
       
        const checkView = await View.findOne({ where: { user_ip: ip, post_id: id } });
        if (!checkView) {
            await View.create({ user_ip: ip, post_id: id });
        }

        return res.status(200).json(post);
    } catch (error) {

        return res.status(500).json({
            message: 'There was an internal error while processing your request'
        })
    }
}
