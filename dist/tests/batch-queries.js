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
},mutation addMarkup($markup:String!, $raw: String!) {
  createContent(
    markup: markup4
    raw: raw4
  ) {
    markup
    raw
  }
},mutation addMarkup($markup:String!, $raw: String!) {
  createContent(
    markup: markup5
    raw: raw5
  ) {
    markup
    raw
  }
},mutation addMarkup($markup:String!, $raw: String!) {
  createContent(
    markup: markup6
    raw: raw6
  ) {
    markup
    raw
  }
},mutation addMarkup($markup:String!, $raw: String!) {
  createContent(
    markup: markup7
    raw: raw7
  ) {
    markup
    raw
  }
}`;

test('queries build and execute', (() => {
  var _ref = _asyncToGenerator(function* (t) {
    let execution = yield batcher(sampleQueries, 2);
    log(`${chalk.blue('\nExecution\n------------------------------------\n')}: ${execution}`);
    t.pass();
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})());