"use strict";

const { GraphQLClient, request } = require("graphql-request");
const chalk = require("chalk");
const log = console.log;

const client = new GraphQLClient(process && process.env && process.env.GQL_SIMPLE_ENDPOINT || "https://api.graph.cool/simple/v1/cj7rzel6x02b40143fhkupzik", {
  headers: {
    Authorization: `Bearer ${process && process.env && process.env.GQL_AUTH_TOKEN || "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MDU4NDkxNTIsImNsaWVudElkIjoiY2oxYzRqZ3Axa2lwdzAxMDV4MDVmZTRuNSIsInByb2plY3RJZCI6ImNqN3J6ZWw2eDAyYjQwMTQzZmhrdXB6aWsiLCJwZXJtYW5lbnRBdXRoVG9rZW5JZCI6ImNqN3J6cGVidDAyeTQwMTU1cG9odnllNGgifQ.ZA2zNCIvzrkUrASxkuZbX26rvHfsbKHK2V53J5CwQi4"}`
  }
});

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

async function queryBatchExec(arrayOfQueries, concurrentQueries) {
  Promise.all(arrayOfQueries.map(query => queryExecute(query)));
  // let t: Array<string> = [];
  // let c: number = concurrentQueries;
  // let o: Array<string> = arrayOfQueries;
  // let n: Array<string> = [];
  // if (o instanceof Array) {
  //   if (o.length >= concurrentQueries) {
  //     t = o.slice(0, c);
  //   } else {
  //     t = o.slice(0, o.length);
  //   }
  //   Promise.all(t.map( query => await queryExecute(query)));
  //   o = o.slice(c);
  //   queryBatchExec(o, c);
}
function sliceQueryArray(arrayOfQueries, concurrentQueries) {
  let original = arrayOfQueries;
  let concurrent = concurrentQueries;
  let target = [];
  //target and original defined in builder.js
  target = original.slice(0, concurrent);
  original = original.slice(concurrent, original.length);
  // log(`${chalk.green('\nTarget\n---------------------------------\n')} ${target.toString()}`);
  // log(`${chalk.green('\nOriginal\n---------------------------------\n')} ${original.toString()}`);
  let queries = {
    target: [...target],
    original: [...original]
  };
  log(String(queries));
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
// async function queryBatchExec(
//   arrayOfQueries: Array<string>,
//   concurrentQueries: number
// ): mixed {
//   let sliced = this.sliceQueryArray(arrayOfQueries, concurrentQueries);
//   for (let s of sliced.target) {
//     log(`s in sliced: ${s}`);
//   }
//   try {
//     for (let [key, val] of Object.entries(sliced)) {
//       for (let v in val) {
//         log(`v in val: ${v}`);
//       }
//       if (key == "target") {
//         Promise.all(await this.queryExecute(val));
//       } else {
//         queryBatchExec(val, concurrentQueries);
//       }
//     }
//     Promise.all(await this.queryExecute(sliced.target));
//   } catch (error) {
//     log(`queryBatchExec(): ${error}`);
//   }
// }

////
// async function queryBatchExecute(
//   arrayOfQueries: Array<string>,
//   concurrentQueries: number
// ): mixed {
//   try {
//     //target, original
//     let sliced = this.sliceQueryArray(arrayOfQueries, concurrentQueries);
//     log(`original length: ${sliced.original.length}`);
//     for (let query of sliced.target) {
//       log(`${chalk.blue("Query in queryBatchExecute loop:" + query)}`);
//       Promise.all(await this.queryExecute(query));
//     }
//   } catch (error) {
//     log(`Failed to execute queryBatchExecute. ${error}`);
//   }
// }

let batcher = {
  queryExecute,
  queryBatchExec,
  sliceQueryArray
};

module.exports = batcher;