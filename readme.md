# GraphQL Query Batcher
## Status
[x] QueryBuilder
[ ] QueryBatcher
[x] Ava Tests
[ ] CI status bar

## Getting Started
#### Installation
```bash
npm install graphql-query-factory -S 
```

#### Sample Use
QueryBuilder
```js
const { builder } = require('graphql-query-factory');
let qs = await builder(queryString, arrayOfVariableObjects);
//Queries is a promise, but for the sake of testing going to explicity typecast as string
let queries = String(qs); 
log(`Queries: ${queries});
```
> Better example will be posted later. For now take a look at the tests.

QueryBatcher 
```js
Not available yet
```