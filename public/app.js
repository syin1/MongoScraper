// Grab the articles as a json
function renderNews() {
  $.getJSON('/articles', function(data) {
    if (data.length === 0) {
      $('#articles').empty();
      $('#articles').append('<p id="noarticle">...Oops, no articles yet!</p>');
    } else {
      $('#articles').empty();

      for (var i = 0; i < data.length; i++) {
        // Display the apropos information on the page
        $('#articles').append(
          "<div class='card'>" +
            "<h5 class='card-header'>" +
            data[i].newsType +
            '</h5>' +
            "<div class='card-body'>" +
            "<h5 class='card-title'>" +
            data[i].title +
            '</h5>' +
            "<p class='card-text'>" +
            data[i].summary +
            '' +
            '</p>' +
            "<a href='" +
            data[i].link +
            "' target='_blank' class='btn btn-primary'>Go to news link</a>" +
            "<button type='button' class='btn btn-success'>Save Article</button>" +
            "<button type='button' class='btn btn-info' data-id='" +
            data[i]._id +
            "'>Add Notes</button>" +
            '</div>' +
            '</div>'
        );
      }
    }
  });
}

renderNews();

// Whenever someone clicks the add notes button
$(document).on('click', '.btn-info', function() {
  // Empty the notes from the note section
  $('#notes').empty();
  // Save the id from the p tag
  var thisId = $(this).attr('data-id');

  // Now make an ajax call for the Article
  $.ajax({
    method: 'GET',
    url: '/articles/' + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      // The title of the article
      $('#notes').append('<h2 id="notesTitle">' + data.title + '</h2>');
      // An input to enter a new title
      $('#notes').append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $('#notes').append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $('#notes').append(
        "<button data-id='" + data._id + "' id='savenote'>Save Note</button>"
      );

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $('#titleinput').val(data.note.title);
        // Place the body of the note in the body textarea
        $('#bodyinput').val(data.note.body);
      }
    });
});

// When you click the savenote button
$(document).on('click', '#savenote', function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr('data-id');

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: 'POST',
    url: '/articles/' + thisId,
    data: {
      // Value taken from title input
      title: $('#titleinput').val(),
      // Value taken from note textarea
      body: $('#bodyinput').val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $('#notes').empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $('#titleinput').val('');
  $('#bodyinput').val('');
});

// Whenever someone clicks the 'Scrape New Articles' button
$(document).on('click', '#scrapeArticles', function() {
  // Now make an ajax call to scrape the articles
  $.ajax({
    method: 'GET',
    url: '/scrape'
  })
    // With that done, add the note information to the page
    .then(function(data) {
      alert('Scrape Success!');
      renderNews();
    });
});
