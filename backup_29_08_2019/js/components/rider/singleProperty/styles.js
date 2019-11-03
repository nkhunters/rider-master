import commonColor from "../../../../native-base-theme/variables/commonColor";

const React = require("react-native");

const { Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const sliderscreenColor="#16BCF8"
const fontColors = "#ffffff" 
export default {
	container:{
		flex:1,
	},
	topContainer:{
		flex:1,
		height:deviceHeight/2-30
	},
	bottomContainer:{
		flex:1.2,
		borderTopLeftRadius:22,
		borderTopRightRadius:22, 
		backgroundColor:"#0091c6",
		paddingTop:20,
		paddingLeft:20,
		paddingRight:20
	},
	row:{
		flexDirection:'row',
		padding:16
	},
	col1:{
		flex:1,
		justifyContent:'center',
		alignItems:'flex-start'
	},
	col2:{
		flex:1,
		justifyContent:'center',
		alignItems:'flex-end'
	},
	 backiconstyles:{
        color:"#fff",
        fontSize:35
    },
	filtericonStyle:{
        color:"#fff",
        fontSize:25
    },
	row2:{
		flex:1,
		justifyContent:'flex-end',
		paddingTop:16,
		paddingLeft:16,
		paddingRight:16,
		paddingBottom:20
	},
	slider_heading:{
		color:"#fff",
        fontSize:35,
		fontWeight:'500'
	},
	FontAwesomeIcons:{
		color:'#ffb900'
	},
	FontAwesomeIcons1:{
		color:'#696765'
	},
	starRow:{
		flexDirection:'row',
		paddingTop:8
	},
	revTxt:{
		color:"#fff",
        fontSize:16,
		marginLeft:28
	},
	des:{
	color:"#fff",
        fontSize:23,	
		marginBottom:8
	},
	des1:{
		color:"#fff",
        fontSize:16,
		opacity:0.8,	
	},
	star:{
		paddingLeft:3
	},
	phonIcon:{
		flex:0.4,
		justifyContent:'center'
	},
	phonIcon1:{
		flex:1,
		justifyContent:'center'
	},
	phon:{
		height:50,width:60,backgroundColor:'#16bcf8',
		justifyContent:'center',alignItems:'center',borderRadius:6
	},
	SimpleLineIcons:{
		color:'#fff'
	},
	btn:{
		borderWidth:1,
		borderColor:'#3acce1',
		padding:12,
		backgroundColor:'#3acce1',
		borderRadius:10,
		marginTop:15,
		marginBottom:15
	},
	mapView:{
		borderWidth:1,
		borderColor:'#d3d3d3',
		marginTop:15,
		borderRadius:6
	},
	phoneText:{
		fontSize:16,
		color:'#fff', 
		opacity:1
	}
	
}