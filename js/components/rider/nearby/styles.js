import commonColor from "../../../../native-base-theme/variables/commonColor";

const React = require("react-native");

const { Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const sliderscreenColor="#16BCF8"
const fontColors = "#ffffff" 
export default {
    nearbyViewStyle:
    {
        flexDirection:"row",
        backgroundColor:sliderscreenColor,
        paddingVertical:15,
        paddingHorizontal:20,
        borderTopColor:"#23AAFA",
        borderTopWidth:10,
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        width:deviceWidth,
        flex:1
    },
    arrowStyle:
    {
        alignItems:"flex-start",
        justifyContent:"center"
    },
    arrowIconStyle:
    {
        color:"#46D7FB",
        fontWeight:"bold",
        fontSize:42,
		flexWrap:'wrap'
    },
    nearbyTextViewStyle:
    {
        alignItems:"flex-start",
        justifyContent:"center",
        marginLeft:20
    },
    nearbyTextHeadingStyle:{
        color:fontColors,
        fontWeight:"bold",
        fontSize:20
    },
    nearbySubTextStyle:{
        color:fontColors,
        fontSize:13,
        opacity:0.8,
		flexWrap:'wrap'
    },
    nearbyCountViewStyle:{
        flex:1,
        alignItems:"flex-end",
        justifyContent:"center"
    },
    nearbyCountStyle:{
        fontSize:48,
        color:"#038BC1",
        fontWeight:"bold"
    },
    nearbyScreenStyle:{
        backgroundColor:sliderscreenColor,
        paddingTop:20,
        paddingLeft:20,
        paddingRight:20,
        minHeight:deviceHeight,
        maxHeight:deviceHeight
    },
    iconsViewStyleRow:{
        flexDirection:"row",
		paddingTop:16
    },
    backbuttonView:{
        flex:0.2,
        alignItems:'flex-start',
        justifyContent:"center"
    },
    backiconstyles:{
        color:"#fff",
        fontSize:35
    },
    filterButtonView:{
        flex:1,
        alignItems:'flex-end',
        justifyContent:"center"
    },
    filtericonStyle:{
        color:"#fff",
        fontSize:25
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
    }
}