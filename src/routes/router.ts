import { Router } from "express";
import validator from "../middlewares/validation/validator";
import { createUser, getUser, getUsers, updateUser, deleteProfilePhoto, uploadProfilePhotos, deleteUser } from '../controllers/user/index';
import { createCategory, getCategory, updateCategory, deleteCategory } from "../controllers/category/index";
import { createUserSchema, updateUserSchema, loginSchema, createCategorySchema } from "../middlewares/validation/index";
import { fileValidator, upload } from "../middlewares/multer";
import { login } from "../controllers/login";
import { authentication, authenticationADM } from "../middlewares/Auth";
import { createPost } from "../controllers/post/createPost";
import { createPostSchema } from "../middlewares/validation/post/createPostSchema";
import { getPosts } from "../controllers/post/getPosts";
import { getPost } from "../controllers/post/getPost";
import { deletePost } from "../controllers/post/deletePost";
import { createAdmSchema } from "../middlewares/validation/adm/createAdmSchema";
import { createAdm } from "../controllers/adm/createADM";


const router = Router();

router.post('/user', validator(createUserSchema), createUser);
router.post('/login', validator(loginSchema), login);

router.use(authentication);
router.get('/user', getUsers);
router.get('/user/:id', getUser);
router.put('/user', validator(updateUserSchema), updateUser);
router.post('/profilePhotos', upload.single('avatar'), fileValidator, uploadProfilePhotos);
router.delete('/profilePhotos', deleteProfilePhoto);
router.delete('/user/:id', deleteUser);

router.get('/category', getCategory);
router.post('/category', validator(createCategorySchema), createCategory);
router.put('/category/:id', validator(createCategorySchema), updateCategory);
router.delete('/category/:id', deleteCategory);

router.get('/post', getPosts);
router.get('/post/:id', getPost);
router.post('/post', upload.single('image'), validator(createPostSchema), fileValidator, createPost);
router.delete('/post/:id', deletePost);

router.use(authenticationADM);
router.post('/adm', validator(createAdmSchema), createAdm);

export default router;