"use strict";

const builder = require("../builder.js");
const batcher = require("../batcher.js");
const factory = require("../factory.js");
const test = require("ava");
const chalk = require("chalk");
const log = console.log;

const mutationTemplate = `mutation {
  createContent(
    markup: $markup
    raw: $raw
  ) {
    markup
    raw
  }
}`;

const builtMutations = [`mutation {
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

const mutationVariables = [{
  markup: "markup1",
  raw: "raw1"
}, {
  markup: "markup2",
  raw: "raw2"
}, {
  markup: "markup3",
  raw: "raw3"
}];
let batchQueryReturnComparison = `[ { createContent: { markup: 'markupA', raw: 'rawA' } },
  { createContent: { markup: 'markupB', raw: 'rawB' } },
  { createContent: { markup: 'markupC', raw: 'rawC' } },
  { createContent: { markup: 'markupD', raw: 'rawD' } },
  { createContent: { markup: 'markupE', raw: 'rawE' } },
  { createContent: { markup: 'markupF', raw: 'rawF' } },
  { createContent: { markup: 'markupG', raw: 'rawG' } } ]`;
test("queries build and batch independently", t => {
  let builtQueries = builder(mutationTemplate, mutationVariables);
  let executedQueries = batcher.batch(builtQueries);
  t.is(batchQueryReturnComparison, executedQueries);
});
test("queries build and batch with factory", t => {
  let executedQueries = factory(mutationTemplate, mutationVariables);
  t.is(batchQueryReturnComparison, executedQueries);
});