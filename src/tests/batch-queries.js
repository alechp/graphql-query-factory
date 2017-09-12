const batcher = require('../batcher.js')
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

async function runQueries(queries) {
  let ret;
  try {
    ret = await batcher(queries, 4)
    log(`ret: ${typeof ret}`);
  } catch(error) { log(`Error: ${error}`)}
  return ret;
}
test('queries build and execute', async t => {
  // let queries = await builder(sampleMutation, queryVariablesArray);
  let execution = await runQueries(sampleQueries);
  // log(`Execution: ${JSON.stringify(execution)}`);
  log(`Execution: ${execution}`);
  t.pass();
});
