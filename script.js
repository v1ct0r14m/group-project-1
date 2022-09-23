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
                var imdbId = (data.Search[i].imdbId)
                movieDropDown(movieTitle, movieYear, moviePoster)
            }

        })
    })
}

var movieDropDown = function(movieTitle, movieYear, moviePoster) {
    
    var movieBox = document.createElement("li")
    movieBox.className = "display-movie-box"
    var titleParagraph = document.createElement("p")
    var yearParagraph = document.createElement("p")
    var posterImage = document.createElement("img")
    posterImage.setAttribute("src", moviePoster)
    posterImage.className = "form-movie-poster"

    titleParagraph.innerText = movieTitle
    titleParagraph.className = "form-movie-title"
    yearParagraph.innerText = movieYear
    yearParagraph.className = "form-movie-year"

    $(movieBox).append(titleParagraph)
    $(movieBox).append(yearParagraph)
    $(movieBox).append(posterImage)
    $(movieSelectionContainer).append(movieBox)
    console.log(posterImage)
}

var displayMovieInfo = function() {



}

$(inputBox).on("keyup", displaySearch)

$(movieSelectionContainer).on("click", ".display-movie-box", function() {
    console.dir(this)
} )