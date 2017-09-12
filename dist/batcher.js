function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { GraphQLClient } = require('graphql-request');
const config = require('./config.js');
const chalk = require('chalk');
const log = console.log;

function batcher(queries, concurrent) {
  let batcherHandle = new QueryBatcher(queries, concurrent);
  let executedBatchPromise = batcherHandle.batchQueryExecute();
  log(`Inside batcher function: ${executedBatchPromise}`);
  return executedBatchPromise;
}
class QueryBatcher {
  constructor(queries, concurrent = 4) {
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
  setConcurrent(numberOfConcurrentConnections) {
    this.concurrent = numberOfConcurrentConnections;
  }
  batchQueryExecute() {
    var _this = this;

    return _asyncToGenerator(function* () {
      // let query   
      let queries = _this.getQueries();
      let concurrent = _this.getConcurrent();
      let sliced;
      log(`queries: ${queries} \n\n concurrent: ${concurrent} \n\n ^--- occurred in batchQueryExecute();`);
      try {
        do {
          sliced = sliceQueryArray(queries);
          let sliceIndex = 0;
          log(`Sliced: ${sliced}`);
          for (let s in sliced) {
            switch (sliceIndex) {
              case 0:
                for (let query in s) {
                  log(`Query in slice: ${slice}`);
                }break;
              case 1:
                queries = sliced[1];break; //the new "original" query
              default:
                throw new Error(`${chalk.red('batchQueryExecute() switch failed.')} Error: ${error}`);break;
            }
          }
        } while (!isEmpty(sliced));
      } catch (error) {
        `${chalk.red('batchQueryExecute() failed to return promise.')} Error: ${error}`;
      }
      log(`Sliced outside of block: ${sliced}`);
      return sliced;
    })();
  }
  queryExecute(query) {
    return _asyncToGenerator(function* () {
      try {
        let data = yield client.request(query);
        return data;
      } catch (error) {
        log(`queryExecute failed. Error: ${error}`);
      }
    })();
  }
  sliceQueryArray(arrayOfQueries, concurrentConnections) {
    let original = arrayOfQueries;
    let target = original.slice(0, concurrentConnections);
    original = original.slice(concurrentConnections, original.length);
    let queries = [target, original];
    return queries;
  }
}
module.exports = batcher;