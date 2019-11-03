import React, { Component } from "react";
import {
View
} from "react-native";
import _ from "lodash";
import PropTypes from "prop-types";
import Widget from "./widget";
import Screenview from "./screenView";
class Nearby extends Component {
  static propTypes={
    onWidgetClick:PropTypes.func,
    onBackClick:PropTypes.func,
    nearbyStyle:PropTypes.object,
    sliderData:PropTypes.array
  }
  constructor(props) {
    super(props);
  }
  get advertismentCount(){
	let count = 0;
	if(this.props.sliderData && (this.props.sliderData).length>0){
		(this.props.sliderData).forEach(async(item)=>{
			count+=(item.advertisements).length
		})
	}
	return count;
  }
  render(){
    return(
      <View style={[this.props.nearbyStyle,{borderTopLeftRadius:15,borderTopRightRadius:15, backgroundColor:"#16BCF8",}]}>
        <View>
        <Widget onArrowClick={this.props.onWidgetClick} displayCount={this.props.sliderData?this.advertismentCount:0}/>
        <Screenview onBackButtonClick={this.props.onBackClick} sliderData={this.props.sliderData}/>
        </View>
      </View>
    )
  }

}
export default Nearby;
