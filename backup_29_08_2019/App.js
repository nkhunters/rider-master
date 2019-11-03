import React from "react";
import OneSignal from "react-native-onesignal";
import { Sentry } from "react-native-sentry";
import Setup from "./js/setup";
import { AppLoading, Asset, Icon } from 'expo';
import * as Font from 'expo-font';

Sentry.config('https://ef154b513fce4426a907eff69f0d07a0@sentry.io/1514328').install();

export default class App extends React.Component {
	state = {
		isLoadingComplete: false,
	};
	// UNSAFE_componentWillMount() {
	// 	OneSignal.init("df137503-fb26-4180-aebc-ca6835152506");
	// 	OneSignal.addEventListener("ids", this.onIds);
	// }
	// componentWillUnmount() {
	// 	OneSignal.removeEventListener("ids", this.onIds);
	// }
	// onIds(device) {
	// 	console.log("Device info: ", device);
	// }
	render() {
		console.disableYellowBox = true;
		if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
			return (
				<AppLoading
				  startAsync={this._loadResourcesAsync}
				  onError={this._handleLoadingError}
				  onFinish={this._handleFinishLoading}
				/>
			);
		}else{
			return (<Setup/>);
		}
	}
	_loadResourcesAsync = async () => {
		return Promise.all([
		  Font.loadAsync({
			'Roboto': require('native-base/Fonts/Roboto.ttf'),
			'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
		  }),
		]);
	};
	_handleLoadingError = error => {
		// In this case, you might want to report the error to your error
		// reporting service, for example Sentry
		console.warn(error);
	};

	_handleFinishLoading = () => {
		this.setState({ isLoadingComplete: true });
	};
}
