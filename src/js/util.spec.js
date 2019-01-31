/* global describe it */
import chai from "chai";
import {padZeros, swap} from "./util";

chai.should();

describe("util tests", () => {
  describe("padZeros tests", () => {
    it("should pad zeros in front of a number if needed", () => {
      padZeros(5).should.equal("05");
    });
  });

  describe("swap tests", () => {
    it("should swap two numbers in an array", () => {
      const numbers = [1, 2, 3, 4, 5];
      swap(numbers, 1, 2).should.eql([1, 3, 2, 4, 5]);
    });
  });
});
