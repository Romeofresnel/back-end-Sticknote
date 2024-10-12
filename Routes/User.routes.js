const router = require("express").Router();
const authController = require("../Controllers/auth.controllers");
const userController = require("../Controllers/User.controllers");
const uploadController=require("../Controllers/Upload.controllers")
const multer=require('multer')
const upload=multer()
const { checkAuth,requireAuth } = require("../middlewares/ckeckAuth");

router.post("/register",userController.PostUser);
router.post("/login", authController.signIn);
router.get('/jwtid',requireAuth,(req,res)=>{res.status(200).send(res.locals.user._id)})


router.get("/user/get", checkAuth,userController.getAllUsers);
router.get("/user/:id", checkAuth,userController.userInfo);
router.put("/user/:id", checkAuth,userController.updateUser);
router.delete("/user/:id", checkAuth,userController.deleteUser);
 
router.post('/user/upload',checkAuth,upload.single("file"),uploadController.uploadProfil)
module.exports = router;
