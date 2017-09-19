const { QueryBatcher, batcher } = require("../batcher.js");
const test = require("ava");
const chalk = require("chalk");
const log = console.log;

const sampleQueries = [
  `mutation {
  createContent(
    markup: markup1
    raw: raw1
  ) {
    markup
    raw
  }
}`,
  `mutation {
  createContent(
    markup: markup2
    raw: raw2
  ) {
    markup
    raw
  }
}`,
  `mutation {
  createContent(
    markup: markup3
    raw: raw3
  ) {
    markup
    raw
  }
}`,
  `mutation {
  createContent(
    markup: markup4
    raw: raw4
  ) {
    markup
    raw
  }
}`,
  `mutation {
  createContent(
    markup: markup5
    raw: raw5
  ) {
    markup
    raw
  }
}`,
  `mutation {
  createContent(
    markup: markup6
    raw: raw6
  ) {
    markup
    raw
  }
}`,
  `mutation {
  createContent(
    markup: markup7
    raw: raw7
  ) {
    markup
    raw
  }
}`
];

const expectedSlice = [
  `mutation {
  createContent(
    markup: markup1
    raw: raw1
  ) {
    markup
    raw
  }
}`,
  `mutation {
  createContent(
    markup: markup2
    raw: raw2
  ) {
    markup
    raw
  }
}`
];
const singleQuery = `mutation {
  createContent(
    markup: "markup1"
    raw: "raw1"
  ) {
    markup
    raw
  }
}`;
test("slice query array", t => {
  log(
    `${chalk.blue(
      "\nSliced Array from Original Query Array\n-------------------------------------\n"
    )}`
  );
  let q = new QueryBatcher(sampleQueries, 2);
  let sliced = q.sliceQueryArray();
  let target = sliced.target;
  log(` ${String(chalk.grey(target))}`);
  // log(`${chalk.yellow('\nExpected Slice\n-------------------------------------\n')} ${String(expectedSlice)}`);
  t.is(String(target), String(expectedSlice));
});

test("execute single query", async t => {
  log(
    `${chalk.yellow(
      "\nExecuting Target\n------------------------------------\n"
    )} `
  );
  let q = new QueryBatcher();
  let res = await q.queryExecute(singleQuery);

  t.pass();
});

//
