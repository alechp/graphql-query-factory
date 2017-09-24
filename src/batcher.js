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

async function queryBatchExecute(
  arrayOfQueries: Array<string>,
  concurrentQueries: number
): mixed {
  let sliced = this.sliceQueryArray(queries, concurrent);
  let res = Promise.all(await this.queryExecute(query));
  return res;
}

function queryExecute(query: string): mixed {
  log(`Inside queryExecute`);
  return new Promise((resolve, reject) => {
    request(process.env.GQL_SIMPLE_ENDPOINT, query)
      .then(data => {
        log(`Data in queryExecute: ${data}`);
        resolve(data);
      })
      .catch(err => {
        log(err.response.errors);
        log(err.response.data);
        reject(err);
      });
    // client
    //   .request(query)
    //   .then(data => {
    //     log(`Data in queryExecute: ${data}`);
    //     resolve(data);
    //   })
    //   .catch(err => {
    //     reject(err);
    //   });
  });
}
// const batcher = (queries, concurrent) => {
//   log(`inside querybatcher`);
//   log(`Endpoint: ${endpoint}`);
//   let endpoint = `${process.env.GQL_SIMPLE_ENDPOINT}`;
//   const apolloFetch = createApolloFetch({ endpoint });
//   queryExecute(apolloFetch, ;
// };

let batcher = {
  queryExecute,
  queryBatchExecute,
  sliceQueryArray
};

module.exports = batcher;
