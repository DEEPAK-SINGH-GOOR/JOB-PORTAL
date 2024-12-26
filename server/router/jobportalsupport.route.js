const { Router } = require("express");
const { allusres } = require("../controller/jobportalsupport.controller");

const jobportalsupportRoute = Router();

jobportalsupportRoute.get("",allusres);
// jobportalsupportRoute.post("",allusres);

module.exports = jobportalsupportRoute