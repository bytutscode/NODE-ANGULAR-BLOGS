import { Request, Response } from "express";
import Category from "../../models/Category";

export const getCategory = async (req: Request, res: Response) => {
    try {
        const categories = await Category.findAll({})
        return res.status(200).json(categories)
    } catch (error) {
        return res.status(500).json({
            message: 'Internal error, contact support!'
        })
    }
}