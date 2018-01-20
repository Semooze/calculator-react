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

  test("add 2 * 10 expect value 2 * 10", function () {
    init = "2 * 10";
    expect(addValue(init)).toBe("2 * 10");
  });

  test("add 2 / 10 expect value 2 / 10", function () {
    init = "2 / 10";
    expect(addValue(init)).toBe("2 / 10");
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

  test("take \"2 * 10\" to [2, \"*\", 10]", function () {
    init = "2 * 10";
    expect(displayToInfix(init)).toEqual([2, "*", 10]);
  });

  test("take \"10 / 2\" to [2, \"/\", 10]", function () {
    init = "2 / 10";
    expect(displayToInfix(init)).toEqual([2, "/", 10]);
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

  test("take [23, \"+\"] to []", function () {
    expect(infixToPostfix([23, "+"])).toEqual([]);
  });

  test("take [23, \"+\", 5] to 23 5 +", function () {
    expect(infixToPostfix([23, "+", 5])).toEqual([23, 5, "+"]);
  });

  test("take [10, \"+\", 2, \"-\", 8, \"+\", 3] to 10 2 + 8 - 3 +", function () {
    expect(infixToPostfix([10, "+", 2, "-", 8, "+", 3]))
      .toEqual([10, 2, "+", 8, "-", 3, "+"]);
  });

  test("take [23, \"+\", 5, \"-\"] to []", function () {
    expect(infixToPostfix([23, "+", 5, "-"])).toEqual([]);
  });

  test("take [2, \"*\", 10\ to [2, 10, \"*\"]", function () {
    expect(infixToPostfix([2, "*", 10,])).toEqual([2, 10, "*"]);
  });

  test("take [2, \"/\", 10] to [2, 10, \"/\"]", function () {
    expect(infixToPostfix([2, "/", 10,])).toEqual([2, 10, "/"]);
  });

  test("take [10, \"+\", 2, \"*\", 8, \"-\", 3] to [10, 2, 8, \"*\", \"+\", 3,\"-\"]", function () {
    expect(infixToPostfix([10, "+", 2, "*", 8, "-", 3])).toEqual([10, 2, 8, "*", "+", 3, "-"]);
  });

  test("take [\"(\", 1, \"+\", 2, \")\", \"/\", \"(\", 3, \"+\", 4, \")\"] to [1, 2, \"+\", 3, 4, \"+\", \"/\"]", function () {
    expect(infixToPostfix(["(", 1, "+", 2, ")", "/", "(", 3, "+", 4, ")"])).toEqual([1, 2, "+", 3, 4, "+", "/"]);
  });

  test("take [1, \"+\", 2, \"/\", 3, \"+\", 4] to [2, 3, \"/\", 1, \"+\", 4, \"+\"]", function () {
    expect(infixToPostfix([1, "+", 2, "/", 3, "+", 4])).toEqual([1, 2, 3, "/", "+", 4, "+"]);
  });

  test("take ["-", 7, \"+\", 9, \"*\", \"(\", \"(\", 5, \"+\", 3, \")\", \"/\", 2, \")\", \"+\", 8, \"-\", 1]" + 
       "to [7, \"-\", 9, 5, 3, \"+\", 2, \"/\", \"*\", \"+\", 8, \"+\", 1, \"-\"]", function () {
    expect(infixToPostfix(["-", 7, "+", 9, "*", "(", "(", 5, "+", 3, ")", "/", 2, ")", "+", 8, "-", 1]))
      .toEqual([7, "-", 9, 5, 3, "+", 2, "/", "*", "+", 8, "+", 1, "-"]);
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

  test("take 2 * 10 to 20", function () {
    expect(determine([2, 10, "*"])).toBe(20);
  });

  test("take 2 / 10 to 0.2", function () {
    expect(determine([2, 10, "/"])).toBe(0.2);
  });

  // test("take 2 + 8 * 10 to 160", function () {
  //   expect(determine([2, 8, "+", 10, "*"])).toBe(160);
  // });

  // test("take 8 + 7 /2 to 11.5", function () {
  //   expect(determine([8, 7, "+", 2, "/"])).toBe(11.5);
  // });

});

/*Left test case
1 Flotaing point
2 Handle negative number in new way when tranforming it from display to infix
3 Handle negative number in new way when determine from postfix
*/ 