import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "../../css/components/timer.css";

// TODO: move to separate file with a test
const padZeros = (time = 0, desiredLength = 2) => {
  let timeString = time.toString();
  while (timeString.length < desiredLength) {
    timeString = `0${timeString}`;
  }
  return timeString;
};

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.interval = window.setInterval(this.tick, 1000);
  }

  tick = () => {
    const {
      onCompleteAction,
      paused,
      secondsRemaining,
      tickAction
    } = this.props;

    if (secondsRemaining <= 0) {
      onCompleteAction();
    }

    if (!paused) {
      tickAction();
    }
  }

  togglePaused = () => {
    this.props.setPauseAction(!this.props.paused);
  }

  render() {
    const {
      onBreak,
      paused,
      secondsRemaining
    } = this.props;

    const minutes = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;
    const formattedTimeRemaining = `${padZeros(minutes)}:${padZeros(seconds)}`;

    return (
      <h2
        className={classnames(styles.timer, {[styles.break]: onBreak})}
      >
        <div
          onClick={this.togglePaused}
          role="button"
          aria-label={`${paused ? "start" : "pause"} timer`}
          tabIndex="0"
          onKeyPress={this.togglePaused}
        >
          {formattedTimeRemaining}
        </div>
      </h2>
    );
  }
}

Timer.defaultProps = {
  onBreak: false,
  onCompleteAction: () => {},
  paused: true,
  secondsRemaining: 0,
  tickAction: () => {}
};

Timer.propTypes = {
  onBreak: PropTypes.bool,
  onCompleteAction: PropTypes.func,
  paused: PropTypes.bool,
  secondsRemaining: PropTypes.number,
  setPauseAction: PropTypes.func,
  tickAction: PropTypes.func
};

export default Timer;
