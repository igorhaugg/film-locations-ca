import locationService from './locations';
import { errorMessage } from '../utils/messages';

const url = 'https://data.sfgov.org/resource/wwmu-gmzc.json?&$limit=100';
const wrongUrl = 'https://data.sfgov.org/resource/wwmu-gmz';

test('expects to not receive error', done => {
  locationService(url, (error, locations) => {
    expect(error).toBe('');
    done();
  });
});

test('expects to receive locations properly', done => {
  locationService(url, (error, locations) => {
    expect(locations.length).toBe(100);
    done();
  });
});

test('expects message error when sending wrong url', done => {
  locationService(wrongUrl, res => {
    expect(res).toBe(errorMessage);
    done();
  });
});
