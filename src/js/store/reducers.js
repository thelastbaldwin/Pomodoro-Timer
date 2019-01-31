import {
  ADD_TASK,
  COMPLETE_TASK,
  MOVE_TASK,
  REMOVE_TASK,
  SET_PAUSE,
  TICK_TASK
} from "./actions";

// import APP_STORAGE_KEY from "../constants";

const swap = (arr, a, b) => {
  const copy = arr.slice(0);
  const temp = copy[a];
  copy[a] = copy[b];
  copy[b] = temp;

  return copy;
};

export default function rootReducer(state = [], action) {
  switch (action.type) {
    case ADD_TASK: {
      // TODO: save the new task list to local storage
      // window.localStorage.setItem(
      //   APP_STORAGE_KEY, JSON.stringify(
      //     {tasks: [...state.tasks, {title: action.payload, complete: false}]}
      //   )
      // );
      return {
        ...state,
        tasks: [...state.tasks, {title: action.payload, complete: false}]
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
    case TICK_TASK: {
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1
      };
    }
    case SET_PAUSE: {
      return {
        ...state,
        timerPaused: action.payload
      };
    }
    default: {
      return state;
    }
  }
  return state;
}
