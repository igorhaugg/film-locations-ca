import { errorMessage } from '../utils/messages';

const geolocationService = (locations, searching, callback) => {
  let error = '';
  const latLng = [];
  const locationsLength = locations ? locations.length : 0;
  const getGeoLocations = new Promise(async function(resolve, reject) {
    try {
      if (!locations) {
        error = errorMessage;
        resolve(error, locations);
      } else if (locationsLength <= 0) {
        resolve(locations);
      }
      locations.map(async (location, index) => {
        setTimeout(async function() {
          const address = encodeURIComponent(
            location.locations + ' San Francisco, CA'
          );
          const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyA-rrBafnyOsJF7AVrW8qcM7Vu8d96e_4k`;
          const response = await fetch(url);
          const data = await response.json();
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
          if (latLng.length === locations.length || error !== '') {
            resolve(latLng);
          }
        }, 20 * index);
      });
    } catch (e) {
      reject(e);
    }
  });

  getGeoLocations.then(() => {
    console.log(latLng.length);
    callback(error, latLng);
  });
};

export default geolocationService;
