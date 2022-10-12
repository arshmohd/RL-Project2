const express = require('express');
const app = express();
const router = express.Router();
const bcrypt = require("bcryptjs");
const UserModel = require("../../models/User.model");
const PostModel = require("../../models/Post.model");

// const middleware = require("../middleware");
const bodyParse = require("body-parser");

app.use(bodyParse.urlencoded({extended: false}));
// const isLoggedOut = require("../middleware/isLoggedOut");
// const isLoggedIn = require("../middleware/isLoggedIn");


router.get("/", (req, res, next) => {

})

router.post("/", (req, res, next) => {
    const data = req.body;
    console.log(data);
    if(!req.body.content){
        console.log("Content param not sent with request")
        return res.sendStatus(400)
    }

    let postData = {
        content: req.body.content,
        postedBy: req.session.user
    }

    console.log(postData);

    PostModel.create(postData)
    .then((newPost) => {
        console.log("Hello posts did you make it here? ")
        res.status(201).send(newPost);
    })
    .catch((error) => {
        console.log("Hello posts did you make it here? or in error, where are you? ")
        console.log(error);

        res.sendStatus(400)
    })


    
})

module.exports = router;
