"use strict";

const { GraphQLClient, request } = require("graphql-request");
const chalk = require("chalk");
const log = console.log;

const client = new GraphQLClient(process && process.env && process.env.GQL_SIMPLE_ENDPOINT || "https://api.graph.cool/simple/v1/cj7rzel6x02b40143fhkupzik", {
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
async function queryBatchExecute(arrayOfQueries, concurrentQueries) {
  try {
    //target, original
    do {
      let sliced = this.sliceQueryArray(arrayOfQueries, concurrentQueries);
      log(`original length: ${sliced.original.length}`);
      for (let query of sliced.target) {
        // log(`Key: ${key} Val: ${val}`);
        log(`${chalk.blue("Query in queryBatchExecute loop:" + query)}`);
        let res = Promise.all((await this.queryExecute(query)));
      }
    } while (sliced.original.length > 0);
    return res;
  } catch (error) {
    log(`Failed to execute queryBatchExecute. ${error}`);
  }
}

function queryExecute(query) {
  return new Promise((resolve, reject) => {
    request(process && process.env && process.env.GQL_SIMPLE_ENDPOINT || "https://api.graph.cool/simple/v1/cj7rzel6x02b40143fhkupzik", query).then(data => {
      resolve(data);
    }).catch(err => {
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