import React, { Component } from "react";
import { Field, reduxForm,change } from "redux-form";
import { Text,TouchableOpacity } from "react-native";
import { Item, Input, Button, View } from "native-base";
import PropTypes from "prop-types";
import { signinAsync, forgotMail } from "../../../actions/common/signin";
import Spinner from "../../loaders/Spinner";
import Autocomplete from "react-native-autocomplete-input";
import styles from "./styles";
import { connect } from "react-redux";
import {loginSearchProperty,resetLoginProperty} from "../../../actions/common/signin";
import commonColor from "../../../../native-base-theme/variables/commonColor";
const validate = values => {
	const errors = {};
	if (!values.name) {
		errors.name = "Name is Required";
	}else if(values.name && ((values.name).trim()).length==0){
		errors.name = "Name is Required";
	}else if(values.name && !(/^[a-zA-Z ]+$/).test((values.name).trim())){
		errors.name = "Please enter a valid name";
	}else{
	
	}
	if (!values.property) {
		errors.property = "Please select a property";
	}else if(values.property && ((values.property).trim()).length==0){
		errors.property = "Please select a property";
	}else{
	
	}
	if(!values.room){
		errors.room="Room is required"
	}else if (isNaN(Number(values.room))) {
		errors.room = "Must be a number";
	}else if(values.room && !(/^[0-9]+$/).test((values.room).trim())){
		errors.room = "Must be a number";
	}
	
	return errors;
};

export const input = props => {
	const { meta, input } = props;
	return (
		<View style={{position:"relative"}}>
			<Item rounded style={(input.name!='room')?styles.fieldStyle:styles.fieldStyleRoom}>
				<Input {...input} {...props} />
			</Item>

			{meta.submitFailed && meta.error && <Text style={styles.errorStyle}>{meta.error}</Text>}
		</View>
	);
};
input.propTypes = {
	input: PropTypes.object,
	meta: PropTypes.object
};

export const autcompleteprop=props=>{
	const {meta,input}=props
	return (
		<View>
			<Autocomplete {...input} {...props} style={styles.autoCompleteStyle} containerStyle={styles.autoCompleteContainerStyle} inputContainerStyle={styles.autoCompleteInputConatiner} listContainerStyle={styles.autoCompleteListContainer} listStyle={styles.autoCompleteListStyle}/>
			{meta.submitFailed && meta.error && <Text style={styles.errorStyle}>{meta.error}</Text>}
		</View>
	)
}
class LoginForm extends Component {
	static propTypes = {
		dispatch: PropTypes.func,
		handleSubmit: PropTypes.func,
		forgotMail: PropTypes.func,
		isFetching: PropTypes.bool,
		searchData:PropTypes.array,
		onFocusName:PropTypes.func,
		onFocusProperty:PropTypes.func,
		onFocusRoom:PropTypes.func
	};
	constructor(props) {
		super(props);
		this.state = {
			checked: false,
			userdata:null
		};
		this.forgotPassword=this.forgotPassword.bind(this)
	}
	componentWillUnmount(){
		this.props.resetproperty()
	}

	submit(values) {
		this.props.dispatch(signinAsync(values));
	}
	forgotPassword() {
		//this.props.dispatch(forgotMail());
	}
	renderSearchList(text){
		this.props.findProperty(text)
	}
	selectProperty(propertyvalue){
		this.props.dispatch(change("login","property",propertyvalue))
		this.props.resetproperty()
	}
	render() {
		return (
			<View>
				<View style={styles.headingViewStyle}>
					<Text style={styles.headingTextStyle}>Login</Text>
				</View>
				
				<View style={styles.fieldViewStyleLogin}>
					{this.props.onFocusName ? (
						<Field
							component={input}
							type="text"
							name="name"
							placeholder="Name"
							placeholderTextColor={commonColor.lightThemePlaceholder}
							underlineColorAndroid="transparent"
							autoCapitalize="words"
							autoCorrect={false}
							onFocus={this.props.onFocusName}
						/>
					):(
						<Field
							component={input}
							type="text"
							name="name"
							placeholder="Name"
							placeholderTextColor={commonColor.lightThemePlaceholder}
							underlineColorAndroid="transparent"
							autoCapitalize="words"
							autoCorrect={false}
						/>
					)}
					
				</View>
				<View style={styles.fieldViewStyleLogin}>
					{this.props.onFocusProperty ? (
						<Field
							component={autcompleteprop}
							type="text"
							name="property"
							placeholder="Property"
							autoCapitalize="none"
							autoCorrect={false}
							underlineColorAndroid="transparent"
							onFocus={this.props.onFocusProperty}
							value={this.state.query}
							data={this.props.searchData}
							onChangeText={text => this.renderSearchList(text)}
							renderItem={item => (
							(<TouchableOpacity onPress={() => this.selectProperty(item.name)}>
								<Text style={{paddingTop:10,paddingBottom:10,fontSize:16}}>{item.name}</Text>
							</TouchableOpacity>)
							)}
						/>
					):(
						<Field
							component={autcompleteprop}
							type="text"
							name="property"
							placeholder="Property"
							autoCapitalize="none"
							autoCorrect={false}
							underlineColorAndroid="transparent"
							value={this.state.query}
							data={this.props.searchData}
							onChangeText={text => this.renderSearchList(text)}
							renderItem={item => (
							(<TouchableOpacity onPress={() => this.selectProperty(item.name)}>
								<Text style={{paddingTop:10,paddingBottom:10,fontSize:16}}>{item.name}</Text>
							</TouchableOpacity>)
							)}
						/>
					)}
					
				</View>
				<View style={styles.fieldViewLowerStyle}>
					{this.props.onFocusRoom ? (
						<Field
							component={input}
							placeholder="Room #"
							placeholderTextColor={commonColor.lightThemePlaceholder}
							name="room"
							type="text"
							autoCorrect={false}
							autoCapitalize="none"
							keyboardType="number-pad"
							underlineColorAndroid="transparent"
							onFocus={this.props.onFocusRoom}
						/>
					):(
						<Field
							component={input}
							placeholder="Room #"
							placeholderTextColor={commonColor.lightThemePlaceholder}
							name="room"
							type="text"
							autoCorrect={false}
							autoCapitalize="none"
							keyboardType="number-pad"
							underlineColorAndroid="transparent"
						/>
					)}
					
				</View>
				<View>
					<TouchableOpacity onPress={() => this.forgotPassword()}>
						<Text style={styles.problemText}>Having Problems ?</Text>
					</TouchableOpacity >
				</View>
				
				<View>
					<Button onPress={this.props.handleSubmit(this.submit.bind(this))} full transparent style={styles.regBtn}>
						{this.props.isFetching ? (
							<Spinner />
						) : (
							<Text style={{ color: "#fff", fontWeight: "900",fontSize:22 }}>GO</Text>
						)}
					</Button>
				</View>
			</View>
		);
	}
}
LoginForm=reduxForm({
	form: "login", // a unique name for this form
	validate
})(LoginForm);
function mapStateToProps(state){
	return{
		searchData:state.rider.appState.loginpropertydata
	}
}
function bindAction(dispatch){
	return {
		findProperty:value=>dispatch(loginSearchProperty(value)),
		resetproperty:()=>dispatch(resetLoginProperty())
	}
}

export default connect(mapStateToProps,bindAction)(LoginForm)