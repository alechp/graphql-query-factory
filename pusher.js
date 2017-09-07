const request = require('graphql-request')
const config = require('./config.js');
const log = console.log;
class QueryPusher {
  constructor(queries, options) {
    this.qs = queries;
    this.os = options;
    this.client = new GraphQLClient(config.GCOOL_API_SIMPLE_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${config.GCOOL_API_AUTH_TOKEN}`
      }
    });
  }
  async batchQueryExecute(arrayOfQueriesToExecute) { 
    // let query   
    let queries = arrayOfQueriesToExecute; 
  }
  async queryExecute(query) { 
    try { 
      let data = await client.request(query);
      return data;
    } catch(error) { log(`queryExecute failed. Error: ${error}`);}
  }
  async sliceQueryArray(arrayOfQueries, concurrentConnections){
    let original = arrayOfQueries;
    try {
      do {
        let target = original.slice(0, concurrentConnections);
        original = original.slice(concurrentConnections, original.length);
      } while(original.length > 0)
    } catch(error) { log(`Error: ${error}`); } 
  }
}
