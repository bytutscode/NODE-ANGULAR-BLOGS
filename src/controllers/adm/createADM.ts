import { Request, Response } from "express";
import { generateHashedPassword } from "../../utils/generateHash";
import Adm from "../../models/Adm";

export const createAdm = async (req: Request, res: Response): Promise<Response> => {
    const { name, email, password } = req.body;

    try {
        const hasEmail = await Adm.findOne({ where: { email } });
        if (hasEmail) {
            return res.status(400).json({
                message: 'Email already exists'
            });
        }

        const newAdm = Adm.build();
        newAdm.name = name;
        newAdm.email = email;
        newAdm.password = await generateHashedPassword(password);
        await newAdm.save();

        const { password: _, ...newAdmInfo } = newAdm.toJSON();
        return res.status(201).json(newAdmInfo)
    } catch (error) {
        return res.status(500).json({
            message: 'There was an internal error while processing your request'
        })
    }
}