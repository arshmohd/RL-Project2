const router = require("express").Router();
const bcrypt = require("bcryptjs");
const UserModel = require("../models/User.model");
// const middleware = require("../middleware");
const bodyParse = require("body-parser");

// const isLoggedOut = require("../middleware/isLoggedOut");
// const isLoggedIn = require("../middleware/isLoggedIn");
// const User = require("../models/User.model");
// const app = require("../app");

// router.use(bodyParse.urlencoded({ extended: false }));

//Testing MongoDB Connection: 

router.get("/signup", (req, res) => {
  console.log("It hit sign-up");
  res.render("auth/signup.hbs");
});

//Basic sign-up test: 
// router.post("/signup", (req, res, next) => {
//   console.log("It hit sign-up submission:");
//   console.log(req.body);
// });

// router.post("/signup", (req, res, next) => {
//   // const { firstName, lastName, userName, gitHubUserName, email, password } =
//   //   req.body;
//     var firstName = req.body.firstName.trim();
//     var lastName = req.body.lastName.trim();
//     var username = req.body.userName.trim();
//     var email = req.body.email.trim();
//     var password = req.body.password;

//     let payload = req.body;

//    if(firstName && lastName && userName && email && password) {
//      UserModel.findOne({
//       $or: [
//         {firstName: firstName },
//         {lastName: lastName },
//         {email:email},
//         {username:username}
//       ]
//      })
//      .then((user) => {
//       console.log(user)
//      })
//      console.log('helllllllo!!')
//     }
//     else {
//         payload.errorMessage = "Make sure each field has a valid value.";
//         res.status(200).render("auth/signup.hbs", payload);
//     }
// })

//Form-post submission and also user creation in db with all validations: 

router.post("/signup", async (req, res, next) => {
  const { firstName, lastName, userName, gitHubUserName, email, password } =
    req.body;
    payload = req.body;

    const salt = bcrypt.genSaltSync(10);
    console.log(salt);
    const hash = bcrypt.hashSync(password, salt);

  if (firstName && lastName && userName && gitHubUserName && email) {
    let user = await UserModel.findOne({
      $or: [
        {userName: userName},
        {email: email},
        {gitHubUserName: gitHubUserName}
        
      ]
    })
    .catch((error) => {
      console.log(error);

      payload.errorMessage = "Something went wrong.";
      res.status(200).render("auth/signup.hbs", payload);
    });

    if(user == null){
      UserModel.create({
        firstName,
        lastName,
        userName,
        gitHubUserName,
        email,
        password: hash,
      })
        .then(() => {
          res.redirect("/");
        })
        .catch((err) => {
          next(err);
        });
    }
    // else {
    //   if(email == UserModel.email){
    //     payload.errorMessage = "Email already is use";
    //   }
    //   else{
    //     payload.errorMessage = "Username already is use";
    //   }
    //   res.status(200).render("auth/signup.hbs", payload);
    // }
  }


  if (!email) {
    return res.status(400).render("auth/signup.hbs", {
      errorMessage: "Please provide your correct email.",
    });
  }

  if (password.length < 8) {
    return res.status(400).render("auth/signup.hbs", {
      errorMessage: "Your password needs to be at least 8 characters long.",
    });
  }

  if (!userName || !email || !password) {
    res.render("auth/signup.hbs", {
      error: "Please enter all three information",
    });
    return;
  }

 

  //check email in right format
  let emailRegex =
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/;
  if (!emailRegex.test(email)) {
    res.render("auth/signup.hbs", {
      error: "Please enter a valid email address",
    });
    return;
  }

  // check if password is strong
  var passRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  if (!passRegex.test(password)) {
    res.render("auth/signup.hbs", {
      error: `Please enter a strong password with 8 characters that includes 
           -  at least 1 lowercase character
           -  at least 1 uppercase character
           -  at least 1 numeric character
           -  at least 1 special character
           `,
    });
    return;
  }
 
});

// router.get("/signin", (req, res) => {
//   //First check if there is an active session then send the user to Home-page
//   res.render("auth/signin.hbs");
//   // res.render("login.pug");
// });

router.post("/signin", (req, res, next) => {
  const { email, password } = req.body;
  console.log(password);

  UserModel.find({ email })
    .then((users) => {
      if (users.length) {
        let hashPass = users[0].password;
        if (bcrypt.compareSync(password, hashPass)) {
          req.session.loggedInUser = users[0];
          console.log(`User0---> ${users[0]}`)
          console.log("Session details:---->" + req.session.loggedInUser);
          // res.redirect("/profile");
          res.redirect("/home");
        } else {
          console.log("Incorrect Password!")
          res.render("auth/signin.hbs", { error: "Incorrect Password" });
          // res.render("login.pug", { error: "Incorrect Password" });
          return;
        }
      }       
      else {
        res.render("auth/signin.hbs", { error: "User not found" });
        // res.render("auth/login.pug", { error: "User not found" });
        return;
      }
    })
    .catch((err) => {
      next(err);
    });
});



function checkUser(req, res, next) {
  console.log(`checking if user is loggedIn ----> ${req.session.loggedInUser}`);
  if (req.session.loggedInUser) {
    next();
  } else {
    res.redirect("/signin");
  }
}

// console.log(req.session)

// router.get("/home", checkUser, (req, res) => {
//   res.render("auth/profile.hbs", { loggedInUser: req.session.loggedInUser });
// });

// router.get("/profile", checkUser, (req, res) => {
//   console.log("For Profile is it checking here in this route profile----> ")
//   res.render("index.hbs", { loggedInUser: req.session.loggedInUser });
// });

router.get("/signin", (req, res, next) => {
  //First check if there is an active session then send the user to Home-page
  if (req.session.loggedInUser) {
    res.redirect("/home");
  } else {
    res.render("auth/signin.hbs");
  }
  
  // res.render("login.pug");
});

router.get("/search", checkUser, (req, res) => {
  res.render("auth/search.hbs", { loggedInUser: req.session.loggedInUser });
});

router.get("/messages", checkUser, (req, res) => {
  res.render("layouts/main-layout-1.pug", {
    // loggedInUser: req.session.loggedInUser,
  });
});

router.get("/notifications", checkUser, (req, res) => {
  // console.log("In notification redirect: " + {loggedInUser: req.session.loggedInUser} )
  // let obj1 = {loggedInUser: req.session.loggedInUser}
  // let user = obj1.userName;
  res.render("layouts/main-layout-1.pug", user);
  // res.render("auth/profile.hbs", {loggedInUser: req.session.loggedInUser});
});






router.get("/logout", (req, res) => {
  console.log("Kicking the user out!");
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .render("auth/logout.hbs", { errorMessage: err.message });
    }

    res.redirect("/");
  });
});

module.exports = router;
