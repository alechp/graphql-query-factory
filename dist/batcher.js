"use strict";

const { GraphQLClient } = require("graphql-request");
const chalk = require("chalk");
const log = console.log;

const gClient = new GraphQLClient(process && process.env && process.env.GQL_SIMPLE_ENDPOINT || "https://api.graph.cool/simple/v1/cj7rzel6x02b40143fhkupzik", {
  headers: {
    Authorization: `Bearer ${process && process.env && process.env.GQL_AUTH_TOKEN || "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MDU4NDkxNTIsImNsaWVudElkIjoiY2oxYzRqZ3Axa2lwdzAxMDV4MDVmZTRuNSIsInByb2plY3RJZCI6ImNqN3J6ZWw2eDAyYjQwMTQzZmhrdXB6aWsiLCJwZXJtYW5lbnRBdXRoVG9rZW5JZCI6ImNqN3J6cGVidDAyeTQwMTU1cG9odnllNGgifQ.ZA2zNCIvzrkUrASxkuZbX26rvHfsbKHK2V53J5CwQi4"}`
  }
});

function sliceQueryArray(arrayOfQueries, concurrentQueries) {
  let original = arrayOfQueries;
  let concurrent = concurrentQueries;
  //target and original defined in builder.js
  let target = original.slice(0, concurrent);
  original = original.slice(concurrent, original.length);
  // log(`${chalk.green('\nTarget\n---------------------------------\n')} ${target.toString()}`);
  // log(`${chalk.green('\nOriginal\n---------------------------------\n')} ${original.toString()}`);
  let queries = {
    target: [...target],
    original: [...original]
  };
  return queries;
}

async function queryBatchExecute(arrayOfQueries, concurrentQueries) {
  let sliced = this.sliceQueryArray(queries, concurrent);
  let res = Promise.all(this.queryExecute(query));
  return res;
}

function queryExecute(query) {
  return new Promise((resolve, reject) => {
    gClient.request(query).then(data => {
      resolve(data);
    }).catch(err => {
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