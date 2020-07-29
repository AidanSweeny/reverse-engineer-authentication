$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    // Updates the member name class item with the email from the get request
    $(".member-name").text(data.email);
  });
});
