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
  queries: Array<string>;
  concurrent: number;
  constructor(queries, concurrent) {
    this.queries = queries;
    this.concurrent = concurrent;
  }
  getQueries(){
    return this.queries;
  }
  setQueries(arrayOfQueryStrings: Array<string>) {
    this.queries = arrayOfQueryStrings;
  }
  getConcurrent(){
    return this.concurrent;
  }
  setConcurrent(numberOfConcurrentConnections: number){
    this.concurrent=numberOfConcurrentConnections;
  }
  batchQueryExecute(): mixed {
    let queries = this.getQueries();
    let concurrent = this.getConcurrent();
    let sliced = this.sliceQueryArray(queries, concurrent);
    Object.entries(sliced).forEach( ([key, val]) => { log(`K[${key}]\tV[${String(val)}]`) });
    // for(let i = 0; i < sliced.length; i++) { log(`Sliced: ${sliced[i]}`)}
    // try {
    //   let sliceIndex: number = 0;
    //   for(let [key: string, singleQueryFromArray: string] of sliced) {
    //     log(`batcher.js/batchQueryExecute/: ${chalk.green(key)} : ${chalk.white(singleQueryFromArray)}`);
    //   }
    // } catch(error) { `${chalk.red('batchQueryExecute() failed to return promise.')} Error: ${error}` }
    return sliced;
  }

  async queryExecute(query: string): mixed {
    let endpoint: string = String(process.env.GQL_SIMPLE_ENDPOINT)
    let token: string = String(process.env.GQL_AUTH_TOKEN)
    const client = new GraphQLClient(endpoint, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    try {
      let data: mixed = await client.request(query);
      return data;
    } catch(error) { log(`queryExecute failed. Error: ${error}`); }
  }
  sliceQueryArray(arrayOfQueries: Array<string>, concurrentConnections: number): mixed{
    let original: Array<string> = arrayOfQueries;
    let target: Array<string> = original.slice(0, concurrentConnections);
    original = original.slice(concurrentConnections, original.length);
    log(`${chalk.green('\nTarget\n---------------------------------\n')} ${target.toString()}`);
    log(`${chalk.green('\nOriginal\n---------------------------------\n')} ${original.toString()}`);
    let queries = {
        target: [...target],
        original: [...original]
    }
    return queries;
  }
}

module.exports = batcher;
