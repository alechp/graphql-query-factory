# GraphQL Query Batcher
![CI Build Status Bar](https://travis-ci.org/alechp/graphql-query-factory.svg?branch=flow)

## Status
> You can use QueryBuilder today. QueryBuilder takes an array of variable objects and injects them into your GraphQL query.


### Roadmap
* [ ] QueryFactory - Combines Builder & Batcher
* [x] QueryBuilder - Builds individual query strings based on the number of variable combinations you have.
* [ ] QueryBatcher - Executes the entire array of GraphQL Query Strings.
* [x] Ava Tests
* [x] Flow Integration
* [x] CI status bar

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
QueryBuilder Output:
```js
mutation addMarkup($markup:String!, $raw: String!) {
    createContent(
      markup: markup1
      raw: raw1
    ) {
      markup
      raw
    }
  }
mutation addMarkup($markup:String!, $raw: String!) {
    createContent(
      markup: markup2
      raw: raw2
    ) {
      markup
      raw
    }
  }
mutation addMarkup($markup:String!, $raw: String!) {
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

### Todo
> The TODO Sections represents smaller tasks that fit within the context of the Roadmap.

##### Builder
* [ ] Ensure that output is formatted as an array

##### Flow Types
* [ ] Add Flow types to QueryBuilder
* [ ] Add Flow types to QueryBatcher

##### Environment Variables
* [x] Replace GCOOL variables with generic names
* [ ] Update references in Travis build system (via travis website)
* [ ] Add information on readme about configuring env variables

##### Examples
* [ ] Add factory-queries.js sample
  * [ ] Add documentation that demonstrates this usage
  * [ ] Add Ava test
* [ ] Fix batcher-queries.js
  * [ ] Add documentation that demonstrates this usage
  * [ ] Add Ava test

##### Finishing Touches
* [ ] Create walkthrough video on usage
* [ ] Generate static site that explains
* [ ] Post to #general in Graph.cool slack channel
* [ ] Add repository field to Package
* [ ] Update dist to /lib (makes more sense)
* [ ] Add [apollo-codegen](https://github.com/apollographql/apollo-codegen) [apollo tutorial](http://dev.apollodata.com/react/using-with-types.html)



-----------------------

#### Current Flow Errors to Cleanup:
```
src/batcher.js:15
 15:   constructor(queries, concurrent) {
                   ^^^^^^^ parameter `queries`. Missing annotation

src/batcher.js:15
 15:   constructor(queries, concurrent) {
                            ^^^^^^^^^^ parameter `concurrent`. Missing annotation

src/builder.js:47
 47:   injectQueryArguments(queryTemplate: string, queryParams: Array<string>, queryVariables: mixed): Array<string>{
                                                                                                       ^^^^^^^^^^^^^ array type. This type is incompatible with an implicitly-returned undefined.

src/builder.js:52
 52:      for(let varObj of queryVariables){
          ^ property `@@iterator` of $Iterable. Property not found in
 52:      for(let varObj of queryVariables){
                            ^^^^^^^^^^^^^^ mixed

src/builder.js:60
 60:            return (matchIncrementor == 2) ? value : match;
                                                 ^^^^^ mixed. This type is incompatible with
291:     replace(searchValue: string | RegExp, replaceValue: string | (substring: string, ...args: Array<any>) => string): string;
                                                                                                                  ^^^^^^ string. See lib: /private/tmp/flow/flowlib_8d4b9e8/core.js:291

src/builder.js:81
 81:       let qWithArguments: Array<string> = await this.injectQueryArguments(q, qParams, qVars);
                                                                                  ^^^^^^^ null. This type is incompatible with the expected param type of
 47:   injectQueryArguments(queryTemplate: string, queryParams: Array<string>, queryVariables: mixed): Array<string>{
                                                                ^^^^^^^^^^^^^ array type

src/builder.js:81
 81:       let qWithArguments: Array<string> = await this.injectQueryArguments(q, qParams, qVars);
                                                                                  ^^^^^^^ undefined. This type is incompatible with the expected param type of
 47:   injectQueryArguments(queryTemplate: string, queryParams: Array<string>, queryVariables: mixed): Array<string>{
                                                                ^^^^^^^^^^^^^ array type
```
