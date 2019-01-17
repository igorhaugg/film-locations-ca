import React, { Component, Fragment } from 'react';
import SweetAlert from 'sweetalert-react';

import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import Maps from '../Maps/Maps';
import Loader from './Loader';

import geolocationService from '../../services/geolocation';
import locationService from '../../services/locations';
import searchService from '../../services/search';

import { errorMessage } from '../../utils/messages';

class App extends Component {
  state = {
    locations: [],
    finalLocations: [],
    loading: false,
    open: false,
    error: ''
  };
  componentDidMount() {
    const url = 'https://data.sfgov.org/resource/wwmu-gmzc.json?&$limit=10';
    locationService(url, (err, res) => {
      if (err) {
        this.setState({ error: err });
      } else if (res.length === 0) {
        this.setState({ error: err });
      } else {
        this.setState({ locations: res });
        // this.setState({ locations: res, loading: true });
        // this.getGeoLocations(res);
      }
    });
  }
  handleToggle = open => {
    this.setState({ open: !open });
  };
  handleSearch = (text, check, locations) => {
    this.setState({ error: '', loading: true });
    searchService(text, check, locations, (err, res) => {
      if (err) {
        this.setState({ error: err, loading: false });
      } else if (res.length === 0) {
        this.setState({ error: errorMessage, loading: false });
      } else {
        this.getGeoLocations(res);
      }
    });
  };
  getGeoLocations = locations => {
    geolocationService(locations, (err, res) => {
      if (err) {
        this.setState({ error: err, loading: false });
      } else if (res.length === 0) {
        this.setState({ error: errorMessage, loading: false });
      } else {
        this.setState({ finalLocations: res, loading: false });
      }
    });
  };
  render() {
    const { open, finalLocations, locations, error, loading } = this.state;
    console.log(this.state);
    return (
      <Fragment>
        <Header open={open} onClick={isOpen => this.handleToggle(isOpen)} />
        {open && (
          <Sidebar
            open={open}
            onClick={(text, check) => this.handleSearch(text, check, locations)}
          />
        )}
        <Maps
          locations={finalLocations}
          onClick={isOpen => this.handleToggle(isOpen)}
        />
        {loading && <Loader />}
        <SweetAlert
          show={error !== ''}
          title="Warning"
          text={error}
          showCancelButton
          onConfirm={() => {
            this.setState({ error: '' });
          }}
          onCancel={() => {
            this.setState({ error: '' });
          }}
          onClose={() => {
            this.setState({ error: '' });
          }}
        />
      </Fragment>
    );
  }
}

export default App;