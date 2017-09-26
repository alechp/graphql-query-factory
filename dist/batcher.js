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

function queryExecuteBatch(arrayOfQueries) {
  let resp = Promise.all(arrayOfQueries.map(query => queryExecute(query)));
  return resp;
}

let batcher = {
  request: queryExecute,
  batch: queryExecuteBatch
};

module.exports = batcher;