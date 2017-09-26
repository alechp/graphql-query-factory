//@flow
const { GraphQLClient, request } = require("graphql-request");
const chalk = require("chalk");
const log = console.log;

const client = new GraphQLClient(process.env.GQL_SIMPLE_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.GQL_AUTH_TOKEN}`
  }
});

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

async function queryExecuteBatch(arrayOfQueries) {
  let resp = Promise.all(arrayOfQueries.map(query => queryExecute(query)));
  return resp;
}

let batcher = {
  request: queryExecute,
  batch: queryExecuteBatch
};

module.exports = batcher;
