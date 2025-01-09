const  express =require ('express');
const { login, logOutUser} = require("../controller/auth.js");

const router = express.Router();


router.post("/login", login);
router.post("/logout", logOutUser);

module.exports = router;