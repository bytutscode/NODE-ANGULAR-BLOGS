import { Request, Response } from "express";
import Post from "../../models/Post";
import User from "../../models/User";
import View from "../../models/View";
import { Sequelize } from "sequelize";

export const getPosts = async (req: Request, res: Response) => {
    let {category, userID} = req.query;

    let [pag, limit, offset]:any = [req.query.pag, req.query.limit,0];
    isNaN(Number(pag))? pag = 1: pag = pag;
    isNaN(Number(limit))? limit =10: limit;
    offset = +pag <= 1? offset : limit * (pag - 1);
    
    const condition: any = {};
    !(isNaN(Number(category)))? condition.category_id = Number(category):false;
    !(isNaN(Number(userID)))? condition.user_id = Number(userID): false;

    try {
        const {rows:posts, count} = await Post.findAndCountAll({ where: condition, order: [['id', 'DESC']],offset, limit });
        return res.status(200).json({posts, count});
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

