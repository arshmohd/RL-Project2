module.exports = (req, res, next) => {
  // checks if the user is logged in when trying to access a specific page
  if (!req.session.user) {
    return res.redirect("/signin");
    // return res.render("/logout");
  }
  req.user = req.session.user;
  next();
};
