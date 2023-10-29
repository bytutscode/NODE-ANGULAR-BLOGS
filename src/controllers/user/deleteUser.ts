import { Request, Response } from "express";
import User from "../../models/User";

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        await user.destroy();
        return res.status(204).send();

    } catch (error) {
        return res.status(500).json({
            message: 'There was an internal error while processing your request'
        })
    }
}