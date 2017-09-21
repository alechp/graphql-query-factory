# GraphQL Query Batcher
![CI Build Status Bar](https://travis-ci.org/alechp/graphql-query-factory.svg?branch=flow)

## Status
> You can use QueryBuilder today. QueryBuilder takes an array of variable objects and injects them into your GraphQL query.


### Roadmap
| Status | Summary | Comment |
|:-------|:---------|:--------|
| ☐ | QueryFactory | Combines Builder & Batcher |
| ✓ | QueryBuilder | Builds individual query strings based on the number of variable combinations you have. |
| ☐ | QueryBatcher | Executes the entire array of GraphQL Query Strings. |
| ✓ | Ava | |
| ☐ | Flow | Dependencies added but not finished |
| ✓ | Babel | |
| ✓ | TravisCI | [https://travis-ci.org/alechp/graphql-query-factory](https://travis-ci.org/alechp/graphql-query-factory)|
| ☐ | Webpack | Babel has been useful for testing. Going to convert to webpack to enable uglification, tree-shaking, etc. |
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
--------------------------------

QueryBuilder - [Sample Project](https://github.com/alechp/graphql-query-factory/tree/master/graphql-query-factory-test-project)
```js
const { builder } = require('graphql-query-factory');
const log = console.log;

const sampleMutation = `mutation {
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
QueryBuilder Output:
```js
mutation {
    createContent(
      markup: markup1
      raw: raw1
    ) {
      markup
      raw
    }
  }
mutation {
    createContent(
      markup: markup2
      raw: raw2
    ) {
      markup
      raw
    }
  }
mutation {
    createContent(
      markup: markup3
      raw: raw3
    ) {
      markup
      raw
    }
  }
```
--------------------------------

QueryBatcher
```js
Not available yet
```

--------------------------------

#### Environment Variables

When using `QueryBatcher()` or `batcher` you must include two environment variables:
* `GQL_SIMPLE_ENDPOINT`: 
* `GQL_AUTH_TOKEN`
