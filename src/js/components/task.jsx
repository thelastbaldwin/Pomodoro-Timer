import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "../../css/components/task.css";

class Task extends React.Component {
  moveTaskUp = (event) => {
    event.stopPropagation();
    this.props.moveTaskAction(this.props.index, this.props.index - 1);
  }

  moveTaskDown = (event) => {
    event.stopPropagation();
    this.props.moveTaskAction(this.props.index, this.props.index + 1);
  }

  handleClick = () => {
    this.props.completeTaskAction(this.props.index);
  }

  render() {
    return (
      <li className={styles.wrapper}>
        <div
          className={classnames(
            styles.task,
            {[styles.complete]: this.props.complete}
          )}
          onClick={this.handleClick}
          onKeyPress={this.handleClick}
          role="button"
          tabIndex="0"
          aria-label="complete task"
        >
          <h3 className={styles.title}>{this.props.title}</h3>
          <div className={styles.actions}>
            <span
              className={styles.prioritize}
              role="button"
              tabIndex="0"
              aria-label="increase priority"
              onClick={this.moveTaskUp}
              onKeyPress={this.moveTaskUp}
            >
            +
            </span>
            <span
              className={styles.deprioritize}
              role="button"
              tabIndex="0"
              aria-label="decrease priority"
              onClick={this.moveTaskDown}
              onKeyPress={this.moveTaskDown}
            >
            &ndash;
            </span>
          </div>
        </div>
      </li>
    );
  }
}

Task.propTypes = {
  complete: PropTypes.bool,
  index: PropTypes.number,
  title: PropTypes.string,
  completeTaskAction: PropTypes.func,
  moveTaskAction: PropTypes.func,
  removeTaskAction: PropTypes.func
};

export default Task;
