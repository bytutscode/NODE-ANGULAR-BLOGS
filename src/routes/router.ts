import { Request, Response, Router } from "express";
import validator from "../middlewares/validation/validator";
import { getCategory } from "../controllers/category/getCategories";
import { createUser, getUser, getUsers, updateUser, deleteProfilePhoto, uploadProfilePhotos } from '../controllers/user/index'
import { createUserSchema, updateUserSchema, loginSchema } from "../middlewares/validation/index";
import { fileValidator, upload } from "../middlewares/multer";
import { login } from "../controllers/login";
import { authentication } from "../middlewares/Auth";


const router = Router();

router.get('/', authentication, (req: Request, res: Response) => {
    return res.status(200).send('We are on :)')
});

router.post('/user', validator(createUserSchema), createUser);
router.post('/login', validator(loginSchema), login);

router.use(authentication);

router.get('/user', getUsers);
router.get('/user/:id', getUser);
router.put('/user', validator(updateUserSchema), updateUser);
router.post('/profilePhotos', upload.single('avatar'), fileValidator, uploadProfilePhotos);
router.delete('/profilePhotos', deleteProfilePhoto);

//category
router.get('/category', getCategory)

export default router;