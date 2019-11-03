import commonColor from "../../../../native-base-theme/variables/commonColor";

const React = require("react-native");

const { Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
export default {
  iosSearchBar: {
    width: deviceWidth - 30,
    alignSelf: "center",
    //marginTop: 10,
    //paddingLeft: 5,
    flex: 1,
    shadowColor: "#aaa",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 3,
    shadowOpacity: 0.5
    //paddingTop: 12,
    //margin: 10
  },
  aSearchBar: {
    width: deviceWidth - 30,
    alignSelf: "center",
    //marginTop: 10,
    //paddingLeft: 5,
    flex: 1,
    shadowColor: "#aaa",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 3,
    shadowOpacity: 0.5
    //paddingTop: 9,
    //margin: 10
  },
  upiconstyle:{
    color:"#fff",
    alignItems:"flex-start"
  },
  searchBar: {
    width: deviceWidth - 30,
    alignSelf: "center",
    backgroundColor: "#EEE",
    borderRadius: 10,
    marginLeft: -5,
    marginTop: 5,
    shadowColor: "#aaa",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 3,
    shadowOpacity: 0.5
  },
  searchIcon: {
    fontSize: 25,
    top: 4,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignSelf: "center",
    flex: 0,
    left: 0,
	  color:"#818183"
  },
  aSrcdes: {
    paddingVertical: 7
  },
  iosSrcdes: {
    //paddingVertical: 25,
    paddingHorizontal:20
  },
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#fff"
  },
  slideSelector: {
    position: "absolute",
    bottom: 0,
    width: deviceWidth,
    flexDirection:"row",
    backgroundColor:"#16BCF8",
    padding:15,
    borderTopColor:"#23AAFA",
    borderTopWidth:10,
    borderTopLeftRadius:5,
    borderTopRightRadius:5
  },

  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff"
  },
  carIcon: {
    color: "#222",
    fontSize: 24
  },
  pinContainer: {
    bottom: deviceHeight / 2.1,
    position: "absolute",
    left: 0,
    right: 0
  },
  pinButton: {
    backgroundColor: "#2491CA",
    alignSelf: "center",
    paddingLeft: 50,
    paddingRight: 50
  },
  pin: {
    width: 2,
    height: 15,
    backgroundColor: commonColor.brandPrimary,
    position: "relative",
    alignSelf: "center"
  },
  shareContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc"
  },
  shareOptions: {
    paddingLeft: 20,
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "flex-start"
  },
  shareType: {
    fontSize: 12,
    color: commonColor.lightThemeColor
  },
  share: {
    paddingRight: 10,
    padding: 10,
    alignItems: "flex-end"
  },
  taxiTypeContainer: {
    padding: 15,
    alignItems: "center"
  },
  taxiType: {
    opacity: 0.5,
    alignItems: "center"
  },
  taxi: {
    borderRadius: 18,
    borderWidth: 2,
    height: 36,
    width: 36,
    alignItems: "center",
    justifyContent: "center",
    borderColor: commonColor.lightThemeColor
  },
  taxiIcon: {
    fontSize: 15,
    padding: 5
  },
  headerContainer: {
    position: "absolute",
    top: 0,
    width: deviceWidth
  },
  iosHeader: {
    backgroundColor: "#fff"
  },
  aHeader: {
    backgroundColor: "#fff",
    borderColor: "#aaa",
    elevation: 3,
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  SearchPickText: {
    fontSize: 14,
    marginLeft: 5,
    color: "#B6D7EA"
  },
  selectedTaxi: {
    fontSize: 25,
    color: commonColor.brandPrimary,
    backgroundColor: "transparent",
    borderColor: commonColor.lightThemeColor
  },
  locateIcon: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginRight: 5,
    marginTop: Platform.OS === "ios" ? deviceHeight - 210 : deviceHeight - 210,
    marginBottom: 135,
    marginLeft: deviceWidth - 45
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
    height: 300,
    width: 300
  }
};
