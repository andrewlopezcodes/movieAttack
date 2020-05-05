const createTemporarySearchResultsDisplay = ({
  temporarySearchDisplay,
  searchResultsRenderOption,
  whenClickedResultInDropdown,
  inputValue,
  fetchData

}) => {

  temporarySearchDisplay.innerHTML = `
  <label><b>Search</b></label>
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
    const items = await fetchData(event.target.value); //this will become the searchTearm in the fetchData async callback function

    if (!items.length) {
      searchResultsDropdown.classList.remove('is-active');
      return;
    }

    showUserTemporaryResults.innerHTML = '';

    searchResultsDropdown.classList.add('is-active');
    for (let item of items) {
      const searchResultsDropdownOption = document.createElement('a');


      searchResultsDropdownOption.classList.add('dropdown-item');
      searchResultsDropdownOption.innerHTML = searchResultsRenderOption(item);

      searchResultsDropdownOption.addEventListener('click', () => {
        searchResultsDropdown.classList.remove('is-active');
        input.value = inputValue(item);
        whenClickedResultInDropdown(item);

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