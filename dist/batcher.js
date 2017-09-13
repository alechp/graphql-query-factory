function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { GraphQLClient } = require('graphql-request');
const chalk = require('chalk');
const log = console.log;

function batcher(queries, concurrent) {
  let batcherHandle = new QueryBatcher(queries, concurrent);
  let executedBatchPromise = batcherHandle.batchQueryExecute();
  return executedBatchPromise;
}
class QueryBatcher {
  constructor(queriesToBeExecuted, concurrentNumberOfConnections = 4) {
    let queries, concurrent, client;
    this.queries = queriesToBeExecuted;
    this.concurrent = concurrentNumberOfConnections;
    this.client = new GraphQLClient(process.env.GCOOL_API_SIMPLE_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${process.env.GCOOL_API_AUTH_TOKEN}`
      }
    });
  }
  getQueries() {
    return this.queries;
  }
  setQueries(arrayOfQueryStrings) {
    let qs = this.queries;
    this.queries = arrayOfQueryStrings;
  }
  getConcurrent() {
    return this.concurrent;
  }
  setConcurrent(numberOfConcurrentConnections) {
    this.concurrent = numberOfConcurrentConnections;
  }
  batchQueryExecute() {
    let queries = this.getQueries();
    let concurrent = this.getConcurrent();
    let sliced = this.sliceQueryArray(queries);
    try {
      let sliceIndex = 0;
      for (let [key, singleQueryFromArray] of sliced) {
        log(`batcher.js/batchQueryExecute/: ${chalk.green(key)} : ${chalk.white(value)}`);
      }
    } catch (error) {
      `${chalk.red('batchQueryExecute() failed to return promise.')} Error: ${error}`;
    }
    return sliced;
  }

  queryExecute(query) {
    var _this = this;

    return _asyncToGenerator(function* () {
      try {
        let data = yield _this.client.request(query);
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
    // let queries: Array<string> = [...target, ...original];
    let queries = {
      target: [...target],
      original: [...original]
    };
    return queries;
  }
}

module.exports = batcher;