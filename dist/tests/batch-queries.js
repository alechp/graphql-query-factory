function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { QueryBatcher, batcher } = require('../batcher.js');
const test = require('ava');
const chalk = require('chalk');
const log = console.log;

const sampleQueries = [`mutation addMarkup($markup:String!, $raw: String!) {
  createContent(
    markup: markup1
    raw: raw1
  ) {
    markup
    raw
  }
}`, `mutation addMarkup($markup:String!, $raw: String!) {
  createContent(
    markup: markup2
    raw: raw2
  ) {
    markup
    raw
  }
}`, `mutation addMarkup($markup:String!, $raw: String!) {
  createContent(
    markup: markup3
    raw: raw3
  ) {
    markup
    raw
  }
}`, `mutation addMarkup($markup:String!, $raw: String!) {
  createContent(
    markup: markup4
    raw: raw4
  ) {
    markup
    raw
  }
}`, `mutation addMarkup($markup:String!, $raw: String!) {
  createContent(
    markup: markup5
    raw: raw5
  ) {
    markup
    raw
  }
}`, `mutation addMarkup($markup:String!, $raw: String!) {
  createContent(
    markup: markup6
    raw: raw6
  ) {
    markup
    raw
  }
}`, `mutation addMarkup($markup:String!, $raw: String!) {
  createContent(
    markup: markup7
    raw: raw7
  ) {
    markup
    raw
  }
}`];

const expectedSlice = [`mutation addMarkup($markup:String!, $raw: String!) {
  createContent(
    markup: markup1
    raw: raw1
  ) {
    markup
    raw
  }
}`, `mutation addMarkup($markup:String!, $raw: String!) {
  createContent(
    markup: markup2
    raw: raw2
  ) {
    markup
    raw
  }
}`];

test('slice query array', t => {
  let q = new QueryBatcher(sampleQueries, 2);
  let sliced = q.sliceQueryArray();
  let target = sliced.target;
  // log(`${chalk.yellow('\nTarget\n-------------------------------------\n')} ${String(target)}`);
  // log(`${chalk.yellow('\nExpected Slice\n-------------------------------------\n')} ${String(expectedSlice)}`);
  t.is(String(target), String(expectedSlice));
});
test('execute single query', (() => {
  var _ref = _asyncToGenerator(function* (t) {
    let q = new QueryBatcher(sampleQueries, 2);
    let sliced = q.sliceQueryArray();
    let target = sliced.target;
    for (let t in target) {
      log(`t: ${t[0]}`);
    }
    log(`${chalk.blue('\nTarget\n------------------------------------\n')} ${target}`);
    t.pass();
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})());