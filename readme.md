# GraphQL Query Batcher
![CI Build Status Bar](https://travis-ci.org/alechp/graphql-query-factory.svg?branch=flow)

Note: "Query" is used broadly to mean both `query` and `mutation`

### Overview

* build GraphQL queries
* batch execute those queries

Need quick batching? `factory` function is the answer
Need to split the query build and query batching process? Checkout `builder` and `batcher`

----------------

> Sample project: [graphql-query-factory-test](https://github.com/alechp/graphql-query-factory-test)

## Status
* `factory` included as of 1.0.20 (shim around builder and batcher)
* `batcher` included as of 1.0.20 (executes array of queries)
* `builder` updated (this builds query strings from query/mutation and variables)

### Action Items
You can see TODOs and release plans in [todo.md](./docs/todo.md)

## Getting Started
### Installation
```bash
npm install graphql-query-factory -S
```

### Configuration (Environment Variables)
When using `factory` or `batcher` you must include two environment variables:
* `GQL_SIMPLE_ENDPOINT`
* `GQL_AUTH_TOKEN`

### Examples
> All of these examples can be seen at [graphql-query-factory-test](https://github.com/alechp/graphql-query-factory-test)

> All mock variables (e.g. "mock.template", "mock.variables") can be viewed here: [.../tests/_mock.js](https://github.com/alechp/graphql-query-factory/blob/master/src/tests/_mock.js)

--------------------------------

#### builder
```js
const { builder } = require('graphql-query-factory');

let queries = builder(mock.template, mock.variables);
log(`builder(mock.template, mock.variables): ${queries}`);
```

> NOTE: async version has been replaced here with sync version.
> Will be adding async version of builder in future along with a stream. See [todo.md](./docs/todo.md) for details.

--------------------------------

#### factory
```js
const { factory } = require('graphql-query-factory');

factory(mock.template, mock.variables)
  .then(data =>
    log(
      `factory(mock.template, mock.variables): ${JSON.stringify(data, null, 4)}`
    )
  )
  .catch(err => log(`factory(mock.template, mock.variables): ${err}`));
```

--------------------------------

#### batcher
```js
const { batcher } = require('graphql-query-factory');

batcher
  .batch(mock.batchQuery)
  .then(data =>
    log(`batcher.batch(mock.batchQuery): ${JSON.stringify(data, null, 4)}`)
  )
  .catch(err => log(`batcher.batch(mock.batchQuery): ${err}`));
```
--------------------------------

### Output
> The following output is generated by the example project, [graphql-query-factory-test](https://github.com/alechp/graphql-query-factory-test)

#### Data being saved to Graph.cool
![graphcool](./docs/graphcool_data_saved.png)

#### builder
```json
mutation {
  createContent(
    markup: "markupA"
    raw: "rawA"
  ) {
    markup
    raw
  }
},mutation {
  createContent(
    markup: "markupB"
    raw: "rawB"
  ) {
    markup
    raw
  }
},mutation {
  createContent(
    markup: "markupC"
    raw: "rawC"
  ) {
    markup
    raw
  }
},mutation {
  createContent(
    markup: "markupD"
    raw: "rawD"
  ) {
    markup
    raw
  }
},mutation {
  createContent(
    markup: "markupE"
    raw: "rawE"
  ) {
    markup
    raw
  }
},mutation {
  createContent(
    markup: "markupF"
    raw: "rawF"
  ) {
    markup
    raw
  }
},mutation {
  createContent(
    markup: "markupG"
    raw: "rawG"
  ) {
    markup
    raw
  }
}
```

#### batcher
```json
[
    {
        "createContent": {
            "markup": "markupA",
            "raw": "rawA"
        }
    },
    {
        "createContent": {
            "markup": "markupB",
            "raw": "rawB"
        }
    },
    {
        "createContent": {
            "markup": "markupC",
            "raw": "rawC"
        }
    },
    {
        "createContent": {
            "markup": "markupD",
            "raw": "rawD"
        }
    },
    {
        "createContent": {
            "markup": "markupE",
            "raw": "rawE"
        }
    },
    {
        "createContent": {
            "markup": "markupF",
            "raw": "rawF"
        }
    },
    {
        "createContent": {
            "markup": "markupG",
            "raw": "rawG"
        }
    }
]
```

#### factory

```json
[
    {
        "createContent": {
            "markup": "markupA",
            "raw": "rawA"
        }
    },
    {
        "createContent": {
            "markup": "markupB",
            "raw": "rawB"
        }
    },
    {
        "createContent": {
            "markup": "markupC",
            "raw": "rawC"
        }
    },
    {
        "createContent": {
            "markup": "markupD",
            "raw": "rawD"
        }
    },
    {
        "createContent": {
            "markup": "markupE",
            "raw": "rawE"
        }
    },
    {
        "createContent": {
            "markup": "markupF",
            "raw": "rawF"
        }
    },
    {
        "createContent": {
            "markup": "markupG",
            "raw": "rawG"
        }
    }
]
```
