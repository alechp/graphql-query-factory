const path = require('path');
const { builder } = require(path.join(__dirname, '../../../graphql-query-factory'));
const log = console.log;
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
async function b(){
  let qs = await builder(sampleMutation, queryVariablesArray);
  let queries = String(qs); 
  return queries;
}

test('(query<string>, variables<object>)', async t => {
  // let queries = await builder(sampleMutation, queryVariablesArray);
  let queries = await b();
  t.is(queries, expectedQueries)
});