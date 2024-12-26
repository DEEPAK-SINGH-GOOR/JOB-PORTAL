const { Router } = require("express");
const { allusres, createuser, upload  } = require("../controller/jobportalsupport.controller");
const bodychecker = require("../middleware/bodycheckerauth");

const jobportalsupportRoute = Router();

jobportalsupportRoute.get("",allusres);
jobportalsupportRoute.post("/register",upload.single("img"),bodychecker,createuser);

module.exports = jobportalsupportRoute