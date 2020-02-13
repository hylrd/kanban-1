const {User} = require('../models')
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

class userController{

  static register(req, res, next){
    // console.log(req.body, 'ini dari body');
    
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
    .then(data =>{
      // console.log(data.id, 'dari atas');
      let token = jwt.sign({ id: data.id }, process.env.SECRET);
      // console.log(token, 'token');
      let name = data.name
      // console.log(name, 'ini data');
      res.status(200).json({token, name})
    })
    .catch(err =>{
      res.status(500).json(err)
    })
  }

  static login(req, res, next){
    User.findOne({
      where:{
        email: req.body.email
      }
    })
    .then(data =>{
      // console.log(data);
      
      var dehash = bcrypt.compareSync(req.body.password, data.password);
      if(dehash){
      let token = jwt.sign({ id: data.id }, process.env.SECRET);
      let name = data.name
      res.status(200).json({token, name})
      }else{
        res.status(500).json('wrong password/email')
      }
    })
    .catch(err =>{
      res.status(500).json(err)
    })
  }

  static gSignin(req, res, next){
    console.log('masuk', req.body.id_token);
    
    // client.verifyIdToken({
    //   idToken: req.body.id_token,
    //   audience: process.env.CLIENT_ID,  
    // })
    // .then(ticket =>{
    //   const payload = ticket.getPayload();
    //   return User.findOne({
    //     where: {
    //       email: payload.email
    //     }
    //   })
    // })
    // .then(userData => {
    //   if (!userData) {
    //     return User.create({
    //       name: payload.name,
    //       email: payload.email,
    //       password: process.env.PWD
    //     })
    //   }
    //   else {
    //     return userData
    //   }
    // })
    // .then(user => {
    //   const token = jwt.sign({ id: user.id, email: user.email, username: user.username }, process.env.SECRET)
    //   const name = payload.name;
    //   const pic = payload.picture
    //   res.status(200).json({ token, name})
    // })
    // .catch(err =>{
    //   res.status(500).json(err)
    // })
    
  }
}

module.exports = userController