const { Router } = require("express");
const {
  allusres,
  createuser,
  verifyuser,
  upload,
  verifyemail,
} = require("../controller/jobportalsupport.controller");
const bodychecker = require("../middleware/bodycheckerauth");
const passport = require("passport");

const jobportalsupportRoute = Router();

jobportalsupportRoute.get("", allusres);
jobportalsupportRoute.post(
  "/register",
  upload.single("img"),
  bodychecker,
  createuser
); // in this route will be use recaptcha
jobportalsupportRoute.post("/login", verifyuser); // in this route will be use recaptcha

// //google login
// jobportalsupportRoute.get("/auth/google",passport.authenticate('google', { scope: ['profile','email'] }));
// jobportalsupportRoute.get("/auth/google/callback",passport.authenticate('google', { scope: ['profile','email'] }),function(req,res){
  //     res.send(req.user);
  // });
  
jobportalsupportRoute.get("/verifiedAccount/:id", verifyemail); // patch Route

module.exports = jobportalsupportRoute;
