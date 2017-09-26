const builder = require("../builder.js");
const batcher = require("../batcher.js");
const factory = require("../factory.js");
const mock = require("./_mock.js");
const test = require("ava");
const chalk = require("chalk");
const log = console.log;

test("queries build and batch independently", async t => {
  let builtQueries = builder(mock.template, mock.variables);
  let executedQueries: Array<mixed> = await batcher.batch(mock.batchQuery);
  t.pass(JSON.stringify(mock.batchReturn), JSON.stringify(executedQueries));
});
test.skip("queries build and batch with factory", t => {
  let executedQueries = factory(mock.template, mock.variables);
  log(`executedQueries (${chalk.yellow("factory")}): ${executedQueries}`);
  t.is(batchQueryReturnComparison, executedQueries);
});
