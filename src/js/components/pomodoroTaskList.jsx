import React from "react";
import PropTypes from "prop-types";
import styles from "../../css/components/pomodoroTaskList.css";
import TaskList from "./taskList";
import Timer from "./timer";

const PomodoroTaskList = (props) => {
  const {
    tasks,
    addTaskAction,
    completeTaskAction,
    moveTaskAction,
    onBreak,
    removeTaskAction,
    secondsRemaining,
    setPauseAction,
    tickAction,
    timerPaused
  } = props;

  return (
    <div className={styles.container}>
      <Timer
        secondsRemaining={secondsRemaining}
        onBreak={onBreak}
        paused={timerPaused}
        tickAction={tickAction}
        setPauseAction={setPauseAction}
      />
      <TaskList
        addTaskAction={addTaskAction}
        completeTaskAction={completeTaskAction}
        removeTaskAction={removeTaskAction}
        moveTaskAction={moveTaskAction}
        tasks={tasks}
      />
    </div>
  );
}

PomodoroTaskList.defaultProps = {
  secondsRemaining: 0,
  addTaskAction: () => {},
  completeTaskAction: () => {},
  removeTaskAction: () => {},
  moveTaskAction: () => {},
  setPauseAction: () => {},
  tickAction: () => {},
  tasks: []
};

PomodoroTaskList.propTypes = {
  addTaskAction: PropTypes.func,
  completeTaskAction: PropTypes.func,
  moveTaskAction: PropTypes.func,
  onBreak: PropTypes.bool,
  removeTaskAction: PropTypes.func,
  secondsRemaining: PropTypes.number,
  setPauseAction: PropTypes.func,
  tasks: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    complete: PropTypes.bool
  })),
  tickAction: PropTypes.func,
  timerPaused: PropTypes.bool
};

export default PomodoroTaskList;
