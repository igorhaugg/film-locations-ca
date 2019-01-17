import searchService from './search';
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
  }
];

const locations2 = [
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

const check = [
  {
    name: 'title'
  }
];
const check2 = [
  {
    name: 'title'
  },
  {
    name: 'writer'
  }
];
const wrongSearch = 'aaaaaaaaaa';
const goodSearch = '180';
const goodSearch2 = 'Umarji';

test('expects error message', done => {
  searchService(wrongSearch, check, locations, (error, result) => {
    expect(error).toBe(errorMessage);
    done();
  });
});

test('expects to not receive error message', done => {
  searchService(goodSearch, check, locations, (error, result) => {
    expect(error).toBe('');
    done();
  });
});

test('expects to receive locations searched properly', done => {
  searchService(goodSearch, check, locations, (error, result) => {
    expect(result.length).toBe(1);
    expect(result).toEqual(locations);
    done();
  });
});

test('expects to receive locations searched properly when sending 2 locations', done => {
  searchService(goodSearch, check, locations2, (error, result) => {
    expect(result.length).toBe(1);
    done();
  });
});

test('expects to not receive error message when sending multiple checkboxes', done => {
  searchService(goodSearch2, check2, locations, (error, result) => {
    expect(error).toBe('');
    done();
  });
});

test('expects to receive error message when sending empty location', done => {
  searchService(goodSearch, check, [], (error, result) => {
    expect(error).toBe(errorMessage);
    expect(result).toEqual([]);
    done();
  });
});

test('expects to receive error message when sending null location', done => {
  searchService(goodSearch, check, null, (error, result) => {
    expect(error).toBe(errorMessage);
    expect(result).toEqual([]);
    done();
  });
});
