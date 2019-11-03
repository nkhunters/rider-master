import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Platform,
  Dimensions,
  TouchableOpacity,
  BackHandler,
  TextInput,
  Animated,SafeAreaView
} from "react-native";
import _ from "lodash";
import PropTypes from "prop-types";
import {
  Text,
  Button,
  Icon,
  Item,
  Col,
  Row,
  Input,
  Footer
} from "native-base";
import { Actions } from "react-native-router-flux";
import OneSignal from "react-native-onesignal";
import {searchSetValue,searchProperty} from "../../../actions/rider/search"
import { openDrawer, closeDrawer } from "../../../actions/drawer";
import {
  changeRegion,
  changePageStatus,
  fetchUserCurrentLocationAsync,
  fetchAddressFromCoordinatesAsync,
  currentLocation
} from "../../../actions/rider/home";
import { fetchAdvertisements } from "../../../actions/rider/advertisements";
import styles from "./styles";
import Nearby from "../nearby";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import config from "../../../../config.js";
import * as AdvertisementSelector from "../../../reducers/rider/advertisement";
const { width, height } = Dimensions.get("window");
const aspectRatio = width / height;
const slidescreen=-(height);
function mapStateToProps(state) {
  return {
    region: {
      latitude: state.rider.user.gpsLoc[0],
      longitude: state.rider.user.gpsLoc[1],
      latitudeDelta: state.rider.user.latitudeDelta,
      longitudeDelta: state.rider.user.latitudeDelta * aspectRatio
    },
    isConnected: state.network.isConnected,
    pickUpAddress: state.rider.tripRequest.pickUpAddress,
    currentAddress: state.rider.user.address,
    destAddress: state.rider.tripRequest.destAddress,
    mapRegion: state.rider.tripRequest.srcLoc,
	mapKey:state.basicAppConfig.config,
	advertisements:AdvertisementSelector.advertismentsData(state)
  };
}
class Home extends Component {
  static propTypes = {
    changePageStatus: PropTypes.func,
    openDrawer: PropTypes.func,
    currentLocation: PropTypes.func,
    searchSetValue:PropTypes.func,
    searchProperty:PropTypes.func,
	  fetchApiAdverts:PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      string: "",
      currentLatitude: "",
      currentLongitude: "",
      searchProperty:null,
      slideAnimation: new Animated.Value(slidescreen),
      baseAdvertUrl : 'https://dispatch-ads.herokuapp.com/api/webservice/dispatch-ads-everything_api?type=category&value=',
      advertismentData:[]
    };
    this.handleSearch=this.handleSearch.bind(this)
    this.handleSlideAnimation=this.handleSlideAnimation.bind(this)
    this.handleBackSlideAnimation=this.handleBackSlideAnimation.bind(this)
  }
  UNSAFE_componentWillMount() {
    OneSignal.init(config.OnesignalAppId);
    OneSignal.addEventListener("ids", this.onIds);
    this.props.closeDrawer();
    //this.handleAdvertismentFood();
  }

  componentDidMount() {
    this.props.currentLocation();
    if (this.props.pickUpAddress === undefined) {
      this.props.fetchAddressFromCoordinatesAsync(this.props.region);
    }
	  this.props.fetchApiAdverts();
    BackHandler.addEventListener("hardwareBackPress", () => this.backAndroid());
  }

  componentWillUnmount() {
    OneSignal.removeEventListener("ids", this.onIds);
    BackHandler.removeEventListener("hardwareBackPress", () =>
      this.backAndroid()
    ); // Remove listener
  }

  onIds = device => {
    this.oneSignalDeviceInfo = device;
    console.log("device info", device);
  };
  setLocationClicked() {
    this.props.destAddress
      ? this.props.changePageStatus("confirmRide")
      : Actions.suggestLocation({
          heading: "Destination Location",
          page: "destination"
        });
  }
  SearchResult(value){
    this.setState({searchProperty:value})
  }
  handleSearch(){
    if(this.state.searchProperty){
      this.props.searchSetValue(this.state.searchProperty)
      Actions.searchProperty();
      this.props.searchProperty(this.state.searchProperty)
    }
	return true
  }
  backAndroid() {
    Actions.home(); // Return to previous screen
    return true; // Needed so BackHandler knows that you are overriding the default action and that it should not close the app
  }
  handleSlideAnimation(){
    Animated.timing(
      this.state.slideAnimation,
      {
        toValue: 0,
        duration: 1000,
      }
    ).start();
  }
  handleBackSlideAnimation(){
    Animated.timing(
      this.state.slideAnimation,
      {
        toValue: slidescreen,
        duration: 1000,
      }
    ).start();
  }
  render() {
    let {slideAnimation} = this.state
    return (
      <View pointerEvents="box-none" style={{ flex: 1 ,position:"relative"}}>
        <View style={styles.locateIcon}>
          <Col>
            <Row style={Platform.OS === "ios" ? { top: -5 } : { top: -5 }}>
              <TouchableOpacity
                style={{ flexDirection: "row", flex: 1 }}
                onPress={() => this.props.currentLocation()}
              >
                <Icon
                  name="ios-locate"
                  style={{
                    fontSize: 40,
                    color: commonColor.brandPrimary,
                    backgroundColor: "transparent"
                  }}
                />
              </TouchableOpacity>
            </Row>
          </Col>
        </View>
        <View style={styles.headerContainer} pointerEvents="box-none">
          <View style={{flex:0.8,height:35}}>
          </View>
          <View
            style={Platform.OS === "ios" ? styles.iosSrcdes : styles.aSrcdes}
          >

            <View style={Platform.OS === "ios" ?styles.iosSearchBar:styles.aSearchBar}>
                <Item
                  regular
                  style={{
                    backgroundColor: "#FFF",
                    marginLeft: 0,
                    borderColor: "transparent",
                    borderRadius: 10
                  }}
                >
                  <Button transparent onPress={this.props.openDrawer}>
                          <Icon name="ios-menu" style={styles.searchIcon} />
                  </Button>
                  <Input
                  type="text"
                  name="destination"
                  placeholder="Where to?"
                  placeholderTextColor="#9098A1"
                  onChangeText={this.SearchResult.bind(this)}
                  onSubmitEditing={this.handleSearch}
                  style={{fontSize:16,fontWeight:'500'}}
                  disabled
                  />
                </Item>
            </View>
          </View>
        </View>
        <Animated.View style={{position:"absolute",bottom:slideAnimation}}>
          {this.props.advertisements && (this.props.advertisements).length>0?(
            <Nearby onWidgetClick={this.handleSlideAnimation} onBackClick={this.handleBackSlideAnimation} sliderData={this.props.advertisements}/>
          )
          :
          null}
        </Animated.View>
      </View>

    );
  }
}
function bindActions(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    closeDrawer: () => dispatch(closeDrawer()),
    changeRegion: region => dispatch(changeRegion(region)),
    changePageStatus: newPage => dispatch(changePageStatus(newPage)),
    fetchUserCurrentLocationAsync: () =>
      dispatch(fetchUserCurrentLocationAsync()),
    currentLocation: () => dispatch(currentLocation()),
    fetchAddressFromCoordinatesAsync: region =>
      dispatch(fetchAddressFromCoordinatesAsync(region)),
    searchSetValue:value=>dispatch(searchSetValue(value)),
    searchProperty:(value)=>dispatch(searchProperty(value)),
	fetchApiAdverts:()=>dispatch(fetchAdvertisements())
  };
}
export default connect(
  mapStateToProps,
  bindActions
)(Home);
