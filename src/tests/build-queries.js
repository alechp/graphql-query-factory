const { builder } = require("../builder.js");
const test = require("ava");
const chalk = require("chalk");
const log = console.log;

const sampleMutation = `mutation addMarkup($markup:String!, $raw: String!) {
  createContent(
    markup: $markup
    raw: $raw
  ) {
    markup
    raw
  }
}`;

const queryVariablesArray = [
  {
    markup: "markup1",
    raw: "raw1"
  },
  {
    markup: "markup2",
    raw: "raw2"
  },
  {
    markup: "markup3",
    raw: "raw3"
  }
];

const expectedQueries = `mutation addMarkup($markup:String!, $raw: String!) {
  createContent(
    markup: markup1
    raw: raw1
  ) {
    markup
    raw
  }
},mutation addMarkup($markup:String!, $raw: String!) {
  createContent(
    markup: markup2
    raw: raw2
  ) {
    markup
    raw
  }
},mutation addMarkup($markup:String!, $raw: String!) {
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
  log(
    `${chalk.blue(
      "\nQueries\n------------------------------------\n"
    )} ${chalk.grey(queries)}`
  );
  t.is(queries, expectedQueries);
});
