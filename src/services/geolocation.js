import { errorMessage } from '../utils/messages';

// receives locations, searching and callback
// locations = all locations fetched
// searching = boolean that says if this function was called in the search function
const geolocationService = (locations, searching, callback) => {
  let error = '';
  let latLng = [];
  // locationsLength receives the length of locations
  const locationsLength = locations ? locations.length : 0;
  // getGeoLocations creates a Promise to handle the API call
  const getGeoLocations = new Promise(function(resolve, reject) {
    // try to find in localStorage geolocations variable,
    // the idea is to save the first loaded information, so if the user
    // keeps reloading the page, it would access this from local Storage variable
    // and not reaching the limits of my google API
    if (localStorage.getItem('geolocations')) {
      // get the locations from localStorage too,
      // this information will be compared to the locations received,
      // if they are equal, there is no need to call the api again,
      // it can return the geolocations saved on localStorage as latLng
      const storageLocations = JSON.parse(localStorage.getItem('locations'));
      const storageGeolocations = JSON.parse(
        localStorage.getItem('geolocations')
      );
      if (
        JSON.stringify(storageLocations) === JSON.stringify(locations) &&
        storageGeolocations.length > 0
      ) {
        latLng = storageGeolocations;
        return resolve(latLng);
      }
    }
    try {
      // any error or empty locations will return at this point
      if (!locations) {
        error = errorMessage;
        return resolve(error, locations);
      } else if (locationsLength <= 0) {
        return resolve(locations);
      }
      // loop through locations to get the geolocation of each location
      locations.map(async (location, index) => {
        // sets a timeout because google has the limit of 50 uses by second
        // even the paid plan has this issue
        setTimeout(async function() {
          // it converts the address and adds the San Francisco information at the end,
          // this avoids returning address from other cities
          const address = encodeURIComponent(
            location.locations + ' San Francisco, CA'
          );
          // creates the url with the address and the api key
          // gets the data from url
          const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${
            process.env.REACT_APP_GOOGLE_MAPS_KEY
          }`;
          const response = await fetch(url);
          const data = await response.json();
          // populates error variable if necessary
          // otherwise, creates a new object with 3 information: location, lat and lng
          // push this object to latLng array
          if (data.error_message) {
            error = data.error_message;
          } else {
            const obj = {
              location: location.locations ? location.locations : '',
              lat:
                data.results.length > 0
                  ? data.results[0].geometry.location.lat
                  : '',
              lng:
                data.results.length > 0
                  ? data.results[0].geometry.location.lng
                  : ''
            };
            latLng.push(obj);
          }
          // resolves the Promise only when there is an error or
          // latLng has the same length of the locations, this means
          // all locations were executed
          if (latLng.length === locations.length || error !== '') {
            return resolve(latLng);
          }
        }, 50 * index); // 50 * index is the time waited for setTimeout
      });
    } catch (e) {
      return reject(e);
    }
  });

  // when the Promise is resolved it consults if there is a geolocation
  // variable in localStorage, if there isn't, creates one to save the
  // information, if the geolocations exist in localStorage, it will just
  // return the callback
  getGeoLocations.then(() => {
    if (!localStorage.getItem('geolocations')) {
      localStorage.setItem('geolocations', JSON.stringify(latLng));
      localStorage.setItem('locations', JSON.stringify(locations));
    }
    return callback(error, latLng);
  });
};

export default geolocationService;
