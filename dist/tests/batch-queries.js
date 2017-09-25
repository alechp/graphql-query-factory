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
let batchQueryReturnComparison = `[ { createContent: { markup: 'markupA', raw: 'rawA' } },
  { createContent: { markup: 'markupB', raw: 'rawB' } },
  { createContent: { markup: 'markupC', raw: 'rawC' } },
  { createContent: { markup: 'markupD', raw: 'rawD' } },
  { createContent: { markup: 'markupE', raw: 'rawE' } },
  { createContent: { markup: 'markupF', raw: 'rawF' } },
  { createContent: { markup: 'markupG', raw: 'rawG' } } ]`;

test("execute single query", async t => {
  let res = await batcher.request(singleQuery);
  t.is(singleQueryReturnComparison, JSON.stringify(res));
});

test("execute batch of queries", async t => {
  let res = await batcher.batch(sampleQueries);
  t.pass(batchQueryReturnComparison, res);
});