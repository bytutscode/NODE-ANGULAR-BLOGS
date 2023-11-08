import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Adm from "../models/Adm";

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await Adm.findOne({ where: { email } }) || await User.findOne({ where: { email } });


        if (!user) {
            return res.status(403).json({
                message: 'email/or password incorrect'
            });
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if (!isCorrectPassword) {
            return res.status(403).json({
                message: 'email/or password incorrect'
            });
        }

        const { password: _, id, email: userEmail, name } = user;
        const userInfo = { id, name, userEmail, role: user instanceof Adm ? 'ADM' : 'USER' };
        const token = jwt.sign(userInfo, process.env.JWT_SECRET as string);

        return res.status(200).json({
            user: userInfo,
            token
        })
    } catch (error) {
        return res.status(500).json({
            message: 'There was an internal error'
        });
    }
}

