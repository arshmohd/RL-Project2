const router = require("express").Router();

const middleware = require('../middleware')





/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index.hbs");
});


// test-body-parser: 

// router.post("/signup", (req, res, next) => {
//   res.status(200).render("auth/signup.hbs");
// });


// router.get("/", middleware.requireLogin, (req, res, next) => {
//   var payload = {
//     pageTitle: "Home",
//     userLoggedIn: req.session.user
//   }
//   res.status(200).render("home.pug", payload);
// });


router.get("/home", (req, res, next) => {
  var payload = {
    pageTitle: "Home",
    loggedInUser: req.session.loggedInUser
  }
  res.status(200).render("home.pug", payload);
});


module.exports = router;
