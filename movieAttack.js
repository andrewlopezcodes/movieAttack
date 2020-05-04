/* This is the search widget */

const fetchData = async (searchTerm) => {
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

const temporarySearchDisplay = document.querySelector('.temporarysearchresultsdisplay');
temporarySearchDisplay.innerHTML = `
  <label><b>Search For A Movie</b></label>
  <input type = "input" />
  <div class = "dropdown" >
    <div class = "dropdown-menu">
      <div class = "dropdown-content results" ></div>
      </div>
    </div>
`;

const input = document.querySelector('input');
const searchResultsDropdown = document.querySelector('.dropdown');
const showUserTemporaryResults = document.querySelector('.results');

const finishTypingSearchTerm = async event => {
  const movies = await fetchData(event.target.value); //this will become the searchTearm in the fetchData async callback function

  showUserTemporaryResults.innerHTML = '';

  searchResultsDropdown.classList.add('is-active');
  for (let fetchedMovies of movies) {
    const serchResultsDropdownOption = document.createElement('a');
    serchResultsDropdownOption.classList.add('dropdown-item')
    serchResultsDropdownOption.innerHTML = `
      <img src= "${fetchedMovies.Poster} " />
      <h7> ${fetchedMovies.Title}</h7>
      
    `;
    showUserTemporaryResults.appendChild(serchResultsDropdownOption);
  }
};


input.addEventListener('input', debounce(finishTypingSearchTerm, 850));