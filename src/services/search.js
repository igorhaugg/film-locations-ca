import { errorMessage } from '../utils/messages';

// function that searches into locations
// it receives text, check, locations and callback
// text = value searched
// check = array with all checkboxes checked
// locations = all locations found
const searchService = (text, check, locations, callback) => {
  let error = '';
  const result = [];
  // gets only the names from check
  const filters = check.map(item => item.name);
  // creates an array with all checkboxes checked name, except actor
  const filteredArr = filters.filter(filter => filter !== 'actor');
  // it will return at this point if locations were empty
  if (!locations) {
    return callback(errorMessage, []);
  } else if (locations.length <= 0) {
    return callback(errorMessage, locations);
  }
  // if checkboxes checked received (filters) are different than the
  // variable without the `actor`, pushes 3 values, actor_1, actor_2 and actor_3
  // to the array. This happens because the Film API has the information with
  // 3 actors, but in the checkboxes, we have only one box with the name of the actor
  if (filters.length !== filteredArr.length) {
    filteredArr.push('actor_1');
    filteredArr.push('actor_2');
    filteredArr.push('actor_3');
  }
  // loop through locations, for each location, checks,
  // if the location at the position [filter] has the text received,
  // it means: location['title'] or location['actor_1'] has the text
  // searched if it has the text, pushes the location to result
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
