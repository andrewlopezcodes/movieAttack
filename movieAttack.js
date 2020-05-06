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
    clickedResultInDropdown(fetchedMovies, document.querySelector('#left-summary'), 'left');
  },
});

createTemporarySearchResultsDisplay({
  ...temporarySearchResultsDisplayConfig,
  temporarySearchDisplay: document.querySelector('#right-temporarysearchresultsdisplay'),
  whenClickedResultInDropdown(fetchedMovies) {
    document.querySelector('.tutorial').classList.add('is-hidden');
    clickedResultInDropdown(fetchedMovies, document.querySelector('#right-summary'), 'right');
  },
});

let leftMovie;
let rightMovie;

const clickedResultInDropdown = async (moviefromdropdownlist, summaryElement, whichSide) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: 'a3fefea2',
      i: moviefromdropdownlist.imdbID
    }
  });
  summaryElement.innerHTML = onScreenMovieHTMLTemplate(response.data);

  if (whichSide === 'left') {
    leftMovie = response.data;
  } else {
    rightMovie = response.data;
  }

  if (leftMovie && rightMovie) {
    runMovieComparer();
  }
};

const runMovieComparer = () => {
  const leftSideStatistics = document.querySelectorAll('#left-summary .notification');
  const rightSideStatistics = document.querySelectorAll('#right-summary .notification');

  leftSideStatistics.forEach((leftStatistic, index) => {
    const rightStatistic = rightSideStatistics[index];
    const leftSideValue = parseInt(leftStatistic.dataset.value);
    const rightSideValue = parseInt(rightStatistic.dataset.value);

    if (rightSideValue > leftSideValue) {
      leftStatistic.classList.remove('is-primary');
      leftStatistic.classList.add('is-light');

    } else {
      rightStatistic.classList.remove('is-primary');
      rightStatistic.classList.add('is-light');

    }
  });
};


const onScreenMovieHTMLTemplate = (singularMovieDetails) => {
  const boxOfficeValue = parseInt(singularMovieDetails.BoxOffice.replace(/\$/g, '').replace(/,/g, ''));
  const metascoreValue = parseInt(singularMovieDetails.Metascore);
  const imdbRatingValue = parseFloat(singularMovieDetails.imdbRating);
  const imdbVotesValue = parseFloat(singularMovieDetails.imdbVotes.replace(/,/g, ''));
  let count = 0;

  const awardsValue = singularMovieDetails.Awards.split(' ').reduce((prev, word) => {
    const value = parseInt(word);

    if (isNaN(value)) {
      return prev;
    } else {
      return prev + value;
    }
  }, 0);

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
  <article data-value=${awardsValue} class="notification is-primary">
  <p class="title"> ${singularMovieDetails.Awards}</p>
  <p class="subtitles">Awards</p>
  </article>
  <article data-value=${boxOfficeValue} class="notification is-primary">
  <p class="title"> ${singularMovieDetails.BoxOffice}</p>
  <p class="subtitles">Box Office</p>
  </article>
  <article data-value=${metascoreValue} class="notification is-primary">
  <p class="title"> ${singularMovieDetails.Metascore}</p>
  <p class="subtitles">Metascore</p>
  </article>
  <article data-vallue=${imdbRatingValue} class="notification is-primary">
  <p class="title"> ${singularMovieDetails.imdbRating}</p>
  <p class="subtitles">IMDB Ratings</p>
  </article>
  <article data-value=${imdbVotesValue} class="notification is-primary">
  <p class="title"> ${singularMovieDetails.imdbVotes}</p>
  <p class="subtitles">Number of Votes Attained on IMDB</p>
  </article>
  `
}

// written by @andrewlopezcodes on Github and Instagram