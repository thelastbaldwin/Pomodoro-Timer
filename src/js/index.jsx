import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import rootReducer from "./store/reducers";
import App from "./app";
import APP_STORAGE_KEY from "./constants";


const defaultState = (() => {
  const state = {
    tasks: [],
    secondsRemaining: 25 * 60,
    onBreak: false,
    timerPaused: true
  };

  // TODO: re-add this feature
  // if (window.localStorage) {
  //   let cachedState;
  //   try {
  //     cachedState = JSON.parse(window.localStorage.getItem(APP_STORAGE_KEY));
  //     state = {...state, cachedState} || state;
  //   } catch (error) {
  //     window.localStorage.clear();
  //   }
  // }
  return state;
})();

const store = createStore(
  rootReducer,
  defaultState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
