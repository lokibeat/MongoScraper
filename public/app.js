$(document).ready(function() {
    var $winwidth = $(window).width();
    $("img.main-img").attr({
        width: $winwidth
    });
    $(window).bind("resize", function() {
        var $winwidth = $(window).width();
        $("img.main-img").attr({
            width: $winwidth
        });
    });
  
    $(".scrape").click(function(event) {
        event.preventDefault();
        $.get("/api/fetch").then(function(data) {
            $(".articles").remove();
            $.get("/").then(function(){
                bootbox.alert("<h3 class='text-center m-top-80'>" + data.message + "<h3>", function(result) {
                  location.reload()
                });
            });
            //location.reload();
        });
    });
  
    $(".save-article").click(function() {
        var articleToSave = {};
        articleToSave.id = $(this).data("id");
        articleToSave.saved = true;
        $.ajax({
            method: "PATCH",
            url: "/api/articles",
            data: articleToSave
        }).then(function(data) {
            location.reload();
        });
    });
  
    $(".removeSaved").click(function() {
        var articleToremoveSaved = {};
        articleToremoveSaved.id = $(this).data("id");
        articleToremoveSaved.saved = false;
        $.ajax({
            method: "PATCH",
            url: "/api/articles",
            data: articleToremoveSaved
        }).then(function(data) {
            location.reload();
        });
    });
  
    $('.saved-buttons').on('click',  function () {
        // the NEWS article id
        var thisId = $(this).attr("data-value");
  
        //attach news article _id to the save button in the modal for use in save post
        $("#saveButton").attr({"data-value": thisId});
  
        //make an ajax call for the notes attached to this article
        $.get("/notes/" + thisId, function(data){
            console.log(data);
            //empty modal title, textarea and notes
            $('#noteModalLabel').empty();
            $('#notesBody').empty();
            $('#notestext').val('');
  
            //delete button for individual note
  
            //add id of the current NEWS article to modal label
            $('#noteModalLabel').append(' ' + thisId);
            //add notes to body of modal, will loop through if multiple notes
            for(var i = 0; i<data.note.length; i++) {
                var button = ' <a href=/deleteNote/' + data.note[i]._id + '><i class="pull-right fa fa-times fa-2x deletex" aria-hidden="true"></i></a>';
                $('#notesBody').append('<div class="panel panel-default"><div class="noteText panel-body">' + data.note[i].body + '  ' + button + '</div></div>');
            }
        });
    });
  
  // When you click the savenote button
    $(".savenote").click(function() {
    // Grab the id associated with the article from the submit button
      var thisId = $(this).attr("data-value");
  
  



// Grab the articles as a json
$.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
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
    })})  