const { builder } = require('graphql-query-factory');
const log = console.log;

const sampleMutation = `mutation addMarkup($markup:String!, $raw: String!) {
    createContent(
      markup: $markup 
      raw: $raw
    ) {
      markup
      raw
    }
  }`;
  
  const queryVariablesArray = [
    {
      "markup": "markup1",
      "raw": "raw1"
    },
    {
      "markup": "markup2",
      "raw": "raw2"
    },
    {
      "markup": "markup3",
      "raw": "raw3"
    }
  ];

  let queries = builder(sampleMutation, queryVariablesArray)
                .then( data =>
                    data.map(d => log(d))
                )
                .catch(err => log(`QueryBuilder failed. Error: ${err}`));
                
module.exports = queries;