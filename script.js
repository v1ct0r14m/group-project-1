var movieSelectionContainer = $("#movie-selection")
var inputBox = $("#input-box")
console.log(inputBox)

//searches for the movie whenever you tyoe
var searchMovie = function () {
    //input goes into "movie" variable
    var movie = $(inputBox).val().trim()
    console.log(movie)

    //api url uses the movie as the query parameter to call whatever movie the user types
    var apiUrl = "http://www.omdbapi.com?s=" + movie + "&t=movie&plot=&apikey=6f89013e"

    fetch(apiUrl).then(function (response) {
        response.json().then(function (data) {
            movieSelectionContainer.empty()
            //for the lenght movie search results it will asign the values
            for (var i = 0; i < data.Search.length; i++) {
                console.log(data)
                var movieTitle = (data.Search[i].Title)
                var movieYear = (data.Search[i].Year)
                var moviePoster = (data.Search[i].Poster)
                var imdbId = (data.Search[i].imdbId)
                //calls the plot function and stores the asigned values to be used later
                callPlot(imdbId, movieTitle, movieYear, moviePoster)
            }

        })
    })
}

var callPlot = function (imdbId, movieTitle, movieYear, moviePoster) {

    //uses the movie id and movie title as a parameter to call the plot
    var plotUrl = "http://www.omdbapi.com?i=" + imdbId + "&t=" + movieTitle + "&plot=full&apikey=6f89013e"

    fetch(plotUrl).then(function (response) {
        response.json().then(function (data) {
            //stored the genre and plot
            var movieGenre = data.Genre
            var moviePlot = data.Plot
            //calls function to display everything using all the variables as parameters
            movieDropDown(movieTitle, movieYear, moviePoster, movieGenre, moviePlot)
        })
    })
}

var movieDropDown = function (movieTitle, movieYear, moviePoster, movieGenre, moviePlot) {
    //creates box to store all the elemnts
    var movieBox = document.createElement("li")
    movieBox.className = "display-movie-box"

    //creates the elements where the values will be stored
    var posterImage = document.createElement("img")
    posterImage.setAttribute("src", moviePoster)
    var titleParagraph = document.createElement("p")
    var yearParagraph = document.createElement("p")
    var genreParagraph = document.createElement("p")
    var plotParagraph = document.createElement("p")

    //sets the values of the elements
    posterImage.classList = "form-movie-poster hide"
    titleParagraph.innerText = movieTitle
    titleParagraph.classList = "form-movie-title hide"
    yearParagraph.innerText = movieYear
    yearParagraph.classList = "form-movie-year hide"
    genreParagraph.innerText = movieGenre
    genreParagraph.classList = "form-movie-genre hide"
    plotParagraph.innerText = moviePlot
    plotParagraph.classList = "form-movie-plot hide"

    //appends all the elements to the box that stores the elemtns aka to the li
    $(movieBox).append(posterImage)
    $(movieBox).append(titleParagraph)
    $(movieBox).append(yearParagraph)
    $(movieBox).append(genreParagraph)
    $(movieBox).append(plotParagraph)
    //appends the li to ul in html
    $(movieSelectionContainer).append(movieBox)
}

//whenever you type it will call the search movie function
$(inputBox).on("keyup", searchMovie)

//when you click on the list of movies it will display that movie and all of its information
$(movieSelectionContainer).on("click", ".display-movie-box", function (event) {
    console.dir(this)

    //calls the containers for each element from the html
    var moviePoster = document.querySelector("#poster")
    var movieTitle = document.querySelector("#movie-title")
    var movieYear = document.querySelector("#movie-year")
    var movieGenre = document.querySelector("#genre")
    var moviePlot = document.querySelector("#plot")

    //creates the element where the values will be stored
    var poster = document.createElement("img")
    var title = document.createElement("h2")
    var year = document.createElement("p")
    var genre = document.createElement("p")
    var plot = document.createElement("p")

    //sets the values of the elements
    poster.setAttribute("src", this.children[0].currentSrc)
    title.innerText = this.children[1].innerText
    year.innerText = this.children[2].innerText
    genre.innerText = this.children[3].innerText
    plot.innerText = this.children[4].innerText

    //appends elements to their containers
    $(moviePoster).empty().append(poster)
    $(movieTitle).empty().append(title)
    $(movieYear).empty().append(year)
    $(movieGenre).empty().append(genre)
    $(moviePlot).empty().append(plot)
})