import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { css } from 'emotion';

// This component receives locations google and onClick function
// locations = the locations that must be placed on Map
// google = mandatory value with the apiKey
// onClick = function to close the Sidebar component when clicking on Map
// for each location received it is created a Maker with
// information like key, title, name, and position
export class MapContainer extends Component {
  render() {
    const { locations, google, onClick } = this.props;
    return (
      <Map
        google={google}
        className={map__area}
        zoom={13}
        onClick={() => onClick(true)}
      >
        {locations.map((location, index) => (
          <Marker
            key={`${location.location} + ${location.lat * index}`}
            title={location.location}
            name={location.location}
            position={{ lat: location.lat, lng: location.lng }}
            onClick={() => onClick(true)}
          />
        ))}
      </Map>
    );
  }
}

const map__area = css`
  height: '100%';
  position: 'relative';
  top: 0;
  width: '100%';
`;

export default GoogleApiWrapper({
  google: process.env.REACT_APP_GOOGLE_MAPS_KEY,
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY
})(MapContainer);
