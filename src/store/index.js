import { createStore, applyMiddleware, compose } from "redux";
import reducers from "../reducers";

import thunk from "redux-thunk";

function configureStore(preloadedState) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    reducers,
    preloadedState,
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
}
const store = configureStore();

export default store;
