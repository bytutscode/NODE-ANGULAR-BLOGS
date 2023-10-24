import { Request, Response } from "express";
import { deleteImage } from "../../utils/storage";
import User from "../../models/User";

export const deleteProfilePhoto = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.user;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }
        if (user.profile_photo != 'default.jpg') {
            await deleteImage(user.profile_photo);
        }
        user.profile_photo = 'default.jpg'
        await user.save();

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ message: 'There was an internal error while deleting the file, please contact support' })
    }
}