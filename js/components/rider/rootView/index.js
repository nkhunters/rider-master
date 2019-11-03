import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Dimensions, Image } from "react-native";
import { Icon, Thumbnail } from "native-base";
import MapView from "react-native-maps";
import Polyline from "@mapbox/polyline";
import _ from "lodash";
import PropTypes from "prop-types";
import { updatePickupRegion } from "../../../services/ridersocket";
import { openDrawer } from "../../../actions/drawer";
import { fetchAdvertisements } from "../../../actions/rider/advertisements";
import {
  fetchUserCurrentLocationAsync,
  changeRegion,
  clearTripAndTripRequest,
  changePageStatus,
  syncDataAsync,
  fetchAddressFromCoordinatesAsync,
  getAllProperties
} from "../../../actions/rider/home";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import { clearReducerState } from "../../../actions/rider/receipt";
import { fetchFareDetail } from "../../../actions/rider/confirmRide";
import * as appStateSelector from "../../../reducers/rider/appState";
import * as userSelector from "../../../reducers/rider/user";
import Home from "../home";
import ConfirmRide from "../confirmRide";
import ConfirmPropertyRide from "../ConfirmPropertyRide";
import RideBooked from "../rideBooked";
import confirmPickup from "../confirmPickup";
import confirmPropertyPickup from "../ConfirmPropertyPickup";
import Receipt from "../receipt";
import styles from "./styles";
import AdvertisementSelector from '../../../reducers/rider/advertisement'
let that = null;
const { width, height } = Dimensions.get("window");
const aspectRatio = width / height;
const markerIDs = ["dest", "src"];

function mapStateToProps(state) {
  return {
    region: {
      latitude: state.rider.user.gpsLoc[0],
      longitude: state.rider.user.gpsLoc[1],
      latitudeDelta: state.rider.user.latitudeDelta,
      longitudeDelta: state.rider.user.latitudeDelta * aspectRatio
    },
    tripRequest: state.rider.tripRequest,
    pickupLatitude: state.rider.tripRequest.srcLoc[0],
    pickupLongitude: state.rider.tripRequest.srcLoc[1],
    pageStatus: state.rider.appState.pageStatus,
    driverCurrentGpsLocLat: !state.rider.tripRequest.driver
      ? undefined
      : state.rider.tripRequest.driver.gpsLoc[0],
    driverCurrentGpsLocLong: !state.rider.tripRequest.driver
      ? undefined
      : state.rider.tripRequest.driver.gpsLoc[1],
    jwtAccessToken: state.rider.appState.jwtAccessToken,
    tripRequestStatus: state.rider.tripRequest.tripRequestStatus,
    tripStatus: state.rider.trip.tripStatus,
    user: state.rider.user,
    srcLoc: state.rider.tripRequest.srcLoc,
    destLoc: state.rider.tripRequest.destLoc,
    pickUpAddress: state.rider.tripRequest.pickUpAddress,
    destAddress: state.rider.tripRequest.destAddress,
    markers: appStateSelector.getMarkers(state),
    driversList: userSelector.getNearbyDriversLocation(state),
    allpropertydata: userSelector.getAllProperties(state),
    profileImage: state.rider.user.profileUrl,
    mapKey: state.basicAppConfig.config,
    advertisements: state.rider.advertisement
  };
}
class RootView extends Component {
  static propTypes = {
    pickupLatitude: PropTypes.number,
    pickupLongitude: PropTypes.number,
    driverCurrentGpsLocLat: PropTypes.number,
    driverCurrentGpsLocLong: PropTypes.number,
    jwtAccessToken: PropTypes.string,
    syncDataAsync: PropTypes.func,
    fetchAddressFromCoordinatesAsync: PropTypes.func,
    getAllProperties: PropTypes.func,
    pageStatus: PropTypes.string,
    changeRegion: PropTypes.func,
    changePageStatus: PropTypes.func,
    fetchApiAdverts: PropTypes.func,
    tripRequestStatus: PropTypes.string,
    tripStatus: PropTypes.string,
    user: PropTypes.object,
    driversList: PropTypes.array,
    allpropertydata: PropTypes.array,
    initialRegion: PropTypes.object,
    destLoc: PropTypes.array
  };

  constructor(props) {
    super(props);
    this.state = {
      coords: [],
      mapReady: false
    };
  }

  UNSAFE_componentWillMount() {
    that = this;
    this.props.fetchAllProperties(this.props.jwtAccessToken);
    if (this.props.tripRequestStatus === "request") {
      this.props.changePageStatus("confirmRide");
    } else {
      this.props.syncDataAsync(this.props.jwtAccessToken);
    }

    if (this.props.destLoc[0] !== undefined) {
      if (this.props.pageStatus === "confirmRide") {
        this.showDirection(this.props.pickUpAddress, this.props.destAddress);
      }
      if (this.props.tripStatus === "onTrip") {
        this.showDirection(
          [
            this.props.driverCurrentGpsLocLat,
            this.props.driverCurrentGpsLocLong
          ],
          this.props.destAddress
        );
      }
      if (
        this.props.pageStatus === "rideBooked" &&
        this.props.tripStatus !== "onTrip" &&
        this.props.destLoc[0] !== undefined
      ) {
        this.showDirection(
          [
            this.props.driverCurrentGpsLocLat,
            this.props.driverCurrentGpsLocLong
          ],
          this.props.pickUpAddress
        );
      }
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.destLoc[0] && nextProps.destLoc[0] && nextProps.pageStatus !== 'pickupEstimateRoute') {
      this.setDestMap();
    }
    if (
      this.props.pickUpAddress !== nextProps.pickUpAddress ||
      this.props.destAddress !== nextProps.destAddress
    ) {
      if (nextProps.pageStatus !== 'pickupEstimateRoute') {
        this.showDirection(nextProps.pickUpAddress, nextProps.destAddress);
      }
    }

    if (
      this.props.tripStatus === "onTrip" &&
      this.props.driverCurrentGpsLocLat !== nextProps.driverCurrentGpsLocLat &&
      this.props.destAddress !== nextProps.destAddress
    ) {
      this.showDirection(
        [this.props.driverCurrentGpsLocLat, this.props.driverCurrentGpsLocLong],
        this.props.destAddress
      );
    }
    if (
      this.props.pageStatus === "rideBooked" &&
      this.props.tripStatus !== "onTrip" &&
      this.props.destLoc[0] !== undefined &&
      this.props.driverCurrentGpsLocLat !== nextProps.driverCurrentGpsLocLat &&
      this.props.pickUpAddress !== nextProps.pickUpAddress
    ) {
      this.showDirection(
        [this.props.driverCurrentGpsLocLat, this.props.driverCurrentGpsLocLong],
        this.props.pickUpAddress
      );
    }
  }

  setDestMap() {
    if (this.props.pageStatus === "confirmRide" && this.props.destLoc[0] !== undefined) {
      const gpsLoc = _.get(this.props, "tripRequest.destLoc", "user.gpsLoc");
      const obj = {
        latitude: gpsLoc[0],
        longitude: gpsLoc[1]
      };
      if (_.isEmpty(obj) === false) {
        this.map.fitToCoordinates([obj], {
          edgePadding: { top: 40, right: 40, bottom: 40, left: 40 },
          animated: true
        });
      }
    }
  }
  _renderAllProperties() {
    if (this.props.allpropertydata && (this.props.allpropertydata).length > 0) {
      return this.props.allpropertydata.map((data, index) => (
        <MapView.Marker key={index} coordinate={data.coordinates}>
          <View style={{ width: 30, height: 30, backgroundColor: commonColor.brandPrimary, borderRadius: 10, justifyContent: "center", alignItems: "center" }}>
            <Icon name="ios-home" style={{ fontSize: 15, color: "#fff" }} />
          </View>
        </MapView.Marker>
      ));
      this.map.fitToElements(true, false);
    } else {
      //console.log(this.props.allpropertydata)
    }
  }
  _renderCofeeMarkers() {
    return (this.props.advertisements.coffee.advertisements).map((data, index) => (
      <MapView.Marker key={index} coordinate={{ latitude: data.latitude, longitude: data.longitude }}>
        <View style={{ width: 30, height: 30, backgroundColor: '#935239', borderRadius: 10, justifyContent: "center", alignItems: "center" }}>
          <Icon name="ios-cafe" style={{ fontSize: 15, color: "#fff" }} />
        </View>
      </MapView.Marker>
    ));
  }
  _renderFoodMarkers() {
    return (this.props.advertisements.food.advertisements).map((data, index) => (
      <MapView.Marker key={index} coordinate={{ latitude: data.latitude, longitude: data.longitude }}>
        <View style={{ width: 30, height: 30, backgroundColor: '#4214cc', borderRadius: 10, justifyContent: "center", alignItems: "center" }}>
          <Icon name="ios-restaurant" style={{ fontSize: 15, color: "#fff" }} />
        </View>
      </MapView.Marker>
    ));
  }
  _renderFunMarkers() {
    return (this.props.advertisements.fun.advertisements).map((data, index) => (
      <MapView.Marker key={index} coordinate={{ latitude: data.latitude, longitude: data.longitude }}>
        <View style={{ width: 30, height: 30, backgroundColor: '#be17c8', borderRadius: 10, justifyContent: "center", alignItems: "center" }}>
          <Icon name="ios-walk" style={{ fontSize: 15, color: "#fff" }} />
        </View>
      </MapView.Marker>
    ));
  }
  _renderRentalMarkers() {
    return (this.props.advertisements.rental.advertisements).map((data, index) => (
      <MapView.Marker key={index} coordinate={{ latitude: data.latitude, longitude: data.longitude }}>
        <View style={{ width: 30, height: 30, backgroundColor: commonColor.brandPrimary, borderRadius: 10, justifyContent: "center", alignItems: "center" }}>
          <Icon name="ios-home" style={{ fontSize: 15, color: "#fff" }} />
        </View>
      </MapView.Marker>
    ));
  }
  _renderNightMarkers() {
    return (this.props.advertisements.nightlife.advertisements).map((data, index) => (
      <MapView.Marker key={index} coordinate={{ latitude: data.latitude, longitude: data.longitude }}>
        <View style={{ width: 30, height: 30, backgroundColor: '#ff1d05', borderRadius: 10, justifyContent: "center", alignItems: "center" }}>
          <Icon name="ios-wine" style={{ fontSize: 15, color: "#fff" }} />
        </View>
      </MapView.Marker>
    ));
  }

  async showDirection(startLoc, destinationLoc) {
    let googleapikey = (this.props.mapKey.googleMapsApiKey) ? this.props.mapKey.googleMapsApiKey : ''

    try {
      if (startLoc && destinationLoc) {
        const resp = await fetch(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${googleapikey}`
        );
        const respJson = await resp.json();
        const points = Polyline.decode(
          respJson.routes[0].overview_polyline.points
        );
        const distance = respJson.routes[0].legs
          .map(leg => leg.distance.value)
          .reduce((a, c) => a + c);
        const coords = points.map((point, index) => {
          return {
            latitude: point[0],
            longitude: point[1]
          };
        });
        this.setState({
          coords: coords,
          distance: distance
        });
      }
    } catch (error) {
      console.log(error, " map line issue ");
    }
  }

  onRegionChange(region) {
    this.setState({ region });
  }
  _renderNearByDrivers() {
    if (
      (this.props.pageStatus === "home" ||
        this.props.pageStatus === "confirmRide" || this.props.pageStatus === "pickupEstimateRoute") &&
      this.props.driversList
    ) {
      return this.props.driversList.map((coordinate, index) => (
        <MapView.Marker key={index} coordinate={coordinate}>
          <View>
            <Icon name="ios-car" style={styles.carIcon} />
          </View>
        </MapView.Marker>
      ));
    }
    return <View />;
  }
  _renderRiderMarker() {
    if (
      this.props.tripStatus !== "onTrip" &&
      this.props.tripStatus !== "endTrip" &&
      this.props.pickupLatitude !== undefined && this.props.pageStatus !== 'pickupEstimateRoute'
    ) {
      return (
        <MapView.Marker
          identifier="RiderMarker"
          coordinate={{
            latitude: this.props.pickupLatitude,
            longitude: this.props.pickupLongitude
          }}
        >
          <View>
            <Icon name="ios-pin" style={styles.pinIcon} />
          </View>
        </MapView.Marker>
      );
    } else {
      if (this.props.region.latitude !== undefined && this.props.region.longitude !== undefined) {
        return (
          <MapView.Marker
            identifier="cuurentlocationmarker"
            coordinate={{
              latitude: this.props.region.latitude,
              longitude: this.props.region.longitude
            }}
          >
            <View style={{ height: 35, width: 35, borderRadius: 25, backgroundColor: "#292922" }}>
              <Thumbnail source={{ uri: this.props.profileImage }} style={{ height: 35, width: 35 }} />
            </View>
          </MapView.Marker>
        )

      }
    }
    this.map.fitToElements(true, false);
  }
  _renderDirectionLine() {
    if (
      this.props.pageStatus !== "home" &&
      (this.props.pageStatus === "confirmRide") &&
      this.props.destLoc[0] !== undefined
    ) {
      return (
        <MapView.Polyline
          coordinates={this.state.coords}
          strokeWidth={2}
          strokeColor={commonColor.brandPrimary}
        />
      );
    }
    if (
      this.props.pageStatus === "rideBooked" &&
      this.props.tripStatus !== "onTrip" &&
      this.props.destLoc[0] !== undefined
    ) {
      return (
        <MapView.Polyline
          coordinates={this.state.coords}
          strokeWidth={2}
          strokeColor={commonColor.brandPrimary}
        />
      );
    }
    if (
      this.props.tripStatus === "onTrip" &&
      this.props.destLoc[0] !== undefined
    ) {
      return (
        <MapView.Polyline
          coordinates={this.state.coords}
          strokeWidth={2}
          strokeColor={commonColor.brandPrimary}
        />
      );
    }
    return <View />;
  }
  _renderDriverMarker() {
    if (
      this.props.pageStatus !== "home" &&
      this.props.pageStatus !== "confirmRide" && this.props.pageStatus !== "pickupEstimateRoute" &&
      this.props.driverCurrentGpsLocLat !== undefined
    ) {
      return (
        <MapView.Marker
          identifier="DriverMarker"
          coordinate={{
            latitude: this.props.driverCurrentGpsLocLat,
            longitude: this.props.driverCurrentGpsLocLong
          }}
        >
          <View>
            <Icon name="ios-car" style={styles.carIcon} />
          </View>
        </MapView.Marker>
      );
    }
    return <View />;
  }

  _fittoSuppliedMarkersbooked() {
    var markers = [
      {
        titl: "dri",
        coordinate: {
          latitude: this.props.driverCurrentGpsLocLat,
          longitude: this.props.driverCurrentGpsLocLong
        }
      },
      {
        titl: "rid",
        coordinate: {
          latitude: this.props.pickupLatitude,
          longitude: this.props.pickupLongitude
        }
      }
    ];
    markers.map((marker, index) => (
      <MapView.Marker
        key={index}
        title={marker.titl}
        coordinate={marker.coordinate}
        style={{ margin: 20 }}
      />
    ));
    this.map.fitToElements(true, false);
  }
  _fittoSuppliedMarkersontrip() {
    if (
      this.props.tripStatus === "onTrip" &&
      this.props.destLoc[0] !== undefined
    ) {
      var markers = [
        {
          titl: "src",
          coordinate: {
            latitude: this.props.driverCurrentGpsLocLat,
            longitude: this.props.driverCurrentGpsLocLong
          }
        },
        {
          titl: "dest",
          coordinate: {
            latitude: this.props.destLoc[0],
            longitude: this.props.destLoc[1]
          }
        }
      ];
      markers.map((marker, index) => (
        <MapView.Marker
          title={marker.titl}
          key={index}
          coordinate={marker.coordinate}
          style={{ margin: 20 }}
        />
      ));
      this.map.fitToElements(true, false);
    }
  }
  _fittoSuppliedMarkersconf() {
    if (
      (this.props.pageStatus === "confirmRide") &&
      this.props.destLoc[0] !== undefined &&
      this.state.mapReady
    ) {
      var markers = [
        {
          titl: "src",
          coordinate: {
            latitude: this.props.pickupLatitude,
            longitude: this.props.pickupLongitude
          }
        },
        {
          titl: "dest",
          coordinate: {
            latitude: this.props.destLoc[0],
            longitude: this.props.destLoc[1]
          }
        }
      ];
      markers.map((marker, index) => (
        <MapView.Marker
          title={marker.titl}
          key={index}
          coordinate={marker.coordinate}
          style={{ margin: 20 }}
        />
      ));
      this.map.fitToElements(true, false);
    }
  }

  _renderDestMarker() {
    if (
      (this.props.pageStatus !== "home" &&
        (this.props.pageStatus === "confirmRide") &&
        this.props.destLoc[0] !== undefined) ||
      this.props.tripStatus === "onTrip"
    ) {
      return (
        <MapView.Marker
          identifier="dest"
          coordinate={{
            latitude: this.props.destLoc[0],
            longitude: this.props.destLoc[1]
          }}
        />
      );
    } else {
      return <View />;
    }
  }

  render() {
    let component = null;
    switch (this.props.pageStatus) {
      case "home":
        component = <Home />;
        break;
      case "confirmRide":
        component = <ConfirmRide />;
        break;
      case "pickupEstimateRoute":
        component = <ConfirmPropertyRide />;
        break;
      case "rideBooked":
        component = <RideBooked />;
        break;
      case "receipt":
        component = <Receipt />;
        break;
      default:
        component = <Home />;
    }
    return (
      <View style={styles.container}>
        <MapView
          ref={ref => {
            this.map = ref;
          }}
          style={
            this.props.pageStatus === "confirmRide"
              ? styles.confirmmap
              : this.props.pageStatus === "rideBooked" &&
                this.props.tripStatus !== "onTrip"
                ? styles.ridebookedmmap
                : this.props.tripStatus === "onTrip"
                  ? styles.ontripmap
                  : styles.map
          }
          onMapReady={() => {
            this.setState({ mapReady: true });
          }}
          followsUserLocation
          fitToElements={MapView.IMMEDIATE_FIT}
          initialRegion={this.props.initialRegion}
          onUserLocationChange={coordinate => {
            this.props.fetchApiAdverts();
          }
          }
          onRegionChangeComplete={region => {
            if (this.props.pageStatus === "home") {
              updatePickupRegion(this.props.user, region); // socket call
              // this.props.changeRegion(region);
              // this.props.fetchAddressFromCoordinatesAsync(region);
            }
          }}
          //maxZoomLevel={15}
          showsCompass={false}
        >
          {this._renderDriverMarker()}
          {this.props.destLoc[0] !== undefined
            ? this._renderDestMarker()
            : null}
          {this._renderRiderMarker()}
          {this._renderAllProperties()}
          {this._renderNearByDrivers()}
          {this.props.advertisements && Object.keys(this.props.advertisements.coffee).length > 0 && this.props.advertisements.coffee.advertisements != 'undefined' && (this.props.advertisements.coffee.advertisements).length > 0 ? this._renderCofeeMarkers() : null}
          {this.props.advertisements && Object.keys(this.props.advertisements.food).length > 0 && this.props.advertisements.food.advertisements != 'undefined' && (this.props.advertisements.food.advertisements).length > 0 ? this._renderFoodMarkers() : null}
          {this.props.advertisements && Object.keys(this.props.advertisements.fun).length > 0 && this.props.advertisements.fun.advertisements != 'undefined' && (this.props.advertisements.fun.advertisements).length > 0 ? this._renderFunMarkers() : null}
          {this.props.advertisements && Object.keys(this.props.advertisements.rental).length > 0 && this.props.advertisements.rental.advertisements != 'undefined' && (this.props.advertisements.rental.advertisements).length > 0 ? this._renderRentalMarkers() : null}
          {this.props.advertisements && Object.keys(this.props.advertisements.nightlife).length > 0 && this.props.advertisements.nightlife.advertisements != 'undefined' && (this.props.advertisements.nightlife.advertisements).length > 0 ? this._renderNightMarkers() : null}

          {this.props.destLoc[0] !== undefined
            ? this._renderDirectionLine()
            : null}

          {this.props.destLoc[0] !== undefined && this.state.mapReady
            ? this._fittoSuppliedMarkersconf()
            : null}
          {this.props.pageStatus === "rideBooked" &&
            this.props.destLoc[0] !== undefined &&
            this.props.tripStatus !== "onTrip" &&
            this.state.mapReady
            ? this._fittoSuppliedMarkersbooked()
            : null}
          {this.props.destLoc[0] !== undefined &&
            this.props.tripStatus === "onTrip" &&
            this.state.mapReady
            ? this._fittoSuppliedMarkersontrip()
            : null}

        </MapView>

        {component}
      </View>
    );
  }
}
function bindActions(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    fetchUserCurrentLocationAsync: () =>
      dispatch(fetchUserCurrentLocationAsync()),
    changeRegion: region => dispatch(changeRegion(region)),
    fetchAddressFromCoordinatesAsync: region =>
      dispatch(fetchAddressFromCoordinatesAsync(region)),
    clearTripAndTripRequest: () => dispatch(clearTripAndTripRequest()),
    changePageStatus: newPage => dispatch(changePageStatus(newPage)),
    syncDataAsync: jwtAccessToken => dispatch(syncDataAsync(jwtAccessToken)),
    clearReducerState: () => dispatch(clearReducerState()),
    fetchFareDetail: tripCoordinates =>
      dispatch(fetchFareDetail(tripCoordinates)),
    fetchAllProperties: jwtAccessToken => dispatch(getAllProperties(jwtAccessToken)),
    fetchApiAdverts: () => dispatch(fetchAdvertisements())
  };
}

function setCurrentMap() {
  const gpsLoc = that.props.user.gpsLoc;
  const obj = {
    latitude: gpsLoc[0],
    longitude: gpsLoc[1]
  };
  that.map.fitToCoordinates([obj], {
    // edgePadding: {
    //   top: Platform.OS === 'android' ? 350 : 150,
    //   right: 20,
    //   left: 20,
    //   // bottom: (Platform.OS === 'android') ? 800 : 320;
    // },
    animated: true
  });
}

export { setCurrentMap };
export default connect(
  mapStateToProps,
  bindActions
)(RootView);
