const QueryBatcher = require("../batcher.js");
const test = require("ava");
const chalk = require("chalk");
const log = console.log;

const sampleQueries = [
  `mutation {
  createContent(
    markup: "markupA"
    raw: "rawA"
  ) {
    markup
    raw
  }
}`,
  `mutation {
  createContent(
    markup: "markupB"
    raw: "rawB"
  ) {
    markup
    raw
  }
}`,
  `mutation {
  createContent(
    markup: "markupC"
    raw: "rawC"
  ) {
    markup
    raw
  }
}`,
  `mutation {
  createContent(
    markup: "markupD"
    raw: "rawD"
  ) {
    markup
    raw
  }
}`,
  `mutation {
  createContent(
    markup: "markupE"
    raw: "rawE"
  ) {
    markup
    raw
  }
}`,
  `mutation {
  createContent(
    markup: "markupF"
    raw: "rawF"
  ) {
    markup
    raw
  }
}`,
  `mutation {
  createContent(
    markup: "markupE"
    raw: "rawE"
  ) {
    markup
    raw
  }
}`
];

const expectedSliceOfTwo = [
  `mutation {
  createContent(
    markup: "markupA"
    raw: "rawA"
  ) {
    markup
    raw
  }
}`,
  `mutation {
  createContent(
    markup: "markupB"
    raw: "rawB"
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

test("slice two off of queries array", t => {
  let sliced = QueryBatcher.sliceQueryArray(sampleQueries, 2);
  let target = sliced.target;
  t.is(String(target), String(expectedSliceOfTwo));
});

test("execute single query", async t => {
  let q = new QueryBatcher();
  let res = await q.queryExecute(singleQuery);
  let endpoint: string = String(process.env.GQL_SIMPLE_ENDPOINT);
  let token: string = String(process.env.GQL_AUTH_TOKEN);
  t.is(createContentData, JSON.stringify(res.data));
});

test("execute two types of queries <query> && <mutation>", async t => {
  //TODO
  t.pass();
});

test("execute four queries concurrently", async t => {
  //TODO
  let q = new QueryBatcher(sampleQueries);
  let res = q.queryBatchExecute();
  t.pass();
});
//
