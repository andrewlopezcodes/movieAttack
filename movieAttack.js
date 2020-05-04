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
  console.log(movies);
};


input.addEventListener('input', debounce(finishTypingSearchTerm, 850));