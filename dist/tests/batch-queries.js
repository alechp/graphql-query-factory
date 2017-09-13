let runQueries = (() => {
  var _ref = _asyncToGenerator(function* (queries) {
    let ret;
    try {
      ret = yield batcher(queries, 4);
      log(`ret: ${typeof ret}`);
    } catch (error) {
      log(`Error: ${error}`);
    }
    return ret;
  });

  return function runQueries(_x) {
    return _ref.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const batcher = require('../batcher.js');
const test = require('ava');
const chalk = require('chalk');
const log = console.log;

const sampleQueries = `mutation addMarkup($markup:String!, $raw: String!) {
  createContent(
    markup: markup1
    raw: raw1
  ) {
    markup
    raw
  }
},mutation addMarkup($markup:String!, $raw: String!) {
  createContent(
    markup: markup2
    raw: raw2
  ) {
    markup
    raw
  }
},mutation addMarkup($markup:String!, $raw: String!) {
  createContent(
    markup: markup3
    raw: raw3
  ) {
    markup
    raw
  }
}`;

test('queries build and execute', (() => {
  var _ref2 = _asyncToGenerator(function* (t) {
    // let queries = await builder(sampleMutation, queryVariablesArray);
    let execution = yield batcher(sampleQueries, 4);
    // log(`Execution: ${JSON.stringify(execution)}`);
    log(`Execution: ${execution}`);
    t.pass();
  });

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
})());