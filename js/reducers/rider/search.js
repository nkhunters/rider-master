import { SET_SEARCH_VALUE, INITIAL_SEARCH,SEND_SEARCH_REQUEST,SEARCH_REQUEST_SUCCESS,SEARCH_REQUEST_FAILED,SINGLE_PROPERTY_DATA } from "../../actions/rider/search";
const initialState = {
	propertysearchdata: [],
	loadSpinner: false,
	singlepropertydata:[],
	searchvalue:null,
	searcherror:null
};
const search = (state = initialState, action) => {
	switch (action.type) {
		case SET_SEARCH_VALUE:
			return {...state,searchvalue:action.payload}
		case INITIAL_SEARCH:
			return {...state,propertysearchdata:[],loadSpinner:false,searcherror:null}
		case SEND_SEARCH_REQUEST:
			return {...state,propertysearchdata:[],loadSpinner:true,searcherror:null}
		case SEARCH_REQUEST_SUCCESS:
			return {...state,propertysearchdata:action.payload.data,loadSpinner:false,searcherror:null}
		case SEARCH_REQUEST_FAILED:
			return {...state,propertysearchdata:[],loadSpinner:false,searcherror:action.payload}
		case SINGLE_PROPERTY_DATA:
			return {...state,singlepropertydata:action.payload}
		default:
			return {...state}
	}
}
export default search;