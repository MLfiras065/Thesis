const Owner=require("../database/models/Owner")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getOwner=async(req,res)=>{
  try {
      const owner=await Owner.findAll({})
      res.json(owner)
      console.log("test");
    } catch (err) {
        console.log(err);
    }
}
const register=(req,res)=>{
  bcrypt.hash(req.body.Password,10)
  .then((hashedPass)=>{
const owner=new Owner({
   image:req.body.image,
     FirstName:req.body.FirstName,
   LastName:req.body.LastName,
   email:req.body.email,
   Password:hashedPass,
   DateOfBirth:req.body.DateOfBirth,
   gender:req.body.gender,
   CINImage:req.body.CINImage
  
})
owner.save().then((result)=>{
    res.json(result)
}).catch((err)=>console.log(err))
  })
} 

const getOwnerEmail=async(req,res)=>{
  console.log("testttssssss");
  try {
    const ownerEmail=await Owner.findOne({
      where:{email:req.params.email}
    })
    res.json(ownerEmail)
  } catch (err) {
    console.log(err)
  }
}
const login=(req,res)=>{
  console.log(req.body,"req.body");
    Owner.findOne({ where: { email: req.params.email } }).then((owner) => {
        bcrypt
          .compare(req.body.Password,owner.Password)
          .then((passCheck) => {
            if (!passCheck) {
              return res.status(400).json({ message: "Password wrong" });
            }
            const token = jwt.sign(
              {
                id: owner.id,
                email: owner.email,
              },
              "RandomToken",
           
            );
            
            res.status(200).json({ email: owner.email,token:token,id:owner.id });
          })
          .catch((err) => {
            console.log(err);
          });
      });
}
const updateOwner=async(req,res)=>{
  const  updeted=await Owner.update({image:req.body.image,
    FirstName:req.body.FirstName,
    LastName:req.body.LastName,
    username:req.body.username,
    email:req.body.email,
    DateOfBirth:req.body.DateOfBirth,
    gender:req.body.gender,
    CINImage:req.body.CINImage
    
},
    { where: { id: req.params.id } })
    try {
     res.json(updeted)
    } catch (err) {
      console.log(err);
    }
    const updateOwner=async(req,res)=>{
      const updated=await Owner.update({image:req.body.image,
        FirstNmae:req.body.FirstName,
        LastName:req.body.LastName,
        Uername:req.body.username,
        email:req.body 
      })
    }
}
module.exports={getOwner,register,login,updateOwner,getOwnerEmail}