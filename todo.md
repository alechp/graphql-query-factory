### Todo
> The TODO Sections represents smaller tasks that fit within the context of the Roadmap.

##### Builder
* [x] Ensure that output is formatted as an array
##### Batcher
* [ ] Add type switcher for the query type
##### Flow Types
* [x] Add Flow types to QueryBuilder
* [x] Add Flow types to QueryBatcher
* [ ] Fix remaining Flow type errors

##### Environment Variables
* [x] Replace GCOOL variables with generic names
* [x] Update references in Travis build system (via travis website)
* [ ] Add information on readme about configuring env variables

##### Examples & Tests
* [ ] Add factory-queries.js sample
* [ ] Fix batcher-queries.js
  * [ ] Add documentation that demonstrates this usage
  * [ ] Add Ava test
    * [x] `build-queries`/queries build
    * [x] `batch-queries`/slice query array
    * [x] `batch-queries`/execute single query
    * [ ] `batch-queries`/execute consecutive queries
    * [ ] `batch-queries`/execute two types of queries
    * [ ] `batch-queries`/execute four queries concurrently
* [ ] Add React (CRA) example
* [ ] Add simple node (CLI) example
* [ ] Move all examples to one directory
* [ ] Implement lerna
  * [ ] Update `graphql-query-factory-test` to utilize remote
  * [ ] Split `...-test` local implementation test (for local) into separate file


##### Schema
* [x] Update Graphcool instance to random staging
  * [x] Update .env with correct EP & Auth
  * [x] Update Travis
  * [x] Update Schema

##### Finishing Touches
* [ ] Create walkthrough video on usage
* [ ] Generate static site that explains
* [ ] Post to #general in Graph.cool slack channel
* [ ] Add repository field to Package
* [ ] Add [apollo-codegen](https://github.com/apollographql/apollo-codegen) from [apollo tutorial](http://dev.apollodata.com/react/using-with-types.html)
* [ ] Add contribution section below
* [ ] Remove Flow Errors below

-
