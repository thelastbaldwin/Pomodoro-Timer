import React from "react";
import PropTypes from "prop-types";
import styles from "../../css/components/taskList.css";
import Task from "./task";

const TaskPlaceholder = () => (
  <h2 className={styles.placeholder}>
    You have no tasks in your tasklist
  </h2>
);

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.newTaskRef = React.createRef();
  }

  renderTasks() {
    const {
      completeTaskAction,
      moveTaskAction,
      removeTaskAction,
      tasks
    } = this.props;

    return (
      <ul className={styles.tasks}>
        {
          tasks.map(
            (task, index) => (
              (
                <Task
                  index={index}
                  key={task.title}
                  title={task.title}
                  complete={task.complete}
                  completeTaskAction={completeTaskAction}
                  removeTaskAction={removeTaskAction}
                  moveTaskAction={moveTaskAction}
                />
              )
            )
          )
        }
      </ul>
    );
  }

  render() {
    const {
      tasks,
      addTaskAction
    } = this.props;

    return (
      <div className={styles.container}>
        {tasks.length ? this.renderTasks() : <TaskPlaceholder />}
        <form onSubmit={(event) => {
          event.preventDefault();
          const newTask = this.newTaskRef.current.value;
          if (newTask) {
            addTaskAction(newTask);
            this.newTaskRef.current.value = "";
          }
        }}
        >
          <fieldset>
            <legend>Add Task</legend>
            <input
              ref={this.newTaskRef}
              type="text"
              placeholder="Task Name"
              name="taskName"
              id="taskName"
              maxLength="50"
              autoComplete="off"
            />
            <input type="submit" value="+" />
          </fieldset>
        </form>
      </div>
    );
  }
}

TaskList.defaultProps = {
  addTaskAction: () => {},
  completeTaskAction: () => {},
  removeTaskAction: () => {},
  moveTaskAction: () => {},
  tasks: []
};

TaskList.propTypes = {
  addTaskAction: PropTypes.func,
  completeTaskAction: PropTypes.func,
  removeTaskAction: PropTypes.func,
  moveTaskAction: PropTypes.func,
  tasks: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    complete: PropTypes.bool
  }))
};

export default TaskList;
