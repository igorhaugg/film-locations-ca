# Documentation

This application displays on a map the location of movies filmed in San Francisco. The user can filter the map by searching keywords.

The data was consulted at [DataSF:Film Locations](https://data.sfgov.org/Culture-and-Recreation/Film-Locations-in-San-Francisco/yitu-d5am).

The application doesn't support internet explorer versions previous than 11.

It's necessary to create a `.env` file in the root folder, with the google api key:
REACT_APP_GOOGLE_MAPS_KEY=<YOUR-GOOGLE-API-KEY>

## Packages Installed

### `emotion`

[Emotion.js](https://github.com/emotion-js/emotion) is a CSS-in-JS library.

### `google-maps-react`

[Google maps react](https://github.com/fullstackreact/google-maps-react/blob/master/README.md) is a package that allows to displays a Map with locations.

### `sweetalert-react`

[Sweetalert-react](https://github.com/chentsulin/sweetalert-react) is a React implementation of sweetalert library, this package allows to displays beautiful alerts.

### `es6-promise` and `isomorphic-fetch`

These packages were installed to be able to run fetch calls at internet explorer 11 browser.

## Scripts

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). In the project directory, you can run:

### `npm start`

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

## Main files

The application starts at `index.js` file, where the React DOM is rendered in the root div. The `index.css` file contains the main CSS and some updates that were necessary to make the google maps better. There are also the `serviceWorker` file and `setupTest`, the first one is automatically created by Create React App, and the second was created to configure the Jest adapter.

## Components

This application was built with 6 components: App, Loader, Header, Maps, Sidebar, and SearchBar.

### App

This is the most important component, where the state is managed, and other components are called.

After loading, the component calls a `service` where the film locations are provided. With the locations received, another `service` is used, to get the geolocations of the locations received. The geolocations allow to call the Map component and design the locations at the screen. All film locations are printed at the screen. If the user wants, it is possible to filter the results, by searching.

This component also displays errors with SweetAlert package and toggle the visibility of the `Sidebar`.

### Loader

Displays a full-screen loader when searching or loading the page.

### Header

Displays a button where the `Sidebar` component is toggle.

### Maps

This component was built with the package `google-maps-react` and displays a Map of San Francisco city. The component receives an array of 'locations' as props and generates a Marker for each location received.

### Sidebar

Contains the application's menu and the search feature. Displays a group of checkboxes and the `SearchBar` component.

### SearchBar

Represents the input and button to make the searches.

## Services

The application has 3 services: geolocation, locations, and search. The services are responsible to fetch data from APIs.

## Utils

Files with information that can be used in different components or services.

`checkboxes.js` lists the checkboxes displayed in the Sidebar component. The list was created based on the return of the [DataSF:Film Locations](https://data.sfgov.org/Culture-and-Recreation/Film-Locations-in-San-Francisco/yitu-d5am) API.

`messages` contains messages that can be used in the application.

## Tests

Tests can be run with `npm test` command. All components and services have tests developed.

## Basic usage

The application initially returns all data available at [DataSF:Film Locations](https://data.sfgov.org/Culture-and-Recreation/Film-Locations-in-San-Francisco/yitu-d5am). Then, the user can navigate and see the locations where movies were filmed in San Francisco city.

If the user wants to search for specific information. It is possible to open the menu, by clicking in the top left button. In the menu, users can select the checkboxes that they want, and then, insert a word/phrase in the input text. Example: users can search for locations where the location of the movie `or` the title has the name of `California`.
