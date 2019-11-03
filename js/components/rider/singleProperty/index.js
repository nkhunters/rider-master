import React, { Component } from "react";
import {
  Text,SafeAreaView,Image,TouchableOpacity,
  Dimensions,ImageBackground,Keyboard,
  Alert,Animated,TouchableWithoutFeedback,
  View,ScrollView,
} from "react-native";
import { connect } from "react-redux";
import _ from "lodash";
import PropTypes from "prop-types";
import {
    Icon
} from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { Actions } from "react-native-router-flux";
import { tripRequestUpdated } from "../../../actions/rider/rideBooked";
import styles from "./styles";
//import GoogleStaticMap from 'react-native-google-static-map';
import MapView from 'react-native-maps';
import commonColor from "../../../../native-base-theme/variables/commonColor";
function mapStateToProps(state) {
  return {
	mapKey:state.basicAppConfig.config,
	region: {
      latitude: state.rider.user.gpsLoc[0],
      longitude: state.rider.user.gpsLoc[1]
    }
  };
}
class singleProperty extends Component {
  static propTypes={
	tripEstimateTime:PropTypes.func
  }
  constructor(props) {
    super(props);
	this.state={
		data:props
	}
  }
  _confirmPick(){
	  let propertydetails = JSON.parse(this.state.data.data);
	  let property_lat = propertydetails.latitude;
	  let property_long = propertydetails.longitude;
	  let obj = {
		  tripRequestStatus:'enRoute',
		  srcLoc:[this.props.region.latitude,this.props.region.longitude],
		  destLoc:[property_lat,property_long]
	  }
	  this.props.tripEstimateTime(obj);
	  Actions.rootView();
  }
  navigateToBack(){
	  Actions.pop();
  }
  _renderMarker(property_category){
		if(property_category=='Food'){
			return (<View style={{width:30,height:30,backgroundColor:'#4214cc',borderRadius:10,justifyContent:"center",alignItems:"center"}}>
					<Icon name="ios-restaurant" style={{fontSize:15,color:"#fff"}}/>
				</View>)
		}else if(property_category=='Coffee'){
			return (<View style={{width:30,height:30,backgroundColor:'#935239',borderRadius:10,justifyContent:"center",alignItems:"center"}}>
					<Icon name="ios-cafe" style={{fontSize:15,color:"#fff"}}/>
				</View>)
		}else if(property_category=='Fun'){
			return (<View style={{width:30,height:30,backgroundColor:'#be17c8',borderRadius:10,justifyContent:"center",alignItems:"center"}}>
					<Icon name="ios-walk" style={{fontSize:15,color:"#fff"}}/>
				</View>)
		}else if(property_category=='Rental'){
			return (<View style={{width:30,height:30,backgroundColor:commonColor.brandPrimary,borderRadius:10,justifyContent:"center",alignItems:"center"}}>
					<Icon name="ios-home" style={{fontSize:15,color:"#fff"}}/>
				</View>)
		}else if(property_category=='Nightlife'){
			return (<View style={{width:30,height:30,backgroundColor:'#ff1d05',borderRadius:10,justifyContent:"center",alignItems:"center"}}>
					<Icon name="ios-wine" style={{fontSize:15,color:"#fff"}}/>
				</View>)
		}else{
			return ;
		}
  }
  render(){
	  const { data } = this.state;
	  var propertydetails = JSON.parse(data.navigation.state.params.data);
	  var image = propertydetails.bizimgs!='undefined' && (propertydetails.bizimgs).length>0?propertydetails.bizimgs[0].imageBuffer:(propertydetails.bizphotoimgs!='undefined' && (propertydetails.bizphotoimgs).length>0?propertydetails.bizphotoimgs[0].imageBuffer:'');
	  var property_heading = propertydetails.name;
	  var property_description =propertydetails.description;
	  var property_number = propertydetails.phone;
	  var property_lat = propertydetails.latitude;
	  var property_long = propertydetails.longitude;
	  var property_category = propertydetails.category;
	  //console.log(googleapikey);
    return(
		 <ImageBackground source={{uri: `data:image/gif;base64,${image}`}} resizeMode='stretch' style={{width: '100%', height: '60%',flex:1}}>
	      <SafeAreaView style={{flex: 1}}>
          <View style={styles.container}>
		  <ScrollView style={{flex:1}}>
		   <View style={styles.topContainer}>
                <View style={styles.row}>
						 <View style={styles.col1}>
							   <TouchableWithoutFeedback onPress={() => this.navigateToBack()}>
									<Icon name="ios-arrow-round-back" style={styles.backiconstyles}/>
								</TouchableWithoutFeedback>
						 </View>
						 <View style={styles.col2}>
							   <TouchableWithoutFeedback onPress={this.props.onBackButtonClick}>
								  <MaterialCommunityIcons name="filter-variant" style={styles.filtericonStyle}/>
								</TouchableWithoutFeedback>
						 </View>
				</View>
				 <View style={styles.row2}>
				   <Text style={styles.slider_heading}>{property_heading}</Text>
				    <View style={styles.starRow}>
					     <View style={styles.star}>
					      <FontAwesomeIcons name="star" size={20} style={styles.FontAwesomeIcons}/>
						 </View>
						  <View style={styles.star}>
					      <FontAwesomeIcons name="star" size={20} style={styles.FontAwesomeIcons}/>
						 </View>
						  <View style={styles.star}>
					      <FontAwesomeIcons name="star" size={20} style={styles.FontAwesomeIcons}/>
						 </View>
						  <View style={styles.star}>
					      <FontAwesomeIcons name="star-o" size={20} style={styles.FontAwesomeIcons1}/>
						 </View>
						  <View style={styles.star}>
					      <FontAwesomeIcons name="star-o" size={20} style={styles.FontAwesomeIcons1}/>
						 </View>
						 <View>
					      <Text style={styles.revTxt}>24 Reviews</Text>
						 </View>

					 </View>
				 </View>
           </View>
		   <View style={styles.bottomContainer}>
              <Text style={styles.des}>Description</Text>
			  <Text style={styles.des1}>{property_description}</Text>
             <View style={{flexDirection:'row',paddingTop:22}}>
			    <View style={styles.phonIcon}>
				  <View style={styles.phon}>
				   <SimpleLineIcons name="phone" size={22} style={styles.SimpleLineIcons}/>
				  </View>
				</View>
				 <View style={styles.phonIcon1}>
					<Text style={styles.phoneText}>{property_number}</Text>
				</View>
			 </View>
			 <View style={styles.mapView}>
				<MapView
					initialRegion={{
						latitude: property_lat,
						longitude: property_long,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					}}
					style={{height:150,width:'100%'}}
					maxZoomLevel={14}
					showsCompass={false}
					scrollEnabled={false}
					pitchEnabled={false}
				   >
					<MapView.Marker coordinate={{latitude:property_lat,longitude:property_long}}>
					{this._renderMarker(property_category,property_lat,property_long)}
					</MapView.Marker>
				</MapView>
			 </View>
			 <TouchableOpacity style={styles.btn}  onPress={() => this._confirmPick()}>
			   <Text style={{textAlign:'center',color:'#fff',fontSize:16,fontWeight:'700'}}>GO THERE</Text>
			 </TouchableOpacity>
		   </View>
		   </ScrollView>



	 	 </View>



	  </SafeAreaView>

	    </ImageBackground>
	  )
  }

}

function mapActionToProps(dispatch){
	return {
		tripEstimateTime:(tripObject)=>dispatch(tripRequestUpdated(tripObject))
	}
}
export default connect(mapStateToProps,mapActionToProps)(singleProperty);
