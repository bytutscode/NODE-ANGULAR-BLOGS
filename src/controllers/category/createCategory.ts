import { Request, Response } from "express";
import Category from "../../models/Category";

export const createCategory = async (req: Request, res: Response) => {
    const { category } = req.body;

    try {
        const hasCategory = await Category.findOne({ where: { category } });
        if (hasCategory) {
            return res.status(400).json({
                message: `Category "${category}" already created in database`
            })
        }

        const newCategory = await Category.create({ category })
        return res.status(201).json(newCategory);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'There was an internal error, please contact the support' })
    }
}