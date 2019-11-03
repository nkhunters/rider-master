import React, { Component } from "react";
import {
    View,
    TouchableWithoutFeedback
    } from "react-native";
import _ from "lodash";
import {
    Text,
    Icon
} from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import styles from "./styles";
import PropTypes from "prop-types";
import NearbySlider from "../nearbySlider";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class Screenview extends Component{
    static propTypes={
        onBackButtonClick:PropTypes.func,
		sliderData:PropTypes.array
    }
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <View style={styles.nearbyScreenStyle}>
                <View style={styles.iconsViewStyleRow}>
                    <View style={styles.backbuttonView}>
                        <TouchableWithoutFeedback onPress={this.props.onBackButtonClick}>
                            <Icon name="ios-arrow-round-back" style={styles.backiconstyles}/>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.filterButtonView}>
                        <MaterialCommunityIcons name="filter-variant" style={styles.filtericonStyle}/>
                    </View>
                </View>
                <View style={styles.nearbyHeadingViewStyle}>
                    <Text style={styles.nearbyHeadingTextStyle}>Nearby</Text>
                </View>
                <KeyboardAwareScrollView>
				{this.props.sliderData && (this.props.sliderData).length > 0 &&
				 <NearbySlider sliderData={this.props.sliderData}/>
				}

                </KeyboardAwareScrollView>
            </View>
        )
    }
}
export default Screenview;
