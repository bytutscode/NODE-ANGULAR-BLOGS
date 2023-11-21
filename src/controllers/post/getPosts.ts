import { Request, Response } from "express";
import Post from "../../models/Post";
import User from "../../models/User";
import View from "../../models/View";
import { Sequelize } from "sequelize";

export const getPosts = async (req: Request, res: Response) => {
    try {
        const posts = await Post.findAll({ where: { user_id: req.user.id }, order: [['id', 'DESC']] });
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({
            message: 'There was an internal error while processing your request'
        })
    }
}

export const getPostsMainPage = async (req: Request, res: Response) => {
    try {
        const firstPageORM = Post.findAll({ order: [['id', 'desc']], limit: 4, include: { model: User, attributes: ['name'] } });
        const popularORM = View.findAll({attributes: [[Sequelize.fn('COUNT', Sequelize.col('post_id')), 'views_count']]
                                    , group: ['Post.id'], limit: 3, include: { model: Post,  }, order: [['views_count', 'DESC']],});
        const latestORM = Post.findAll({ order: [['id', 'desc']], limit: 4, include: { model: User, attributes: ['name'] } });

        const [firstPage, popular, latest] = await Promise.all([firstPageORM, popularORM , latestORM ]);
        
        return res.status(200).json([...firstPage, ...popular, ...latest]);
    } catch (error) {
        return res.status(500).json({
            message: 'There was an internal error while processing your request'
        })
    }
}

