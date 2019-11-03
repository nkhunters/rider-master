import commonColor from "../../../../native-base-theme/variables/commonColor";
import { Platform } from "react-native";
const React = require("react-native");

const { Dimensions } = React;
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
export default{
     aSrcdes: {
        paddingVertical: 7
      },
      map: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#fff"
      },
      iosSrcdes: {
        paddingVertical: 20
      },
      searchIcon: {
        fontSize: 30,
        top: 4,
        backgroundColor: "transparent",
        justifyContent: "center",
        alignSelf: "center",
        flex: 0,
        left: 0,
        color:"#000"
      },
      searchBar: {
        width: deviceWidth - 30,
        alignSelf: "center",
        backgroundColor: "#EEE",
        // borderColor: "#ddd",
        // borderWidth: 1,
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
      headerContainer: {
        position: "absolute",
        top: 0,
        width: deviceWidth + 5,
        zIndex:9
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
}