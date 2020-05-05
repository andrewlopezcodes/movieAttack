const createAutoComplete = ({
  temporarySearchDisplay
}) configureObject => {

  temporarySearchDisplay.innerHTML = `
  <label><b>Search For A Movie</b></label>
  <input type = "input" />
  <div class = "dropdown" >
    <div class = "dropdown-menu">
      <div class = "dropdown-content results" ></div>
      </div>
    </div>
`;

  const input = temporarySearchDisplay.querySelector('input');
  const searchResultsDropdown = temporarySearchDisplay.querySelector('.dropdown');
  const showUserTemporaryResults = temporarySearchDisplay.querySelector('.results');


  const finishTypingSearchTerm = async event => {
    const movies = await fetchData(event.target.value); //this will become the searchTearm in the fetchData async callback function

    if (!movies.length) {
      searchResultsDropdown.classList.remove('is-active');
      return;
    }

    showUserTemporaryResults.innerHTML = '';

    searchResultsDropdown.classList.add('is-active');
    for (let fetchedMovies of movies) {
      const searchResultsDropdownOption = document.createElement('a');
      const posterImageDecision = fetchedMovies.Poster === 'N/A' ? '' : fetchedMovies.Poster;

      searchResultsDropdownOption.classList.add('dropdown-item');
      searchResultsDropdownOption.innerHTML =
        `
      <img src= "${posterImageDecision} " />
      <h7> ${fetchedMovies.Title}</h7>
    `;

      searchResultsDropdownOption.addEventListener('click', () => {
        searchResultsDropdown.classList.remove('is-active');
        input.value = fetchedMovies.Title;
        clickedResultInDropdown(fetchedMovies);
      });
      showUserTemporaryResults.appendChild(searchResultsDropdownOption);
    }
  };


  input.addEventListener('input', debounce(finishTypingSearchTerm, 850));

  document.addEventListener('click', event => {
    if (!temporarySearchDisplay.contains(event.target)) {
      searchResultsDropdown.classList.remove('is-active');
    }
  });



};