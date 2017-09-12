// @flow
const { GraphQLClient } = require('graphql-request')
const chalk = require('chalk');
const log = console.log;

function batcher(queries: string, concurrent: number): Promise<any> {
  let batcherHandle = new QueryBatcher(queries, concurrent);
  let executedBatchPromise = batcherHandle.batchQueryExecute();
  log(`Inside batcher function: ${executedBatchPromise}`);
  return executedBatchPromise;
}
class QueryBatcher {
  constructor(queries, concurrent=4, config) {
    this.config = config;
    this.queries = queries;
    this.concurrent = concurrent;
    this.client = new GraphQLClient(process.env.GCOOL_API_SIMPLE_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${process.env.GCOOL_API_AUTH_TOKEN}`
      }
    });
  }
  getQueries(): string {
    return this.queries;
  }
  setQueries(arrayOfQueryStrings) {
    this.queries = arrayOfQueryStrings;
  }
  getConcurrent(): string {
    return this.concurrent;
  }
  setConcurrent(numberOfConcurrentConnections){
    this.concurrent=numberOfConcurrentConnections;
  }
  async batchQueryExecute() {
    // let query
    let queries = this.getQueries();
    let concurrent = this.getConcurrent();
    let sliced;
    log(`queries: ${queries} \n\n concurrent: ${concurrent} \n\n ^--- occurred in batchQueryExecute();`)
    try {
      do {
        sliced = sliceQueryArray(queries);
        let sliceIndex = 0;
        log(`Sliced: ${sliced}`);
        for(let s in sliced) {
          switch(sliceIndex) {
            case 0: for(let query in s) { log(`Query in slice: ${slice}`);} break;
            case 1: queries = sliced[1]; break; //the new "original" query
            default: throw new Error(`${chalk.red('batchQueryExecute() switch failed.')} Error: ${error}`); break;
          }
        }

      } while(!isEmpty(sliced))
    } catch(error) { `${chalk.red('batchQueryExecute() failed to return promise.')} Error: ${error}` }
    log(`Sliced outside of block: ${sliced}`);
    return sliced;
  }
  async queryExecute(query=this.query) {
    try {
      log(`Query being passed into queryExecute: ${query}`);
      let data = await this.client.request(query);
      return data;
    } catch(error) { log(`queryExecute failed. Error: ${error}`); }
  }
  sliceQueryArray(arrayOfQueries, concurrentConnections){
    let original = arrayOfQueries;
    let target = original.slice(0, concurrentConnections);
    original = original.slice(concurrentConnections, original.length);
    let queries = [target, original];
    return queries;
  }
}
module.exports = {
  batcher,
  QueryBatcher
}
