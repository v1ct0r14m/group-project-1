var movieSelectionContainer = $("#movie-selection")
var inputBox = $("#input-box")
var moviesSelected = 0

//searches for the movie whenever you tyoe
const searchMovie = event => {
    event.preventDefault(event);
    //input goes into "movie" variable
    const movie = $(inputBox).val().trim()

    if (!movie) {
        const noMovie = document.querySelector("#no-movie")
        noMovie.classList.add("is-active")

        $(noMovie).on("click", () => {
            noMovie.classList.remove("is-active")
        })
        return
    }

    callMovieInfo(movie)
}

$("#search-button").on("click", searchMovie)

const callMovieInfo = movie => {
    //api url uses the movie as the query parameter to call whatever movie the user types
    const apiUrl = "https://www.omdbapi.com?s=" + movie + "&t=movie&plot=&apikey=6f89013e"

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            movieSelectionContainer.empty()

            console.log(data)

            if (data.Response == "False") {
                let notValid = document.querySelector("#not-valid")
                notValid.classList.add("is-active")

                $(notValid).on("click", () => {
                    notValid.classList.remove("is-active")
                })
                return
            }
            //for the lenght movie search results it will asign the values
            for (let i = 0; i < data.Search.length; i++) {

                const imdbId = data.Search[i].imdbID
                const movieTitle = data.Search[i].Title
                const movieYear = data.Search[i].Year
                const moviePoster = data.Search[i].Poster
                if (moviePoster === "N/A") {
                    break
                }
                
                const movieData = {
                    imdbId,
                    movieTitle,
                    movieYear,
                    moviePoster
                }

                //calls the plot function and stores the asigned values to be used later
                callPlot(movieData)
            }
        })
        .catch(() => {
            const badInternet = document.querySelector("#bad-internet")
            badInternet.classList.add("is-active")

            $(badInternet).on("click", function () {
                badInternet.classList.remove("is-active")
            })
        })
}

const callPlot = movieData => {

    const { imdbId, movieTitle } = movieData

    //uses the movie id and movie title as a parameter to call the plot
    const plotUrl = "https://www.omdbapi.com?i=" + imdbId + "&t=" + movieTitle + "&plot=full&apikey=6f89013e"

    fetch(plotUrl)
        .then(response => response.json())
        .then(data => {
            //stored the genre and plot
            const movieGenre = data.Genre
            const moviePlot = data.Plot

            movieData.movieGenre = movieGenre
            movieData.moviePlot = moviePlot

            //calls function to display everything using all the variables as parameters
            movieDropDown(movieData)
        })
}

const movieDropDown = movieData => {

    const { movieTitle, movieYear, moviePoster, movieGenre, moviePlot } = movieData

    //creates box to store all the elemnts
    const movieCard = document.createElement("div")
    movieCard.className = "display-movie-box card"

    const inputContainer = document.querySelector(".input-container")
    inputContainer.classList.remove("starter-input-container")

    //card Image
    const cardImage = document.createElement("div")
    cardImage.className = "card-image"
    const figureImage = document.createElement('figure')
    figureImage.className = "image is-3by4"
    const posterImage = document.createElement("img")
    posterImage.className = "form-movie-poster"
    posterImage.setAttribute("src", moviePoster)

    // card content 
    const contentCard = document.createElement('div');
    contentCard.className = 'card-content';
    const content = document.createElement('div')
    content.className = 'content'
    const titleParagraph = document.createElement("p")
    const yearParagraph = document.createElement("p")
    const genreParagraph = document.createElement("p")
    const plotParagraph = document.createElement("p")

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
    $(content).append(titleParagraph)
    $(content).append(yearParagraph)
    $(content).append(genreParagraph)
    $(content).append(plotParagraph)
    $(contentCard).append(content)
    $(movieCard).append(contentCard);
    $(movieSelectionContainer).append(movieCard)

}

//when you click on the list of movies it will display that movie and all of its information
$(movieSelectionContainer).on("click", ".display-movie-box", event => {
    const movieSelected = event.target.closest(".card").children

    //calls the containers for each element from the html
    const movieInformationContainer = document.querySelector("#movie-information")
    movieInformationContainer.className = "box";
    const moviePoster = document.querySelector("#poster")
    const movieTitle = document.querySelector("#movie-title")
    const movieYear = document.querySelector("#movie-year")
    const movieGenre = document.querySelector("#genre")
    const moviePlot = document.querySelector("#plot")

    //creates the element where the values will be stored
    const poster = document.createElement("img")
    poster.className = "stylePoster"
    const title = document.createElement("h2")
    title.className = "styleTitle"
    const year = document.createElement("p")
    year.className = "styleYear"
    const genre = document.createElement("p")
    genre.className = "styleGenre"
    const plot = document.createElement("p")
    plot.className = "stylePlot"

    //sets the values of the elements
    poster.setAttribute("src", movieSelected[0].children[0].children[0].currentSrc)
    title.innerText = movieSelected[1].children[0].children[0].innerText
    year.innerText = movieSelected[1].children[0].children[1].innerText
    genre.innerText = movieSelected[1].children[0].children[2].innerText
    genre.classList.remove("hide")
    plot.innerText = movieSelected[1].children[0].children[3].innerText
    plot.classList.remove("hide")

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


const storage = function () {

    var inputContainer = document.querySelector(".input-container")
    inputContainer.classList.remove("starter-input-container")
    inputContainer.classList.add("storage-input-container")

    var storedTitle = (localStorage.getItem(moviesSelected))
    console.log(storedTitle)
    callHistoryInfo(storedTitle)
}

const callHistoryInfo = function (storedTitle) {
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


const callHistoryPlot = function (imdbId, movieTitle, movieYear, moviePoster) {
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

const displayHistoryPlot = function (moTitle, moYear, moPoster, moGenre, moPlot) {

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

if (localStorage.getItem(moviesSelected) === null) {
}
else {
    storage()
}