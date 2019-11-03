export const INIT_ADVERTISMENTS = "INIT_ADVERTISMENTS"
export const FOOD_ADVERTISMENTS_SUCCESS = "FOOD_ADVERTISMENTS_SUCCESS"
export const FOOD_ADVERTISMENTS_FAILED = "FOOD_ADVERTISMENTS_FAILED"
export const COFFEE_ADVERTISMENTS_SUCCESS = "COFFEE_ADVERTISMENTS_SUCCESS"
export const COFFEE_ADVERTISMENTS_FAILED = "COFFEE_ADVERTISMENTS_FAILED"
export const FUN_ADVERTISMENTS_SUCCESS = "FUN_ADVERTISMENTS_SUCCESS"
export const FUN_ADVERTISMENTS_FAILED = "FUN_ADVERTISMENTS_FAILED"
export const RENTAL_ADVERTISMENTS_SUCCESS = "RENTAL_ADVERTISMENTS_SUCCESS"
export const RENTAL_ADVERTISMENTS_FAILED = "RENTAL_ADVERTISMENTS_FAILED"
export const NIGHTLIFE_ADVERTISMENTS_SUCCESS = "NIGHTLIFE_ADVERTISMENTS_SUCCESS"
export const NIGHTLIFE_ADVERTISMENTS_FAILED = "NIGHTLIFE_ADVERTISMENTS_FAILED"
export const START_ADVERTISMENT_LOADING = "START_ADVERTISMENT_LOADING"
export const STOP_ADVERTISMENT_LOADING = "STOP_ADVERTISMENT_LOADING"

export function loadingAdverts(){
return {
    type: START_ADVERTISMENT_LOADING
  };	
}
export function stoploadingAdverts(){
return {
    type: STOP_ADVERTISMENT_LOADING
  };	
}
export function initialAdvertisment(){
return {
    type: INIT_ADVERTISMENTS
  };
}
export function successFoodAdvertisment(data){
return {
    type: FOOD_ADVERTISMENTS_SUCCESS,
	payload: data
  };
}
export function failedFoodAdvertisment(){
return {
    type: FOOD_ADVERTISMENTS_FAILED,
  };
}
export function successCoffeeAdvertisment(data){
return {
    type: COFFEE_ADVERTISMENTS_SUCCESS,
	payload: data
  };
}
export function failedCoffeeAdvertisment(){
return {
    type: COFFEE_ADVERTISMENTS_FAILED,
  };
}export function successFunAdvertisment(data){
return {
    type: FUN_ADVERTISMENTS_SUCCESS,
	payload: data
  };
}
export function failedFunAdvertisment(){
return {
    type: FUN_ADVERTISMENTS_FAILED,
  };
}
export function successNightAdvertisment(data){
return {
    type: NIGHTLIFE_ADVERTISMENTS_SUCCESS,
	payload: data
  };
}
export function failedNightAdvertisment(){
return {
    type: NIGHTLIFE_ADVERTISMENTS_FAILED,
  };
}
export function successRentalAdvertisment(data){
return {
    type: RENTAL_ADVERTISMENTS_SUCCESS,
	payload: data
  };
}
export function failedRentalAdvertisment(){
return {
    type: RENTAL_ADVERTISMENTS_FAILED,
  };
}
export function fetchAdvertisements(){
	const advertismentUrl = "https://dispatch-ads.herokuapp.com/api/webservice/dispatch-ads-everything_api?type=category&value="
	return async (dispatch,getState)=> {
	dispatch(loadingAdverts());
	dispatch(initialAdvertisment());
	let promise0 = new Promise((resolve,reject)=>{
      let category = 'Food';
      let tempfood = [];
      fetch((advertismentUrl).concat('',category))
          .then(response=>response.text())
          .then(response=>{
            let finalResp = JSON.parse(response);
            if(finalResp && finalResp.length>0){
              let finalAdverts = (finalResp).filter((mainitem)=>{
                if(mainitem.longitude && mainitem.latitude){
                  return mainitem;
                }
              })
              if(finalAdverts.length>0){
                let finalPromise = (finalAdverts).map(async (item)=>{
                  return new Promise((resolve,reject)=>{
                        calculateDistance(item.longitude,item.latitude,getState().basicAppConfig.config.googleMapsApiKey,getState().rider.user.gpsLoc[0],getState().rider.user.gpsLoc[1]).then(async(data)=>{
						 if(data!='ZERO_RESULTS'){
							let newObj = Object.assign({}, item ,{distance:data,category:'Food'})
							await tempfood.push(newObj);
                          resolve("true");
						 }else{
                          resolve("true");
						  }
                          
                        }).catch(err=>{
                          console.log(err)
                          resolve("true")
                        })
                  }) 
                })
                Promise.all(finalPromise).then(data=>{
					if(tempfood.length>0){
						let finalObj = Object.assign({},{category:'Food',advertisements:tempfood})
                  dispatch(successFoodAdvertisment(finalObj));
                  resolve("true")
					}else{
                  dispatch(successFoodAdvertisment({}));
                  resolve("true")
					}
                  
                })
              }else{
                dispatch(successFoodAdvertisment({}));
                resolve("true")
              }
            }else{
				      dispatch(successFoodAdvertisment({}));
				      resolve("true")
			      }
          }).catch(err=>{
            console.log(err)
            dispatch(failedFoodAdvertisment());
            resolve("true")
          })
    })
  let promise1 = new Promise((resolve,reject)=>{
      let category = 'Coffee';
      let tempfood = [];
      fetch((advertismentUrl).concat('',category))
          .then(response=>response.text())
          .then(response=>{
            let finalResp = JSON.parse(response);
            if(finalResp && finalResp.length>0){
              let finalAdverts = (finalResp).filter((mainitem)=>{
                if(mainitem.longitude && mainitem.latitude){
                  return mainitem;
                }
              })
              if(finalAdverts.length>0){
                let finalPromise = (finalAdverts).map(async (item)=>{
                  return new Promise((resolve,reject)=>{
                        calculateDistance(item.longitude,item.latitude,getState().basicAppConfig.config.googleMapsApiKey,getState().rider.user.gpsLoc[0],getState().rider.user.gpsLoc[1]).then(async(data)=>{
                          if(data!='ZERO_RESULTS'){
							let newObj = Object.assign({}, item ,{distance:data,category:'Coffee'})
							await tempfood.push(newObj);
							resolve("true");
						  }else{
							resolve("true");
						  }
                        }).catch(err=>{
                          console.log(err)
                          resolve("true")
                        })
                  }) 
                })
                Promise.all(finalPromise).then(data=>{
					if(tempfood.length>0){
						 let finalObj = Object.assign({},{category:'Coffee',advertisements:tempfood})
                dispatch(successCoffeeAdvertisment(finalObj));
                  resolve("true")
					}else{
                dispatch(successCoffeeAdvertisment({}));
                  resolve("true")
					}
                 
                })
              }else{
                dispatch(successCoffeeAdvertisment({}));
                resolve("true")
              }
            }else{
				      dispatch(successCoffeeAdvertisment({}));
				      resolve("true")
			      }
          }).catch(err=>{
            console.log(err)
            dispatch(failedCoffeeAdvertisment());
            resolve("true")
          })
    })
	let promise2 = new Promise((resolve,reject)=>{
      let category = 'Fun';
      let tempfood = [];
      fetch((advertismentUrl).concat('',category))
          .then(response=>response.text())
          .then(response=>{
            let finalResp = JSON.parse(response);
            if(finalResp && finalResp.length>0){
              let finalAdverts = (finalResp).filter((mainitem)=>{
                if(mainitem.longitude && mainitem.latitude){
                  return mainitem;
                }
              })
              if(finalAdverts.length>0){
                let finalPromise = (finalAdverts).map(async (item)=>{
                  return new Promise((resolve,reject)=>{
                        calculateDistance(item.longitude,item.latitude,getState().basicAppConfig.config.googleMapsApiKey,getState().rider.user.gpsLoc[0],getState().rider.user.gpsLoc[1]).then(async(data)=>{
						  if(data!='ZERO_RESULTS'){
							let newObj = Object.assign({}, item ,{distance:data,category:'Fun'})
							await tempfood.push(newObj);
							resolve("true");
						  }else{
							resolve("true");
						  }
                          
                          
                        }).catch(err=>{
                          console.log(err)
                          resolve("true")
                        })
                  }) 
                })
                Promise.all(finalPromise).then(data=>{
				  if(tempfood.length>0){
					let finalObj = Object.assign({},{category:'Fun',advertisements:tempfood})
                dispatch(successFunAdvertisment(finalObj));
                  resolve("true")  
				  }else{
                dispatch(successFunAdvertisment({}));
                  resolve("true")  
				  }
                  
                })
              }else{
                dispatch(successFunAdvertisment({}));
                resolve("true")
              }
            }else{
				      dispatch(successFunAdvertisment({}));
				      resolve("true")
			      }
          }).catch(err=>{
            console.log(err)
            dispatch(failedFunAdvertisment());
            resolve("true")
          })
    })
	let promise3 = new Promise((resolve,reject)=>{
      let category = 'Rental';
      let tempfood = [];
      fetch((advertismentUrl).concat('',category))
          .then(response=>response.text())
          .then(response=>{
            let finalResp = JSON.parse(response);
            if(finalResp && finalResp.length>0){
              let finalAdverts = (finalResp).filter((mainitem)=>{
                if(mainitem.longitude && mainitem.latitude){
                  return mainitem;
                }
              })
              if(finalAdverts.length>0){
                let finalPromise = (finalAdverts).map(async (item)=>{
                  return new Promise((resolve,reject)=>{
                        calculateDistance(item.longitude,item.latitude,getState().basicAppConfig.config.googleMapsApiKey,getState().rider.user.gpsLoc[0],getState().rider.user.gpsLoc[1]).then(async(data)=>{
                          if(data!='ZERO_RESULTS'){
							let newObj = Object.assign({}, item ,{distance:data,category:'Rental'})
							await tempfood.push(newObj);
							resolve("true");
						  }else{
							resolve("true");
						  }
                        }).catch(err=>{
                          console.log(err)
                          resolve("true")
                        })
                  }) 
                })
                Promise.all(finalPromise).then(data=>{
				  if(tempfood.length>0){
					let finalObj = Object.assign({},{category:'Rental',advertisements:tempfood})
					dispatch(successRentalAdvertisment(finalObj));  
					resolve("true")
				  }else{
					dispatch(successRentalAdvertisment({}));  
					resolve("true")  
				  }
                  
                  
                })
              }else{
                dispatch(successRentalAdvertisment({}));
                resolve("true")
              }
            }else{
				      dispatch(successRentalAdvertisment({}));
				      resolve("true")
			      }
          }).catch(err=>{
            console.log(err)
            dispatch(failedRentalAdvertisment());
            resolve("true")
          })
    })
	let promise4 = new Promise((resolve,reject)=>{
      let category = 'Nightlife';
      let tempfood = [];
      fetch((advertismentUrl).concat('',category))
          .then(response=>response.text())
          .then(response=>{
            let finalResp = JSON.parse(response);
            if(finalResp && finalResp.length>0){
              let finalAdverts = (finalResp).filter((mainitem)=>{
                if(mainitem.longitude && mainitem.latitude){
                  return mainitem;
                }
              })
              if(finalAdverts.length>0){
                let finalPromise = (finalAdverts).map(async (item)=>{
                  return new Promise((resolve,reject)=>{
                        calculateDistance(item.longitude,item.latitude,getState().basicAppConfig.config.googleMapsApiKey,getState().rider.user.gpsLoc[0],getState().rider.user.gpsLoc[1]).then(async(data)=>{
                          if(data!='ZERO_RESULTS'){
							let newObj = Object.assign({}, item ,{distance:data,category:'Nightlife'})
							await tempfood.push(newObj);
							resolve("true");
						  }else{
							resolve("true");
						  }
                        }).catch(err=>{
                          console.log(err)
                          resolve("true")
                        })
                  }) 
                })
                Promise.all(finalPromise).then(data=>{
					if(tempfood.length>0){
						let finalObj = Object.assign({},{category:'Nightlife',advertisements:tempfood})
                dispatch(successNightAdvertisment(finalObj));
                  resolve("true")
					}else{
                dispatch(successNightAdvertisment({}));
                  resolve("true")
					}
                  
                })
              }else{
                dispatch(successNightAdvertisment({}));
                resolve("true")
              }
            }else{
				      dispatch(successNightAdvertisment({}));
				      resolve("true")
			      }
          }).catch(err=>{
            console.log(err)
            dispatch(failedNightAdvertisment());
            resolve("true")
          })
    })
	Promise.all([promise0,promise1,promise2,promise3,promise4]).then(data=>{
  //Promise.all([promise0]).then(data=>{
		dispatch(stoploadingAdverts());
	}).catch(err=>{
    console.log(err)
		dispatch(stoploadingAdverts());
	})
	}
}
/*export function fetchAdvertisements(){
	const advertismentUrl = "https://dispatch-ads.herokuapp.com/api/webservice/dispatch-ads-everything_api?type=category&value="
	return async (dispatch,getState)=> {
	dispatch(loadingAdverts());
	dispatch(initialAdvertisment());
	let promise0 = new Promise((resolve,reject)=>{
      let category = 'Food';
      let tempfood = [];
      let finalAdvertismentdata = [];
      fetch((advertismentUrl).concat('',category))
          .then(response=>response.text())
          .then(response=>{
            let finalResp = JSON.parse(response);
            if(finalResp && finalResp.length>0){
              let finalAdverts = (finalResp).filter((mainitem)=>{
                if(mainitem.advertisements!=='undefined' && (mainitem.advertisements).length>0){
                  return mainitem;
                }
              })
              if(finalAdverts.length>0){
                let advertismentData = (finalAdverts).map(async (mainitem)=>{
                  return (mainitem.advertisements).map(async (aditem,adkey)=>{
                    let obj = Object.assign({}, aditem , mainitem.imgs[adkey],{'longitude':(mainitem.longitude)?mainitem.longitude:null,'latitude':(mainitem.latitude)?mainitem.latitude:null,'phone':mainitem.phone,'category':'Food'})
                    await finalAdvertismentdata.push(obj);
                    return obj;
                  })
                })
                if(finalAdvertismentdata.length>0){
                  let distanceData = (finalAdvertismentdata).filter((adv,advkey)=>{
                    if(adv.longitude && adv.latitude){
                      return adv
                    }
                  })
                  if(distanceData.length>0){
                    let finalPromise = (distanceData).map(async (item)=>{
                      return new Promise((resolve,reject)=>{
                        calculateDistance(item.longitude,item.latitude,getState().basicAppConfig.config.googleMapsApiKey,getState().rider.user.gpsLoc[0],getState().rider.user.gpsLoc[1]).then(async(data)=>{
                          let newObj = Object.assign({}, item ,{distance:data})
                          await tempfood.push(newObj);
                          resolve("true");
                        }).catch(err=>{
                          console.log(err)
                          resolve("true")
                        })
                      }) 
                    })
                    Promise.all(finalPromise).then(data=>{
                      let finalObj = Object.assign({},{category:'Food',advertisements:tempfood})
                      dispatch(successFoodAdvertisment(finalObj));
                      resolve("true")
                    })
                  }else{
                    dispatch(successFoodAdvertisment({}));
                    resolve("true")
                  }
                }else{
                  dispatch(successFoodAdvertisment({}));
                  resolve("true")
                }
              }else{
                dispatch(successFoodAdvertisment({}));
                resolve("true")
              }
            }else{
				      dispatch(successFoodAdvertisment({}));
				      resolve("true")
			      }
          }).catch(err=>{
            console.log(err)
            dispatch(failedFoodAdvertisment());
            resolve("true")
          })
    })
    let promise1 = new Promise((resolve,reject)=>{
      let category = 'Coffee';
      let tempfood = [];
      let finalAdvertismentdata = [];
      fetch((advertismentUrl).concat('',category))
          .then(response=>response.text())
          .then(response=>{
            let finalResp = JSON.parse(response);
            if(finalResp && finalResp.length>0){
              let finalAdverts = (finalResp).filter((mainitem)=>{
                if(mainitem.advertisements!=='undefined' && (mainitem.advertisements).length>0){
                  return mainitem;
                }
              })
              if(finalAdverts.length>0){
                let advertismentData = (finalAdverts).map(async (mainitem)=>{
                  return (mainitem.advertisements).map(async (aditem,adkey)=>{
                    let obj = Object.assign({}, aditem , mainitem.imgs[adkey],{'longitude':(mainitem.longitude)?mainitem.longitude:null,'latitude':(mainitem.latitude)?mainitem.latitude:null,'phone':mainitem.phone,'category':'Coffee'})
                    await finalAdvertismentdata.push(obj);
                    return obj;
                  })
                })
                if(finalAdvertismentdata.length>0){
                  let distanceData = (finalAdvertismentdata).filter((adv,advkey)=>{
                    if(adv.longitude && adv.latitude){
                      return adv
                    }
                  })
                  if(distanceData.length>0){
                    let finalPromise = (distanceData).map(async (item)=>{
                      return new Promise((resolve,reject)=>{
                        calculateDistance(item.longitude,item.latitude,getState().basicAppConfig.config.googleMapsApiKey,getState().rider.user.gpsLoc[0],getState().rider.user.gpsLoc[1]).then(async(data)=>{
                          let newObj = Object.assign({}, item ,{distance:data})
                          await tempfood.push(newObj);
                          resolve("true");
                        }).catch(err=>{
                          console.log(err)
                          resolve("true")
                        })
                      }) 
                    })
                    Promise.all(finalPromise).then(data=>{
                      let finalObj = Object.assign({},{category:'Coffee',advertisements:tempfood})
                      dispatch(successCoffeeAdvertisment(finalObj));
                      resolve("true")
                    })
                  }else{
                    dispatch(successCoffeeAdvertisment({}));
                    resolve("true")
                  }
                }else{
                  dispatch(successCoffeeAdvertisment({}));
                  resolve("true")
                }
              }else{
                dispatch(successCoffeeAdvertisment({}));
                resolve("true")
              }
            }else{
				      dispatch(successCoffeeAdvertisment({}));
				      resolve("true")
			      }
          }).catch(err=>{
            console.log(err)
            dispatch(failedCoffeeAdvertisment());
            resolve("true")
          })
    })
    let promise2 = new Promise((resolve,reject)=>{
      let category = 'Fun';
      let tempfood = [];
      let finalAdvertismentdata = [];
      fetch((advertismentUrl).concat('',category))
          .then(response=>response.text())
          .then(response=>{
            let finalResp = JSON.parse(response);
            if(finalResp && finalResp.length>0){
              let finalAdverts = (finalResp).filter((mainitem)=>{
                if(mainitem.advertisements!=='undefined' && (mainitem.advertisements).length>0){
                  return mainitem;
                }
              })
              if(finalAdverts.length>0){
                let advertismentData = (finalAdverts).map(async (mainitem)=>{
                  return (mainitem.advertisements).map(async (aditem,adkey)=>{
                    let obj = Object.assign({}, aditem , mainitem.imgs[adkey],{'longitude':(mainitem.longitude)?mainitem.longitude:null,'latitude':(mainitem.latitude)?mainitem.latitude:null,'phone':mainitem.phone,'category':'Fun'})
                    await finalAdvertismentdata.push(obj);
                    return obj;
                  })
                })
                if(finalAdvertismentdata.length>0){
                  let distanceData = (finalAdvertismentdata).filter((adv,advkey)=>{
                    if(adv.longitude && adv.latitude){
                      return adv
                    }
                  })
                  if(distanceData.length>0){
                    let finalPromise = (distanceData).map(async (item)=>{
                      return new Promise((resolve,reject)=>{
                        calculateDistance(item.longitude,item.latitude,getState().basicAppConfig.config.googleMapsApiKey,getState().rider.user.gpsLoc[0],getState().rider.user.gpsLoc[1]).then(async(data)=>{
                          let newObj = Object.assign({}, item ,{distance:data})
                          await tempfood.push(newObj);
                          resolve("true");
                        }).catch(err=>{
                          console.log(err)
                          resolve("true")
                        })
                      }) 
                    })
                    Promise.all(finalPromise).then(data=>{
                      let finalObj = Object.assign({},{category:'Fun',advertisements:tempfood})
                      dispatch(successFunAdvertisment(finalObj));
                      resolve("true")
                    })
                  }else{
                    dispatch(successFunAdvertisment({}));
                    resolve("true")
                  }
                }else{
                  dispatch(successFunAdvertisment({}));
                  resolve("true")
                }
              }else{
                dispatch(successFunAdvertisment({}));
                resolve("true")
              }
            }else{
				      dispatch(successFunAdvertisment({}));
				      resolve("true")
			      }
          }).catch(err=>{
            console.log(err)
            dispatch(failedFunAdvertisment());
            resolve("true")
          })
    })
    let promise3 = new Promise((resolve,reject)=>{
      let category = 'Rental';
      let tempfood = [];
      let finalAdvertismentdata = [];
      fetch((advertismentUrl).concat('',category))
          .then(response=>response.text())
          .then(response=>{
            let finalResp = JSON.parse(response);
            if(finalResp && finalResp.length>0){
              let finalAdverts = (finalResp).filter((mainitem)=>{
                if(mainitem.advertisements!=='undefined' && (mainitem.advertisements).length>0){
                  return mainitem;
                }
              })
              if(finalAdverts.length>0){
                let advertismentData = (finalAdverts).map(async (mainitem)=>{
                  return (mainitem.advertisements).map(async (aditem,adkey)=>{
                    let obj = Object.assign({}, aditem , mainitem.imgs[adkey],{'longitude':(mainitem.longitude)?mainitem.longitude:null,'latitude':(mainitem.latitude)?mainitem.latitude:null,'phone':mainitem.phone,'category':'Rental'})
                    await finalAdvertismentdata.push(obj);
                    return obj;
                  })
                })
                if(finalAdvertismentdata.length>0){
                  let distanceData = (finalAdvertismentdata).filter((adv,advkey)=>{
                    if(adv.longitude && adv.latitude){
                      return adv
                    }
                  })
                  if(distanceData.length>0){
                    let finalPromise = (distanceData).map(async (item)=>{
                      return new Promise((resolve,reject)=>{
                        calculateDistance(item.longitude,item.latitude,getState().basicAppConfig.config.googleMapsApiKey,getState().rider.user.gpsLoc[0],getState().rider.user.gpsLoc[1]).then(async(data)=>{
                          let newObj = Object.assign({}, item ,{distance:data})
                          await tempfood.push(newObj);
                          resolve("true");
                        }).catch(err=>{
                          console.log(err)
                          resolve("true")
                        })
                      }) 
                    })
                    Promise.all(finalPromise).then(data=>{
                      let finalObj = Object.assign({},{category:'Rental',advertisements:tempfood})
                      dispatch(successRentalAdvertisment(finalObj));
                      resolve("true")
                    })
                  }else{
                    dispatch(successRentalAdvertisment({}));
                    resolve("true")
                  }
                }else{
                  dispatch(successRentalAdvertisment({}));
                  resolve("true")
                }
              }else{
                dispatch(successRentalAdvertisment({}));
                resolve("true")
              }
            }else{
				      dispatch(successRentalAdvertisment({}));
				      resolve("true")
			      }
          }).catch(err=>{
            console.log(err)
            dispatch(failedRentalAdvertisment());
            resolve("true")
          })
    })
    let promise4 = new Promise((resolve,reject)=>{
      let category = 'Nightlife';
      let tempfood = [];
      let finalAdvertismentdata = [];
      fetch((advertismentUrl).concat('',category))
          .then(response=>response.text())
          .then(response=>{
            let finalResp = JSON.parse(response);
            if(finalResp && finalResp.length>0){
              let finalAdverts = (finalResp).filter((mainitem)=>{
                if(mainitem.advertisements!=='undefined' && (mainitem.advertisements).length>0){
                  return mainitem;
                }
              })
              if(finalAdverts.length>0){
                let advertismentData = (finalAdverts).map(async (mainitem)=>{
                  return (mainitem.advertisements).map(async (aditem,adkey)=>{
                    let obj = Object.assign({}, aditem , mainitem.imgs[adkey],{'longitude':(mainitem.longitude)?mainitem.longitude:null,'latitude':(mainitem.latitude)?mainitem.latitude:null,'phone':mainitem.phone,'category':'Nightlife'})
                    await finalAdvertismentdata.push(obj);
                    return obj;
                  })
                })
                if(finalAdvertismentdata.length>0){
                  let distanceData = (finalAdvertismentdata).filter((adv,advkey)=>{
                    if(adv.longitude && adv.latitude){
                      return adv
                    }
                  })
                  if(distanceData.length>0){
                    let finalPromise = (distanceData).map(async (item)=>{
                      return new Promise((resolve,reject)=>{
                        calculateDistance(item.longitude,item.latitude,getState().basicAppConfig.config.googleMapsApiKey,getState().rider.user.gpsLoc[0],getState().rider.user.gpsLoc[1]).then(async(data)=>{
                          let newObj = Object.assign({}, item ,{distance:data})
                          await tempfood.push(newObj);
                          resolve("true");
                        }).catch(err=>{
                          console.log(err)
                          resolve("true")
                        })
                      }) 
                    })
                    Promise.all(finalPromise).then(data=>{
                      let finalObj = Object.assign({},{category:'Nightlife',advertisements:tempfood})
                      dispatch(successNightAdvertisment(finalObj));
                      resolve("true")
                    })
                  }else{
                    dispatch(successNightAdvertisment({}));
                    resolve("true")
                  }
                }else{
                  dispatch(successNightAdvertisment({}));
                  resolve("true")
                }
              }else{
                dispatch(successNightAdvertisment({}));
                resolve("true")
              }
            }else{
				      dispatch(successNightAdvertisment({}));
				      resolve("true")
			      }
          }).catch(err=>{
            console.log(err)
            dispatch(failedNightAdvertisment());
            resolve("true")
          })
    })
	Promise.all([promise0,promise1,promise2,promise3,promise4]).then(data=>{
		dispatch(stoploadingAdverts());
	}).catch(err=>{
    console.log(err)
		dispatch(stoploadingAdverts());
	})
	}
}*/
export async function calculateDistance(longitude,latitude,api,currentLat,currentLong){
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