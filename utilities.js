/* once the user types into the input field: 
    1) the event listener is triggered and calls debounce with arguments of the variable finishTypingSearchTerm and a time in miliseconds of how long to wait to send data to API.
    2) finishTypingSearchTerm variable is set to a function that takes in an arguement of event ( the change in the input being listened for by the eventlistener 'input') and stores the value of the input tag in the html.
    3) debounce function declares a local variable called setTimeoutId and returns a function that takes in all the arguments from func (the function passed in from finishTypingSearchTerm).
    4) With each key press inside the input, the if statement is evaluated. On the first keystroke the if statement will evaluate to be false setting the variable setTimeoutId to the setTimeout id. On the next key stroke if there is a setTimeoutId, the if statement will evaluate true and clear the setTimeoutId.
    5) on the last keystroke in the input tag, there will be an uncleared setTimeout Id and a delay timer set to the delay argument passed in by the argments gotten from event listener. Currently 1000 miliseconds will pass into the debounce function, which will be set in the settimeout second argument of the false response of the if statement. Which means there will be a 1 second delay before the fetchData(event.target.value) will be sent to the API using the fetchData function above.
     */

const debounce = (func, delay = 1000) => {
  let setTimeoutId;
  return (...args) => {
    if (setTimeoutId) {
      clearTimeout(setTimeoutId);
    }
    setTimeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay)
  };
};