const Jobportalsupport = require("../model/jobportalsupport.scema")

const allusres = async (req,res) => {
   
    try {
        let users = await Jobportalsupport.find();
        if(!users) return res.status(400).send({"error":"Data Find Time Occured Some Error !"});
        return res.status(200).send({users});
    } catch (error) {
        return res.status(500).send({"error":"Data Find Time Occured Server Error !"});
    }
    
}

const createUser = async (req,res) => {
    // work in progressive ....
}

module.exports = { allusres , createUser }