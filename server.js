const cors = require('cors');
const express = require('express'); 
const app = express();
app.use(cors());
const mongoose = require('mongoose');
const path = require('path');
const jwt = require('jsonwebtoken');
require("dotenv").config();
console.log(process.env.SECRET_KEY);
const blogRoute = require('./routes/blogRoute');
const authRoute = require('./routes/authRoute');



app.use(express.json());

const authMiddleWare = (req, res, next) => {
    // Check the JWT token
    const secreteKey = "RaNdOm@SuP3R@HarD@StRiNg";
    const token = req.header('Authorization') || '';
    console.log(token);
    console.log("------------");
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized access' });
    }
    const decode = jwt.decode(token, secreteKey);
    console.log(decode);
    console.log("------------");
    if (!decode) {
      return res.status(401).json({ message: 'Unauthorized access' });
    }
    req.user = decode;
    next();
    
  };
app.use('/blogs',authMiddleWare,blogRoute);
app.use('/auth',authRoute);

app.use((req,res)=>{
    res.status(404).send('Page not found');
})

mongoose.connect('mongodb://localhost/taining_paul').then(()=>{
    app.listen(3000, () =>{
        console.log('express  server running in port 3000');
        });
}).catch(err => {
    console.log('Error connecting to db',err);
});




// "scripts": {
  //   "test": "echo \"Error: no test specified\" && exit 1",
  //   "start": "node server.js"
  // },