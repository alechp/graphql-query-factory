const builder = require("../builder.js");
const batcher = require("../batcher.js");
const factory = require("../factory.js");
const mock = require("./_mock.js");
const test = require("ava");
const chalk = require("chalk");
const log = console.log;

test.skip("queries build and batch independently", async t => {
  let builtQueries = builder(mutationTemplate, mutationVariables);
  let executedQueries: Array<mixed> = await batcher.batch(builtQueries);
  t.pass();
});
test.skip("queries build and batch with factory", t => {
  let executedQueries = factory(mock.template, mock.variables);
  log(`executedQueries (${chalk.yellow("factory")}): ${executedQueries}`);

  t.is(batchQueryReturnComparison, executedQueries);
});
