"use strict";

const fetch = require("node-fetch");
global.fetch = fetch;
const { ApolloClient, createNetworkInterface } = require("apollo-client");
const gql = require("graphql-tag");
const chalk = require("chalk");
const log = console.log;

function batcher(queries, concurrent) {
  let batcherHandle = new QueryBatcher(queries, concurrent);
  let executedBatchPromise = batcherHandle.queryBatchExecute();
  return executedBatchPromise;
}

class QueryBatcher {
  constructor(queries, concurrent = 4) {
    this.queries = queries;
    this.concurrent = concurrent;
  }
  getQueries() {
    return this.queries;
  }
  setQueries(arrayOfQueryStrings) {
    this.queries = arrayOfQueryStrings;
  }
  getConcurrent() {
    return this.concurrent;
  }
  setConcurrent(numberOfConcurrentConnections) {
    this.concurrent = numberOfConcurrentConnections;
  }
  async queryBatchExecute() {
    let queries = this.getQueries();
    let concurrent = this.getConcurrent();
    let sliced = this.sliceQueryArray(queries, concurrent);
    let res = Promise.all(sliced.target.map(this.queryExecute));
    return res;
  }

  async queryExecute(query) {
    const client = new ApolloClient({
      networkInterface: createNetworkInterface({
        uri: process && process.env && process.env.GQL_SIMPLE_ENDPOINT || "https://api.graph.cool/simple/v1/cj7rzel6x02b40143fhkupzik",
        opts: {
          headers: { Authorization: process && process.env && process.env.GQL_AUTH_TOKEN || "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MDU4NDkxNTIsImNsaWVudElkIjoiY2oxYzRqZ3Axa2lwdzAxMDV4MDVmZTRuNSIsInByb2plY3RJZCI6ImNqN3J6ZWw2eDAyYjQwMTQzZmhrdXB6aWsiLCJwZXJtYW5lbnRBdXRoVG9rZW5JZCI6ImNqN3J6cGVidDAyeTQwMTU1cG9odnllNGgifQ.ZA2zNCIvzrkUrASxkuZbX26rvHfsbKHK2V53J5CwQi4" }
        }
      })
    });
    try {
      return await client.mutate({ mutation: gql`${query}` });
    } catch (error) {
      log(`\n${chalk.red("queryExecute() in " + this.constructor.name + " failed.")} ${chalk.red(error)}\n`);
    }
  }
  sliceQueryArray() {
    let original = this.getQueries();
    let concurrent = this.getConcurrent();
    let target = original.slice(0, concurrent);
    original = original.slice(concurrent, original.length);
    // log(`${chalk.green('\nTarget\n---------------------------------\n')} ${target.toString()}`);
    // log(`${chalk.green('\nOriginal\n---------------------------------\n')} ${original.toString()}`);
    let queries = {
      target: [...target],
      original: [...original]
    };
    return queries;
  }
}

module.exports = {
  batcher,
  QueryBatcher
};