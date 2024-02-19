import { Router } from "express";
import { Register, Singleuserget, Userget, useredit,userdelete, userstatus } from "../controllers/auth.controllers.js";
import { upload } from "../multerconfig/storageConfig.js";

const router = Router()

router.post("/user/register",upload.single("user_profile"),Register)
router.get("/user/details",Userget)
router.get("/user/:id",Singleuserget)
router.put("/user/edit/:id",upload.single("user_profile"),useredit)
router.delete("/user/delete/:id",userdelete)
router.put("/user/status/:id",userstatus)

export default router