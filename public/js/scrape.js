$(document).ready(() => {
  // Getting references to our form and inputs
  var scrape = $("button.scrape");
  // var usernameInput = $("input#username");
  // var passwordInput = $("input#password");

  // When the form is submitted, we validate there's an email and password entered
  scrape.on("scrap", event => {
    $.ajax({
      url: "/scrape",
      success: result => {
        console.log("Successfully Hit User Route");
      }

  });
})
});
