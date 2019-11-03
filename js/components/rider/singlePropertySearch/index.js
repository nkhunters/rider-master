import React, { Component } from "react";
import {
	Text, SafeAreaView, TouchableOpacity,
	Dimensions, ImageBackground, TouchableWithoutFeedback,
	View, ScrollView,
} from "react-native";
import { connect } from "react-redux";
import _ from "lodash";
import PropTypes from "prop-types";
import {
	Icon
} from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome";
import { Actions } from "react-native-router-flux";
import { tripRequestUpdated } from "../../../actions/rider/rideBooked";
import styles from "./styles";
//import GoogleStaticMap from 'react-native-google-static-map';
import MapView from 'react-native-maps';
import commonColor from "../../../../native-base-theme/variables/commonColor";
import {
	setSrcAddress,
	setDestAddress,
	fetchCoordinatesFromAddress,
	fetchCoordinatesFromAddressAsync,
	fetchFareDetail,
	setSrcLoc
} from "../../../actions/rider/confirmRide";
import { changePageStatus } from "../../../actions/rider/home";

const { width, height } = Dimensions.get("window");
const aspectRatio = width / height;
function mapStateToProps(state) {
	return {
		mapKey: state.basicAppConfig.config,
		region: {
			latitude: state.rider.user.gpsLoc[0],
			longitude: state.rider.user.gpsLoc[1],
			latitudeDelta: state.rider.user.latitudeDelta,
			longitudeDelta: state.rider.user.latitudeDelta * aspectRatio
		},
		tripRequest: state.rider.tripRequest
	};
}
class singleProperty extends Component {
	static propTypes = {
		tripEstimateTime: PropTypes.func
	}
	constructor(props) {
		super(props);
		this.state = {
			data: props
		}
	}

	setSrcAddress(fetchedAddress) {
		this.props.setSrcAddress(fetchedAddress);
			this.props.fetchCoordinatesFromAddressAsync(fetchedAddress);
			if (!this.props.tripRequest.destLoc.length) {
				this.props.fetchFareDetail(this.props.tripRequest);
			}
	}

	setAddress(fetchedAddress) {

		this.props.setDestAddress(fetchedAddress);
		this.props.fetchCoordinatesFromAddress(fetchedAddress);
		this.props.fetchFareDetail(this.props.tripRequest);
		Actions.pop({
			address: fetchedAddress
		});
	}

	_confirmPick() {
		let propertydetails = JSON.parse(this.state.data.data);
		let property_lat = propertydetails.mapCoordinates.coordinates[1];
		let property_long = propertydetails.mapCoordinates.coordinates[0];
		let obj = {
			tripRequestStatus: 'enRoute',
			srcLoc: [this.props.region.latitude, this.props.region.longitude],
			destLoc: [property_lat, property_long]
		}
		this.props.tripEstimateTime(obj);

		//this.props.pageStatus = "confirmRide";
		this.setAddress(propertydetails.address);
		setSrcLoc(obj.srcLoc);
		//Actions.rootView(pageStatus = "confirmRide");
		Actions.confirmRide(rider = this.state.rider);
		//this.props.changePageStatus("confirmRide");
	}
	navigateToBack() {
		Actions.pop();
	}
	render() {
		const { data } = this.state;
		var propertydetails = JSON.parse(data.navigation.state.params.data);
		var image = propertydetails.propertyimage && (propertydetails.propertyimage).length > 0 ? propertydetails.propertyimage[0] : null
		var property_heading = propertydetails.name;

		var property_lat = propertydetails.mapCoordinates.coordinates[1];
		var property_long = propertydetails.mapCoordinates.coordinates[0];
		//console.log(googleapikey);
		return (
			<ImageBackground source={{ uri: `data:image/gif;base64,${image}` }} resizeMode='stretch' style={{ width: '100%', height: '60%', flex: 1 }}>
				<SafeAreaView style={{ flex: 1 }}>
					<View style={styles.container}>
						<ScrollView style={{ flex: 1 }}>
							<View style={styles.topContainer}>
								<View style={styles.row}>
									<View style={styles.col1}>
										<TouchableWithoutFeedback onPress={() => this.navigateToBack()}>
											<Icon name="ios-arrow-round-back" style={styles.backiconstyles} />
										</TouchableWithoutFeedback>
									</View>
									<View style={styles.col2}>
										<TouchableWithoutFeedback onPress={this.props.onBackButtonClick}>
											<MaterialCommunityIcons name="filter-variant" style={styles.filtericonStyle} />
										</TouchableWithoutFeedback>
									</View>
								</View>
								<View style={styles.row2}>
									<Text style={styles.slider_heading}>{property_heading}</Text>
									<View style={styles.starRow}>
										<View style={styles.star}>
											<FontAwesomeIcons name="star" size={20} style={styles.FontAwesomeIcons} />
										</View>
										<View style={styles.star}>
											<FontAwesomeIcons name="star" size={20} style={styles.FontAwesomeIcons} />
										</View>
										<View style={styles.star}>
											<FontAwesomeIcons name="star" size={20} style={styles.FontAwesomeIcons} />
										</View>
										<View style={styles.star}>
											<FontAwesomeIcons name="star-o" size={20} style={styles.FontAwesomeIcons1} />
										</View>
										<View style={styles.star}>
											<FontAwesomeIcons name="star-o" size={20} style={styles.FontAwesomeIcons1} />
										</View>
										<View>
											<Text style={styles.revTxt}>24 Reviews</Text>
										</View>

									</View>
								</View>
							</View>
							<View style={styles.bottomContainer}>
								<Text style={styles.des}>Description</Text>
								<View style={styles.mapView}>
									<MapView
										initialRegion={{
											latitude: property_lat,
											longitude: property_long,
											latitudeDelta: 0.0922,
											longitudeDelta: 0.0421,
										}}
										style={{ height: 150, width: '100%' }}
										maxZoomLevel={14}
										showsCompass={false}
										scrollEnabled={false}
										pitchEnabled={false}
									>
										<MapView.Marker coordinate={{ latitude: property_lat, longitude: property_long }}>
											<View style={{ width: 30, height: 30, backgroundColor: commonColor.brandPrimary, borderRadius: 10, justifyContent: "center", alignItems: "center" }}>
												<Icon name="ios-home" style={{ fontSize: 15, color: "#fff" }} />
											</View>


										</MapView.Marker>
									</MapView>
								</View>
								<TouchableOpacity style={styles.btn} onPress={() => this._confirmPick()}>
									<Text style={{ textAlign: 'center', color: '#fff', fontSize: 16, fontWeight: '700' }}>GO THERE</Text>
								</TouchableOpacity>
							</View>
						</ScrollView>



					</View>
				</SafeAreaView>

			</ImageBackground>
		)
	}

}

function mapActionToProps(dispatch) {
	return {
		
		tripEstimateTime: (tripObject) => dispatch(tripRequestUpdated(tripObject)),
		changeRegion: region => dispatch(changeRegion(region)),
		fetchPrediction: string => dispatch(fetchPrediction(string)),
		fetchCoordinatesFromAddressAsync: fetchedAddress => dispatch(fetchCoordinatesFromAddressAsync(fetchedAddress)),
		fetchCoordinatesFromAddress: fetchedAddress => dispatch(fetchCoordinatesFromAddress(fetchedAddress)),
		setSrcAddress: fetchedAddress => dispatch(setSrcAddress(fetchedAddress)),
		setDestAddress: fetchedAddress => dispatch(setDestAddress(fetchedAddress)),
		fetchFareDetail: tripRequest => dispatch(fetchFareDetail(tripRequest)),
		changePageStatus: newPage => dispatch(changePageStatus(newPage))
	}
}

export default connect(mapStateToProps, mapActionToProps)(singleProperty);
