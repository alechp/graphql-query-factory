const test = require("ava");
const builder = require("../builder.js");
const mock = require("./_mock.js");
const chalk = require("chalk");
const log = console.log;

test("queries build", t => {
  let queries = builder(mock.template, mock.variables);
  t.is(String(queries), String(mock.batchQuery));
});
