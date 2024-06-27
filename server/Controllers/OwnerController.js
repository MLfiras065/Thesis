const Owner = require("../database/models/Owner");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getOwner = async (req, res) => {
  try {
    const owner = await Owner.findAll({});
    res.json(owner);
    console.log("test");
  } catch (err) {
    console.log(err);
  }
};
const register = (req, res) => {
  bcrypt.hash(req.body.Password, 10).then((hashedPass) => {
    const owner = new Owner({
      image: req.body.image,
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      email: req.body.email,
      Password: hashedPass,
      DateOfBirth: req.body.DateOfBirth,
      gender: req.body.gender,
      CINImage: req.body.CINImage,
    });
    owner
      .save()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => console.log(err));
  });
};

const getOwnerEmail = async (req, res) => {
  console.log("testttssssss");
  try {
    const ownerEmail = await Owner.findOne({
      where: { email: req.params.email },
    });
    res.json(ownerEmail);
  } catch (err) {
    console.log(err);
  }
};
const login = (req, res) => {
  console.log(req.body, "req.body");
  Owner.findOne({ where: { email: req.params.email } }).then((owner) => {
    // if(!owner){
    //    return { success: false, message: 'owner  not found' }
    // }
    if (owner) {
      bcrypt
        .compare(req.body.Password, owner.Password)
        .then((passCheck) => {
          if (!passCheck) {
            return res.status(400).json({ message: " invalid owner" });
          }
          const token = jwt.sign(
            {
              id: owner.id,
              email: owner.email,
              
            },
            "RandomToken"
          );

          owner.update({ token: token }).then(() => {
         return    res.status(200).json({ email: owner.email, token: token, id: owner.id });
          }).catch((err) => {
            console.log(err);
        return     res.status(500).json({ message: "Error saving token" });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
};
const updateOwner = async (req, res) => {
  const updeted = await Owner.update(
    {
      image: req.body.image,
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      email: req.body.email,
  
    },
    { where: { id: req.params.id } }
  );
  try {
    res.json(updeted);
  } catch (err) {
    console.log(err);
  }
};
markeAsPayed= async (req, res) => {
  

  try {
  
    const owner= await Owner.findOne({
      where:{email:req.params.id}
    });

    if (!owner) {
      return res.status(404).json({ message: 'owner not found' });
    }

    
    owner.payed = 1;
    await owner.save();

    res.status(200).json({ message: 'Seller marked as payed', owner });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
},
module.exports = { getOwner, register, login, updateOwner, getOwnerEmail,markeAsPayed};
