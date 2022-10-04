var movieSelectionContainer = $("#movie-selection")
var inputBox = $("#input-box")
var moviesSelected = 0
console.log(inputBox)

//searches for the movie whenever you tyoe
var searchMovie = function (event) {
    event.preventDefault(event);
    //input goes into "movie" variable
    var movie = $(inputBox).val().trim()
    console.log(movie)

    if (movie === "") {
        var noMovie = document.querySelector("#no-movie")
        noMovie.classList.add("is-active")

        $(noMovie).on("click", function () {
            noMovie.classList.remove("is-active")
        })
    }
    else {
        callMovieInfo(movie)
    }
}

var callMovieInfo = function (movie) {
    //api url uses the movie as the query parameter to call whatever movie the user types
    var apiUrl = "https://www.omdbapi.com?s=" + movie + "&t=movie&plot=&apikey=6f89013e"

    fetch(apiUrl).then(function (response) {
        response.json().then(function (data) {
            movieSelectionContainer.empty()
            console.log(data)
            if (data.Response == "False") {
                var notValid = document.querySelector("#not-valid")
                notValid.classList.add("is-active")

                $(notValid).on("click", function () {
                    notValid.classList.remove("is-active")
                })
            }
            else {
                //for the lenght movie search results it will asign the values
                for (var i = 0; i < data.Search.length; i++) {
                    console.log(data)
                    var movieTitle = data.Search[i].Title
                    var movieYear = data.Search[i].Year
                    var moviePoster = data.Search[i].Poster
                    if (moviePoster === "N/A") {
                        break
                    }
                    var imdbId = (data.Search[i].imdbID)
                    //calls the plot function and stores the asigned values to be used later
                    callPlot(imdbId, movieTitle, movieYear, moviePoster)
                }
            }

        })

    })
        .catch(function () {
            var badInternet = document.querySelector("#bad-internet")
            badInternet.classList.add("is-active")

            $(badInternet).on("click", function () {
                badInternet.classList.remove("is-active")
            })
        })
}

var callPlot = function (imdbId, movieTitle, movieYear, moviePoster) {

    //uses the movie id and movie title as a parameter to call the plot
    var plotUrl = "https://www.omdbapi.com?i=" + imdbId + "&t=" + movieTitle + "&plot=full&apikey=6f89013e"

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
    var movieCard = document.createElement("div")
    movieCard.className = "display-movie-box card"

    var inputContainer = document.querySelector(".input-container")
    inputContainer.classList.remove("starter-input-container")

    //card Image
    var cardImage = document.createElement("div")
    cardImage.className = "card-image"
    var figureImage = document.createElement('figure')
    figureImage.className = "image is-3by4"
    var posterImage = document.createElement("img")
    posterImage.className = "form-movie-poster"
    posterImage.setAttribute("src", moviePoster)

    // card content 
    var contentCard = document.createElement('div');
    contentCard.className = 'card-content';
    var conctent = document.createElement('div')
    conctent.className = 'content'
    var titleParagraph = document.createElement("p")
    var yearParagraph = document.createElement("p")
    var genreParagraph = document.createElement("p")
    var plotParagraph = document.createElement("p")

    titleParagraph.innerText = movieTitle
    titleParagraph.classList = "form-movie-title"
    yearParagraph.innerText = movieYear
    yearParagraph.classList = "form-movie-year"
    genreParagraph.innerText = movieGenre
    genreParagraph.classList = "form-movie-genre hide"
    plotParagraph.innerText = moviePlot
    plotParagraph.classList = "form-movie-plot hide"

    //all appends are here
    $(figureImage).append(posterImage)
    $(cardImage).append(figureImage)
    $(movieCard).append(cardImage)
    $(conctent).append(titleParagraph)
    $(conctent).append(yearParagraph)
    $(conctent).append(genreParagraph)
    $(conctent).append(plotParagraph)
    $(contentCard).append(conctent)
    $(movieCard).append(contentCard);
    $(movieSelectionContainer).append(movieCard)

    //creates the elements where the values will be stored
    var posterImage = document.createElement("img")
    posterImage.setAttribute("src", moviePoster)

}
$("#search-button").on("click", searchMovie)

//when you click on the list of movies it will display that movie and all of its information
$(movieSelectionContainer).on("click", ".display-movie-box", function (event) {
    console.dir(this)
    

    //calls the containers for each element from the html
    var movieInformationContainer = document.querySelector("#movie-information")
    movieInformationContainer.className = "box";
    var moviePoster = document.querySelector("#poster")
    var movieTitle = document.querySelector("#movie-title")
    var movieYear = document.querySelector("#movie-year")
    var movieGenre = document.querySelector("#genre")
    var moviePlot = document.querySelector("#plot")

    //creates the element where the values will be stored
    var poster = document.createElement("img")
    poster.className = "stylePoster"
    var title = document.createElement("h2")
    title.className = "styleTitle"
    var year = document.createElement("p")
    year.className = "styleYear"
    var genre = document.createElement("p")
    genre.className = "styleGenre"
    var plot = document.createElement("p")
    plot.className = "stylePlot"

    //sets the values of the elements
    poster.setAttribute("src", this.children[0].children[0].children[0].currentSrc)
    title.innerText = this.children[1].children[0].children[0].innerText
    year.innerText = this.children[1].children[0].children[1].innerText
    genre.innerText = this.children[1].children[0].children[2].innerText
    genre.classList.remove("hide")
    plot.innerText = this.children[1].children[0].children[3].innerText
    plot.classList.remove("hide")

    console.dir(poster)

    //appends elements to their containers
    $(moviePoster).empty().append(poster)
    $(movieTitle).empty().append(title)
    $(movieYear).empty().append(year)
    $(movieGenre).empty().append(genre)
    $(moviePlot).empty().append(plot)

    if (plot.classList !== "hide") {
        movieSelectionContainer.className = ("hide")
        $(movieSelectionContainer).empty().append(movieSelectionContainer)
    }

    localStorage.setItem(moviesSelected, title.textContent)
    
})


var storage = function () {

    var inputContainer = document.querySelector(".input-container")
    inputContainer.classList.remove("starter-input-container")
    inputContainer.classList.add("storage-input-container")

        var storedTitle = (localStorage.getItem(moviesSelected))
        console.log(storedTitle)
        callHistoryInfo(storedTitle)
}

var callHistoryInfo = function (storedTitle) {
    var apiUrl = "https://www.omdbapi.com?s=" + storedTitle + "&t=movie&plot=&apikey=6f89013e"

    fetch(apiUrl).then(function (response) {
        response.json().then(function (data) {
            movieSelectionContainer.empty()
            console.log(data)

            //for the lenght movie search results it will asign the values
            var movieTitle = data.Search[0].Title
            var movieYear = data.Search[0].Year
            var moviePoster = data.Search[0].Poster
            var imdbId = (data.Search[0].imdbID)
            //calls the plot function and stores the asigned values to be used later
            callHistoryPlot(imdbId, movieTitle, movieYear, moviePoster)
        })

    })

}


var callHistoryPlot = function (imdbId, movieTitle, movieYear, moviePoster) {
    //uses the movie id and movie title as a parameter to call the plot
    var plotUrl = "https://www.omdbapi.com?i=" + imdbId + "&t=" + movieTitle + "&plot=full&apikey=6f89013e"

    fetch(plotUrl).then(function (response) {
        response.json().then(function (data) {
            //stored the genre and plot
            var movieGenre = data.Genre
            var moviePlot = data.Plot
            //calls function to display everything using all the variables as parameters
            displayHistoryPlot(movieTitle, movieYear, moviePoster, movieGenre, moviePlot)
        })
    })
}

var displayHistoryPlot = function (moTitle, moYear, moPoster, moGenre, moPlot) {

    console.dir(movieYear)

    //calls the containers for each element from the html
    var movieInformationContainer = document.querySelector("#movie-information")
    movieInformationContainer.className = "box";
    var moviePoster = document.querySelector("#poster")
    var movieTitle = document.querySelector("#movie-title")
    var movieYear = document.querySelector("#movie-year")
    var movieGenre = document.querySelector("#genre")
    var moviePlot = document.querySelector("#plot")

    //creates the element where the values will be stored
    var poster = document.createElement("img")
    poster.className = "stylePoster"
    var title = document.createElement("h2")
    title.className = "styleTitle"
    var year = document.createElement("p")
    year.className = "styleYear"
    var genre = document.createElement("p")
    genre.className = "styleGenre"
    var plot = document.createElement("p")
    plot.className = "stylePlot"

    //sets the values of the elements
    poster.setAttribute("src", moPoster)
    title.innerText = moTitle
    year.innerText = moYear
    genre.innerText = moGenre
    plot.innerText = moPlot

    console.log(year)

    //appends elements to their containers
    $(moviePoster).empty().append(poster)
    $(movieTitle).empty().append(title)
    $(movieYear).empty().append(year)
    $(movieGenre).empty().append(genre)
    $(moviePlot).empty().append(plot)

    
}

if(localStorage.getItem(moviesSelected)=== null) {
}
else {
    storage()
}