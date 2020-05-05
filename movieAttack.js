/* This is the search widget */

const temporarySearchResultsDisplayConfig = {
  searchResultsRenderOption(fetchedMovies) {
    const posterImageDecision = fetchedMovies.Poster === 'N/A' ? '' : fetchedMovies.Poster;
    return `
    <img src= "${posterImageDecision} " />
    <h7> ${fetchedMovies.Title} (${fetchedMovies.Year})</h7>

  `;
  },
  inputValue(fetchedMovies) {
    return fetchedMovies.Title;
  },
  async fetchData(searchTerm) {
    const response = await axios.get('http://www.omdbapi.com/', {
      params: {
        apikey: 'a3fefea2',
        s: searchTerm
      }
    });

    if (response.data.Error) {
      return []; //if there are no movies matching the our searchTerm then we will return an empty array to allow the finishTypyingSearchTerm function to still run
    }
    return response.data.Search;
  }
};

createTemporarySearchResultsDisplay({
  ...temporarySearchResultsDisplayConfig,
  temporarySearchDisplay: document.querySelector('#left-temporarysearchresultsdisplay'),
  whenClickedResultInDropdown(fetchedMovies) {
    document.querySelector('.tutorial').classList.add('is-hidden');
    clickedResultInDropdown(fetchedMovies, document.querySelector('#left-summary'));
  },
});

createTemporarySearchResultsDisplay({
  ...temporarySearchResultsDisplayConfig,
  temporarySearchDisplay: document.querySelector('#right-temporarysearchresultsdisplay'),
  whenClickedResultInDropdown(fetchedMovies) {
    document.querySelector('.tutorial').classList.add('is-hidden');
    clickedResultInDropdown(fetchedMovies, document.querySelector('#right-summary'));
  },
});



const clickedResultInDropdown = async (moviefromdropdownlist, summaryElement) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: 'a3fefea2',
      i: moviefromdropdownlist.imdbID
    }
  });
  summaryElement.innerHTML = onScreenMovieHTMLTemplate(response.data);

};

const onScreenMovieHTMLTemplate = (singularMovieDetails) => {
  return `
  <article class="media">
    <figure class="media-left">
      <p class="image">
        <img src="${singularMovieDetails.Poster}" />
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <h1>${singularMovieDetails.Title}</h1>
        <h4>${singularMovieDetails.Genre}</h4>
        <p>${singularMovieDetails.Plot}</p>
      </div>
    </div>
  </article>
  <article class="notification is-primary">
  <p class="title"> ${singularMovieDetails.Awards}</p>
  <p class="subtitles">Awards</p>
  </article>
  <article class="notification is-primary">
  <p class="title"> ${singularMovieDetails.BoxOffice}</p>
  <p class="subtitles">Box Office</p>
  </article>
  <article class="notification is-primary">
  <p class="title"> ${singularMovieDetails.Metascore}</p>
  <p class="subtitles">Metascore</p>
  </article>
  <article class="notification is-primary">
  <p class="title"> ${singularMovieDetails.imdbRating}</p>
  <p class="subtitles">IMDB Ratings</p>
  </article>
  <article class="notification is-primary">
  <p class="title"> ${singularMovieDetails.imdbVotes}</p>
  <p class="subtitles">Number of Votes Attained on IMDB</p>
  </article>
  `
}