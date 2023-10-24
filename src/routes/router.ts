import { Request, Response, Router } from "express";
import { getCategory } from "../controllers/category/getCategories";
import validator from "../middlewares/validation/validator";
import { createUserSchema } from "../middlewares/validation/createUserSchema";
import { createUser } from "../controllers/user/createUser";
import { fileValidator, upload } from "../middlewares/multer";
import { deleteProfilePhoto } from "../controllers/user/deleteProfilePhoto";
import { uploadProfilePhoto } from "../controllers/user/uploadProfilePhoto";
import { login } from "../controllers/login";
import { loginSchema } from "../middlewares/validation/loginSchema";
import { authentication } from "../middlewares/Auth";

const router = Router();

router.get('/', authentication, (req: Request, res: Response) => {
    return res.status(200).send('We are on :)')
});

router.post('/user', validator(createUserSchema), createUser);
router.post('/login', validator(loginSchema), login);

router.use(authentication);
router.post('/profilePhoto', upload.single('avatar'), fileValidator, uploadProfilePhoto);
router.delete('/profilePhoto', deleteProfilePhoto);


router.get('/category', getCategory)

export default router;