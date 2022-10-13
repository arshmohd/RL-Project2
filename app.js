// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");
const bodyParse = require("body-parser");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// https://www.npmjs.com/package/hbs
const hbs = require("hbs");
const pug = require("pug");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const capitalized = require("./utils/capitalized");
const projectName = "DWIDDER-App";

app.locals.appTitle = `${capitalized(projectName)} created with RootLauncher`;

const session = require("express-session");
const MongoStore = require("connect-mongo");
app.use(bodyParse.urlencoded({ extended: false }));

app.use(
  session({
    secret: "charmander",
    saveUninitialized: false, // don't create session until something stored
    resave: false, //don't save session if unmodified
    cookie: {
      maxAge: 1000 * 24 * 60 * 60,
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI || "mongodb://localhost/basic-auth",
      ttl: 24 * 60 * 60, // = 1 days.
    }),
  })
);

// 👇 Start handling routes here
const index = require("./routes/index.routes");
app.use("/", index);

const auth = require("./routes/auth.routes");
app.use("/auth", auth);

//API Routes

const postsApiRoutes = require("./routes/api/posts.routes");
app.use("/api/posts.routes", postsApiRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
