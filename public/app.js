// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {

    var newCard = $('<div>');
    newCard.addClass('card horizontal');
    var divImg =$('<div>')
    divImg.addClass('card-image');
    var cardImg=$('<img>');
    cardImg.attr("src", data[i].img);
    var divCard =$('<div>')
    divCard.addClass('card-stacked');
    var divCont =$('<div>');
    divCont.addClass('card-content');
    var h6 =$('<h6 class="light-blue-text text-darken-2">'+data[i].title+'</h6>');
    var pCont=$('<p>'+data[i].des+'</p>');
    var divLink=$('<div>');
    divLink.addClass('card-action');
    var aLink =$('<a class="waves-effect waves-light btn-small blue-grey"> <i class="fas fa-save"></i> Save </a>');
    
    divCont.prepend(pCont);
    divCont.prepend(h6);
    divImg.prepend(cardImg);
    divLink.prepend(aLink);
    
    divCard.prepend(divLink);
    divCard.prepend(divCont);
     
    newCard.prepend(divCard);
    newCard.prepend(divImg);
   
    $('#articles').append(newCard);
    
  }
});


// Whenever someone clicks a p tag
$(document).on("click", "p", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

// When you click the savenote button
$(document).on("click", "#clearArticles", function() {
  $.ajax({
    method: "DELETE",
    url: "/clearArticles"
  })
     
      $("#articles").empty();
});


$(document).on("click", "#scrapeArticles", function() {
  $.ajax({
    method: "GET",
    url: "/scrape"
  })
  // With that done
  .then(function() {
    console.log("entro 2")
    location.replace("/");
  });  
  
});
