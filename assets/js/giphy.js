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

  var addButton = (sectionId, category) => {
    var buttonElem = $("<button>");

    buttonElem.addClass("btn btn-info m-2 btn-category");
    buttonElem.attr("type", "button");
    buttonElem.attr("data-category", category);
    buttonElem.text(category);

    $(sectionId).append(buttonElem);
  };

  var getGiphy = queryURL => {
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(giphyResponse) {
        console.log(giphyResponse);
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

  giphyCategories.forEach(category => {
    addButton("#btn-section", category);
  });
});
