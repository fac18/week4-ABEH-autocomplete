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

test("Array filters input to match", t => {
  let actual = search("Marsh")
  let expected = ['Marsh harrier',
  'Marsh tit',
  'Marsh warbler'];
  t.deepEqual(actual, expected, "Array should filter out up to 5 matches");
  t.end();
});

test("Array returns match of second part of array terms", t => {
  let actual = search("Wils")
  let expected = ['Callum Wilson',
  'Harry Wilson',
  'Jack Wilshere']
  t.deepEqual(actual, expected, "Array should return the footballer's surname inc Wils");
  t.end();
});

test("Array returns matches from beginning and middle of terms", t => {
  let actual = search("grass")
  let expected = ['Grasshopper warbler','Robert Snodgrass'
  ]
  t.deepEqual(actual, expected, "Array should return the footballer and bird inc grass");
  t.end();
});
