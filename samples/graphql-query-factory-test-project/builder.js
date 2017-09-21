const {
  QueryBuilder,
  builder,
  QueryBatcher,
  batcher
} = require("graphql-query-factory");
const log = console.log;
const chalk = require("chalk");

const sampleMutation = `mutation addMarkup($markup:String!, $raw: String!) {
  createContent(
    markup: $markup
    raw: $raw
  ) {
    markup
    raw
  }
}`;

const queryVariablesArray = [
  {
    markup: "markup1",
    raw: "raw1"
  },
  {
    markup: "markup2",
    raw: "raw2"
  },
  {
    markup: "markup3",
    raw: "raw3"
  }
];

function manualBuildMutation() {
  let q = new QueryBuilder(sampleMutation, queryVariablesArray);
  let queries = q.buildQueries();
  return queries;
}
function autoBuildMutation() {
  let queries = builder(sampleMutation, queryVariablesArray);
  return queries;
}
let manual = manualBuildMutation();
let automatic = autoBuildMutation();

// let queries = builder(sampleMutation, queryVariablesArray)
//   .then(data => data.map(d => log(d)))
//   .catch(err => log(`QueryBuilder failed. Error: ${err}`));

log(
  `${chalk.yellow(
    "\n-----------------------------\n Manual: \n-----------------------------\n"
  )} ${manual}`
);
log(
  `${chalk.yellow(
    "\n-----------------------------\n Automatic: \n-----------------------------\n"
  )} ${automatic}`
);
module.exports = queries;
