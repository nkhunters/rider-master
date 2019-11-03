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
import styles from "./styles";
import PropTypes from "prop-types";
class Widget extends Component{
    static propTypes={
        onArrowClick: PropTypes.func,
		displayCount: PropTypes.number
    }
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <View style={styles.nearbyViewStyle}>
                <View style={styles.arrowStyle}>
                        <TouchableWithoutFeedback onPress={this.props.onArrowClick}>
                            <Icon name="ios-arrow-up" style={styles.arrowIconStyle}/>
                        </TouchableWithoutFeedback>
                </View>
                <View style={styles.nearbyTextViewStyle}>
                    <Text style={styles.nearbyTextHeadingStyle}>Nearby</Text>
                    <Text style={styles.nearbySubTextStyle}>Foods,Drinks,Places</Text>
                </View>
                <View style={styles.nearbyCountViewStyle}>
                    <Text style={styles.nearbyCountStyle}>{this.props.displayCount?this.props.displayCount:0}</Text>
                </View>
            </View>
        )
    }
}
export default Widget;
