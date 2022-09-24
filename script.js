var movieSelectionContainer = $("#movie-selection")
var inputBox = $("#input-box")
console.log(inputBox)

var displaySearch = function () {
    var movie = $(inputBox).val().trim()
    console.log(movie)

    var apiUrl = "http://www.omdbapi.com?s=" + movie + "&t=movie&plot=&apikey=6f89013e"

    fetch(apiUrl).then(function (response) {
        response.json().then(function (data) {
            movieSelectionContainer.empty()
            for (var i = 0; i < data.Search.length; i++) {
                console.log(data)
                var movieTitle = (data.Search[i].Title)
                var movieYear = (data.Search[i].Year)
                var moviePoster = (data.Search[i].Poster)
                var imdbId = (data.Search[i].imdbId)

                var plotUrl = "http://www.omdbapi.com?i=" + imdbId + "&t=" + movieTitle + "&plot=full&apikey=6f89013e"

                fetch(plotUrl).then(function (response) {
                    response.json().then(function (data) {
                        console.log(data)
                        var movieGenre = data.Genre
                        var moviePlot = data.Plot
                        movieDropDown(movieTitle, movieYear, moviePoster, movieGenre, moviePlot)
                    })
                })
                
            }

        })
    })
}

var movieDropDown = function (movieTitle, movieYear, moviePoster, movieGenre, moviePlot) {

    var movieBox = document.createElement("li")
    movieBox.className = "display-movie-box"

    var posterImage = document.createElement("img")
    posterImage.className = "form-movie-poster"
    posterImage.setAttribute("src", moviePoster)

    var titleParagraph = document.createElement("p")
    var yearParagraph = document.createElement("p")
    var genreParagraph = document.createElement("p")
    var plotParagraph = document.createElement("p")


    titleParagraph.innerText = movieTitle
    titleParagraph.className = "form-movie-title"
    yearParagraph.innerText = movieYear
    yearParagraph.className = "form-movie-year"
    genreParagraph.innerText = movieGenre
    genreParagraph.className = "form-movie-genre"
    plotParagraph.innerText = moviePlot
    plotParagraph.className = "form-movie-plot"


    $(movieBox).append(posterImage)
    $(movieBox).append(titleParagraph)
    $(movieBox).append(yearParagraph)
    $(movieBox).append(genreParagraph)
    $(movieBox).append(plotParagraph)
    $(movieSelectionContainer).append(movieBox)
}


$(inputBox).on("keyup", displaySearch)

$(movieSelectionContainer).on("click", ".display-movie-box", function (event) {
    console.dir(this)

    var poster = document.createElement("img")
    var title = document.createElement("p")
    var year = document.createElement("p")
    var genre = document.createElement("p")
    var plot = document.createElement("p")

    poster.setAttribute("src", this.children[2].currentSrc)
    title.innerText = this.children[0].innerText
    year.innerText = this.children[1].innerText

    console.log(title)
    console.log(year)

    var moviePoster = document.querySelector("#poster")
    var movieTitle = document.querySelector("#movie-title")
    var movieYear = document.querySelector("#movie-year")
    var movieGenre = document.querySelector("#genre")
    var moviePlot = document.querySelector("#plot")

    $(moviePoster).empty().append(poster)
    $(movieTitle).empty().append(title)
    $(movieYear).empty().append(year)
})