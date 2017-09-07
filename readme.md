# GraphQL Query Batcher

## Getting Started
#### Installation
```bash
npm install graphql-query-batcher -S 
```

#### Sample Use
```js
const batcher = require('graphql-query-batcher');
async function execute(){
  try { 
    let queries = await batcher.build(query, arrayOfQueryVariableObjects);
    let results = await batcher.execute({ concurrent: 4}); // this refers to the number of concurrent queries. Nilan from Graph.cool recommended 4 
    return results;
  } catch(error) { 
    console.error(`Failed to execute() because: ${error});
  }
}
```
