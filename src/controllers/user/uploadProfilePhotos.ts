import { Request, Response } from "express";
import { uploadImage } from "../../utils/storage";
import User from "../../models/User";

export const uploadProfilePhotos = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.user;
    const { type } = req.query; // by default if the type be different of "banner" will update the profile photo otherwise it'll update the banner photo
    
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        if (req.file) {
            const { originalname, mimetype, buffer } = req.file;
            const imageUploadedKey = await uploadImage(originalname, mimetype, buffer);
            type == 'banner' ? user.banner_photo = imageUploadedKey : user.profile_photo = imageUploadedKey;
        }
        await user.save();
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ message: 'There was an internal error, please contact support' })
    }
}