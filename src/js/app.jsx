import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import PomodoroTaskList from "./components/pomodoroTaskList";

import {
  addTaskAction,
  completeTaskAction,
  moveTaskAction,
  removeTaskAction,
  setPauseAction,
  tickAction
} from "./store/actions";

const mapStateToProps = state => ({
  onBreak: state.onBreak,
  secondsRemaining: state.secondsRemaining,
  tasks: state.tasks,
  timerPaused: state.timerPaused
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addTaskAction,
  completeTaskAction,
  moveTaskAction,
  removeTaskAction,
  setPauseAction,
  tickAction
}, dispatch);

const App = connect(mapStateToProps, mapDispatchToProps)(PomodoroTaskList);

export default App;
