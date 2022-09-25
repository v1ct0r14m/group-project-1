

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
    
    //card movie 
    var movieCard = document.createElement("div")
    movieCard.className = "display-movie-box card"
    //card Image
    var cardImage = document.createElement("div")
    cardImage.className = "card-image"
    var figureImage = document.createElement('figure')
    figureImage.className = "image is-4by3"
    var posterImage = document.createElement("img")
    posterImage.className = "form-movie-poster"
    posterImage.setAttribute("src", moviePoster)

    
    // card content 
    var contentCard = document.createElement('div');
    contentCard.className = 'card-content';
    var conctent = document.createElement('div')
    conctent.className= 'content'
    var titleParagraph = document.createElement("p")
    var yearParagraph = document.createElement("p")
        
    titleParagraph.innerText = movieTitle
    titleParagraph.className = "form-movie-title"
    yearParagraph.innerText = movieYear
    yearParagraph.className = "form-movie-year"

    //all appends are here
    $(figureImage).append(posterImage)
    $(cardImage).append(figureImage)
    $(movieCard).append(cardImage)
    $(conctent).append(titleParagraph)
    $(conctent).append(yearParagraph)
    $(contentCard).append(conctent)
    $(movieCard).append(contentCard);
    $(movieSelectionContainer).append(movieCard)
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