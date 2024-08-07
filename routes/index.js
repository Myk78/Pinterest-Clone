var express = require('express');
var router = express.Router();
const UserModel = require('./users');
const PostModel = require('./post');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/createuser', async function(req,res,next){
  let user = await UserModel.create({
    username: "Myk",
    email: "nwbyas@gmail.com",
    password: "yaseen123",
    fullname: "Mohammad Yaseen",
    posts: [],
    timestamps: true 
  });
  res.send(user);
});
module.exports = router;
