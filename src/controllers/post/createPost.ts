import { Request, Response } from "express";
import Post from "../../models/Post";
import { deleteImage, uploadImage } from "../../utils/storage";
import Category from "../../models/Category";

export const createPost = async (req: Request, res: Response) => {
    const { title, content, category_id, image } = req.body;
    const { id } = req.user;
    let imageUploaded = false; //Here, I just want to make sure that if it fails, it will delete the uploaded image.
    let imageKey: string = '';

    if (!req.file) {
        return res.status(400).json({
            message: 'Image is required'
        })
    }

    try {
        const post = Post.build();
        post.title = title;
        post.content = content;
        post.user_id = id;

        const hasCategory = await Category.findOne({ where: { id: category_id } });
        if (!hasCategory) {
            return res.status(400).json({
                message: 'invalid category, check the category and try again'
            })
        }
        post.category_id = category_id;

        const { originalname, mimetype, buffer } = req.file;
        post.image = await uploadImage(originalname, mimetype, buffer);
        imageUploaded = true;
        imageKey = post.image;

        await post.save();
        return res.status(201).json(post)
    } catch (error) {
        try {
            imageUploaded ? await deleteImage(imageKey) : null;
            return res.status(500).json({
                message: 'There was an internal error while processing your request'
            })
        } catch (error) {
            return res.status(500).json({
                message: 'There was an internal error while processing your request'
            })
        }

    }
}