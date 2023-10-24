import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import User from "../models/User";


export const authentication = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const { authorization } = req.headers;

    const token = authorization?.split(' ')[1];

    if (!token) {
        return res.status(400).json({
            message: 'token was not sent'
        })
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = user;
        const hasUser = await User.findByPk(req.user.id);

        if (!hasUser) {
            return res.status(404).json({
                message: 'User was not found'
            })
        }
        next()
    } catch (error) {
        return res.status(403).json({
            message: 'Unauthorized, you have no permission to execute this action'
        })
    }

}