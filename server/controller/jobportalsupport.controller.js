const Jobportalsupport = require("../model/jobportalsupport.scema")
const multer = require("multer")
const storage = multer.diskStorage({
    destination : function(cb,req,file){
            return cb(null,"uploads"); // check this code
    },
    filename : function(cb,req,file){
            return cb(null,`${Date.now()}-${file.orignalName()}`); // check this
    }
})
const upload = multer({storage : storage});
const allusres = async (req,res) => {
   
    try {
        let users = await Jobportalsupport.find();
        if(!users) return res.status(400).send({"error":"Data Find Time Occured Some Error !"});
        return res.status(200).send({users});
    } catch (error) {
        return res.status(500).send({"error":"Data Find Time Occured Server Error !"});
    }
    
}

const createuser = async (req,res) => {
 try {
      let newuser = await Jobportalsupport.create(req.body);
      if(!newuser || newuser == {}) return res.status(400).send({"message":"user created time occured error !"});
      return res.status(200).send({"message":"user created Sucessfully."});
    } catch (error) {
     return res.status(500).send({"message":"User Created Time Server Error Occured.",error});
 }

}

module.exports = { allusres , createuser , upload }