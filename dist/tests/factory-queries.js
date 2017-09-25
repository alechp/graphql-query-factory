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
  markup: "markupA",
  raw: "rawA"
}, {
  markup: "markupB",
  raw: "rawB"
}, {
  markup: "markupC",
  raw: "rawC"
}, {
  markup: "markupD",
  raw: "rawD"
}, {
  markup: "markupE",
  raw: "rawE"
}, {
  markup: "markupF",
  raw: "rawF"
}, {
  markup: "markupG",
  raw: "rawG"
}];
let batchQueryReturnComparison = [{ createContent: { markup: "markupA", raw: "rawA" } }, { createContent: { markup: "markupB", raw: "rawB" } }, { createContent: { markup: "markupC", raw: "rawC" } }, { createContent: { markup: "markupD", raw: "rawD" } }, { createContent: { markup: "markupE", raw: "rawE" } }, { createContent: { markup: "markupF", raw: "rawF" } }, { createContent: { markup: "markupG", raw: "rawG" } }];

test("queries build and batch independently", async t => {
  let builtQueries = builder(mutationTemplate, mutationVariables);
  let executedQueries = await batcher.batch(builtQueries);
  // if (builtQueries instanceof Array) {
  //   executedQueries = await batcher.batch(builtQueries);
  // }
  log(`${chalk.yellow("builtQueries")}\n ---------------------------------------- \n ${builtQueries}\n ---------------------------------------- \n`);
  let strBuiltQueries = JSON.stringify(builtQueries);
  log(`${chalk.yellow("executedQueries")}\n ---------------------------------------- \n ${JSON.stringify(executedQueries)}\n ---------------------------------------- \n`);
  for (let [key, val] in executedQueries) {
    log(`k[${key}]\t\tv[${val}]`);
  }
  ////////////////////////
  log(`${chalk.yellow("strBuiltQueries")}\n ---------------------------------------- \n ${strBuiltQueries}\n ---------------------------------------- \n`);
  let strBatch = JSON.stringify(batchQueryReturnComparison);
  log(`${chalk.yellow("strBatch")}\n ---------------------------------------- \n ${strBatch}\n ---------------------------------------- \n`);
  let strExecuted = JSON.stringify(executedQueries);
  log(`${chalk.yellow("strExecuted")}\n ---------------------------------------- \n ${strExecuted}\n ---------------------------------------- \n`);
  t.is(strBatch, strExecuted);
});
test.skip("queries build and batch with factory", t => {
  let executedQueries = factory(mutationTemplate, mutationVariables);
  log(`executedQueries (${chalk.yellow("factory")}): ${executedQueries}`);

  t.is(batchQueryReturnComparison, executedQueries);
});