import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Text } from "react-native";
import { Item, Input, Button, Grid, Col, View } from "native-base";
import CountryPicker from "react-native-country-picker-modal";
import PropTypes from "prop-types";

import { registerAsync } from "../../../actions/common/register";
import Spinner from "../../loaders/Spinner";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import styles from "./styles";

const validate = values => {
	const errors = {};
	if (!values.fname) {
		errors.fname = "First name is Required";
	} else if (!/^[a-zA-Z]*$/.test(values.fname)) {
		errors.fname = "Invalid first name";
	} else if (!values.lname) {
		errors.lname = "Last name is Required";
	} else if (!/^[a-zA-Z]*$/.test(values.lname)) {
		errors.lname = "Invalid last name";
	} else if (!values.email) {
		errors.email = "Email is Required";
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = "Invalid email";
	} else if (!values.phoneNo) {
		errors.phoneNo = "Phone number is Required";
	} else if (!values.phoneNo.match(/^\d{10}$/)) {
		errors.phoneNo = "Invalid phone number";
	} else if (!values.password) {
		errors.password = "Password is Required";
	} else if (values.password !== values.confirmPassword) {
		errors.confirmPassword = "Entered passwords doesn't match";
	}
	return errors;
};
export const input = props => {
	const { meta, input } = props;
	return (
		<View style={{ flex: 1, width: null }}>
			<Item
				style={{
					borderBottomWidth: input.name === "phoneNo" ? 0 : 0.5
				}}
			>
				<Input {...input} {...props} />
			</Item>

			{meta.touched && meta.error && <Text style={{ color: "red" }}>{meta.error}</Text>}
		</View>
	);
};

class RegisterForm extends Component {
	static propTypes = {
		dispatch: PropTypes.func,
		error: PropTypes.string,
		handleSubmit: PropTypes.func,
		isFetching: PropTypes.bool
	};
	constructor(props) {
		super(props);
		this.state = {
			cca2: "IN",
			callingCode: "91",
			name: "IN"
		};
	}

	UNSAFE_componentWillMount() {
		this.setState({
			isLoading: false
		});
	}
	submit(values) {
		this.props.dispatch(registerAsync({ ...values, callingCode: this.state.callingCode }));
	}

	render() {
		return (
			<View>
				<Grid>
					<Col style={{ padding: 10 }}>
						<Field
							component={input}
							name="fname"
							placeholder="First Name"
							placeholderTextColor={commonColor.lightThemePlaceholder}
						/>
					</Col>
					<Col style={{ padding: 10 }}>
						<Field
							component={input}
							name="lname"
							placeholder="Last Name"
							placeholderTextColor={commonColor.lightThemePlaceholder}
						/>
					</Col>
				</Grid>
				<View style={{ padding: 10 }}>
					<Field
						component={input}
						type="email"
						name="email"
						placeholder="Email"
						placeholderTextColor={commonColor.lightThemePlaceholder}
						keyboardType="email-address"
						autoCapitalize="none"
					/>
				</View>
				<View
					style={{
						flexDirection: "row",
						flexWrap: "wrap",
						justifyContent: "flex-start",
						alignItems: "center",
						alignSelf: "stretch",
						borderBottomWidth: 0.5,
						marginLeft: 15
					}}
				>
					<CountryPicker
						cca2={this.state.cca2}
						onChange={value =>
							this.setState({
								cca2: value.cca2,
								callingCode: value.callingCode
							})}
					/>
					<Field
						component={input}
						name="phoneNo"
						placeholder="Mobile Number"
						placeholderTextColor={commonColor.lightThemePlaceholder}
						keyboardType="numeric"
					/>
				</View>
				<View style={{ padding: 10 }}>
					<Field
						component={input}
						name="password"
						placeholder="Password"
						secureTextEntry
						placeholderTextColor={commonColor.lightThemePlaceholder}
						autoCapitalize="none"
					/>
				</View>
				<View style={{ padding: 10 }}>
					<Field
						component={input}
						name="confirmPassword"
						placeholder="Confirm password"
						secureTextEntry
						placeholderTextColor={commonColor.lightThemePlaceholder}
						autoCapitalize="none"
					/>
				</View>
				{this.props.error && <Text style={{ color: "red" }}>{this.props.error}</Text>}
				<View style={styles.regBtnContain}>
					<Button onPress={this.props.handleSubmit(this.submit.bind(this))} block style={styles.regBtn}>
						{this.props.isFetching ? (
							<Spinner />
						) : (
							<Text style={{ color: "#fff", fontWeight: "bold" }}>Register</Text>
						)}
					</Button>
				</View>
			</View>
		);
	}
}
export default reduxForm({
	form: "register", // a unique name for this form
	validate
})(RegisterForm);
