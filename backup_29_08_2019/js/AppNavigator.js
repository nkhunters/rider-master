import React, { Component } from "react";
import { StatusBar, BackHandler } from "react-native";
import { connect } from "react-redux";
import { Scene, Router, Actions, Stack } from "react-native-router-flux";
import PropTypes from "prop-types";
import SplashScreen from "react-native-splash-screen";
import { getAppConfig } from "./actions/appConfig";

import { closeDrawer } from "./actions/drawer";
import NavigationDrawer from "./DrawerNavigator";
import Login from "./components/common/login/";
import SignIn from "./components/common/signIn/";
import Register from "./components/common/register/";
import RiderStartupService from "./components/rider/startupServices";
import RootView from "./components/rider/rootView";
import Home from "./components/rider/home/";
import SuggestLocation from "./components/rider/suggestLocation/";
import SideBar from "./components/rider/sideBar";
import Payment from "./components/rider/payment";
import History from "./components/rider/history";
import Notifications from "./components/rider/notifications";
import Settings from "./components/rider/settings";
import CardPayment from "./components/rider/cardPayment";
import CreditCardq from "./components/rider/creditCard";
import SaveCards from "./components/rider/saveCards";
import PaymentDetails from "./components/rider/paymentDetails";
import PaymentConfirm from "./components/rider/paymentConfirm";
import ConfirmRide from "./components/rider/confirmRide";
import ConfirmPropertyRide from "./components/rider/ConfirmPropertyRide";
import confirmPickup from "./components/rider/confirmPickup";
import ConfirmPropertyPickup from "./components/rider/ConfirmPropertyPickup";
import RideBooked from "./components/rider/rideBooked";
import Receipt from "./components/rider/receipt";
import SearchProperty from "./components/rider/searchProperty";
import singleProperty from "./components/rider/singleProperty";
import singlePropertySearch from "./components/rider/singlePropertySearch";
import { statusBarColor } from "./themes/base-theme";

const RouterWithRedux = connect()(Router);

class AppNavigator extends Component {
  static propTypes = {
    riderJwtAccessToken: PropTypes.string
  };

  UNSAFE_componentWillMount() {
    this.props.getAppConfig();
  }
  componentDidMount() {
    //SplashScreen.hide();
    BackHandler.addEventListener("hardwareBackPress", () => this.backAndroid()); // Listen for the hardware back button on Android to be pressed
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", () =>
      this.backAndroid()
    ); // Remove listener
  }

  backAndroid() {
    if (Actions.state.index === 0) {
      return false;
    }
    Actions.pop();
    return true;
  }
  render() {
    return (
      <NavigationDrawer>
        <StatusBar backgroundColor={statusBarColor} />
        <RouterWithRedux>
          <Stack key="root" hideNavBar>
            <Scene
              key="login"
              component={Login}
              hideNavBar
              initial={!this.props.riderJwtAccessToken ? true : false}
            />
            <Scene key="signIn" component={SignIn} />
            <Scene key="register" component={Register} />

            <Scene
              key="riderStartupService"
              component={RiderStartupService}
              hideNavBar
              initial={this.props.riderJwtAccessToken}
            />
			<Scene key="searchProperty" component={SearchProperty}/>			
			<Scene key="singleProperty" component={singleProperty}/>
            <Scene key="rootView" component={RootView} />
            <Scene key="home" component={Home} />
            <Scene key="confirmRide" component={ConfirmRide} />
            <Scene key="ConfirmPropertyRide" component={ConfirmPropertyRide} />
			<Scene key="confirmPickup" component={confirmPickup} />
			<Scene key="confirmPropertyPickup" component={ConfirmPropertyPickup} />
            <Scene key="rideBooked" component={RideBooked} />

            <Scene key="sideBar" component={SideBar} />
            <Scene
              key="suggestLocation"
              component={SuggestLocation}
              hideNavBar
            />
            <Scene key="payment" component={Payment} />
            <Scene key="history" component={History} />
            <Scene key="notifications" component={Notifications} />
            <Scene key="settings" component={Settings} />
            <Scene key="cardPayment" component={CardPayment} />
            <Scene key="creditCardq" component={CreditCardq} />
            <Scene key="saveCards" component={SaveCards} />
            <Scene key="paymentDetails" component={PaymentDetails} />
            <Scene key="paymentConfirm" component={PaymentConfirm} />
            <Scene key="receipt" component={Receipt} />
			<Scene key="singlePropertySearch" component={singlePropertySearch}/>
          </Stack>
        </RouterWithRedux>
      </NavigationDrawer>
    );
  }
}
function bindAction(dispatch) {
  return {
    getAppConfig: () => dispatch(getAppConfig())
  };
}
const mapStateToProps = state => ({
  riderApproved: state.rider.user.isApproved,
  riderJwtAccessToken: state.rider.appState.jwtAccessToken
});

export default connect(
  mapStateToProps,
  bindAction
)(AppNavigator);
