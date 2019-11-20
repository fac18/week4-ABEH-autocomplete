const test = require("tape");

test("1 is 1", t => {
  let actual = 1;
  let expected = 1;
  t.deepEqual(actual, expected, "1 should equal 1");
  t.end();
});
