var jwt =require('jwt-simple');
var moment =require('moment');

module.exports =function checkAuthenticated(req,res,next){
  if (!req.header('Authorization')){

    res.status(401).send({message:"make sure your authorization is valid"});
  }
var token=req.header('Authorization').split(' ')[1];
var payload=jwt.decode(token,'secret');
if(payload.exp<=moment().unix()){
  res.status(401).send({message:'date expired'});
}
req.user=payload.sub;

next();
}
