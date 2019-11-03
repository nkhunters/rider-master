import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform, TouchableOpacity } from "react-native";
import {
  Text,
  List,
  Item,
  ListItem,
  Button,
  Body,
  CheckBox,
  Right,
  Container,
  Header,
  Left,
  Icon,
  Title,
  Spinner
} from "native-base";
// import { Actions, ActionConst } from "react-native-router-flux";

import commonColor from "../../../../native-base-theme/variables/commonColor";


class RiderCount extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <TouchableOpacity 
      style={{position:'absolute', height:'100%', width:'100%'}}
      onPress={()=>{this.props.onClose()}}
      >
          <View style={{borderTopLeftRadius:10, borderTopRightRadius:10, flexDirection:'column', justifyContent:'center', alignItems:'center', position:'absolute', bottom:0, width:'100%', height:230, backgroundColor:commonColor.brandPrimary}}>
                <Text style={{color:'white', maringBottom:10}}>Number of riders</Text>
                <View style={{flexDirection:'row',width:'100%', height:50, justifyContent:'center', alignItems:'center', marginTop:10}}>                    
                    <View style={{flexDirection:'row',width:'50%', height:'90%', backgroundColor:'white', borderRadius:10}}>
                        <TouchableOpacity 
                            style={{ width:'49.5%', height:'100%', justifyContent:'center', alignItems:'center'}}
                            onPress={() => {
                                this.props.onAdd()
                            }}  
                        >
                        <Text style={{ color: commonColor.brandPrimary, fontWeight: "500", fontSize: 50, marginTop:-10 }}>+</Text> 
                            </TouchableOpacity>
                        <View style={{height:'100%', width:'1%', backgroundColor:commonColor.brandPrimary}}/>
                            <TouchableOpacity 
                                style={{ width:'49.5%', height:'100%', justifyContent:'center', alignItems:'center'}}
                                onPress={() => {
                                    this.props.onRemove()
                                }}  
                            >
                        <Text style={{ color: commonColor.brandPrimary, fontSize: 50,fontWeight: "500",marginTop:-10 }}>-</Text> 
                            </TouchableOpacity>        
                    </View>
                    <View style={{width:'20%', height:'100%', marginLeft:20, backgroundColor:'white', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontWeight: "500", fontSize: 30,  color:commonColor.brandPrimary, textAlign:'center'}}>
                        {this.props.count}
                    </Text>                    
                    </View>
                </View>
                  <Text style={{color:'white', maringBottom:10, marginTop:10}}>Estimated Pickup time: 4 mins</Text> 

                  <TouchableOpacity 
                        style={{ width:'80%', height:40,marginTop:10,borderRadius:10, justifyContent:'center', alignItems:'center', backgroundColor:commonColor.brandInfo}}
                        onPress={() => {
                            this.props.onConfirmPickup()
                        }}  
                            >
                        <Text style={{ color: 'white', fontSize: 14,fontWeight: "500", }}>Confirm Pickup</Text> 
                            </TouchableOpacity>   

          </View>
      </TouchableOpacity>
    );
  }
}


export default connect(null, null)(RiderCount);
