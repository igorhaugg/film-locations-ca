import geolocationService from './geolocation';
import { errorMessage } from '../utils/messages';

const locations = [
  {
    actor_1: 'Siddarth',
    actor_2: 'Nithya Menon',
    actor_3: 'Priya Anand',
    director: 'Jayendra',
    locations: 'Epic Roasthouse (399 Embarcadero)',
    production_company: 'SPI Cinemas',
    release_year: '2011',
    title: '180',
    writer: 'Umarji Anuradha, Jayendra, Aarthi Sriram, & Suba '
  },
  {
    actor_1: 'Michael Douglas',
    actor_2: 'Sharon Stone',
    actor_3: 'George Dzundza',
    director: 'Paul Verhoeven',
    distributor: 'TriStar Pictures',
    locations: 'Raw Hide II (280 Seventh Street)',
    production_company: 'Carolco Pictures',
    release_year: '1992',
    title: 'Basic Instinct',
    writer: 'Joe Eszterhas'
  }
];

test('expects to receive geolocations properly', done => {
  geolocationService(locations, (error, latLng) => {
    expect(latLng.length).toBe(locations.length);
    done();
  });
});

test('expects to receive geolocations properly', done => {
  geolocationService([], (error, latLng) => {
    expect(latLng.length).toBe(0);
    done();
  });
});

test('expects to receive error', done => {
  geolocationService(null, (error, latLng) => {
    expect(error).toBe(errorMessage);
    done();
  });
});
