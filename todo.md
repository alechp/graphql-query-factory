### Todo
> The TODO Sections represents smaller tasks that fit within the context of the Roadmap.

----------------------------------------------
## Macro

| Tag Name | Description |
|:---------|:------------|
| lib | core library |
| test | either 'graphql-query-factory-test', other test project or internal ava tests |
| docs | any media that explains usage |

#### Version <= 1.0
* [ ] `lib`: make batchQueryExecute loop over original after target array is completed (currently truncates after initial execution)
* [ ] `test`: fix constructor error thrown after importing batcher
* [ ] `lib`: add async version of builder for remote data streams
* [ ] `lib`: add stream version of builder for massive, local data streams
* [ ] `lib`: update method names to be query-agnostic (e.g. 'template' instead of 'query')

#### Version <= 2.0
* [ ] `lib`: Implement webpack (uglification, tree shaking, babel, etc.)
* [ ] `lib`:Implement factory shim that wraps builder and batcher
* [ ] `lib`: export factory in index
* [ ] `lib`: update version to 2.0

#### Version >= 2.0
* [ ] `lib`: Flow errors fixed
* [ ] `lib`: create flow-typed of docs
* [ ] `docs`: create API docs
* [ ] `lib`: Add 'isOnline' check before executing queries to ensure that error messages aren't misleading


--------------------
## Micro

#### Builder
* [x] Ensure that output is formatted as an array
* [ ] Append sync to current builder
* [ ] Implement async method (like previously done)

#### Batcher
* [ ] Add type switcher for the query type

#### Environment Variables
* [x] Replace GCOOL variables with generic names
* [x] Update references in Travis build system (via travis website)

#### Flow
* [ ] Populate .flowconfig
* [ ] Finish weeding out type errors
* [ ] Add strong typing throughout remainder of project
#### Examples & Tests
* [ ] Add factory-queries.js sample
* [ ] Fix batcher-queries.js
  * [ ] Add documentation that demonstrates this usage
  * [ ] Add Ava test
    * [x] `build-queries`/queries build
    * [x] `batch-queries`/slice query array
    * [x] `batch-queries`/execute single query
    * [ ] `batch-queries`/execute queries in proper order
    * [ ] `batch-queries`/execute two types of queries
    * [x] `batch-queries`/execute four queries concurrently
    * [ ] `factory-queries`/build and batch queries
* [ ] Add React (CRA) example
* [ ] Add simple node (CLI) example

#### Docs
* [ ] Update docs to represent changes
* [ ] Publish link to new test project
* [ ] Rename the "query" helper methods to be agnostic (e.g. "Request", "Template" or something along those lines... confusing when talking about GraphQL's query and mutation paradigm)

#### Schema
* [x] Update Graphcool instance to random staging
  * [x] Update .env with correct EP & Auth
  * [x] Update Travis
  * [x] Update Schema
* [ ] Create new graph.cool account
  * [ ] Create new Graph.cool project with open credentials that anyone can access
  * [ ] Update .env to public creds
  * [ ] Add .env to repo
  * [ ] Update docs to explain usage

#### Finishing Touches
* [ ] Create walkthrough video on usage
* [ ] Generate static site that explains
  * [ ] Add API docs (e.g. how to use 'queryExecute()' and other edge cases)
* [ ] Post to #general in Graph.cool slack channel
* [x] Add repository field to Package
* [ ] Add contribution section below
