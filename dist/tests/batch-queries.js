"use strict";

const QueryBatcher = require("../batcher.js");
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
    markup: "markupE"
    raw: "rawE"
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

let createContentData = `{"createContent":{"markup":"markup1","raw":"raw1","__typename":"Content"}}`;

test("slice two off of queries array", t => {
  let sliced = QueryBatcher.sliceQueryArray(sampleQueries, 2);
  let target = sliced.target;
  t.is(String(target), String(expectedSliceOfTwo));
});

test("execute single query", async t => {
  let q = new QueryBatcher();
  let res = await q.queryExecute(singleQuery);
  let endpoint = String(process && process.env && process.env.GQL_SIMPLE_ENDPOINT || "https://api.graph.cool/simple/v1/cj7rzel6x02b40143fhkupzik");
  let token = String(process && process.env && process.env.GQL_AUTH_TOKEN || "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MDU4NDkxNTIsImNsaWVudElkIjoiY2oxYzRqZ3Axa2lwdzAxMDV4MDVmZTRuNSIsInByb2plY3RJZCI6ImNqN3J6ZWw2eDAyYjQwMTQzZmhrdXB6aWsiLCJwZXJtYW5lbnRBdXRoVG9rZW5JZCI6ImNqN3J6cGVidDAyeTQwMTU1cG9odnllNGgifQ.ZA2zNCIvzrkUrASxkuZbX26rvHfsbKHK2V53J5CwQi4");
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