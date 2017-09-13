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

test('queries build and execute', async t => {
  let execution = await batcher(sampleQueries, 4);
  t.pass();
});
