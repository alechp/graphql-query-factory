//@flow

const { GraphQLClient } = require('graphql-request')
const chalk = require('chalk');
const log = console.log;

function batcher(queries: Array<string>, concurrent: number): mixed {
  let batcherHandle = new QueryBatcher(queries, concurrent);
  let executedBatchPromise = batcherHandle.batchQueryExecute();
  return executedBatchPromise;
}
class QueryBatcher {
  constructor(queriesToBeExecuted: Array<string>, concurrentNumberOfConnections: number = 4) {
    let queries: Array<string>, concurrent: number, client: GraphQLClient;
    this.queries = queriesToBeExecuted;
    this.concurrent = concurrentNumberOfConnections;
    this.client = new GraphQLClient(process.env.GCOOL_API_SIMPLE_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${process.env.GCOOL_API_AUTH_TOKEN}`
      }
    });
  }
  getQueries(): string {
    return this.queries;
  }
  setQueries(arrayOfQueryStrings: Array<string>) {
    this.queries = arrayOfQueryStrings;
  }
  getConcurrent(): string {
    return this.concurrent;
  }
  setConcurrent(numberOfConcurrentConnections: number){
    this.concurrent=numberOfConcurrentConnections;
  }

  batchQueryExecute(): Array<string> {
    // let query
    let queries: string = this.getQueries();
    let concurrent: string = this.getConcurrent();
    let sliced: mixed = this.sliceQueryArray(queries);
    try {
      let sliceIndex: number = 0;
      for(let [key: string, singleQueryFromArray: string] of sliced) {
        log(`batcher.js/batchQueryExecute/: ${chalk.green(key)} : ${chalk.white(value)}`);
      }
    } catch(error) { `${chalk.red('batchQueryExecute() failed to return promise.')} Error: ${error}` }
    return sliced;
  }

  async queryExecute(query: string): mixed {
    try {
      let data: mixed = await this.client.request(query);
      return data;
    } catch(error) { log(`queryExecute failed. Error: ${error}`); }
  }

  sliceQueryArray(arrayOfQueries: Array<string>, concurrentConnections: number): mixed{
    let original: Array<string> = arrayOfQueries;
    let target: Array<string> = original.slice(0, concurrentConnections);
    original = original.slice(concurrentConnections, original.length);
    // let queries: Array<string> = [...target, ...original];
    let queries = {
        target: [...target],
        original: [...original]
    }
    return queries;
  }
}

module.exports = batcher;
