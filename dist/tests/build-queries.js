"use strict";

const { builder } = require("../builder.js");
const test = require("ava");
const chalk = require("chalk");
const log = console.log;

const sampleMutation = `mutation {
  createContent(
    markup: $markup
    raw: $raw
  ) {
    markup
    raw
  }
}`;

const queryVariablesArray = [{
  markup: "markup1",
  raw: "raw1"
}, {
  markup: "markup2",
  raw: "raw2"
}, {
  markup: "markup3",
  raw: "raw3"
}];

const expectedQueries = `mutation {
  createContent(
    markup: markup1
    raw: raw1
  ) {
    markup
    raw
  }
},mutation {
  createContent(
    markup: markup2
    raw: raw2
  ) {
    markup
    raw
  }
},mutation {
  createContent(
    markup: markup3
    raw: raw3
  ) {
    markup
    raw
  }
}`;

test("queries build", async t => {
  let qs = await builder(sampleMutation, queryVariablesArray);
  let queries = String(qs);
  // log(`${chalk.grey(queries)}`);
  t.is(queries, expectedQueries);
});