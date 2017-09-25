//@flow
const { GraphQLClient, request } = require("graphql-request");
const chalk = require("chalk");
const log = console.log;

const client = new GraphQLClient(process.env.GQL_SIMPLE_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.GQL_AUTH_TOKEN}`
  }
});

function sliceQueryArray(arrayOfQueries, concurrentQueries): mixed {
  let original: Array<string> = arrayOfQueries;
  let concurrent: number = concurrentQueries;
  //target and original defined in builder.js
  let target: Array<string> = original.slice(0, concurrent);
  original = original.slice(concurrent, original.length);
  // log(`${chalk.green('\nTarget\n---------------------------------\n')} ${target.toString()}`);
  // log(`${chalk.green('\nOriginal\n---------------------------------\n')} ${original.toString()}`);
  let queries = {
    target: [...target],
    original: [...original]
  };
  return queries;
}
// function designateQueryToExecute(arrayOfQueries) {
//   let target = [];
//   return new Promise((resolve, reject) => {
//     for(let target in Object.entries(arrayOfQueries) {
//       for(let query in Object.entries(arrayofQueries).target) {
//         target.push(query)
//       }
//     }
//
//   });
// }
async function queryBatchExecute(
  arrayOfQueries: Array<string>,
  concurrentQueries: number
): mixed {
  try {
    //target, original
    do {
      let sliced = this.sliceQueryArray(arrayOfQueries, concurrentQueries);
      log(`original length: ${sliced.original.length}`);
      for (let query of sliced.target) {
        // log(`Key: ${key} Val: ${val}`);
        log(`${chalk.blue("Query in queryBatchExecute loop:" + query)}`);
        let res = Promise.all(await this.queryExecute(query));
      }
    } while (sliced.original.length > 0);
    return res;
  } catch (error) {
    log(`Failed to execute queryBatchExecute. ${error}`);
  }
}

function queryExecute(query: string): mixed {
  return new Promise((resolve, reject) => {
    request(process.env.GQL_SIMPLE_ENDPOINT, query)
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        log(err.response.errors);
        log(err.response.data);
        reject(err);
      });
  });
}

let batcher = {
  queryExecute,
  queryBatchExecute,
  sliceQueryArray
};

module.exports = batcher;
