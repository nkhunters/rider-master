import React,{Component} from "react";
import {
    View,
    ScrollView, Image, Dimensions
} from "react-native";
import _ from "lodash";
import PropTypes from "prop-types";
import {
      Text
} from "native-base";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import { connect } from "react-redux";
import styles from "./styles";
const { width, height } = Dimensions.get("window");
const aspectRatio = width / height;
class SliderCard extends Component{
    static propTypes={
        cardText:PropTypes.string,
        cardSubText:PropTypes.string,
        keyValue:PropTypes.number,
        distance:PropTypes.string
    }
    constructor(props) {
        super(props);
    }
    capitalize(name) {
        return name.charAt(0).toUpperCase() + name.slice(1)
    }
    render(){
        return (
                <View style={styles.cardViewStyle} key={this.props.keyValue}>
					<View style={styles.ImageIos}>
						<Image source={{uri: `data:image/gif;base64,${this.props.cardImage}`}}  style={{ height: 110, width: 160}} />
					</View>
					<View style={styles.cardDetailsStyle}>
						<Text style={styles.cardHeadingStyle}>{this.capitalize(this.props.cardText)}</Text>
                        {this.props.distance?(
                            <Text style={styles.cardSubTextStyle}>{this.props.distance!='ZERO_RESULTS'?this.props.distance:'No route found'}</Text>
                        ):(
                            <Text style={styles.cardSubTextStyle}>No route found</Text>
                        )}
					</View>
                </View>
        )
    }
}
export default SliderCard;
