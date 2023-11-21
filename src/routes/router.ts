import { Router } from "express";
import validator from "../middlewares/validation/validator";
import { createUser, getUser, getUsers, updateUser, deleteProfilePhoto, uploadProfilePhotos, deleteUser } from '../controllers/user';
import { createCategory, getCategory, updateCategory, deleteCategory } from "../controllers/category";
import { createUserSchema, updateUserSchema, loginSchema, createCategorySchema, createAdmSchema, createPostSchema } from "../middlewares/validation";
import { createPost, getPosts, getPost, deletePost, getPostsMainPage } from '../controllers/post';
import { createAdm, deletePostAdm, getPostToApprove, managePost } from "../controllers/adm";
import { fileValidator, upload } from "../middlewares/multer";
import { login } from "../controllers/login";
import { authentication, authenticationADM } from "../middlewares/Auth";

const router = Router();
router.post('/verifytoken',authentication,(req, res)=>{
    res.status(200).send()
})
router.post('/user', validator(createUserSchema), createUser);
router.post('/login', validator(loginSchema), login);

router.use(authentication);
router.get('/user', getUsers);
router.get('/user/:id', getUser);
router.put('/user', validator(updateUserSchema), updateUser);
router.post('/profilephotos', upload.single('avatar'), fileValidator, uploadProfilePhotos);
router.delete('/profilephotos', deleteProfilePhoto);
router.delete('/user', deleteUser);

router.get('/category', getCategory);
router.post('/category', validator(createCategorySchema), createCategory);
router.put('/category/:id', validator(createCategorySchema), updateCategory);
router.delete('/category/:id', deleteCategory);

router.get('/post', getPosts);
router.get('/post/home', getPostsMainPage);
router.get('/post/:id', getPost);
router.post('/post', upload.single('image'), validator(createPostSchema), fileValidator, createPost);
router.delete('/post/:id', deletePost);

router.use(authenticationADM);
router.post('/adm', validator(createAdmSchema), createAdm);
router.get('/adm/post', getPostToApprove);
router.post('/adm/post/:id', managePost);
router.delete('/adm/post/:id', deletePostAdm);

export default router;