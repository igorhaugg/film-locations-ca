import { errorMessage } from '../utils/messages';

const geolocationService = (locations, searching, callback) => {
  let error = '';
  let latLng = [];
  const locationsLength = locations ? locations.length : 0;
  const getGeoLocations = new Promise(function(resolve, reject) {
    if (localStorage.getItem('geolocations')) {
      const storageLocations = JSON.parse(localStorage.getItem('locations'));
      const storageGeolocations = JSON.parse(
        localStorage.getItem('geolocations')
      );
      if (JSON.stringify(storageLocations) === JSON.stringify(locations)) {
        latLng = storageGeolocations;
        return resolve(latLng);
      }
    }
    try {
      if (!locations) {
        error = errorMessage;
        return resolve(error, locations);
      } else if (locationsLength <= 0) {
        return resolve(locations);
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
            return resolve(latLng);
          }
        }, 20 * index);
      });
    } catch (e) {
      return reject(e);
    }
  });

  getGeoLocations.then(() => {
    if (!localStorage.getItem('geolocations')) {
      localStorage.setItem('geolocations', JSON.stringify(latLng));
      localStorage.setItem('locations', JSON.stringify(locations));
    }
    callback(error, latLng);
  });
};

export default geolocationService;
