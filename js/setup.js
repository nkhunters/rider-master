import React, { Component } from "react";
import { Provider } from "react-redux";
import { StyleProvider, Spinner } from "native-base";
import Permissions from "react-native-permissions";
import App from "./App";
import configureStore from "./configureStore";
import getTheme from "../native-base-theme/components";
import variables from "../native-base-theme/variables/commonColor";
export const storeObj = {};

export default class Setup extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      store: configureStore(() => this.setState({ isLoading: false })),
      isReady: false,
      notification: {},
      types: [],
      status: {}
    };
    storeObj.store = this.state.store;
  }
  UNSAFE_componentWillMount() {
    this.setState({ isReady: true });
  }
  componentDidMount() {
    this.LocationPermission();
  }
  async LocationPermission(){
	  await Permissions.check("location", { type: "always" }).then(response => {
      this.setState({ locationPermission: response });
      console.log("here in location 1", response);
    });
    await Permissions.request("location", { type: "always" }).then(response => {
      this.setState({ locationPermission: response });
      console.log("here in location 2", response);
    });
  }
  render() {
    if (!this.state.isReady || this.state.isLoading) {
      return <Spinner />;
    }
    return (
      <StyleProvider style={getTheme(variables)}>
        <Provider store={this.state.store}>
          <App />
        </Provider>
      </StyleProvider>
    );
  }
}
