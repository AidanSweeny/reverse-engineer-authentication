$(document).ready(function() {
  // Getting references to our form and inputs from the page
  var loginForm = $("form.login");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  // When the form is submitted, we validate there's an email and password entered
  // When enter or the button is clicked the following will run
  loginForm.on("submit", function(event) {
    event.preventDefault();
    // This creates the objext that will then be used for the api post request 
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    // If either of these fields are blank, then it will not log the user in
    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    // If the email and password are present, then it passes them as arguments to the loginUser function, and resets the email and password fields
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    //API post that sends the email and password 
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(function() {
        //Next the url gets replaced with the /memebers url, so the users are sent to this page
        window.location.replace("/members");
        // If there's an error, log the error
      })
      .catch(function(err) {
        console.log(err);
      });
  }
});
