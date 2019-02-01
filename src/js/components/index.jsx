import React from "react";
import PropTypes from "prop-types";
import styles from "../../css/components/index.css";
import TaskList from "./taskList";
import Timer from "./timer";

const PomodoroTaskList = (props) => {
  const {
    tasks,
    addTaskAction,
    clearCompleteAction,
    completeTaskAction,
    moveTaskAction,
    onBreak,
    timerCompleteAction,
    timerDuration,
    timerPaused
  } = props;

  return (
    <div className={styles.container}>
      <Timer
        duration={timerDuration}
        onBreak={onBreak}
        paused={timerPaused}
        timerCompleteAction={timerCompleteAction}
      />
      <TaskList
        addTaskAction={addTaskAction}
        clearCompleteAction={clearCompleteAction}
        completeTaskAction={completeTaskAction}
        moveTaskAction={moveTaskAction}
        tasks={tasks}
      />
    </div>
  );
}

PomodoroTaskList.defaultProps = {
  addTaskAction: () => {},
  clearCompleteAction: () => {},
  completeTaskAction: () => {},
  moveTaskAction: () => {},
  tasks: [],
  timerCompleteAction: () => {},
  timerDuration: 0
};

PomodoroTaskList.propTypes = {
  addTaskAction: PropTypes.func,
  clearCompleteAction: PropTypes.func,
  completeTaskAction: PropTypes.func,
  moveTaskAction: PropTypes.func,
  onBreak: PropTypes.bool,
  timerCompleteAction: PropTypes.func,
  timerDuration: PropTypes.number,
  tasks: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    complete: PropTypes.bool
  })),
  timerPaused: PropTypes.bool
};

export default PomodoroTaskList;
