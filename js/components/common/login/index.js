import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Platform,
  StatusBar,
  Dimensions,
  PermissionsAndroid,
  NetInfo,
  Image
} from "react-native";
import Permissions from "react-native-permissions";
import { Text, Spinner} from "native-base";
import PropTypes from "prop-types";

import SignIn from "../signIn/";
import { setActiveLogin } from "../../../actions/common/entrypage";
import ModalView from "../ModalView";
import { connectionState } from "../../../actions/network";

class Login extends Component {
  static propTypes = {
    setActiveLogin: PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  state = {
    activeLogin: null
  };

  UNSAFE_componentWillMount() {
    this.requestCameraPermission();
    navigator.geolocation.getCurrentPosition(
      position => {
        //console.log(position);
      },
      error => console.log(new Date(), error)
    );
    setTimeout(() => {
      this.setState({ loading: false });
    }, 600);
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this._handleConnectionChange
    );
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.activeLogin !== null) {
      this.setState({
        activeLogin: nextProps.activeLogin
      });
    } else if (nextProps.activeLogin === null) {
      this.setState({
        activeLogin: null
      });
    }
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this._handleConnectionChange
    );
  }

  _handleConnectionChange = isConnected => {
    this.props.connectionState({ status: isConnected });
  };

  async requestCameraPermission() {
	if(Platform.OS!="ios"){
		try {
		  const granted = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
			{
			  title: "Location Permission",
			  message: "Taxi App needs access to your GPS "
			}
		  );
		  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
			console.log("You can use the GPS");
		  } else {
			console.log("GPS permission denied");
		  }
		} catch (err) {
		  console.warn(err);
		}
	}else{
		Permissions.check("location", { type: "always" }).then(response => {
		  this.setState({ locationPermission: response });
		  console.log("here in location 1", response);
		});
		Permissions.request("location", { type: "always" }).then(response => {
		  this.setState({ locationPermission: response });
		  console.log("here in location 2", response);
		});
	}
}
  render() {
    if (this.state.loading) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Spinner />
        </View>
      );
    } else {
      if (Object.keys(this.props.appConfig).length === 0) {
        return (
          <ModalView>
            <Text>No App Configuration Data</Text>
          </ModalView>
        );
      } else {
        return (
          <View style={{ flex: 1,flexDirection: 'column'}}>
            <StatusBar barStyle="light-content" />
              <SignIn/>
          </View>
        );
      }
    }
  }
}

function mapStateToProps(state) {
  return {
    activeLogin: state.entrypage.active,
    appConfig: state.basicAppConfig.config
  };
}

function bindActions(dispatch) {
  return {
    setActiveLogin: page => dispatch(setActiveLogin(page)),
    connectionState: status => dispatch(connectionState(status))
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(Login);
