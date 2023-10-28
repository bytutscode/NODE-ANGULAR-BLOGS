import { Request, Response } from "express";
import User from "../../models/User";
import { generateHashedPassword } from "../../utils/generateHash";

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.user;
    const { email, name, password } = req.body;
    try {

        const toUpdate: any = {};
        if (email) {
            const hasEmail = await User.findOne({ where: { email } });
            if (hasEmail) {
                return res.status(400).json({
                    message: 'Email already exists'
                });
            }
            toUpdate.email = email;
        }
        if (name) {
            toUpdate.name = name;
        }
        if (password) {
            toUpdate.password = await generateHashedPassword(password);
        }

        await User.update(toUpdate, { where: { id } });
        return res.status(204).send();
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'There was an internal error while processing your request'
        });
    }
}