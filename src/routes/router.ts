import { Router } from "express";
import validator from "../middlewares/validation/validator";
import { getCategory } from "../controllers/category/getCategories";
import { createUser, getUser, getUsers, updateUser, deleteProfilePhoto, uploadProfilePhotos, deleteUser } from '../controllers/user/index';
import { createUserSchema, updateUserSchema, loginSchema } from "../middlewares/validation/index";
import { fileValidator, upload } from "../middlewares/multer";
import { login } from "../controllers/login";
import { authentication } from "../middlewares/Auth";

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

router.get('/category', getCategory)

export default router;