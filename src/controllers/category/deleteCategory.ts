import { Request, Response } from "express";
import Category from "../../models/Category";

export const deleteCategory = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const category = await Category.findOne({ where: { id } });
        if (!category) {
            return res.status(404).json({
                message: 'Category not found'
            })
        }

        await category.destroy();
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({
            message: 'There was an internal error, please contact the support'
        })
    }
}