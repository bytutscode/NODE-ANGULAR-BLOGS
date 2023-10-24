import { NextFunction, Request, Response } from "express";
import multer from "multer";
export const upload = multer();

// although there are functions to define the file name and validation, I prefered to do it myself, reason? more simpler

export const fileValidator = async (req: Request, res: Response, next: NextFunction) => {
    const file = req.file;

    if (!file) {
        return res.status(400).json({
            message: 'The image is required'
        })
    }

    if (file.size > 10485760) {
        return res.status(400).json({
            message: 'The file is larger than 10MB(max size allowed)'
        })
    }
    next()
}