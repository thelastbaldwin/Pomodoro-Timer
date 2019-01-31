// actions
const ADD_TASK = "ADD_TASK";
const COMPLETE_TASK = "COMPLETE_TASK";
const MOVE_TASK = "MOVE_TASK";
const REMOVE_TASK = "REMOVE_TASK";
const TICK_TASK = "TICK";
const SET_PAUSE = "SET_PAUSE";

// action creators
const addTaskAction = taskText => ({
  type: ADD_TASK,
  payload: taskText
});

const completeTaskAction = index => ({
  type: COMPLETE_TASK,
  payload: index
});

const removeTaskAction = index => ({
  type: REMOVE_TASK,
  payload: index
});

const moveTaskAction = (index, newIndex) => ({
  type: MOVE_TASK,
  payload: {index, newIndex}
});

const tickAction = () => ({
  type: TICK_TASK
});

const setPauseAction = isPaused => ({
  type: SET_PAUSE,
  payload: isPaused
});

export {
  addTaskAction,
  completeTaskAction,
  moveTaskAction,
  removeTaskAction,
  setPauseAction,
  tickAction,
  ADD_TASK,
  COMPLETE_TASK,
  MOVE_TASK,
  REMOVE_TASK,
  SET_PAUSE,
  TICK_TASK
};
