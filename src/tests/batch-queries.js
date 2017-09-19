const { QueryBatcher, batcher } = require("../batcher.js");
const test = require("ava");
const chalk = require("chalk");
const log = console.log;

const sampleQueries = [
  `mutation {
  createContent(
    markup: markup1
    raw: raw1
  ) {
    markup
    raw
  }
}`,
  `mutation {
  createContent(
    markup: markup2
    raw: raw2
  ) {
    markup
    raw
  }
}`,
  `mutation {
  createContent(
    markup: markup3
    raw: raw3
  ) {
    markup
    raw
  }
}`,
  `mutation {
  createContent(
    markup: markup4
    raw: raw4
  ) {
    markup
    raw
  }
}`,
  `mutation {
  createContent(
    markup: markup5
    raw: raw5
  ) {
    markup
    raw
  }
}`,
  `mutation {
  createContent(
    markup: markup6
    raw: raw6
  ) {
    markup
    raw
  }
}`,
  `mutation {
  createContent(
    markup: markup7
    raw: raw7
  ) {
    markup
    raw
  }
}`
];

const expectedSlice = [
  `mutation {
  createContent(
    markup: markup1
    raw: raw1
  ) {
    markup
    raw
  }
}`,
  `mutation {
  createContent(
    markup: markup2
    raw: raw2
  ) {
    markup
    raw
  }
}`
];
const singleQuery = `mutation {
  createContent(
    markup: "markup1"
    raw: "raw1"
  ) {
    markup
    raw
  }
}`;

let createContentData = `{"createContent":{"markup":"markup1","raw":"raw1","__typename":"Content"}}`;

test("slice query array", t => {
  let q = new QueryBatcher(sampleQueries, 2);
  let sliced = q.sliceQueryArray();
  let target = sliced.target;
  t.is(String(target), String(expectedSlice));
});

test("execute single query", async t => {
  let q = new QueryBatcher();
  let res = await q.queryExecute(singleQuery);
  let endpoint: string = String(process.env.GQL_SIMPLE_ENDPOINT);
  let token: string = String(process.env.GQL_AUTH_TOKEN);
  t.is(createContentData, JSON.stringify(res.data));
});

test("execute consecutive queries", async t => {
  //TODO
  t.pass();
});

test("execute two types of queries <query> && <mutation>", async t => {
  //TODO
  t.pass();
});

test("execute four queries concurrently", async t => {
  //TODO
  t.pass();
});
//
