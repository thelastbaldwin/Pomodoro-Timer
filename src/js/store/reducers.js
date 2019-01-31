import {
  ADD_TASK,
  CLEAR_COMPLETE,
  COMPLETE_TASK,
  MOVE_TASK,
  REMOVE_TASK,
  TIMER_COMPLETE
} from "./actions";
import {swap} from "../util";

const SHORT_BREAK_DURATION = 5 * 60;
const WORK_SESSION_DURATION = 25 * 60;
const LONG_BREAK_DURATION = 15 * 60;

export default function rootReducer(state = [], action) {
  switch (action.type) {
    case ADD_TASK: {
      // TODO: save the new task list to local storage
      return {
        ...state,
        tasks: [...state.tasks, {title: action.payload, complete: false}]
      };
    }
    case CLEAR_COMPLETE: {
      return {
        ...state,
        tasks: state.tasks.filter(task => !task.complete)
      };
    }
    case COMPLETE_TASK: {
      const tasksCopy = [...state.tasks];
      const completedIndex = action.payload;
      tasksCopy[completedIndex].complete = true;

      return {
        ...state,
        tasks: tasksCopy
      };
    }
    case MOVE_TASK: {
      // TODO: save the new task list to local storage
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
      break;
    }
    case REMOVE_TASK: {
      // TODO: save the new task list to local storage
      const removeIndex = action.payload;
      const newTasks = state.tasks.slice(0);

      newTasks.splice(removeIndex, 1);

      return {
        ...state,
        tasks: newTasks
      };
    }
    case TIMER_COMPLETE: {
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
    }
    default: {
      return state;
    }
  }
  return state;
}
