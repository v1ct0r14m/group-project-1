

var movieSelectionContainer = $("#movie-selection")
var inputBox = $("#input-box")

var displaySearch = function (event) {
    event.preventDefault();
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
    posterImage.className = "form-movie-poster"
    posterImage.setAttribute("src", moviePoster)
    
    titleParagraph.innerText = movieTitle
    titleParagraph.className = "form-movie-title"
    yearParagraph.innerText = movieYear
    yearParagraph.className = "form-movie-year"

    $(movieBox).append(titleParagraph)
    $(movieBox).append(yearParagraph)
    $(movieBox).append(posterImage)
    $(movieSelectionContainer).append(movieBox)
}


$("#search-button").on("click", displaySearch )

$(movieSelectionContainer).on("click", ".display-movie-box", function(event) {
    console.dir(this)

    var title = document.createElement("p")
    var year = document.createElement("p")
    var poster = document.createElement("img")

    title.innerText = this.children[0].innerText
    year.innerText = this.children[1].innerText
    poster.setAttribute("src", this.children[2].currentSrc)
     console.log(title)
     console.log(year)

     var moviePoster = document.querySelector("#poster")
     var movieTitle = document.querySelector("#movie-title")
     var movieYear = document.querySelector("#movie-year")

    $(moviePoster).empty().append(poster)
    $(movieTitle).empty().append(title)
    $(movieYear).empty().append(year)
} )