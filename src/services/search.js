import { errorMessage } from '../utils/messages';

const searchService = async (text, check, locations, callback) => {
  let error = '';
  const result = [];
  const filters = check.map(item => item.name);
  const filteredArr = filters.filter(filter => filter !== 'actor');
  if (!locations) {
    callback(errorMessage, []);
  } else if (locations.length <= 0) {
    callback(errorMessage, locations);
  }
  if (filters.length !== filteredArr.length) {
    filteredArr.push('actor_1');
    filteredArr.push('actor_2');
    filteredArr.push('actor_3');
  }
  locations.map(location => {
    filteredArr.map(filter => {
      if (
        location[filter] &&
        location[filter].toLowerCase().includes(text.toLowerCase())
      ) {
        result.push(location);
      }
      return filter;
    });
    return location;
  });
  if (result.length === 0) {
    error = errorMessage;
  }
  callback(error, result);
};

export default searchService;
