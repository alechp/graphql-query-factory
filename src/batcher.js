//@flow

const { GraphQLClient } = require('graphql-request')
const chalk = require('chalk');
const isEmpty = require('is-empty');
const log = console.log;

function batcher(queries: string, concurrent: number): Promise<any> {
  let batcherHandle = new QueryBatcher(queries, concurrent);
  let executedBatchPromise = batcherHandle.batchQueryExecute();
  log(`Inside batcher function: ${executedBatchPromise}`);
  return executedBatchPromise;
}
class QueryBatcher {
  constructor(queries: Array<string>, concurrent: number = 4) {
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
  setQueries(arrayOfQueryStrings: Array<string>) {
    this.queries = arrayOfQueryStrings;
  }
  getConcurrent(): string {
    return this.concurrent;
  }
  setConcurrent(numberOfConcurrentConnections: number){
    this.concurrent=numberOfConcurrentConnections;
  }

  async batchQueryExecute(): Array<string> {
    // let query
    let queries: string = this.getQueries();
    let concurrent: string = this.getConcurrent();
    let sliced: Array<string> = this.sliceQueryArray(queries);
    log(`queries: ${queries} \n\n concurrent: ${concurrent} \n\n ^--- occurred in batchQueryExecute();`)
    try {
      do {
        let sliceIndex: number = 0;
        log(`Sliced: ${sliced}`);
        for(let [key: string, singleQueryFromArray: string] of sliced) {
          sliceIndex = key;
          switch(sliceIndex) {
            case 0: for(let query in singleQueryFromArray) { log(`Query in slice: ${slice}`);} break;
            case 1: queries = sliced[1]; break; //the new "original" query
            default: throw new Error(`${chalk.red('batchQueryExecute() switch failed.')} Error: ${error}`); break;
          }
        }

      } while(!isEmpty(sliced))
    } catch(error) { `${chalk.red('batchQueryExecute() failed to return promise.')} Error: ${error}` }
    log(`Sliced outside of block: ${sliced}`);
    return sliced;
  }

  async queryExecute(query: string): Promise<any> {
    try {
      let data: Promise<any> = await client.request(query);
      return data;
    } catch(error) { log(`queryExecute failed. Error: ${error}`); }
  }

  sliceQueryArray(arrayOfQueries: Array<string>, concurrentConnections: number): mixed{
    let original: Array<string> = arrayOfQueries;
    let target: Array<string> = original.slice(0, concurrentConnections);
    original = original.slice(concurrentConnections, original.length);
    // let queries: Array<string> = [...target, ...original];
    let queries = {
        'target': [...target],
        'original': [...original]
    }
    return queries;
  }
}

module.exports = batcher;
