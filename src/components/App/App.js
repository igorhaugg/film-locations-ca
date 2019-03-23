import React, { Component, Fragment } from 'react'
import SweetAlert from 'sweetalert-react'

import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import Maps from '../Maps/Maps'
import Loader from './Loader'

import geolocationService from '../../services/geolocation'
import locationService from '../../services/locations'
import searchService from '../../services/search'

import { errorMessage } from '../../utils/messages'

class App extends Component {
	state = {
		locations      : [],
		finalLocations : [],
		loading        : false,
		open           : false,
		error          : ''
	}
	componentDidMount() {
		// URL to fetch locations
		const url = 'https://data.sfgov.org/resource/wwmu-gmzc.json?&$limit=10'
		// calls locationService sending the URL
		// any error or empty response will make the sweetalert to be shown
		// if the return is ok shows the loading component and call getGeoLocations service
		locationService(url, (err, res) => {
			if (err) {
				this.setState({ error: err })
			} else if (res.length === 0) {
				this.setState({ error: err })
			} else {
				this.setState({ locations: res, loading: true })
				this.getGeoLocations(res, false)
			}
		})
	}
	handleToggle = open => {
		this.setState({ open: !open })
	}
	handleSearch = (text, check, locations) => {
		// do not allow users to do empty searches
		if (text.length === 0) {
			return
		}
		// starts by cleaning errors, closing the Sidebar and showing the Loader
		this.setState({ error: '', loading: true, open: false })
		// calls searchService sending: text, check, locations and callback function
		// text = input value
		// check = which checkboxes were checked
		// locations = value received in locationService
		// any error or empty response will make the sweetalert to be shown
		// if the return are ok, shows loading component and call getGeoLocations service
		searchService(text, check, locations, (err, res) => {
			if (err) {
				this.setState({ error: err, loading: false, open: true })
			} else if (res.length === 0) {
				this.setState({ error: errorMessage, loading: false, open: true })
			} else {
				this.getGeoLocations(res, true)
			}
		})
	}
	getGeoLocations = (locations, searching) => {
		// calls geolocationService and send: locations, searching and a callback function
		// locations = value received in locationService
		// searching = boolean that defines if it is searching or not
		// any error or empty response will make the sweetalert to be shown
		// if the return is ok, set results to the state
		geolocationService(locations, searching, (err, res) => {
			if (err) {
				this.setState({ error: err, finalLocations: res, loading: false })
			} else if (res.length === 0) {
				this.setState({ error: errorMessage, loading: false })
			} else {
				this.setState({ finalLocations: res, loading: false })
			}
		})
	}
	render() {
		const { open, finalLocations, locations, error, loading } = this.state
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
					title='Warning'
					text={error}
					onConfirm={() => {
						this.setState({ error: '' })
					}}
				/>
			</Fragment>
		)
	}
}

export default App
