$(document).ready(() => {
  // Getting references to our form and inputs



  // When the scrape button clicked, run /scrape
  $(".scrape").on("click", event => {
    $.ajax({
      url: "/scrape",
      success: result => {
        console.log("Successfully Hit Scrape");
        console.log(result);
      }
    
  });
})

 // When the scrape button clicked, run /scrape
 $(".clear").on("click", event => {

      console.log("Scrape Cleared");
    })

});
