
const { GraphQLClient } = require('graphql-request')
const chalk = require('chalk');
const log = console.log;

function batcher(queries: string, concurrent: number): Promise<any> {
  let batcherHandle = new QueryBatcher(queries, concurrent);
  let executedBatchPromise = batcherHandle.batchqueryexecute();
  log(`Inside batcher function: ${executedBatchPromise}`);
  return executedBatchPromise;
}
class QueryBatcher {
  constructor(queries: Array<string>, concurrent=4: number) {
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

  async batchQueryExecute() {
    // let query
    let queries: string = this.getQueries();
    let concurrent: string = this.getConcurrent();
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

  async queryExecute(query: string): Promise<any> {
    try {
      let data = await client.request(query);
      return data;
    } catch(error) { log(`queryExecute failed. Error: ${error}`); }
  }

  sliceQueryArray(arrayOfQueries: Array<string>, concurrentConnections: number): Array<string>{
    let original = arrayOfQueries;
    let target = original.slice(0, concurrentConnections);
    original = original.slice(concurrentConnections, original.length);
    let queries = [target, original];
    return queries;
  }
}

module.exports = batcher;
