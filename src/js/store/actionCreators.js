import {
  ADD_TASK,
  CLEAR_COMPLETE,
  COMPLETE_TASK,
  MOVE_TASK,
  REMOVE_TASK,
  TIMER_COMPLETE
} from "./actions";

export const addTaskAction = taskText => ({
  type: ADD_TASK,
  payload: taskText
});

export const clearCompleteAction = () => ({
  type: CLEAR_COMPLETE
});

export const completeTaskAction = index => ({
  type: COMPLETE_TASK,
  payload: index
});

export const moveTaskAction = (index, newIndex) => ({
  type: MOVE_TASK,
  payload: {index, newIndex}
});

export const removeTaskAction = index => ({
  type: REMOVE_TASK,
  payload: index
});

export const timerCompleteAction = () => ({
  type: TIMER_COMPLETE
});
