//@flow
const fetch = require("node-fetch");
global.fetch = fetch;
const { ApolloClient, createNetworkInterface } = require("apollo-client");
const gql = require("graphql-tag");
const chalk = require("chalk");
const log = console.log;

function batcher(queries: Array<string>, concurrent: number): mixed {
  let batcherHandle = new QueryBatcher(queries, concurrent);
  let executedBatchPromise = batcherHandle.batchQueryExecute();
  return executedBatchPromise;
}

class QueryBatcher {
  queries: Array<string>;
  concurrent: number;
  constructor(queries, concurrent) {
    this.queries = queries;
    this.concurrent = concurrent;
  }
  getQueries() {
    return this.queries;
  }
  setQueries(arrayOfQueryStrings: Array<string>) {
    this.queries = arrayOfQueryStrings;
  }
  getConcurrent() {
    return this.concurrent;
  }
  setConcurrent(numberOfConcurrentConnections: number) {
    this.concurrent = numberOfConcurrentConnections;
  }
  batchQueryExecute(): mixed {
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

  async queryExecute(query: string): mixed {
    const client = new ApolloClient({
      networkInterface: createNetworkInterface({
        uri: process.env.GQL_SIMPLE_ENDPOINT,
        opts: {
          headers: { Authorization: process.env.GQL_AUTH_TOKEN }
        }
      })
    });
    // let gqlQuery = this.strToGql(query);
    // log(`gqlQuery: ${String(gqlQuery)}`);
    let endpoint: string = String(process.env.GQL_SIMPLE_ENDPOINT);
    let token: string = String(process.env.GQL_AUTH_TOKEN);
    log(`${query}`);
    log(`Endpoint: ${endpoint}`);
    try {
      let data = await client.mutate({ mutation: gql`${query}` });
      log(`Data inside queryExecute: ${data}`);
      return data;
    } catch (error) {
      log(
        `\n${chalk.red(
          "queryExecute() in " + this.constructor.name + " failed."
        )} ${chalk.red(error)}\n`
      );
    }
  }
  sliceQueryArray(): mixed {
    let original: Array<string> = this.getQueries();
    let concurrent: number = this.getConcurrent();
    let target: Array<string> = original.slice(0, concurrent);
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
