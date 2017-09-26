const builder = require("./builder.js");
const batcher = require("./batcher.js");
const log = console.log;

async function factory(queryTemplate: string, variables: mixed) {
  let queries = builder(queryTemplate, variables);
  let requests = await batcher.batch(queries);
  return requests;
}

module.exports = factory;
