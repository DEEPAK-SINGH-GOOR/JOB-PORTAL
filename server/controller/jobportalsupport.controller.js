require("dotenv").config();
const Jobportalsupport = require("../model/jobportalsupport.scema")
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const multer = require("multer")
const storage = multer.diskStorage({
    destination : function(req,file,cb){
             cb(null,"uploads"); // check this code
    },
    filename : function(req,file,cb){
             cb(null,`${Date.now()}-${file.originalname}`); // check this
    }
})
const upload = multer({storage : storage});

//email verification
const transport = nodemailer.createTransport({
    service : "gmail",
    auth : {
        user : "chauhanvivek0918@gmail.com",
        pass : process.env.GMAIL_VERIFIED
    }
})


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
      req.body.profilePicture = await req.file.path
      let newuser = await Jobportalsupport.create(req.body);

        const option = await {
          from : "chauhanvivek0918@gmail.com",
          to : newuser.email,
          subject : "Email Verify Mail",
          html : `<a href=http://localhost:8090/verifiedAccount/${newuser?._id?.toString()}>Verified Your Account</a>`
      }
    

      const sendmail = await transport.sendMail(option,(err,data)=>{
       try {
          if(err) return console.log(err);
        //   console.log(data);
       } catch (error) {
          console.log(error);
       }
      })
        
        let token = await newuser.genauthToken();
        if(!newuser || newuser == {}) return res.status(400).send({"message":"user created time occured error !"});
       

      return res.status(200).send({"message":"user created Sucessfully.",newuser,token});
    } catch (error) {
     return res.status(500).send({"message":"User Created Time Server Error Occured.",error});
 }

}

const verifyemail = async (req,res) => {
    let { id } = req.params
    console.log(id);

    if(!id || id==null || id==undefined){
        return res.status(400).send({message : "Source Not Founded Of Email Verify Time !"})
    }
    
    let userUpdate = await Jobportalsupport.findByIdAndUpdate({_id : id},{status : "active"},{new:true});
    console.log(userUpdate);
    
    return res.status(200).send({message : "Email Verify Successfully!",userUpdate}) // create one page of Email Verify... 
}
const verifyuser = async (req,res) => {
    let { email , password } = req.body
    
    try {
            if(email.length <= 1 || email == null || password.length <= 1 || password == null) res.status(400).send({"message" : "please Fill Required Fied !"});
            
            usercheck = await Jobportalsupport.findOne({email})
        
            if(!usercheck || usercheck==null || usercheck == {}) return res.status(400).send({"message" : "User Is Not Founded !"});
            
            let loginuser = await bcrypt.compare(password,usercheck.password);
            if(!loginuser) return res.status(400).send({"message" : "Data Is Invalid !"});
            
            let token = await usercheck.genauthToken();
            return res.status(200).send({"message" : "Login SuccessFully.",usercheck,token});   
        } catch (error) {
            return res.status(500).send({"Err" : "Login Time Occured Error !",error});
    } 
}

module.exports = { allusres , createuser , verifyuser , verifyemail , upload }