import { Request, Response } from "express";
import Category from "../../models/Category";

export const updateCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { category } = req.body;

    try {
        const checkCategory = await Category.findOne({ where: { id } });
        if (!checkCategory) {
            return res.status(404).json({
                message: 'Category not found'
            })
        }

        const checkNameCategory = await Category.findOne({ where: { category } });
        if (checkNameCategory) {
            return res.status(400).json({
                message: `${category} already registred in database`
            })
        }

        await checkCategory.update({ category });
        return res.status(204).send();
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'There was an internal error, please contact the support'
        })
    }
}