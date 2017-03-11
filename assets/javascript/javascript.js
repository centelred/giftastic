var topics = ["racing", "drifing", "ryan tuerck", "mad mike", "monster truck", "gta V", "v for vendetta", "the matrix", "john wick", "funny", "stupid humor", "derp", "derpity-derp", "slurp", "7-eleven", "tom hanks", "smash bros melee"];
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
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10";
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