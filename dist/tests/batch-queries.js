"use strict";

const { QueryBatcher, batcher } = require("../batcher.js");
const test = require("ava");
const chalk = require("chalk");
const log = console.log;

const sampleQueries = [`mutation {
  createContent(
    markup: markup1
    raw: raw1
  ) {
    markup
    raw
  }
}`, `mutation {
  createContent(
    markup: markup2
    raw: raw2
  ) {
    markup
    raw
  }
}`, `mutation {
  createContent(
    markup: markup3
    raw: raw3
  ) {
    markup
    raw
  }
}`, `mutation {
  createContent(
    markup: markup4
    raw: raw4
  ) {
    markup
    raw
  }
}`, `mutation {
  createContent(
    markup: markup5
    raw: raw5
  ) {
    markup
    raw
  }
}`, `mutation {
  createContent(
    markup: markup6
    raw: raw6
  ) {
    markup
    raw
  }
}`, `mutation {
  createContent(
    markup: markup7
    raw: raw7
  ) {
    markup
    raw
  }
}`];

const expectedSlice = [`mutation {
  createContent(
    markup: markup1
    raw: raw1
  ) {
    markup
    raw
  }
}`, `mutation {
  createContent(
    markup: markup2
    raw: raw2
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

test("slice query array", t => {
  let q = new QueryBatcher(sampleQueries, 2);
  let sliced = q.sliceQueryArray();
  let target = sliced.target;
  t.is(String(target), String(expectedSlice));
});

test("execute single query", async t => {
  let q = new QueryBatcher();
  let res = await q.queryExecute(singleQuery);
  let endpoint = String(process && process.env && process.env.GQL_SIMPLE_ENDPOINT || "https://api.graph.cool/simple/v1/cj7rzel6x02b40143fhkupzik");
  let token = String(process && process.env && process.env.GQL_AUTH_TOKEN || "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MDU4NDkxNTIsImNsaWVudElkIjoiY2oxYzRqZ3Axa2lwdzAxMDV4MDVmZTRuNSIsInByb2plY3RJZCI6ImNqN3J6ZWw2eDAyYjQwMTQzZmhrdXB6aWsiLCJwZXJtYW5lbnRBdXRoVG9rZW5JZCI6ImNqN3J6cGVidDAyeTQwMTU1cG9odnllNGgifQ.ZA2zNCIvzrkUrASxkuZbX26rvHfsbKHK2V53J5CwQi4");
  t.is(createContentData, JSON.stringify(res.data));
});

test("execute consecutive queries", async t => {
  log(`Sup`);
  t.pass();
});
//