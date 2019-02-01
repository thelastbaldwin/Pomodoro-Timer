import {
  ADD_TASK,
  CLEAR_COMPLETE,
  COMPLETE_TASK,
  MOVE_TASK,
  TIMER_COMPLETE
} from "./actions";
import {swap} from "../util";
import {
  SHORT_BREAK_DURATION,
  LONG_BREAK_DURATION,
  WORK_SESSION_DURATION
} from "../constants";

export const addTaskReducer = (state, action) => ({
  ...state,
  tasks: [...state.tasks, {title: action.payload, complete: false}]
});

export const clearCompleteReducer = state => ({
  ...state,
  tasks: state.tasks.filter(task => !task.complete)
});

export const completeTaskReducer = (state, action) => {
  const tasksCopy = [...state.tasks];
  const completedIndex = action.payload;
  tasksCopy[completedIndex].complete = true;

  return {
    ...state,
    tasks: tasksCopy
  };
};

export const moveTaskReducer = (state, action) => {
  const {
    index,
    newIndex
  } = action.payload;
  const dist = Math.abs(index - newIndex);

  if (dist === 1
    && ((newIndex >= 0 && newIndex < state.tasks.length))) {
    return {
      ...state,
      tasks: swap(state.tasks, index, newIndex)
    };
  }
  return state;
};

export const timerCompleteReducer = (state) => {
  const {onBreak} = state;
  // if you weren't on break, increase the count of completed sessions
  const workSessionsCompleted = !onBreak
    ? state.workSessionsCompleted + 1
    : state.workSessionsCompleted;
  // if you're now on a break, take a long break if you've completed 4 sessions,
  // otherwise take a short break
  const timerDuration = !onBreak
    ? workSessionsCompleted % 4 === 0
      ? LONG_BREAK_DURATION
      : SHORT_BREAK_DURATION
    : WORK_SESSION_DURATION;

  return {
    ...state,
    onBreak: !onBreak,
    workSessionsCompleted,
    timerDuration
  };
};

export default function rootReducer(state = [], action) {
  switch (action.type) {
    case ADD_TASK:
      return addTaskReducer(state, action);
    case CLEAR_COMPLETE:
      return clearCompleteReducer(state, action);
    case COMPLETE_TASK:
      return completeTaskReducer(state, action);
    case MOVE_TASK:
      return moveTaskReducer(state, action);
    case TIMER_COMPLETE:
      return timerCompleteReducer(state, action);
    default: {
      return state;
    }
  }
}
