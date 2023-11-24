import { Request, Response } from "express";
import { Op } from 'sequelize';
import User from "../../models/User";
import Post from "../../models/Post";

export const search = async (req: Request, res: Response) => {
    let { input, type } = req.query;

    let [pag, limit, offset]: any = [req.query.pag, req.query.limit, 0];
    isNaN(Number(pag)) ? pag = 1 : pag = pag;
    isNaN(Number(limit)) ? limit = 10 : limit;
    offset = +pag <= 1 ? offset : limit * (pag - 1);

    try {
        let results: (Post | User)[];
        let total: number;

        if (type == 'users') {
            const { rows, count } = await User.findAndCountAll({ where: { name: { [Op.iLike]: `%${input}%` } }, offset, limit });
            results = rows; total = count;
        } else {
            const { rows, count } = await Post.findAndCountAll({ where: { title: { [Op.iLike]: `%${input}%` } }, offset, limit });
            results = rows; total = count;
        }

        return res.status(200).json({ total, results });
    } catch (error) {
        return res.status(500).json({
            message: 'There was an internal error while processing your request'
        })
    }
}
