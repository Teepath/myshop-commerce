const express =require ("express");
const  {register, reVerifyEmail, forgotPasswordReset,setNewPassword,updatePassword, logOutUser} = require ("../controller/auth.js");
const {verify} = require ("../controller/verifyEmail.js");

const router = express.Router();


router.post("/register", register);
router.get("/email-reverify", register);
router.post("/forget-password", forgotPasswordReset);
router.post("/reset-password", setNewPassword);
router.post("/update-password", updatePassword);
router.get("/verify", verify)




module.exports = router;