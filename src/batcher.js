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
    }
    return queries;
  }
}

module.exports = {
  batcher,
  QueryBatcher
}
