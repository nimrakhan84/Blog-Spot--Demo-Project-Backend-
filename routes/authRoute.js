const express = require('express');
const router = express.Router();
const User = require('../model/userSchema');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res, next) => {
   
    const {email, password} = req.body;
    try {
      const user = await User.findOne({email});
      if (!user){
        return next({ status: 404, message:"User/Password incorrect!"})
      }
      const dbPwd = user.password;
      const isSamePassword = await bcryptjs.compare(password, dbPwd);
      if(isSamePassword){
        const JasonPayload = {name: user.name, id: user.id,  email: user.email};
        const token = jwt.sign(JasonPayload,process.env.SECRET_KEY,{expiresIn:"5d"});
        res.json({message: "Login Success", token});
      }
      else{
        next({status: 404, message: "User/password is incorrect"});
      }
      
    } catch (error) {
      console.log(error.message);
      next({ status: 500, message: error.message });
    }
  });

  router.delete('/delete_user/:id?', async(req,res,next)=>{
    const {id} = req.params;
    console.log(req.params)
    if (!id){
      res.json({status:404,message:'Id is missing!'});
    };

    try{
      await User.findByIdAndDelete(id);
      res.json({message: 'User deleted!'});
    }
    catch(error){
      next({status: 500, message:error});
    }

  })


  router.get('/all_users', (req, res) => {
    User.find({}, {__v: 0}).then(rec => {
      console.log(rec);
      res.json({ message: 'All Users', data: rec })
    });
  })

  router.put('/update_user_info', async(req,res,next)=>{
    const user_id = req.body.id;
    const user_name = req.body.name;
    const user_email = req.body.email;

    try{
      const user = await User.findOneAndUpdate({_id:user_id},{$set:{ name:user_name, email:user_email}});
      console.log(user)
      res.json({message: "User Info Updated Successfully!"});
    } 
    catch (e) {
      next({status: 404, message: e});
    }
  })

  router.post('/register', async (req, res, next) => {
    const {name, email, password} = req.body;
    const encPassword = bcryptjs.hashSync(password, 15);

    const UserExist = await User.findOne({email});

    if (UserExist){
      console.log(UserExist)
      res.json({message: "Email already used!"});
    }
  
      try {
        const newUser = await User.create({name, email, password: encPassword});
        res.json({user: newUser});
     } catch (error) {
       console.log(error.message);
       next({ status: 500, message: error.message });
     }
    
    
  });
  

  module.exports = router;
