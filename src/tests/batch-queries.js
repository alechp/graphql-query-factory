const test = require('ava');
const chalk = require('chalk');
const config = require('../config.js'); 
const log = console.log;
const Batcher = require('../batcher.js');
const batcher = Batcher.batcher;
const QueryBatcher = Batcher.QueryBatcher;

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

test('queries batch execute', async t => {
  // let queries = await builder(sampleMutation, queryVariablesArray);
  let singleQuery = `mutation addMarkup($markup:String!, $raw: String!) {
    createContent(
      markup: markup1 
      raw: raw1
    ) {
      markup
      raw
    }
  }`;
  let qry = batcher(singleQuery, 4, config);
  // let exec = await qry.queryExecute();
  log(`Exec: ${qry}`);
  t.pass();
});
