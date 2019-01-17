import { errorMessage, warningMessage } from '../utils/messages';

const geolocationService = (locations, searching, callback) => {
  let error = '';
  let locationsArr = [];
  const latLng = [];
  const locationsLength = locations ? locations.length : 0;
  const getGeoLocations = new Promise(function(resolve, reject) {
    try {
      if (!locations) {
        error = errorMessage;
        resolve(error, locations);
      } else if (locationsLength <= 0) {
        resolve(locations);
      } else if (locationsLength > 50) {
        locationsArr = locations.sort(() => 0.5 - Math.random()).slice(0, 50);
        error = searching ? warningMessage(locations.length) : '';
      } else {
        locationsArr = locations;
      }
      locationsArr.map(async (location, index) => {
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
            lat: data.results[0].geometry.location.lat,
            lng: data.results[0].geometry.location.lng
          };
          latLng.push(obj);
        }
        if (latLng.length === locationsArr.length || error !== '') {
          resolve(latLng);
        }
      });
    } catch (e) {
      reject(e);
    }
  });

  getGeoLocations.then(() => {
    callback(error, latLng);
  });
};

export default geolocationService;
