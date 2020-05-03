const fetchData = async (searchTerm) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: 'a3fefea2',
      s: searchTerm
    }
  });
  console.log(response.data);
}


const input = document.querySelector('input');

let setTimeoutId;

const finishTypingSearchTerm = event => {
  if (setTimeoutId) {
    clearTimeout(setTimeoutId);
  }
  setTimeoutId = setTimeout(() => {
    fetchData(event.target.value); //this will become the searchTearm in the fetchData async callback function
  }, 500)
}


input.addEventListener('input', finishTypingSearchTerm);