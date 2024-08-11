var express = require('express');
var router = express.Router();
const UserModel = require('./users');
const PostModel = require('./post');
const passport = require('passport');
const upload = require('./multer');

//these to line is used to login the user
const localStrategy = require('passport-local');
passport.use(new localStrategy(UserModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// profile route
router.get('/profile',isLoggedIn, async function(req,res){
  const user = await UserModel.findOne({
    username:req.session.passport.user
  }).populate('posts')
  console.log(user);
  // console.log(user);
  res.render('profile',{user});
});

// upload image 
router.post('/upload', isLoggedIn, upload.single('file'), async function(req,res){
  if (!req.file) {
    return res.status(404).send("No file Found");
  }
  // res.send("File Upload Successfully");
  // jo file upload ki h usko save karwao post may or post ki id user ko du or user ki id post ko
  const user = await UserModel.findOne({username:req.session.passport.user});
  const postdata = await PostModel.create({
    Posttext:req.body.PostText,
    Postimage: req.file.filename,
    user:user._id
  });
  user.posts.push(postdata._id);
  await user.save();
  res.send('done');
});


// register user route
router.post('/register',function(req,res){
  // let userdata = new UserModel({
  //   username: req.body.username,
  //   email: req.body.email,
  //   fullname: req.body.fullname 
  // });

  // same as commented code above but it's more precise
  let { username, email, fullname } = req.body;
  let userdata = new UserModel({ username, email, fullname });
  UserModel.register(userdata,req.body.password).then(function(){
    passport.authenticate("local")(req,res,function(){
      res.redirect('/profile');
    });
  });
});
//login route
router.get('/login',function(req,res){
  // console.log(req.flash());

  res.render('login',{error: req.flash('error')});
});


// login user
router.post('/login',passport.authenticate("local",{
  successRedirect:"/profile",
  failureRedirect:"/login",
  failureFlash: true
}),function(req,res){

});

// logout user 
router.get('/logout',function(req,res,next){
  req.logOut(function(err){
    if(err) return next(err);
    res.redirect("/login");
  });
});

// Middleware route
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/");
};

// feed route
router.get('/feed',function(req,res){
  res.render('feed');
})














// // Route to create user
// router.get('/createuser', async function(req,res,next){
//   let user = await UserModel.create({
//     username: "Myk",
//     email: "nwbyas@gmail.com",
//     password: "yaseen123",
//     fullname: "Mohammad Yaseen",
//     posts: [],
//     timestamps: true 
//   });
//   res.send(user);
// });

// // Route to show a userpost
// router.get('/userpost',async function(req,res){
//   let user = await UserModel.findOne({_id: "66b3bed6807ca387a16db64d"}).populate('posts');
//   res.send(user);
// })


// // Route to create post
// router.get('/createpost', async function(req,res,next){
//   let post = await PostModel.create({
//     PostText: "Hello every ",
//     user:'66b3bed6807ca387a16db64d'
//   });
//   let user = await UserModel.findOne({_id:'66b3bed6807ca387a16db64d'});
//   user.posts.push(post._id);
//   await user.save();
//   res.send("Done");
// });
module.exports = router;
