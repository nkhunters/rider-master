import config from "../../../config.js";
export const SET_SEARCH_VALUE = "SET_SEARCH_VALUE";
export const INITIAL_SEARCH="INITIAL_SEARCH"
export const SEND_SEARCH_REQUEST = "SEND_SEARCH_REQUEST";
export const SEARCH_REQUEST_SUCCESS = "SEARCH_REQUEST_SUCCESS";
export const SEARCH_REQUEST_FAILED = "PROFILE_PROGRESS";
export const SINGLE_PROPERTY_DATA = "SINGLE_PROPERTY_DATA"
export function searchInit(){
	return {
		type:INITIAL_SEARCH
	}
}
export function searchSetValue(value){
	return {
		type:SET_SEARCH_VALUE,
		payload:value
	}
}
export function sendsearchrequest(){
	return {
		type:SEND_SEARCH_REQUEST,
	}
}
export function searchrequestsuccess(data){
	return {
		type:SEARCH_REQUEST_SUCCESS,
		payload:data
	}
}
export function searchrequestfailed(){
	return {
		type:SEARCH_REQUEST_FAILED,
		payload:'Oops! Something went wrong.'
	}
}
export function setsingleProperty(data){
	return{
		type:SINGLE_PROPERTY_DATA,
		payload:data
	}
}
/*Search request on input property*/ 
export function searchProperty(query){
	return(dispatch, getState)=>{
		const jwtAccessToken=getState().rider.appState.jwtAccessToken;
		dispatch(searchInit())
		dispatch(sendsearchrequest())
		dispatch(searchSetValue(query))
		fetch(`${config.serverSideUrl}:${config.port}/api/users/property`, {
		  method: "POST",
		  headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: jwtAccessToken
		  },
		  body:JSON.stringify({name:query})
		})
      .then(resp => resp.json())
	  	.then(data=>{
				if(Object.keys(data).length>0 && (data.data).length>0){
					var PropertyData = [];
					let disanceData = (data.data).map(async (item) => {
						return new Promise(async (resolve,reject)=>{
							let propData = item
							calculateDistanceAdvr(propData.mapCoordinates.coordinates[0],propData.mapCoordinates.coordinates[1],getState().basicAppConfig.config.googleMapsApiKey,getState().rider.user.gpsLoc[0],getState().rider.user.gpsLoc[1]).then(data=>{
								propData.distance = data
								if(data!=='ZERO_RESULTS'){
									PropertyData.push(propData)
									resolve(PropertyData);
								}else{
									resolve(PropertyData)
								}
							})
						})
					});
					Promise.all(disanceData).then(data=>{
						dispatch(searchrequestsuccess({data:PropertyData,status:true}))
					})
				}else{
					dispatch(searchrequestsuccess(data))
				}
			})
	  	.catch(e=>{
		  	dispatch(searchrequestfailed())
	  	})
	}
}
/*Calculate the distance and render in view*/ 
export function calculateDistanceAdvr(longitude,latitude,api,currentLat,currentLong){
	return new Promise((resolve,reject)=>{
		let apikey = api;
		let destination = (latitude && longitude)?(latitude+","+longitude).toString():null;
		let origin = (typeof currentLat!='undefined' && typeof currentLong!='undefined' && currentLong && currentLat)?(currentLat+","+currentLong).toString():null;
		if(origin){
			fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin}&destinations=${destination}&key=${apikey}`,{method: 'GET'})
				.then(res => res.text())
				.then(res => JSON.parse(res))
				.then(res=>{
					  if(res && res.status=='OK'){
						if(res.rows){
						  let result=(res.rows[0].elements && res.rows[0].elements[0].status!='ZERO_RESULTS' )? res.rows[0].elements[0].distance.text:res.rows[0].elements[0].status;
						  resolve(result)
						}else{
						  resolve('ZERO_RESULTS');
						}
					  }else{
						resolve('ZERO_RESULTS');
					  }
					}).catch(err=>{
						resolve('ZERO_RESULTS');
					})
		}else{
			resolve('ZERO_RESULTS');
		}
	})
}