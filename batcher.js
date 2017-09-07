const { GraphQLClient } = require('graphql-request')
const config = require('./config.js');
const chalk = require('chalk');
const log = console.log;

function batcher(queries, concurrent) { 
  let batcherHandle = new QueryBatcher(queries, concurrent);
  let executedBatchPromise = batcherHandle.batchQueryExecute();
  log(`Inside batcher function`);
  return executedBatchPromise;
}
class QueryBatcher {
  constructor(queries, concurrent=4) {
    this.queries = queries;
    this.concurrent = concurrent;
    this.client = new GraphQLClient(config.GCOOL_API_SIMPLE_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${config.GCOOL_API_AUTH_TOKEN}`
      }
    });
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
  setConcurrent(numberOfConcurrentConnections){
    this.concurrent=numberOfConcurrentConnections;
  }
  async batchQueryExecute() { 
    // let query   
    let queries = this.getQueries(); 
    let concurrent = this.getConcurrent();
    log(`queries: ${queries} \n\n concurrent: ${concurrent} \n\n ^--- occurred in batchQueryExecute();`)
    try {
      do {
        let sliced = await sliceQueryArray(queries);
        let sliceIndex = 0;
        for(let s in sliced) { 
          switch(sliceIndex) {
            case 0: for(let query in s) { log(`Query in slice: ${slice}`);} break;
            case 1: queries = sliced[1]; break; //the new "original" query
            default: throw new Error(`${chalk.red('batchQueryExecute() switch failed.')} Error: ${error}`); break;
          }
        }
      } while(!isEmpty(sliced))
    } catch(error) { `${chalk.red('batchQueryExecute() failed to return promise.')} Error: ${error}` }
  }
  async queryExecute(query) { 
    try { 
      let data = await client.request(query);
      return data;
    } catch(error) { log(`queryExecute failed. Error: ${error}`); }
  }
  async sliceQueryArray(arrayOfQueries, concurrentConnections){
    try { 
      let original = arrayOfQueries;
      let target = original.slice(0, concurrentConnections);
      original = original.slice(concurrentConnections, original.length);
      let queries = [target, original];
      return queries;
    } catch(error) { log(`Error: ${error}`); } 
  }
}
module.exports = batcher; 