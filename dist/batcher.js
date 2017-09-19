"use strict";

const fetch = require("node-fetch");
global.fetch = fetch;
const { ApolloClient, createNetworkInterface } = require("apollo-client");
const gql = require("graphql-tag");
const chalk = require("chalk");
const log = console.log;

function batcher(queries, concurrent) {
  let batcherHandle = new QueryBatcher(queries, concurrent);
  let executedBatchPromise = batcherHandle.batchQueryExecute();
  return executedBatchPromise;
}

class QueryBatcher {
  constructor(queries, concurrent) {
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
  batchQueryExecute() {
    let queries = this.getQueries();
    let concurrent = this.getConcurrent();
    let sliced = this.sliceQueryArray(queries, concurrent);
    // let target = sliced.target;
    // let original = sliced.original; //TODO: refactor "original" to "remaining"
    // if (target !== undefined) {
    //   for (let query in target) {
    //     client.query({});
    //   }
    // } else {
    //   return sliced;
    // }
  }

  async queryExecute(query) {
    const client = new ApolloClient({
      networkInterface: createNetworkInterface({
        uri: process && process.env && process.env.GQL_SIMPLE_ENDPOINT || "https://api.graph.cool/simple/v1/cj6qq63wr0mrv0187fq2xdf0u",
        opts: {
          headers: { Authorization: process && process.env && process.env.GQL_AUTH_TOKEN || "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MDM2MDY5NTUsImNsaWVudElkIjoiY2oxYzRqZ3Axa2lwdzAxMDV4MDVmZTRuNSIsInByb2plY3RJZCI6ImNqNnFxNjN3cjBtcnYwMTg3ZnEyeGRmMHUiLCJwZXJtYW5lbnRBdXRoVG9rZW5JZCI6ImNqNnF3cmNhajB2bHIwMTg3eHg2N2ZvdW0ifQ.vN6R2A-lMv_gVPWwoZlf0JbkBNsX8YSpZUA_Xq9u_K4" }
        }
      })
    });
    // let gqlQuery = this.strToGql(query);
    // log(`gqlQuery: ${String(gqlQuery)}`);
    let endpoint = String(process && process.env && process.env.GQL_SIMPLE_ENDPOINT || "https://api.graph.cool/simple/v1/cj6qq63wr0mrv0187fq2xdf0u");
    let token = String(process && process.env && process.env.GQL_AUTH_TOKEN || "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MDM2MDY5NTUsImNsaWVudElkIjoiY2oxYzRqZ3Axa2lwdzAxMDV4MDVmZTRuNSIsInByb2plY3RJZCI6ImNqNnFxNjN3cjBtcnYwMTg3ZnEyeGRmMHUiLCJwZXJtYW5lbnRBdXRoVG9rZW5JZCI6ImNqNnF3cmNhajB2bHIwMTg3eHg2N2ZvdW0ifQ.vN6R2A-lMv_gVPWwoZlf0JbkBNsX8YSpZUA_Xq9u_K4");
    log(`${query}`);
    log(`Endpoint: ${endpoint}`);
    try {
      let data = await client.mutate({ mutation: gql`${query}` });
      log(`Data inside queryExecute: ${data}`);
      return data;
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