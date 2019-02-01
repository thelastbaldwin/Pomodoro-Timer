/* global describe it beforeEach */
import chai from "chai";
import {
  addTaskReducer,
  clearCompleteReducer,
  completeTaskReducer,
  moveTaskReducer,
  timerCompleteReducer
} from "./reducers";
import {
  SHORT_BREAK_DURATION,
  LONG_BREAK_DURATION,
  WORK_SESSION_DURATION
} from "../constants";

chai.should();

describe("reducer tests", () => {
  describe("addTaskReducer tests", () => {
    it("should add a task", () => {
      const state = {tasks: []};
      const action = {
        payload: "foo"
      };

      addTaskReducer(state, action).should.eql({
        tasks: [
          {title: "foo", complete: false}
        ]
      });
    });
  });
  describe("clearCompleteReducer tests", () => {
    it("should clear completed tasks", () => {
      const state = {
        tasks: [
          {
            title: "foo",
            complete: true
          },
          {
            title: "bar",
            complete: false
          },
          {
            title: "baz",
            complete: true
          }
        ]
      };

      const completedState = clearCompleteReducer(state);

      completedState.tasks.length.should.equal(1);
      completedState.tasks[0].complete.should.be.false;
    });
  });
  describe("completeTaskReducer tests", () => {
    it("should mark a task as completed", () => {
      const state = {
        tasks: [
          {title: "foo", complete: false},
          {title: "bar", complete: false}
        ]
      };
      const action = {payload: 0};
      completeTaskReducer(state, action).should.eql({
        tasks: [
          {title: "foo", complete: true},
          {title: "bar", complete: false}
        ]
      });
    });
  });
  describe("moveTaskReducer tests", () => {
    it("should swap two tasks", () => {
      const state = {
        tasks: [
          {title: "foo", complete: false},
          {title: "bar", complete: false}
        ]
      };

      const action = {
        payload: {index: 0, newIndex: 1}
      };

      moveTaskReducer(state, action).should.eql({
        tasks: [
          {title: "bar", complete: false},
          {title: "foo", complete: false}
        ]
      });
    });
  });

  describe("timerCompleteReducer tests", () => {
    let state;

    beforeEach(() => {
      state = {
        onBreak: false,
        workSessionsCompleted: 1,
        timerDuration: 0
      };
    });

    it("should increment the number of completed work sessions by one when a work session is completed", () => {
      const newState = timerCompleteReducer(state);
      newState.workSessionsCompleted.should.equal(2);
    });

    it("should set 'onBreak' to true when you were NOT previously on a break", () => {
      const newState = timerCompleteReducer(state);
      newState.onBreak.should.be.true;
      newState.timerDuration.should.equal(SHORT_BREAK_DURATION);
    });

    it("should set 'onBreak' to false when you were previously on a break", () => {
      state.onBreak = true;
      const newState = timerCompleteReducer(state);
      newState.onBreak.should.be.false;
      newState.timerDuration.should.equal(WORK_SESSION_DURATION);
    });

    it("should have an increased break duration when you have completed 4 work sessions", () => {
      state.workSessionsCompleted = 3;
      const newState = timerCompleteReducer(state);
      newState.onBreak.should.be.true;
      newState.timerDuration.should.equal(LONG_BREAK_DURATION);
    });
  });
});
