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

test('queries build and execute', async t => {
  let execution = await batcher(sampleQueries, 2);
  log(`${chalk.blue('\nExecution\n------------------------------------\n')}: ${execution}`);
  t.pass();
});
