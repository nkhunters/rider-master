import React,{Component} from "react";
import {
    View,
    ScrollView,TouchableOpacity,Dimensions
} from "react-native";
import { Actions } from "react-native-router-flux";
import _ from "lodash";
import PropTypes from "prop-types";
import {
      Text,
      Button,
      Icon,
      Item
} from "native-base";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import SliderCard from "./sliderCard"
import styles from "./styles";
class NearbySlider extends Component{
    static propTypes={
        sliderData:PropTypes.array
    }
    constructor(props) {
        super(props);
    }
    _renderSliderCards(){
        return (this.props.sliderData).map((items,index)=>(
            <View key={index}>
                <View style={styles.nearbyScreenSubHeading}>
                        <Text style={styles.nearbyScreenSubHeadingText}>{items.category}</Text>
                </View>
                <View style={styles.sliderViewStyle}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {items.advertisements && (items.advertisements).length>0?
                            (items.advertisements).map((advert,keys)=>(
							<TouchableOpacity key={keys} onPress={() => Actions.singleProperty(JSON.stringify(advert))}>
                                <SliderCard  keyValue={keys} cardText={advert.name} cardSubText={advert.description} distance={advert.distance} cardImage={advert.bizimgs!='undefined' && (advert.bizimgs).length>0?advert.bizimgs[0].imageBuffer:(advert.bizphotoimgs!='undefined' && (advert.bizphotoimgs).length>0?advert.bizphotoimgs[0].imageBuffer:'')}/>
                           </TouchableOpacity>
						   ))
                        :<Text>No data</Text>}
                    </ScrollView>
                </View>
            </View>
        ))
    }
    render(){
        return (
            <View>
                {this.props.sliderData && (this.props.sliderData).length>0?
                this._renderSliderCards():('')}
            </View>

        )
    }
}
export default NearbySlider;
