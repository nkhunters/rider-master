import { combineReducers } from "redux";
import appState from "./appState";
import user from "./user";
import tripRequest from "./tripRequest";
import trip from "./trip";
import history from "./history";
import paymentOption from "./paymentOption";
import search from "./search";
import advertisement from "./advertisement";
import rideCardPayment from "./rideCardPayment";

const rider = combineReducers({
	appState,
	user,
	trip,
	tripRequest,
	history,
	rideCardPayment,
	paymentOption,
	search,
	advertisement
});
export default rider;
