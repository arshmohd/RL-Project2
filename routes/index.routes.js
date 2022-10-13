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

function checkUser(req, res, next) {
  console.log(`checking if user is loggedIn ----> ${req.session.loggedInUser}`);
  if (req.session.loggedInUser) {
    next();
  } else {
    res.redirect("/signin");
  }
}


router.get("/home", (req, res, next) => {
  var payload = {
    pageTitle: "Home",
    loggedInUser: req.session.loggedInUser
  }
  res.status(200).render("home.pug", payload);
});

router.get("/notifications", (req, res, next) => {
  res.status(200).render("layouts/main-layout-1.pug");
});

router.get("/profile", checkUser, (req, res) => {
  console.log("For Profile is it checking here in this route profile----> ")
  res.render("auth/profile.hbs", { loggedInUser: req.session.loggedInUser });
});

module.exports = router;
