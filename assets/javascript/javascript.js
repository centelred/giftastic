var topics = ["tom green", "triumph the insult comic dog", "stone cold steve austin", "the rock", "hardy boyz", "jimmy kimmel", "the dude", "big lebowski", "trex", "jackie chan", "bruce lee", "van damme", "mortal kombat", "tom cruise", "the matrix", "keanu reeves", "mazda rx7", "fc3s", "nissan skyline", "mx5 drift"];
//part 1
//dynamically creating buttons
function renderButtons() {
    $("#buttons").empty();
    for (var i = 0; i < topics.length; i++) {
        var a = $("<a>");
        a.addClass("round button tiny alert");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#buttons").append(a);
    }
}
$("#add-topic").on("click", function (event) {
    event.preventDefault();
    var search = $(".dream-search").val().trim();
    topics.push(search);
    console.log(search);
    renderButtons();
});
renderButtons();
//part 2
//dynamically create 10 gifs when topic button is pressed.
$(document).on("click", ".round", function () {
    var topic = $(this).attr("data-name");
   // var api = "https://api.giphy.com/v1/gifs/search/";
    //var apiKey = "&api_key=dc5zaTOxFJmzC&limit=10";
    //var query = "&q=" + topic
     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
        url: queryURL
        , method: "GET"
    }).done(function (response) {
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                var gifDiv = $("<div class='item'>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var gifImage = $("<img class='gif'>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url);
                gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
                gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
                gifImage.attr("data-state", "still");
                gifDiv.append(gifImage);
                gifDiv.append(p);
                $("#results").prepend(gifDiv);
            }
        }
    });
});
//part 3
//changing .gif state
$(document).on("click", ".gif", function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});