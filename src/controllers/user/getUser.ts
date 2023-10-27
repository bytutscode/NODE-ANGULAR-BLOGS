import { Request, Response } from "express";
import User from "../../models/User";

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (isNaN(Number(id))) {
        return res.status(400).json({
            message: 'User id must be a number!'
        });
    }

    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                message: 'User not found!'
            });
        }

        const { password: _, ...userInfo } = user.toJSON();

        return res.status(200).json(userInfo);
    } catch (error) {
        return res.status(500).json({ message: 'There was an internal error while processing your request' });
    }
}