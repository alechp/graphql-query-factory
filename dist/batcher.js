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
  constructor(queries, concurrent) {
    this.queries = queries;
    this.concurrent = concurrent;
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
    let queries = this.getQueries();
    let concurrent = this.getConcurrent();
    let sliced = this.sliceQueryArray(queries, concurrent);
    return sliced;
  }

  queryExecute(query) {
    return _asyncToGenerator(function* () {
      let endpoint = String(process && process.env && process.env.GQL_SIMPLE_ENDPOINT || 'https://api.graph.cool/simple/v1/cj6qq63wr0mrv0187fq2xdf0u');
      let token = String(process && process.env && process.env.GQL_AUTH_TOKEN || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MDM2MDY5NTUsImNsaWVudElkIjoiY2oxYzRqZ3Axa2lwdzAxMDV4MDVmZTRuNSIsInByb2plY3RJZCI6ImNqNnFxNjN3cjBtcnYwMTg3ZnEyeGRmMHUiLCJwZXJtYW5lbnRBdXRoVG9rZW5JZCI6ImNqNnF3cmNhajB2bHIwMTg3eHg2N2ZvdW0ifQ.vN6R2A-lMv_gVPWwoZlf0JbkBNsX8YSpZUA_Xq9u_K4');
      const client = new GraphQLClient(endpoint, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      try {
        let data = yield client.request(query);
        return data;
      } catch (error) {
        log(`queryExecute failed. Error: ${error}`);
      }
    })();
  }
  sliceQueryArray() {
    let original = this.getQueries();
    let concurrent = this.getConcurrent();
    let target = original.slice(0, concurrent);
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