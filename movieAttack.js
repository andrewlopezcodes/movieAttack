/* This is the search widget */

const fetchData = async (searchTerm) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: 'a3fefea2',
      s: searchTerm
    }
  });
  return response.data.Search;
}

const input = document.querySelector('input');

const finishTypingSearchTerm = async event => {
  const movies = await fetchData(event.target.value); //this will become the searchTearm in the fetchData async callback function
  for (let fetchedMovies of movies) {
    const div = document.createElement('div');
    div.innerHTML = `
      <h3> ${fetchedMovies.Title}</h3>
      <img src= "${fetchedMovies.Poster} " />
    `;
    document.querySelector('#target').appendChild(div);
  }
};


input.addEventListener('input', debounce(finishTypingSearchTerm, 850));