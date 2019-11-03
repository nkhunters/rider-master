import commonColor from "../../../../native-base-theme/variables/commonColor";

const React = require("react-native");

const { Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
export default {
    cardViewStyle:{
        //paddingVertical:15,
       // paddingHorizontal:20,
        backgroundColor:commonColor.brandPrimary,
        borderRadius:10,
        width:160,
        marginRight:15,
		paddingBottom:10
    },
    cardHeadingStyle:{
        color:"#fff",
        fontWeight:'700',
		marginBottom:2
    },
    cardSubTextStyle:{
        color:"#fff",
        fontWeight:'300',
		opacity:0.8
    },
    sliderViewStyle:{
        marginRight:-18,
        marginBottom:25
    },
    nearbyHeadingViewStyle:{
        paddingBottom:30
    },
    nearbyHeadingTextStyle:{
        fontSize:35,
        color:"#fff",
        fontWeight:'800'
    },
    nearbyScreenSubHeading:{
        paddingBottom:20
    },
    nearbyScreenSubHeadingText:{
        color:"#fff",
        fontSize:20,
    },
	ImageIos:{
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		overflow: 'hidden',
	},
	cardDetailsStyle:{
		padding:10
	}
}