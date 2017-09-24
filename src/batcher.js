//@flow
const { GraphQLClient } = require("graphql-request");
const chalk = require("chalk");
const log = console.log;

const gClient = new GraphQLClient(process.env.GQL_SIMPLE_ENDPOINT, {
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
  let res = Promise.all(this.queryExecute(query));
  return res;
}

function queryExecute(query: string): mixed {
  return new Promise((resolve, reject) => {
    gClient
      .request(query)
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
}
// const batcher = (queries, concurrent) => {
//   log(`inside querybatcher`);
//   log(`Endpoint: ${endpoint}`);
//   let endpoint = `${process.env.GQL_SIMPLE_ENDPOINT}`;
//   const apolloFetch = createApolloFetch({ endpoint });
//   queryExecute(apolloFetch, ;
// };

let QueryBatcher = {
  queryExecute,
  queryBatchExecute,
  sliceQueryArray
};

module.exports = QueryBatcher;
// class QueryBatcher {
//   queries: Array<string>;
//   concurrent: number;
//   constructor(queries, concurrent = 4) {
//     this.queries = queries;
//     this.concurrent = concurrent;
//   }
//   getQueries() {
//     return this.queries;
//   }
//   setQueries(arrayOfQueryStrings: Array<string>) {
//     this.queries = arrayOfQueryStrings;
//   }
//   getConcurrent() {
//     return this.concurrent;
//   }
//   setConcurrent(numberOfConcurrentConnections: number) {
//     this.concurrent = numberOfConcurrentConnections;
//   }
//
//   getQueryType(query: string): string {
//     let split = query.split(" ");
//     log(`Split: ${split}`);
//     return split;
//   }
//   async queryExecute(query: string): mixed {
//
//     try {
//       return await apolloFetch({ query })
//     } catch(error) {
//       log(`${chalk.red('Failed to execute query. ' + error)}`);
//     }
//     // const client = new ApolloClient({
//     //   networkInterface: createNetworkInterface({
//     //     uri: process.env.GQL_SIMPLE_ENDPOINT,
//     //     opts: {
//     //       headers: { Authorization: process.env.GQL_AUTH_TOKEN }
//     //     }
//     //   })
//     // });
//     // try {
//     //   return await this.apolloFetch({ query });
//     // } catch (error) {
//     //   log(
//     //     `\n${chalk.red(
//     //       "queryExecute() in " + this.constructor.name + " failed."
//     //     )} ${chalk.red(error)}\n`
//     //   );
//     // }
//   }
//
// }
