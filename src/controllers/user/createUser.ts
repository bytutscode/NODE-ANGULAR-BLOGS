import { Request, Response } from "express";
import User from "../../models/User";
import { generateHashedPassword } from "../../utils/generateHash";
import { uploadImage } from "../../utils/storage";

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    const { name, email, password } = req.body;
    try {
        const newUser = User.build();
        newUser.name = name;
        newUser.email = email;
        newUser.password = await generateHashedPassword(password);
        await newUser.save();
        return res.status(201).json(newUser)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'There was an internal error, please contact the support' })
    }
}