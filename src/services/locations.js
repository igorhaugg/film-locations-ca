import { errorMessage } from '../utils/messages';

// function that returns the locations from Film API
// it receives the url and a callback function and returns
// an error if status is 404 or the data if status equal 200
const locationService = async (url, callback) => {
  let error = '';
  let locations = [];
  const response = await fetch(url);
  if (response.status === 404) {
    error = errorMessage;
  }
  if (response.status === 200) {
    const data = await response.json();
    locations = data;
  }
  callback(error, locations);
};

export default locationService;
