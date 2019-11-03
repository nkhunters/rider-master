import {
INIT_ADVERTISMENTS,
FOOD_ADVERTISMENTS_SUCCESS,
FOOD_ADVERTISMENTS_FAILED,
COFFEE_ADVERTISMENTS_SUCCESS,
COFFEE_ADVERTISMENTS_FAILED,
FUN_ADVERTISMENTS_SUCCESS,
FUN_ADVERTISMENTS_FAILED,
RENTAL_ADVERTISMENTS_SUCCESS,
RENTAL_ADVERTISMENTS_FAILED,
NIGHTLIFE_ADVERTISMENTS_SUCCESS,
NIGHTLIFE_ADVERTISMENTS_FAILED,
START_ADVERTISMENT_LOADING,
STOP_ADVERTISMENT_LOADING
} from '../../actions/rider/advertisements';
const initialState = {
	food:{},
	coffee:{},
	fun:{},
	rental:{},
	nightlife:{},
	loadingAdvertisements:false
}
const advertisement = (state = initialState, action) => {
	switch(action.type){
		case INIT_ADVERTISMENTS:
			return {...state,food:{},coffee:{},fun:{},rental:{},nightlife:{},loadingAdvertisements:false}
		case FOOD_ADVERTISMENTS_SUCCESS:
			return {...state,food:action.payload}
		case FOOD_ADVERTISMENTS_FAILED:
			return {...state,food:{}}
		case COFFEE_ADVERTISMENTS_SUCCESS:
			return {...state,coffee:action.payload}
		case COFFEE_ADVERTISMENTS_FAILED:
			return {...state,coffee:{}}
		case FUN_ADVERTISMENTS_SUCCESS:
			return {...state,fun:action.payload}
		case FUN_ADVERTISMENTS_FAILED:
			return {...state,fun:{}}
		case RENTAL_ADVERTISMENTS_SUCCESS:
			return {...state,rental:action.payload}
		case RENTAL_ADVERTISMENTS_FAILED:
			return {...state,rental:{}}
		case NIGHTLIFE_ADVERTISMENTS_SUCCESS:
			return {...state,nightlife:action.payload}
		case NIGHTLIFE_ADVERTISMENTS_FAILED:
			return {...state,nightlife:{}}
		case START_ADVERTISMENT_LOADING:
			return {...state,loadingAdvertisements:true}
		case STOP_ADVERTISMENT_LOADING:
			return {...state,loadingAdvertisements:false}
		default:
			return state;
	}

}

export const advertismentsData = (state)=>{
	let advertismentsData =[];
	if(Object.keys(state.rider.advertisement.food).length>0){
		advertismentsData.push(state.rider.advertisement.food)
	}
	if(Object.keys(state.rider.advertisement.coffee).length>0){
		advertismentsData.push(state.rider.advertisement.coffee)
	}
	if(Object.keys(state.rider.advertisement.fun).length>0){
		advertismentsData.push(state.rider.advertisement.fun)
	}
	if(Object.keys(state.rider.advertisement.rental).length>0){
		advertismentsData.push(state.rider.advertisement.rental)
	}
	if(Object.keys(state.rider.advertisement.nightlife).length>0){
		advertismentsData.push(state.rider.advertisement.nightlife)
	}
	//console.log(state.rider.advertisement)
	return advertismentsData;
}
export default advertisement;