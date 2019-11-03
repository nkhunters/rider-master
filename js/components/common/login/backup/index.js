import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Platform,
  StatusBar,
  Dimensions,
  PermissionsAndroid,
  NetInfo
} from "react-native";
import { Content, Text, Button, Icon, Spinner } from "native-base";
import PropTypes from "prop-types";
import { Actions } from "react-native-router-flux";

import Register from "../register/";
import SignIn from "../signIn/";
import { setActiveLogin } from "../../../actions/common/entrypage";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import ModalView from "../ModalView";
import { connectionState } from "../../../actions/network";

import styles from "./styles";
const deviceHeight = Dimensions.get("window").height;

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
        console.log(position);
      },
      error => console.log(new Date(), error)
    );
    setTimeout(() => {
      this.setState({ loading: false });
    }, 600);
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      "change",
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

  requestCameraPermission() {
	if(Platform.OS!=="ios"){
		try {
		  const granted = PermissionsAndroid.request(
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
		
	}
  }
  render() {
    if (this.state.activeLogin === "signin") {
      return <SignIn />;
    }
    if (this.state.activeLogin === "register") {
      return <Register />;
    }

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
          <View style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" />
            <Content style={{ backgroundColor: commonColor.brandPrimary }}>
              <View
                style={
                  Platform.OS === "ios"
                    ? styles.iosLogoContainer
                    : styles.aLogoContainer
                }
              >
                <Icon name="ios-car" style={styles.logoIcon} />
                <Text style={styles.logoText}>Taxi App</Text>
              </View>
              <View
                style={
                  Platform.OS === "ios"
                    ? { top: deviceHeight / 2, padding: 10 }
                    : { padding: 10 }
                }
              >
                <Button
                  rounded
                  onPress={() => Actions.signIn()}
                  transparent
                  block
                  style={styles.loginBtn}
                >
                  <Text style={{ fontWeight: "600", color: "#fff" }}>
                    Sign In
                  </Text>
                </Button>
                <Button
                  rounded
                  onPress={() => Actions.register()}
                  block
                  style={styles.registerBtn}
                >
                  <Text style={{ fontWeight: "600", color: "#fff" }}>
                    Register
                  </Text>
                </Button>
              </View>
            </Content>
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
