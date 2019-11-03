import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Platform,
  TouchableOpacity,
  Dimensions
} from "react-native";
import {
    Text,
    Button,
    Icon,
    Item,
    Input,
    List,
    ListItem,
    Left,
    Right,
    Spinner
  } from "native-base";
import MapView,{Marker} from "react-native-maps";
import Communications from "react-native-communications";
import _ from "lodash";
import { Actions } from "react-native-router-flux";
import PropTypes from "prop-types";
import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { calculatePropertyDistance } from '../../../actions/rider/search';
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const aspectRatio = deviceWidth / deviceHeight;
const searchHeight = deviceHeight/4;
class searchProperty extends Component{
    static propTypes = {
        searchData:PropTypes.any,
        loadSpinner:PropTypes.any,
        singlepropertydata:PropTypes.array,
        searchvalue:PropTypes.any,
        searcherror:PropTypes.any
    }
    constructor(props) {
        super(props);
        this.state={
            error:false,
            loading:true,
            data:[],
            distance:null,
			loadingMap:true
        }
    }
    goback(){
        Actions.pop();
    }
    _renderSearchProperty(){
        const searchprop=this.props.searchData
        if(searchprop.length!=0){
            return _.map(searchprop,(items,index)=>(
                <Marker key={index} coordinate={{latitude:items.mapCoordinates.coordinates[1],longitude:items.mapCoordinates.coordinates[0]}}>
                    <View style={{width:30,height:30,backgroundColor:commonColor.brandPrimary,borderRadius:10,justifyContent:"center",alignItems:"center"}}>
                    <Icon name="ios-home" style={{fontSize:15,color:"#fff"}}/>
                    </View>
                </Marker>
            ))
        }else{
            return null;
        }
        this.map.fitToElements(true, false);
    }
    UNSAFE_componentWillReceiveProps(nextProps){
            this.setState({data:nextProps.searchData,error:nextProps.searcherror,loading:nextProps.loadSpinner})
    }
	_renderPropertyList(){
		if(this.state.data && (this.state.data).length>0){
			return (<List style={{backgroundColor:"transparent"}}>
                        {(this.state.data).map((property,key)=>(
									<ListItem key={key} style={{padding:0,backgroundColor:"transparent"}} first={{paddingTop:0}} last={{borderBottomWidth:0}} onPress={() => Actions.singlePropertySearch(JSON.stringify(property))}>
									<Left>
										<View style={{flex:1}}>
											<View style={{flex:1,alignSelf:'flex-start'}}>
												<Text style={{fontWeight:"bold"}}>{property.name}</Text>
											</View>
											<View style={{flex:1,alignSelf:'flex-start'}}>
												<Text style={{fontSize:13,marginTop:3,color:"#CBCBD3"}}>{property.distance}</Text>
											</View>
										</View>
									</Left>
									<Right>
										<Icon name="ios-arrow-forward"/>
									</Right>
									
									</ListItem>
                        ))}
					</List>)
		}else{
			return (<Text>No property found</Text>)
		}
	}
    render(){
        return (
            
            <View style={{ flex: 1 ,flexDirection: 'column',justifyContent: 'center',backgroundColor:"transparent"}}>
            <View style={{backgroundColor:"transparent" }}>
                <View style={styles.headerContainer} pointerEvents="box-none">
                <View style={Platform.OS === "ios" ? styles.iosSrcdes : styles.aSrcdes}>
            
                <View style={styles.searchBar}>
                    <View>
                        <Item
                            regular
                            style={{
                                backgroundColor: "#FFF",
                                marginLeft: 0,
                                borderColor: "transparent",
                                borderRadius: 10
                            }}
                            >
                        <Button transparent onPress={this.goback}>
                            <Icon name="ios-arrow-round-back" style={styles.searchIcon} />
                        </Button>
                        <Input 
                        type="text"
                        name="destination"
                        placeholder="Where To?"
                        placeholderTextColor="#000"
                        value={this.props.searchvalue}
                        editable={false}
                        />
                        </Item>
                    </View>
                </View>
            </View>
            </View>
            </View>
            <View style={{flex:1,zIndex:-1}}>
            <MapView
                ref={ref => {
                    this.map = ref;
                  }}
                style={styles.map}
                fitToElements={MapView.IMMEDIATE_FIT}
                initialRegion={this.props.region}
				showsCompass={false}
				onMapReady={()=>
					this.setState({loadingMap:false})
				}
            >
            <View>{this._renderSearchProperty()}</View>
            </MapView>
            </View>
            <View style={{maxHeight:200,backgroundColor:"#fff",paddingBottom:15,overflow:"scroll",borderWidth:1,borderColor:"#CBCBD3"}}>
                <View style={{backgroundColor:"transparent",overflow:"scroll"}}>
                <Text style={{paddingHorizontal:15,fontSize:13,paddingVertical:15,fontWeight:"bold",color:"#CBCBD3",borderBottomWidth:1,borderBottomColor:'#CBCBD3'}}>SEARCH RESULT</Text>
                {this.state.loading==true?<Spinner/>:
				<View style={{backgroundColor:"transparent",maxHeight:searchHeight}}>
					<KeyboardAwareScrollView>
						{this._renderPropertyList()}
					</KeyboardAwareScrollView>
				</View>}
                </View>
            </View>
            
        </View>
        )
    }
    
}
function mapStateToProps(state){
    return {
        searchData:state.rider.search.propertysearchdata,
        loadSpinner:state.rider.search.loadSpinner,
        searchvalue:state.rider.search.searchvalue,
        searcherror:state.rider.search.searcherror,
        region: {
            latitude: state.rider.user.gpsLoc[0],
            longitude: state.rider.user.gpsLoc[1],
            latitudeDelta: state.rider.user.latitudeDelta,
            longitudeDelta: state.rider.user.latitudeDelta * aspectRatio
          },
        mapKey:state.basicAppConfig.config
    }
}

export default connect(mapStateToProps, null)(searchProperty);