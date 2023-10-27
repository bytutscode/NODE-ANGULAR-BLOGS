import { Request, Response } from "express";
import User from "../../models/User";

export const getUsers = async (req: Request, res: Response) => {
    try {
        let users = await User.findAll({});

        if (users.length > 0) {
            users = users.map(user => {
                const { password: _, ...userInfo } = user.toJSON();
                return userInfo;
            });
        }

        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({ message: 'There was an internal error while processing your request' });
    }
}