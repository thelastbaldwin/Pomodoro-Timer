import React from "react";
import ReactDOM from "react-dom";
import {bindActionCreators, createStore} from "redux";
import {connect, Provider} from "react-redux";
import rootReducer from "./store/reducers";
import defaultState from "./store/defaultState";
import PomodoroTaskList from "./components";
import {
  addTaskAction,
  clearCompleteAction,
  completeTaskAction,
  moveTaskAction,
  timerCompleteAction
} from "./store/actionCreators";

const mapStateToProps = state => ({
  onBreak: state.onBreak,
  timerDuration: state.timerDuration,
  tasks: state.tasks
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addTaskAction,
  clearCompleteAction,
  completeTaskAction,
  moveTaskAction,
  timerCompleteAction
}, dispatch);

const store = createStore(
  rootReducer,
  defaultState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const App = connect(mapStateToProps, mapDispatchToProps)(PomodoroTaskList);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
