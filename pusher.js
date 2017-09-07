const request = require('graphql-request')
const config = require('./config.js');

const client = new GraphQLClient(config.GCOOL_API_SIMPLE_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${config.GCOOL_API_AUTH_TOKEN}`
  }
});
class QueryPusher {
  constructor(queries, options) {
    this.qs = queries;
    this.os = options;
  }
  async batchQueryExecute(arrayOfQueriesToExecute) { 
    // let query   
    let queries = arrayOfQueriesToExecute; 
  }
}
