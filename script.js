var movieSelectionContainer = $("#movie-selection")
var inputBox = $("#input-box")
console.log(inputBox)

var displaySearch = function () {
    var movie = $(inputBox).val().trim()
    console.log(movie)

    var apiUrl = "http://www.omdbapi.com?s=" + movie + "&t=movie&plot=short&apikey=6f89013e"

    fetch(apiUrl).then(function (response) {
        response.json().then(function (data) {
            movieSelectionContainer.empty()
            for (var i = 0; i < data.Search.length; i++) {
                console.log(data)
                var movieTitle = (data.Search[i].Title)
                var movieYear = (data.Search[i].Year)
                var moviePoster = (data.Search[i].Poster)
                movieDropDown(movieTitle, movieYear, moviePoster)
            }

        })
    })
}

var movieDropDown = function(movieTitle, movieYear, moviePoster) {
    
    var movieBox = document.createElement("li")
    var posterImage = document.createElement("img")
    posterImage.setAttribute("src", moviePoster)

    $(movieBox).append(movieTitle)
    $(movieBox).append(movieYear)
    $(movieBox).append(posterImage)
    $(movieSelectionContainer).append(movieBox)
    console.log(posterImage)
}

$(inputBox).on("keyup", displaySearch)