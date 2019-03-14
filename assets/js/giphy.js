$(document).ready(function() {
  var giphyCategories = [
    "Actions",
    "Adjectives",
    "Animals",
    "Anime",
    "Cartoons",
    "Emotions",
    "Food",
    "Drink",
    "Gaming",
    "Holidays",
    "Interests",
    "Memes",
    "Movies",
    "Music",
    "Nature",
    "Politics",
    "Reactions",
    "Science",
    "Sports",
    "Stickers"
  ];

  var counter = 0;

  var addButton = (sectionId, category) => {
    var buttonElem = $("<button>");

    buttonElem.addClass("btn btn-info m-2 btn-category");
    buttonElem.attr("type", "button");
    buttonElem.attr("data-category", category);
    buttonElem.text(category);

    $(sectionId).append(buttonElem);
  };

  var displayGiphy = giphyObject => {
    for (i = 0; i < 10; i++) {
      var cardDiv = $("<div>");
      $(cardDiv).addClass("card m-1 border border-info");
      $(cardDiv).attr("style", "width: 18rem; height: 18rem;");
      $(cardDiv).attr("data-index", i);

      var cardImg = $("<img>");
      $(cardImg).addClass("card-img-top");
      $(cardImg).attr("src", giphyObject.data[i].images.fixed_width_small_still.url);
      // $(cardImg).attr("height", giphyObject.data[counter].images.fixed_width_small.height);
      // $(cardImg).attr("width", giphyObject.data[counter].images.fixed_width_small.width);

      var cardBodyDiv = $("<div>");
      $(cardBodyDiv).addClass("card-body");

      // var pElem = $("<p>");
      // $(pElem).addClass("card-text");
      // $(pElem).text("Rating: " + giphyObject.data[counter].rating.toUpperCase());

      $(cardDiv).append(cardImg);
      $(cardDiv).append(cardBodyDiv);
      // $(cardBodyDiv).append(pElem);

      $("#giphy-section").append(cardDiv);
    }
  };

  var getGiphy = queryURL => {
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(giphyResponse) {
        console.log(giphyResponse);
        displayGiphy(giphyResponse);
      })
      .catch(function(errResponse) {
        console.log(errResponse);
      });
  };

  $("#add-category").on("click", function(event) {
    event.preventDefault();
    if ($("#new-category").val() !== "") {
      addButton("#btn-section", $("#new-category").val());
      $("#new-category").val("");
    }
  });

  $(document).on("click", ".btn-category", function(event) {
    event.preventDefault();
    var giphySearchText = $(this).attr("data-category");
    var queryURL =
      "https://api.giphy.com/v1/stickers/search?api_key=CkOnYrZDVfDnhIjoycKbUC3AgNRmvJfU&q=" + giphySearchText;
    getGiphy(queryURL);
  });

  $("#clear-giphy").on("click", function() {
    $("#giphy-section").empty();
  });

  giphyCategories.forEach(category => {
    addButton("#btn-section", category);
  });
});
