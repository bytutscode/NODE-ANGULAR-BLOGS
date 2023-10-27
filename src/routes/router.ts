import { Request, Response, Router } from "express";
import { getCategory } from "../controllers/category/getCategories";
import validator from "../middlewares/validation/validator";
import { createUserSchema } from "../middlewares/validation/createUserSchema";
import { createUser } from "../controllers/user/createUser";
import { fileValidator, upload } from "../middlewares/multer";
import { deleteProfilePhoto } from "../controllers/user/deleteProfilePhotos";
import { uploadProfilePhotos } from "../controllers/user/uploadProfilePhotos";
import { login } from "../controllers/login";
import { loginSchema } from "../middlewares/validation/loginSchema";
import { authentication } from "../middlewares/Auth";
import { getUsers } from "../controllers/user/getUsers";
import { getUser } from "../controllers/user/getUser";

const router = Router();

router.get('/', authentication, (req: Request, res: Response) => {
    return res.status(200).send('We are on :)')
});

router.post('/user', validator(createUserSchema), createUser);
router.post('/login', validator(loginSchema), login);

router.use(authentication);
router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.post('/profilePhotos', upload.single('avatar'), fileValidator, uploadProfilePhotos);
router.delete('/profilePhotos', deleteProfilePhoto);


router.get('/category', getCategory)

export default router;