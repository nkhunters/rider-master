import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { autoRehydrate, persistStore } from "redux-persist";
import { createBlacklistFilter } from "redux-persist-transform-filter";
import { AsyncStorage } from "react-native";

import reducer from "./reducers";

const blacklistFilter = createBlacklistFilter("rider", [
  "tripRequest",
  "trip",
  "rideCardPayment",
  "paymentOption",
  "appState.loadingStatus"
]);

export default function configureStore(onCompletion): any {
  //   AsyncStorage.clear();
  const enhancer = compose(
    applyMiddleware(thunk),
    autoRehydrate()
  );

  const store = createStore(reducer, enhancer);
  persistStore(
    store,
    {
	  key: 'root',
      storage: AsyncStorage,
      blacklist: [
        "socialLogin",
        "entrypage",
        "form",
        "route",
        "trip",
        "appState",
        "viewStore",
        "rideCardPayment"
      ],
      transforms: [blacklistFilter]
    },
    onCompletion
  );

  return store;
}
