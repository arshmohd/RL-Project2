module.exports = (req, res, next) => {
  // if an already logged in user tries to access the login page it
  // redirects the user to the home page
  console.log(req.session.user)
  if (req.session.user) {
    return res.redirect('/profile.hbs');
  }
  next();
};
