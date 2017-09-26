const batcher = require("../batcher.js");
const mock = require("./_mock.js");
const test = require("ava");
const chalk = require("chalk");
const log = console.log;

// let batchQueryReturnComparison = `[ { createContent: { markup: 'markupA', raw: 'rawA' } },
//   { createContent: { markup: 'markupB', raw: 'rawB' } },
//   { createContent: { markup: 'markupC', raw: 'rawC' } },
//   { createContent: { markup: 'markupD', raw: 'rawD' } },
//   { createContent: { markup: 'markupE', raw: 'rawE' } },
//   { createContent: { markup: 'markupF', raw: 'rawF' } },
//   { createContent: { markup: 'markupG', raw: 'rawG' } } ]`;

test("execute single query", async t => {
  let res = await batcher.request(mock.singleQuery);
  t.is(mock.singleReturn, JSON.stringify(res));
});

test("execute batch of queries", async t => {
  let res = await batcher.batch(mock.batchQuery);
  t.pass(mock.batchReturn, JSON.stringify(res));
});
