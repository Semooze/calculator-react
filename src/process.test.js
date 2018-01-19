import { addValue, displayToInfix, infixToPostfix, determine} from './process';

describe("Add value", function () {

  var init;

  test("add 5 expect value \"5\"", function () {
    init = "0";
    expect(addValue(init, "5")).toBe("5");
  });

  test("add - expect value \"-\"", function () {
    init = "0";
    expect(addValue(init, "-")).toBe("-");
  });

  test("add + expect value \"-\"", function () {
    init = "0";
    expect(addValue(init, "+")).toBe("0");
  });

  test("add + expect value \"\"", function () {
    init = "";
    expect(addValue(init, "+")).toBe("");
  });

  test("add 1 expect value \"1\"", function () {
    init = "";
    expect(addValue(init, 1)).toBe("1");
  });

  test("add 2 expect value \"12\"", function () {
    init = "1";
    expect(addValue(init, 2)).toBe("12");
  });

  test("add \"2\" expect value \"12\"", function () {
    init = "1";
    expect(addValue(init, "2")).toBe("12");
  });

  test("add + expect value \"12 + \"", function () {
    init = "12";
    expect(addValue(init, '+')).toBe("12 + ");
  });

  test("add - expect value \"12 - \"", function () {
    init = "12 + ";
    expect(addValue(init, '-')).toBe("12 - ");
  });

  test("add 7 expect value \"12 - 7\"", function () {
    init = "12 - ";
    expect(addValue(init, 7)).toBe("12 - 7");
  });

  test("add - expect value \"12 - 7 - \"", function () {
    init = "12 - 7";
    expect(addValue(init, '-')).toBe("12 - 7 - ");
  });

  test("add + expect value \"12 - 7 + \"", function () {
    init = "12 - 7 - ";
    expect(addValue(init, '+')).toBe("12 - 7 + ");
  });

  test("add - expect value \"-\"", function () {
    init = "";
    expect(addValue(init, '-')).toBe("-");
  });

  test("add - expect value \"-\"", function () {
    init = "-";
    expect(addValue(init, '-')).toBe("-");
  });

  test("add + expect value \"\"", function () {
    init = "-";
    expect(addValue(init, '+')).toBe("");
  });

  test("add 8 expect value -8", function () {
    init = "-";
    expect(addValue(init, 8)).toBe("-8");
  });

  test("add undefined expect value -8", function () {
    init = "<div></div>";
    expect(addValue(init)).toBe(init);
  });

  test("add \"(8 +4 )\" expect value \"(8 +4 )\"", function () {
    init = "(8 + 4)";
    expect(addValue(init)).toBe("(8 + 4)");
  });

});

describe("Transform display to infix", function () {

  var init = "";

  test("take 5 to []", function () {
    expect(displayToInfix(5)).toEqual([]);
  });

  test("take [1, 2] to []", function () {
    expect(displayToInfix([1, 2])).toEqual([]);
  });

  test("take \"\" to []", function () {
    expect(displayToInfix(init)).toEqual([]);
  });

  test("take \"5\" to [5]", function () {
    init = "5";
    expect(displayToInfix(init)).toEqual([5]);
  });

  test("take \"12\" to [12]", function () {
    init = "12";
    expect(displayToInfix(init)).toEqual([12]);
  });

  test("take \"12 + \" to [12, \"+\"]", function () {
    init = "12 + ";
    expect(displayToInfix(init)).toEqual([12, "+"]);
  });

  test("take \"12 + 7\" to [12, \"+\", 7]", function () {
    init = "12 + 7";
    expect(displayToInfix(init)).toEqual([12, "+", 7]);
  });

  test("take \"12 + 7 - \" to [12, \"+\", 7, \"-\"]", function () {
    init = "12 + 7 - ";
    expect(displayToInfix(init)).toEqual([12, "+", 7, "-"]);
  });

  test("take \"-8\" to [-8]", function () {
    init = "-8";
    expect(displayToInfix(init)).toEqual([-8]);
  });

});

describe("Transform infix to postfix", function () {

  test("take 56 to []", function () {
    expect(infixToPostfix(56)).toEqual([]);
  });

  test("take \"tsertsdf\" to []", function () {
    expect(infixToPostfix("tsertsdf")).toEqual([]);
  });

  test("take [] to []", function () {
    expect(infixToPostfix([])).toEqual([]);
  });

  test("take 23 + to []", function () {
    expect(infixToPostfix([23, "+"])).toEqual([]);
  });

  test("take 23 + 5 to 23 5 +", function () {
    expect(infixToPostfix([23, "+", 5])).toEqual([23, 5, "+"]);
  });

  test("take 10 + 2 - 8 + 3 to 10 2 + 8 - 3 +", function () {
    expect(infixToPostfix([10, "+", 2, "-", 8, "+", 3]))
      .toEqual([10, 2, "+", 8, "-", 3, "+"]);
  });

  test("take 23 + 5 - to []", function () {
    expect(infixToPostfix([23, "+", 5, "-"])).toEqual([]);
  });

});

describe("Determine an anwser", function () {

  test("take \"5\" to 0", function () {
    expect(determine("5")).toBe(0);
  });

  test("take 5 to 0", function () {
    expect(determine(5)).toBe(0);
  });

  test("take [] to 0", function () {
    expect(determine([])).toBe(0);
  });

  test("take 23 + to 0", function () {
    expect(determine([23, "+"])).toBe(0);
  });

  test("take 23 5 + to 28", function () {
    expect(determine([23, 5, "+"])).toBe(28);
  });

  test("take 10 + 2 - 8 + 3 to 7", function () {
    expect(determine([10, 2, "+", 8, "-", 3, "+"])).toBe(7);
  });

  test("take 23 + 5 - to 0", function () {
    expect(determine([23, 5, "+", "-"])).toBe(0);
  });

  test("take -7 + 8 - 4 to -3", function () {
    expect(determine([-7, 8, "+", 4, "-"])).toBe(-3);
  });

  test("take 8 - 8 + 1 to 1", function () {
    expect(determine([8, 8, "-", 1, "+"])).toBe(1);
  });

});