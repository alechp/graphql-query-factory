const test = require('ava');
const { builder } = require('../index.js');
const log = console.log;
//TODO: add sample query

const sampleMutation = `mutation addMarkup($markup:String!, $raw: String!) {
  createContent(
    markup: $markup 
    raw: $raw
  ) {
    markup
    raw
  }
}`;

const queryVariableObject = { 
  "markup": "pusher complete",
  "raw": "parammmmy2"
};

const queryVariablesArray = [
  {
    "markup": "markup1",
    "raw": "raw1"
  },
  {
    "markup": "markup2",
    "raw": "raw2"
  },
  {
    "markup": "markup3",
    "raw": "raw3"
  }
];

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
  let queries = builder(sampleMutation, queryVariablesArray);
  log(`queries: ${queries} \n expectedQueries: ${expectedQueries}`);

test('(query<string>, variables<object>)', t => {
  let queries = builder(sampleMutation, queryVariablesArray);
  t.is(queries, expectedQueries)
});