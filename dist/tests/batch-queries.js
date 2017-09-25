"use strict";

const batcher = require("../batcher.js");
const test = require("ava");
const chalk = require("chalk");
const log = console.log;

const sampleQueries = [`mutation {
  createContent(
    markup: "markupA"
    raw: "rawA"
  ) {
    markup
    raw
  }
}`, `mutation {
  createContent(
    markup: "markupB"
    raw: "rawB"
  ) {
    markup
    raw
  }
}`, `mutation {
  createContent(
    markup: "markupC"
    raw: "rawC"
  ) {
    markup
    raw
  }
}`, `mutation {
  createContent(
    markup: "markupD"
    raw: "rawD"
  ) {
    markup
    raw
  }
}`, `mutation {
  createContent(
    markup: "markupE"
    raw: "rawE"
  ) {
    markup
    raw
  }
}`, `mutation {
  createContent(
    markup: "markupF"
    raw: "rawF"
  ) {
    markup
    raw
  }
}`, `mutation {
  createContent(
    markup: "markupG"
    raw: "rawG"
  ) {
    markup
    raw
  }
}`];

const expectedSliceOfTwo = [`mutation {
  createContent(
    markup: "markupA"
    raw: "rawA"
  ) {
    markup
    raw
  }
}`, `mutation {
  createContent(
    markup: "markupB"
    raw: "rawB"
  ) {
    markup
    raw
  }
}`];
const singleQuery = `mutation {
  createContent(
    markup: "markup1"
    raw: "raw1"
  ) {
    markup
    raw
  }
}`;

let singleQueryReturnComparison = `{"createContent":{"markup":"markup1","raw":"raw1"}}`;

// test("slice two off of queries array", t => {
//   let sliced = batcher.sliceQueryArray(sampleQueries, 2);
//   let target = sliced.target;
//   t.is(String(target), String(expectedSliceOfTwo));
// });

test("execute single query", async t => {
  let res = await batcher.queryExecute(singleQuery);
  t.is(singleQueryReturnComparison, JSON.stringify(res));
});

test("execute four queries concurrently", async t => {
  //TODO
  let res = await batcher.queryBatchExec(sampleQueries, 2);
  log(`Res: ${res}`);
  t.pass();
});
//