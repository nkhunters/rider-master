import React, { Component } from "react";
import { connect } from "react-redux";
import { Platform, View , Image} from "react-native";
import PropTypes from "prop-types";
import FAIcon from "react-native-vector-icons/FontAwesome";
import {
  Spinner,
  Toast
} from "native-base";
import * as userSelector from "../../../reducers/rider/user";
import * as appStateSelector from "../../../reducers/rider/appState";
import LoginForm from "./form";
import ModalView from "../ModalView";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
const applogo=require('../../../../assets/images/logo.png');
function mapStateToProps(state) {
  return {
    loadingStatus: state.rider.appState.loadingStatus,
    isLoggedIn: state.rider.appState.isLoggedIn,
    loginError: state.rider.appState.loginError,
    userType: userSelector.getUserType(state),
    errormsg: appStateSelector.getErrormsg(state),
    isFetching: appStateSelector.isFetching(state),
    socialLogin: state.entrypage.socialLogin,
    pageStatus: state.rider.appState.pageStatus,
    appConfig: state.basicAppConfig.config
  };
}
class SignIn extends Component {
  static propTypes = {
    loginError: PropTypes.bool,
    errormsg: PropTypes.string,
    isFetching: PropTypes.bool
  };
  constructor(props) {
    super(props);
    this.state = {
      socialLogin: null,
      extraHeight:299
    };
  }
  state = {
    showError: false
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.loginError) {
      this.setState({
        showError: true
      });
    } else {
      this.setState({
        showError: false
      });
    }
    if (nextProps.socialLogin.email !== null) {
      this.setState({ socialLogin: nextProps.socialLogin });
    }
  }

  showLoaderModal() {
    return (
      <ModalView>
        <Spinner />
      </ModalView>
    );
  }
  dynamicScrollHeight(height){
    this.setState({extraHeight:height})
  }
  render() {
    let extraHeight=this.state.extraHeight
    return (
      <View style={{flex:1,backgroundColor:commonColor.brandPrimary}}>
			<View style={{flex:3}}>
				<KeyboardAwareScrollView innerRef={ref => {this.scroll = ref}} scrollToEnd={true} enableResetScrollToCoords={true} extraHeight={extraHeight} enableOnAndroid={true} keyboardShouldPersistTaps="handled" contentContainerStyle={{flexGrow: 3}}>
          <View style={
                  Platform.OS === "ios"
                    ? styles.iosLogoContainer
                    : styles.aLogoContainer
                }
          >
            <Image source={applogo} style={styles.logoStyle} />
          </View>
          <View style={styles.container}>
            <View style={styles.triangleCorner}></View>
          </View>
          <View style={styles.loginViewStyle}>
            <LoginForm isFetching={this.props.isFetching} onFocusName={()=>this.dynamicScrollHeight(299)} onFocusProperty={()=>this.dynamicScrollHeight(208)} onFocusRoom={()=>this.dynamicScrollHeight(125)}/>
            {this.state.showError &&
              Toast.show({
                text: this.props.errormsg,
                position: "bottom",
                duration: 1500
              })}
          </View>
          {this.props.loadingStatus ? this.showLoaderModal() : null}
          </KeyboardAwareScrollView>
        </View>
      </View>
    );
  }
}


export default connect(mapStateToProps, null)(SignIn);
