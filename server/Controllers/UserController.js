const User=require("../database/models/User")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getUser=async(req,res)=>{
  try {
      const user=await User.findAll({})
      res.json(user)
      console.log("test");
    } catch (err) {
        console.log(err);
    }
}
const register=(req,res)=>{
  bcrypt.hash(req.body.Password,10)
  .then((hashedPass)=>{
const user=new User({
   image:req.body.image,
     FirstName:req.body.FirstName,
   LastName:req.body.LastName,
   email:req.body.email,
   Password:hashedPass,
   DateOfBirth:req.body.DateOfBirth,
   gender:req.body.gender,
  
  
})
user.save().then((result)=>{
    res.json(result)
}).catch((err)=>console.log(err))
  })
} 

const getUserEmail=async(req,res)=>{
  console.log("test");
  try {
    const userEmail=await User.findOne({
      where:{email:req.params.email}
    })
    res.json(userEmail)
  } catch (err) {
    console.log(err)
  }
}
const login=(req,res)=>{
  
  console.log(req.body,"req.body");
    User.findOne({ where: { email: req.params.email } }).then((user) => {
     
      if(user){
                bcrypt
          .compare(req.body.Password,user.Password)
          .then((passCheck) => {
            if (!passCheck) {
              return res.status(400).json({ message: "invalid user " });
            }
            const token = jwt.sign(
              {
                id: user.id,
                email: user.email,
                
              },
              "RandomToken",
           
            );
            return   res.status(200).json({ email: user.email,token:token,id:user.id });
          })
          .catch((err) => {
            console.log(err);
          });
      }});
}
const updateUser=async(req,res)=>{
  const  updeted=await User.update({image:req.body.image,
    FirstName:req.body.FirstName,
    LastName:req.body.LastName,
    username:req.body.username,
    email:req.body.email,
    DateOfBirth:req.body.DateOfBirth,
    gender:req.body.gender,

    
},
    { where: { id: req.params.id } })
    try {
     res.json(updeted)
    } catch (err) {
      console.log(err);
    }
}
const markAsPayed= async (req, res) => {
  

  try {
  
    const client = await User.findOne({
      where:{email:req.params.id}
    });

    if (!client) {
      return res.status(404).json({ message: 'client not found' });
    }

    
    client.payed = 1;
    await client.save();

    res.status(200).json({ message: 'client marked as payed', client });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
}
module.exports={getUser,register,login,updateUser,getUserEmail,markAsPayed}