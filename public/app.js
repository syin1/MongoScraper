// Grab the articles as a json
function renderNews(type, title, header) {
  $.getJSON('/' + type, function(data) {
    $('.newstitle').html(title);
    $('.newsheader').html(header);

    if (data.length === 0) {
      $('#articles').empty();
      $('#articles').append('<p id="noarticle">...Oops, no articles yet!</p>');
    } else {
      $('#articles').empty();

      for (var i = 0; i < data.length; i++) {
        let color;
        let buttonsToAdd;

        if (data[i].newsType === 'Featured News') {
          color = 'bg-danger';
        } else if (data[i].newsType === 'Top News') {
          color = 'bg-warning';
        } else if (data[i].newsType === 'Main News') {
          color = 'bg-info';
        }

        if (type === 'articles') {
          buttonsToAdd =
            "<button type='button' class='btn btn-success' data-id='" +
            data[i]._id +
            "'>Save Article</button>";
        } else if (type === 'saved') {
          buttonsToAdd =
            "<button type='button' class='btn btn-info' data-id='" +
            data[i]._id +
            "'>Add Notes</button>" +
            "<button type='button' class='btn btn-danger' data-id='" +
            data[i]._id +
            "'>Delete Article</button>";
        }

        // Display the apropos information on the page
        $('#articles').append(
          "<div class='card'>" +
            "<h5 class='card-header " +
            color +
            "'>" +
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
            buttonsToAdd +
            '</div>' +
            '</div>'
        );
      }
    }
  });
}

renderNews('articles', 'CBC News Scraper', 'All the top stories!');

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
        "<button class='btn btn-primary btn-sm btn-block' data-id='" +
          data._id +
          "' id='savenote'>Save Note</button>"
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
      renderNews('articles', 'CBC News Scraper', 'All the top stories!');
    });
});

$(document).on('click', '#savedArticle', function() {
  $.ajax({
    method: 'GET',
    url: '/saved'
  })
    // With that done, add the note information to the page
    .then(function(data) {
      renderNews('saved', 'Saved Articles', 'All your stories!');
    });
});

// Whenever someone clicks the 'Save Article' button
$(document).on('click', '.btn-success', function() {
  // Save the id from the p tag
  var thisId = $(this).attr('data-id');

  // Now make an ajax call for the Article
  $.ajax({
    method: 'POST',
    url: '/saved/' + thisId
  }).then(function(data) {
    alert('Saved article!');
  });
});
