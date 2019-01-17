import { errorMessage } from '../utils/messages';

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
