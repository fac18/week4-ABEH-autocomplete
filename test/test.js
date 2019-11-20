const test = require("tape");
const search = require("../src/search.js")


test("1 is 1", t => {
  let actual = 1;
  let expected = 1;
  t.deepEqual(actual, expected, "1 should equal 1");
  t.end();
});

test("Output is an array", t => {
  let actual = Array.isArray(search("ro"));
  let expected = true;
  t.deepEqual(actual, expected, "Output should be an array");
  t.end();
});

test("Array length less than 6", t => {
  let actual = search("a").length < 6;
  let expected = true;
  t.deepEqual(actual, expected, "Array should be less than 6");
  t.end();
});
