import { Actions, ActionConst } from "react-native-router-flux";
import _ from "lodash";
import config from "../../../config.js";
import { Toast } from "native-base";
import {reset} from "redux-form";

export const RIDER_LOGIN_SUCCESS = "RIDER_LOGIN_SUCCESS";
export const RIDER_LOGIN_ERROR = "RIDER_LOGIN_ERROR";
export const LOGOUT_USER = "LOGOUT_USER";
export const REQUEST_LOGIN = "REQUEST_LOGIN";
export const LOGIN_RESPONSE_RECEIVED = "LOGIN_RESPONSE_RECEIVED";
export const CHANGE_LOGIN_ERROR_STATUS = "CHANGE_LOGIN_ERROR_STATUS";
export const GET_LOGIN_PROPERTY="GET_LOGIN_PROPERTY"
export const RESET_LOGIN_PROPERTY="RESET_LOGIN_PROPERTY"

export function riderSigninSuccess(data) {
  return {
    type: RIDER_LOGIN_SUCCESS,
    payload: data
  };
}
export function loginProperty(data){
  return {
    type:GET_LOGIN_PROPERTY,
    payload:data
  }
}
export function resetLoginPropertyData(){
	return {
		type:RESET_LOGIN_PROPERTY
	}
}
export function riderSigninError(error) {
  return {
    type: RIDER_LOGIN_ERROR,
    payload: error
  };
}

export function logOutUser() {
  return {
    type: LOGOUT_USER
  };
}
export function resetLoginProperty(){
	return dispatch=>{
		dispatch(resetLoginPropertyData())
	}
}
export function logOutUserAsync(jwtAccessToken) {
  return dispatch => {
    fetch(`${config.serverSideUrl}:${config.port}/api/auth/logout`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: jwtAccessToken
      }
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.success === true) {
          dispatch(logOutUser());
          Actions.login({ type: ActionConst.RESET });
        }
      })
      .catch(e => e);
    dispatch(logOutUser());
    Actions.login({ type: ActionConst.RESET });
  };
}
export function loginSearchProperty(query){
  return dispatch=>
  fetch(`${config.serverSideUrl}:${config.port}/api/auth/property`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({name:query})
  })
    .then(resp => resp.json())
    .then(data=>{
      if(data.success){
        dispatch(loginProperty(data.data))
      }else{
        Toast.show({
          text: "Failed to show property list",
          position: "bottom",
          duration: 1500,
          type:"danger"
        });
      }
    }).catch(e=>{
      Toast.show({
        text: "Failed to show property list",
        position: "bottom",
        duration: 1500,
        type:"danger"
      });
    })
  
}
export function signinAsync(obj) {
  const userCredentials = obj;
  userCredentials.userType = "rider";

  return dispatch => {
    dispatch({ type: REQUEST_LOGIN });
    fetch(`${config.serverSideUrl}:${config.port}/api/auth/riderlogin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userCredentials)
    })
      .then(resp => resp.json())
      .then(data => {
        dispatch({ type: LOGIN_RESPONSE_RECEIVED });
        if (data.success === true && userCredentials.userType === "rider") {
          dispatch(riderSigninSuccess(data));
          dispatch(Actions.riderStartupService());
        }
        if (data.success === true && userCredentials.userType === "driver") {
          Toast.show({
            text: "Already Registered as Driver",
            position: "bottom",
            duration: 1500
          });
        }
        if (data.success === false && userCredentials.userType === "rider") {
          dispatch(riderSigninError(data));
          dispatch({ type: CHANGE_LOGIN_ERROR_STATUS });
          Toast.show({
            text: "No property exists",
            position: "bottom",
            duration: 1500
          });
          dispatch(reset('login'))
        }
        if (data.success === false && userCredentials.userType === "driver") {
          Toast.show({
            text: "User doesn't Exists",
            position: "bottom",
            duration: 1500
          });
        }
      })
      .catch(e => {
        dispatch({ type: LOGIN_RESPONSE_RECEIVED });
      });
  };
}

export function signinAsyncFb(obj) {
  const userCredentials = obj;
  return dispatch => {
    dispatch({ type: REQUEST_LOGIN });
    fetch(`${config.serverSideUrl}:${config.port}/api/auth/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userCredentials)
    })
      .then(resp => resp.json())
      .then(data => {
        dispatch({ type: LOGIN_RESPONSE_RECEIVED });
        if (data.success === true && userCredentials.userType === "rider") {
          dispatch(riderSigninSuccess(data));
          dispatch(Actions.riderStartupService());
        }
        if (data.success === true && userCredentials.userType === "driver") {
          Toast.show({
            text: "Already Registered as Driver",
            position: "bottom",
            duration: 1500
          });
        }
        if (data.success === false && userCredentials.userType === "rider") {
          dispatch(riderSigninError(data));
        }
        if (data.success === false && userCredentials.userType === "driver") {
          Toast.show({
            text: "User doesn't Exists",
            position: "bottom",
            duration: 1500
          });
        }
      })
      .catch(e => {
        // dispatch(riderSigninError(e));
        dispatch({ type: LOGIN_RESPONSE_RECEIVED });
      });
  };
}
export function forgotMail() {
  return (dispatch, getState) => {
    const obj = {
      email: _.get(getState().form.login.values, "email", null)
    };
    if (obj.email === null) {
      Toast.show({
        text: "email is required",
        position: "bottom",
        duration: 1500
      });
    } else {
      fetch(`${config.serverSideUrl}:${config.port}/api/config/forgot`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
      })
        .then(resp => resp.json())
        .then(data => {
          Toast.show({
            text: data.message,
            position: "bottom",
            duration: 1500
          });
        })
        .catch(e => {
          Toast.show({
            text: "User doesn't Exists",
            position: "bottom",
            duration: 1500
          });
        });
    }
  };
}
