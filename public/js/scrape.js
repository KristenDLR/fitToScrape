
$(document).ready(() => {
  // Getting references to our form and inputs
// Require all models

  // When the scrape button clicked, run /scrape
  $(".scrape").on("click", event => {
    $.ajax({
      url: "/scrape",
      success: result => {
        console.log("Successfully Hit Scrape");
        console.log(results);
      }

  });
})

 // When the scrape button clicked, run /scrape
 $(".clear").on("click", event => {
  $.ajax({
    url: "/articles",
    success: result => {
      console.log("Scrape Cleared")
      $("#articles").empty();
    }
  });

    })

});
