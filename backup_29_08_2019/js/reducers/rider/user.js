import { REHYDRATE } from "redux-persist/constants";
import { RIDER_LOGIN_SUCCESS, LOGOUT_USER } from "../../actions/common/signin";
import { RIDER_REGISTER_SUCCESS } from "../../actions/common/register";
import {
  SET_USER_LOCATION,
  NEARBY_DRIVERS_LIST,
  SET_DEVICE_ID_AND_PUSH_TOKEN,
  SET_INITIAL_USER_LOCATION,
  SET_CURRENT_ADDRESS,
  SET_ALL_PROPERTY_DATA,
  SEARCH_PROPERTY_RESPONSE,
  SEARCH_PROPERTY_SUCCESS,
  SEARCH_PROPERTY_FAILED
} from "../../actions/rider/home";
import { SET_SRC_LOC } from "../../actions/rider/confirmRide";
import {
  PROFILE_UPDATED,
  SET_HOME_ADDRESS,
  SET_WORK_ADDRESS,
  PROFILE_PROGRESS
} from "../../actions/rider/settings";

const initialState = {
  _id: undefined,
  email: undefined,
  password: undefined,
  userType: undefined,
  fname: undefined,
  lname: undefined,
  dob: undefined,
  deviceId: undefined,
  pushToken: undefined,
  address: undefined,
  city: undefined,
  state: undefined,
  country: undefined,
  emergencyDetails: {
    phone: undefined,
    name: undefined,
    imgUrl: undefined
  },
  recoveryEmail: undefined,
  latitudeDelta: undefined,
  longitudeDelta: undefined,
  gpsLoc: [],
  userRating: undefined,
  phoneNo: undefined,
  profileUrl: undefined,
  currTripId: undefined,
  currTripState: undefined,
  loginStatus: undefined,
  createdAt: undefined,
  homeAddress: undefined,
  profileUpdating: false,
  workAddress: undefined,
  driversList: [],
  allpropertydata:[],
  searchResult:undefined
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case RIDER_LOGIN_SUCCESS:
      return action.payload.data.user;

    case RIDER_REGISTER_SUCCESS:
      return action.payload.data.user;

    case LOGOUT_USER:
      return initialState;

    case SET_CURRENT_ADDRESS:
      return { ...state, address: action.payload };
    case SEARCH_PROPERTY_RESPONSE:
      return {...state,searchResult:undefined}
    case SEARCH_PROPERTY_SUCCESS:
      return {...state,searchResult:action.payload}
    case SEARCH_PROPERTY_FAILED:
      return {...state,searchResult:undefined}
    case SET_USER_LOCATION:
      return {
        ...state,
        gpsLoc: [action.payload.latitude, action.payload.longitude]
      };

    case SET_INITIAL_USER_LOCATION:
      return {
        ...state,
        gpsLoc: [action.payload.latitude, action.payload.longitude]
      };
    case PROFILE_PROGRESS:
      return { ...state, profileUpdating: true };
    case NEARBY_DRIVERS_LIST:
      return { ...state, driversList: action.payload };
    case SET_DEVICE_ID_AND_PUSH_TOKEN:
      return {
        ...state,
        deviceId: action.deviceId,
        pushToken: action.pushToken
      };
    case SET_ALL_PROPERTY_DATA:
      return {...state,allpropertydata:action.payload}
    case PROFILE_UPDATED:
      return {
        ...state,
        fname: action.payload.data.fname,
        lname: action.payload.data.lname,
        email: action.payload.data.email,
        phoneNo: action.payload.data.phoneNo,
        profileUrl: action.payload.data.profileUrl,
        workAddress: action.payload.data.workAddress,
        homeAddress: action.payload.data.homeAddress,
        emergencyDetails: action.payload.data.emergencyDetails,
        profileUpdating: false
      };

    case SET_HOME_ADDRESS:
      return { ...state, homeAddress: action.payload };
    case SET_WORK_ADDRESS:
      return { ...state, workAddress: action.payload };
    case REHYDRATE:
      if (Object.keys(action.payload).length !== 0) {
        return action.payload.rider.user;
      } else {
        return state;
      }
    default:
      return state;
  }
};

export const getUserType = state => {
  const rider = state.rider.user.userType;
  if (!rider) {
    return null;
  } else {
    return rider;
  }
};
export const getNearbyDriversLocation = state => {
  const driversList = state.rider.user.driversList;
  if (!driversList) {
    return undefined;
  }
  const array = [];
  driversList.forEach(driver => {
    const location = driver.gpsLoc;
    const coordinates = {
      latitude: location[0],
      longitude: location[1]
    };
    array.push(coordinates);
  });
  return array;
};

export const getAllProperties = state => {
  const propertyAllList = (state.rider.user.allpropertydata && typeof state.rider.user.allpropertydata.data!=='undefined')?state.rider.user.allpropertydata.data:[]
  if (!propertyAllList) {
    return undefined;
  }
  const array = [];
  if(propertyAllList.length>0){
    propertyAllList.forEach(property => {
    const location = property.mapCoordinates.coordinates;
    const coordinates = {
      latitude: location[1],
      longitude: location[0]
    };
    const propertydetails={
      'coordinates':coordinates,
      'name':property.name,
      'type':property.propertytype
    }
    array.push(propertydetails);
  });
  return array;
  }else{
    return array;
  } 
};
export const searchPropertiesResult = state => {
  const propertyAllList = state.rider.user.searchResult;
  if (!propertyAllList) {
    return undefined;
  }
  const array = [];
  if((propertyAllList.data).length>0){
    propertyAllList.forEach(property => {
    const location = property.mapCoordinates.coordinates;
    const name=property.name;
    const coordinates = {
      latitude: location[1],
      longitude: location[0]
    };
    const propertydetails={
      'coordinates':coordinates,
      'name':property.name,
      'type':property.propertytype
    }
    array.push(propertydetails);
  });
  return array;
  }else{
    return array;
  } 
};
export default user;
