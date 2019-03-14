$(document).ready(function() {
  //An array of default giphy categories
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
    "Science",
    "Sports",
    "Stickers",
    "DC Comics",
    "Marvel Comics",
    "Cool"
  ];

  var giphySearchText;
  var counter = 0;
  var localGiphyCollection = [];

  // Function to add button
  var addButton = (sectionId, category) => {
    var buttonElem = $("<button>");

    buttonElem.addClass("btn btn-info m-2 btn-category");
    buttonElem.attr("type", "button");
    buttonElem.attr("data-category", category);
    buttonElem.text(category);

    $(sectionId).append(buttonElem);
  };

  // Function to display Giphy images
  var displayGiphy = giphyObject => {
    if ($("#overwrite-giphy").is(":checked")) {
      clearAllGiphy();
    }

    // The Giphy API reponse object has 25 images, limit it to 10
    for (i = 0; i < 10; i++) {
      var cardDiv = $("<div>");
      var cardHeader = $("<div>");
      var cardImg = $("<img>");
      var cardBodyDiv = $("<div>");

      //Local giphy object to add to the local giphy collection, which will be used in case of no overwrite
      var localGiphyObject = {};

      //The object holds the static & gif images and also the overall index
      localGiphyObject.category = giphySearchText;
      localGiphyObject.still_img_url = giphyObject.data[i].images.fixed_width_small_still.url;
      localGiphyObject.gif_img_url = giphyObject.data[i].images.fixed_width_small.url;
      localGiphyObject.index = counter;

      //Push the object to the collection
      localGiphyCollection.push(localGiphyObject);

      //Create a card element to display the images
      $(cardDiv).addClass("card m-1 border border-info");
      $(cardDiv).attr("style", "width: 18rem; height: 18rem;");
      $(cardDiv).attr("data-index", counter);
      $(cardDiv).attr("data-still", "true");

      $(cardHeader).addClass("card-header");
      $(cardHeader).text("Rating: " + giphyObject.data[i].rating.toUpperCase());

      $(cardImg).addClass("card-img-top");
      $(cardImg).attr("src", giphyObject.data[i].images.fixed_width_small_still.url);

      $(cardBodyDiv).addClass("card-body");

      $(cardDiv).append(cardHeader);
      $(cardDiv).append(cardImg);
      $(cardDiv).append(cardBodyDiv);

      $("#giphy-section").append(cardDiv);
      counter++;
    }

    // console.log(localGiphyCollection);
  };

  //Function to make the Giphy API call
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

  //Function to add new buttons using the form
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

  //Callback function for button click, which in turn calls the getGiphy function
  $(document).on("click", ".btn-category", function(event) {
    event.preventDefault();
    giphySearchText = $(this).attr("data-category");
    var queryURL =
      "https://api.giphy.com/v1/stickers/search?api_key=CkOnYrZDVfDnhIjoycKbUC3AgNRmvJfU&q=" + giphySearchText;
    getGiphy(queryURL);
  });

  //Clear all giphy and reset the counter and collection
  var clearAllGiphy = () => {
    localGiphyCollection = [];
    counter = 0;
    $("#giphy-section").empty();
  };

  //Callback function for Clear All button click
  $("#clear-giphy").on("click", function() {
    clearAllGiphy();
  });

  //Callback function for card on click
  $(document).on("click", ".card", function() {
    var index = $(this).attr("data-index");

    //If the image is static, play it
    if ($(this).attr("data-still") === "true") {
      $(this)
        .children("img")
        .attr("src", localGiphyCollection[index].gif_img_url);
      $(this).attr("data-still", "false");
    } else {
      //If the image is playing, stop it
      $(this)
        .children("img")
        .attr("src", localGiphyCollection[index].still_img_url);
      $(this).attr("data-still", "true");
    }
  });

  //On page load, the default buttons are added to the page
  giphyCategories.forEach(category => {
    addButton("#btn-section", category);
  });
});
