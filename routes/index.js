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
router.get('/createpost', async function(req,res,next){
  let post = await PostModel.create({
    PostText: "Hello every ",
    user:'66b3bed6807ca387a16db64d'
  });
  let user = await UserModel.findOne({_id:'66b3bed6807ca387a16db64d'});
  user.posts.push(post._id);
  await user.save();
  res.send("Done");
});
module.exports = router;
