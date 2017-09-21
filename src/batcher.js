//@flow
const fetch = require("node-fetch");
global.fetch = fetch;
const { ApolloClient, createNetworkInterface } = require("apollo-client");
const gql = require("graphql-tag");
const chalk = require("chalk");
const log = console.log;

function batcher(queries: Array<string>, concurrent: number): mixed {
  let batcherHandle = new QueryBatcher(queries, concurrent);
  let executedBatchPromise = batcherHandle.queryBatchExecute();
  return executedBatchPromise;
}

class QueryBatcher {
  queries: Array<string>;
  concurrent: number;
  constructor(queries, concurrent = 4) {
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
  async queryBatchExecute(): mixed {
    let queries = this.getQueries();
    let concurrent = this.getConcurrent();
    let sliced = this.sliceQueryArray(queries, concurrent);
    let res = Promise.all(sliced.target.map(this.queryExecute));
    return res;
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
    try {
      return await client.mutate({ mutation: gql`${query}` });
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
