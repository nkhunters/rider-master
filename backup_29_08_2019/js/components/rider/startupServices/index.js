import React, { Component } from "react";
import { connect } from "react-redux";
import { Dimensions, NetInfo } from "react-native";
import PropTypes from "prop-types";
import OneSignal from "react-native-onesignal";

import Spinner from "../../loaders/Spinner";
import {
  fetchUserCurrentLocationAsync,
  mapDeviceIdToUser
} from "../../../actions/rider/home";
import { connectionState } from "../../../actions/network";
import { socketRiderInit, updateLocation } from "../../../services/ridersocket";
import RootView from "../rootView";
import * as appStateSelector from "../../../reducers/rider/appState";
import config from "../../../../config.js";
import { fetchAdvertisements } from "../../../actions/rider/advertisements";
const { width, height } = Dimensions.get("window");
const aspectRatio = width / height;

function mapStateToProps(state) {
  return {
    region: {
      latitude: state.rider.user.gpsLoc[0],
      longitude: state.rider.user.gpsLoc[1],
      latitudeDelta: state.rider.user.latitudeDelta,
      longitudeDelta: state.rider.user.latitudeDelta * aspectRatio
    },
    user: state.rider.user,
    isInitialLocationFetched: appStateSelector.isInitialLocationFetched(state),
    jwtAccessToken: state.rider.appState.jwtAccessToken,
	loadingAdvertisements:state.rider.advertisement.loadingAdvertisements
  };
}

class RiderStartupServices extends Component {
  static propTypes = {
    fetchUserCurrentLocationAsync: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    isInitialLocationFetched: PropTypes.bool,
	loadingAdvertisements : PropTypes.bool,
    region: PropTypes.object
	//fetchAdvertisements:PropTypes.func
  };
  state = {
    notification: {}
  };

  UNSAFE_componentWillMount() {
    OneSignal.init(config.OnesignalAppId);
    OneSignal.addEventListener("ids", this.onIds);
    OneSignal.addEventListener("received", this.onReceived);
    OneSignal.addEventListener("opened", this.onOpened);
    const { mapDeviceIdToUser, jwtAccessToken } = this.props;
    OneSignal.getPermissionSubscriptionState(status => {
      console.log(status.userId, status.pushToken);
      mapDeviceIdToUser(jwtAccessToken, status.userId, status.pushToken);
    });

    this.props.fetchUserCurrentLocationAsync();
    updateLocation(this.props.user);
	//this.props.fetchAdvertisements();
  }
  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this._handleConnectionChange
    );
    socketRiderInit();
    this.props.fetchUserCurrentLocationAsync();
    updateLocation(this.props.user);
	//this.props.fetchAdvertisements();
  }

  componentWillUnmount() {
    OneSignal.removeEventListener("ids", this.onIds);
    NetInfo.isConnected.removeEventListener(
      "change",
      this._handleConnectionChange
    );
  }
  _handleConnectionChange = isConnected => {
    this.props.connectionState({ status: isConnected });
  };
  onIds = device => {
    this.oneSignalDeviceInfo = device;
    console.log("device info", device);
  };

  render() {
    // eslint-disable-line class-methods-use-this
    if (this.props.isInitialLocationFetched && this.props.region.latitude) {
      return <RootView initialRegion={this.props.region} />;
    }
    return <Spinner />;
  }
}

function bindActions(dispatch) {
  return {
    fetchUserCurrentLocationAsync: () =>
      dispatch(fetchUserCurrentLocationAsync()),
    mapDeviceIdToUser: (jwtAccessToken, deviceId, pushToken) =>
      dispatch(mapDeviceIdToUser(jwtAccessToken, deviceId, pushToken)),
    connectionState: status => dispatch(connectionState(status)),
	//fetchAdvertisements : ()=>dispatch(fetchAdvertisements())
  };
}
export default connect(
  mapStateToProps,
  bindActions
)(RiderStartupServices);
