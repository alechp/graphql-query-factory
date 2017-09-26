# GraphQL Query Batcher
![CI Build Status Bar](https://travis-ci.org/alechp/graphql-query-factory.svg?branch=flow)

## Status
> * QueryBuilder available in addition to builder. Removed async for now. Will be adding async for remote and custom stream for massive file uploads later. See [todo.md](./todo.md) for breakdown.
> * QueryBatcher is close.
> * Broke sample into its own repo: [graphql-query-factory-test](https://github.com/alechp/graphql-query-factory-test)
> * Fixed some breaking changes in last version that prevented module from being used. This was a result of main pointing to /index instead of src/index. Should be fixed now.

### Big Rocks
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

### Action Items (Micro)
You can see TODOs in [todo.md](./todo.md)

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

##### QueryBuilder - [Sample Project](https://github.com/alechp/graphql-query-factory-test)
```js
const { builder } = require('graphql-query-factory');
const log = console.log;

const mutationTemplate = `mutation {
    createContent(
      markup: $markup
      raw: $raw
    ) {
      markup
      raw
    }
  }`;

  const mutationVariables = [
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

let queries = builder(mutationTemplate, mutationVariables);

```

> NOTE: async version has been replaced here with sync version to better fit example use case here.
> Will be adding async version of builder in future along with a stream. See [todo.md](./todo.md) for breakdown.

QueryBuilder Output:
```graphql
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
* `GQL_SIMPLE_ENDPOINT`
* `GQL_AUTH_TOKEN`
