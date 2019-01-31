import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "../../css/components/timer.css";
import {padZeros} from "../util";
import soundClip from "../../audio/alert.mp4";

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.alarmSound = new Audio(soundClip);
    this.alarmSound.loop = true;
    this.state = {
      paused: true,
      duration: props.duration,
      secondsRemaining: props.duration
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.duration !== state.duration) {
      window.clearInterval(this.interval);
      return {
        paused: true,
        duration: props.duration,
        secondsRemaining: props.duration
      };
    }

    return null;
  }

  tick = () => {
    const newTime = this.state.secondsRemaining - 1;

    if (newTime >= 0) {
      this.setState({secondsRemaining: newTime});
    } else {
      this.alarmSound.play();
      window.clearInterval(this.interval);
      this.props.timerCompleteAction();
    }
  }

  togglePaused = () => {
    if (this.state.paused) {
      this.interval = window.setInterval(this.tick, 1000);
    } else {
      window.clearInterval(this.interval);
    }

    this.alarmSound.pause();
    this.alarmSound.currentTime = 0;
    if (this.state.secondsRemaining > 0) {
      this.setState(state => ({paused: !state.paused}));
    }
  }

  render() {
    const {
      props: {
        onBreak
      },
      state: {
        paused,
        secondsRemaining
      }
    } = this;

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
  duration: 0,
  timerCompleteAction: () => {}
};

Timer.propTypes = {
  onBreak: PropTypes.bool,
  duration: PropTypes.number,
  timerCompleteAction: PropTypes.func
};

export default Timer;
