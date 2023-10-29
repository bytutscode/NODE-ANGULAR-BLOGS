import { Request, Response } from "express";
import User from "../../models/User";
import { generateHashedPassword } from "../../utils/generateHash";
import { uploadImage } from "../../utils/storage";

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    const { name, email, password } = req.body;

    try {
        const hasEmail = await User.findOne({ where: { email } });
        if (hasEmail) {
            return res.status(400).json({
                message: 'Email already exists'
            });
        }

        const newUser = User.build();
        newUser.name = name;
        newUser.email = email;
        newUser.password = await generateHashedPassword(password);
        await newUser.save();

        const { password: _, ...newUserInfo } = newUser.toJSON();
        return res.status(201).json(newUserInfo)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'There was an internal error, please contact the support' })
    }
}