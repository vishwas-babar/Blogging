const {Router} = require("express");
const User = require("../models/user.model")
const router = Router();

router.get("/signin", (req, res) => {
    return res.render("signin");
})

router.get("/signup", (req, res) => {
    return res.render("signup");
})

router.post("/signin", async(req, res)=>{
   const {email, password} = req.body;
   try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
     return res.cookie("token", token).redirect("/");
 
   } catch (error) {
     return res.render("signin",{
        error: "Incorrect Email or password"
     })
   }
})

router.post("/signup", async(req, res) => {
    const {fullname, email, password} = req.body;
    const user = await User.create({
        fullname,
        email,
        password
    });
    console.log("User signup", user);
    return res.redirect("/");
})

router.get("/logout", (req, res) => {
    res.clearCookie("token").redirect("/")
})

module.exports = router;