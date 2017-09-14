const {QueryBatcher, batcher } = require('../batcher.js')
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
}`,
`mutation addMarkup($markup:String!, $raw: String!) {
  createContent(
    markup: markup2
    raw: raw2
  ) {
    markup
    raw
  }
}`,
`mutation addMarkup($markup:String!, $raw: String!) {
  createContent(
    markup: markup3
    raw: raw3
  ) {
    markup
    raw
  }
}`,
`mutation addMarkup($markup:String!, $raw: String!) {
  createContent(
    markup: markup4
    raw: raw4
  ) {
    markup
    raw
  }
}`,
`mutation addMarkup($markup:String!, $raw: String!) {
  createContent(
    markup: markup5
    raw: raw5
  ) {
    markup
    raw
  }
}`,
`mutation addMarkup($markup:String!, $raw: String!) {
  createContent(
    markup: markup6
    raw: raw6
  ) {
    markup
    raw
  }
}`,
`mutation addMarkup($markup:String!, $raw: String!) {
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
}`,
`mutation addMarkup($markup:String!, $raw: String!) {
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
  log(`${chalk.blue('\nSliced Array from Original Query Array\n-------------------------------------\n')} ${String(chalk.grey(target))}`);
  // log(`${chalk.yellow('\nExpected Slice\n-------------------------------------\n')} ${String(expectedSlice)}`);
  t.is(String(target), String(expectedSlice));
});

test('execute single query', async t => {
  let q = new QueryBatcher(sampleQueries, 2);
  let sliced: mixed = q.sliceQueryArray();
  let stringified: string = String(sliced.target);
  let target = sliced.target;
  log(`${chalk.yellow('\nExecuting Target\n------------------------------------\n')} ${stringified}`);
  t.pass();
});
