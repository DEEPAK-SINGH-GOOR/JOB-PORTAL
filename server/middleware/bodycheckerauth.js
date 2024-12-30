const Jobportalsupport = require("../model/jobportalsupport.scema");



const bodychecker = async (req,res,next) => {
    const {username , email , password , firstName , lastName , role , phoneNumber , ip_address} = req.body;
    try {
            if(!username || username==null || !email || email==null || !password || password==null || !firstName || firstName==null || !lastName || lastName==null || !role || role==null || !phoneNumber || phoneNumber==null || !ip_address || ip_address==null)
            {
                return res.status(400).send({"message":"Please Fill Required Fields !"});
            }
            let userExist = await Jobportalsupport.findOne({email});
            
            if(userExist!=null) {
                return res.status(400).send({message : "User Is Already Exists !"});
            }

            next();
    } catch (error) {
        next(error);
    }
}
module.exports = bodychecker;