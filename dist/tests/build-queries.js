let b = (() => {
  var _ref = _asyncToGenerator(function* () {
    let qs = yield builder(sampleMutation, queryVariablesArray);
    let queries = String(qs);
    return queries;
  });

  return function b() {
    return _ref.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const builder = require('../builder.js');
const test = require('ava');

const sampleMutation = `mutation addMarkup($markup:String!, $raw: String!) {
  createContent(
    markup: $markup 
    raw: $raw
  ) {
    markup
    raw
  }
}`;

const queryVariablesArray = [{
  "markup": "markup1",
  "raw": "raw1"
}, {
  "markup": "markup2",
  "raw": "raw2"
}, {
  "markup": "markup3",
  "raw": "raw3"
}];

const expectedQueries = `mutation addMarkup($markup:String!, $raw: String!) {
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


test('queries build', (() => {
  var _ref2 = _asyncToGenerator(function* (t) {
    // let queries = await builder(sampleMutation, queryVariablesArray);
    let queries = yield b();
    t.is(queries, expectedQueries);
  });

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
})());