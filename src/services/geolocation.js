import { errorMessage } from '../utils/messages';

const geolocationService = (locations, callback) => {
  let error = '';
  const latLng = [];
  const getGeoLocations = new Promise(function(resolve, reject) {
    try {
      if (!locations) {
        error = errorMessage;
        resolve(error, locations);
      } else if (locations.length <= 0) {
        resolve(locations);
      }
      locations.map(async location => {
        const address = encodeURIComponent(
          location.locations + ' San Francisco, CA'
        );
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyA-rrBafnyOsJF7AVrW8qcM7Vu8d96e_4k`;
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data);
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
        // if (latLng.length === 5 || error !== '') {
        if (latLng.length === locations.length || error !== '') {
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
