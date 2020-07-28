// This is middleware for restricting routes a user is not allowed to visit if not logged in
// This function that is being exported takes in three parameters, request, response, and a next call back function
module.exports = function(req, res, next) {
  // If the user is logged in, continue with the request to the restricted route
  // The call back function gets called if the request contains a user field that is populated with data
  if (req.user) {
    return next();
  }

  // If the user isn't logged in, redirect them to the login page
  // If the request.user field is not populated with any data, then it will redirect back to the main page
  return res.redirect("/");
};
