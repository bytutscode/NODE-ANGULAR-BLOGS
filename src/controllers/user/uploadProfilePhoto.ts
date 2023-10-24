import { Request, Response } from "express";
import { uploadImage } from "../../utils/storage";
import User from "../../models/User";

export const uploadProfilePhoto = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.user;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        if (req.file) {
            const { originalname, mimetype, buffer } = req.file;
            user.profile_photo = await uploadImage(originalname, mimetype, buffer);
        }
        await user.save();
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ message: 'There was an internal error, please contact the support' })
    }
}