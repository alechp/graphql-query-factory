# GraphQL Query Batcher

## Status
> You can use QueryBuilder today. QueryBuilder takes an array of variable objects and injects them into your GraphQL query. 


### Roadmap
* [ ] QueryFactory - Combines Builder & Batcher
* [x] QueryBuilder - Builds individual query strings based on the number of variable combinations you have. 
* [ ] QueryBatcher - Executes the entire array of GraphQL Query Strings.
* [x] Ava Tests
* [ ] CI status bar

## Getting Started
#### Installation
```bash
npm install graphql-query-factory -S 
```

#### Sample Use
QueryFactory
```js
Not available yet
```


QueryBuilder - [Sample Project](https://github.com/alechp/graphql-query-factory/tree/master/graphql-query-factory-test-project)
```js
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

```

QueryBatcher 
```js
Not available yet
```