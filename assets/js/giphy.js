$(document).ready(function() {
  var giphyCategories = [
    "Puppies",
    "Cats",
    "Anime",
    "Avengers",
    "Cartoons",
    "Food",
    "Game",
    "Holidays",
    "Movies",
    "Music",
    "Nature",
    "Politics",
    "Science",
    "Sports",
    "Stickers",
    "Batman",
    "Ironman",
    "Cool"
  ];

  var giphySearchText;
  var localGiphyCollection = [];
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
    if ($("#overwrite-giphy").is(":checked")) {
      clearAllGiphy();
    }

    for (i = 0; i < 10; i++) {
      var cardDiv = $("<div>");
      var cardHeader = $("<div>");
      var cardImg = $("<img>");
      var cardBodyDiv = $("<div>");

      var localGiphyObject = {};

      localGiphyObject.category = giphySearchText;
      localGiphyObject.still_img_url = giphyObject.data[i].images.fixed_width_small_still.url;
      localGiphyObject.gif_img_url = giphyObject.data[i].images.fixed_width_small.url;
      localGiphyObject.index = counter;

      localGiphyCollection.push(localGiphyObject);

      $(cardDiv).addClass("card m-1 border border-info");
      $(cardDiv).attr("style", "width: 18rem; height: 18rem;");
      $(cardDiv).attr("data-index", counter);
      $(cardDiv).attr("data-still", "true");

      $(cardHeader).addClass("card-header");
      $(cardHeader).text("Rating: " + giphyObject.data[i].rating.toUpperCase());

      $(cardImg).addClass("card-img-top");
      $(cardImg).attr("src", giphyObject.data[i].images.fixed_width_small_still.url);

      $(cardBodyDiv).addClass("card-body");

      // var pElem = $("<p>");
      // $(pElem).addClass("card-text");
      // $(pElem).text("Rating: " + giphyObject.data[counter].rating.toUpperCase());
      $(cardDiv).append(cardHeader);
      $(cardDiv).append(cardImg);
      $(cardDiv).append(cardBodyDiv);
      // $(cardBodyDiv).append(pElem);
      $("#giphy-section").append(cardDiv);
      counter++;
    }

    console.log(localGiphyCollection);
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
    var newCategory = $("#new-category")
      .val()
      .trim();

    if (newCategory !== "" && !giphyCategories.includes(newCategory)) {
      addButton("#btn-section", newCategory);
      $("#new-category").val("");
      giphyCategories.push(newCategory);
    }
  });

  $(document).on("click", ".btn-category", function(event) {
    event.preventDefault();
    giphySearchText = $(this).attr("data-category");
    var queryURL =
      "https://api.giphy.com/v1/stickers/search?api_key=CkOnYrZDVfDnhIjoycKbUC3AgNRmvJfU&q=" + giphySearchText;
    getGiphy(queryURL);
  });

  var clearAllGiphy = () => {
    localGiphyCollection = [];
    counter = 0;
    $("#giphy-section").empty();
  };

  $("#clear-giphy").on("click", function() {
    clearAllGiphy();
  });

  giphyCategories.forEach(category => {
    addButton("#btn-section", category);
  });

  $(document).on("click", ".card", function() {
    if ($(this).attr(data - still) === "true") {
    }
  });
});
