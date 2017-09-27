### Todo
> The TODO Sections represents smaller tasks that fit within the context of the Roadmap.

### Big Rocks
| Status | Summary | Comment |
|:-------|:---------|:--------|
| ✓ | graphql-query-factory/factory | Combines Builder & Batcher |
| ✓ | graphql-query-factory/builder | Builds individual query strings based on the number of variable combinations you have. |
| ✓ | graphql-query-factory/batcher | Executes the entire array of GraphQL Query Strings. |
| ✓ | Ava | |
| ☐ | Flow | Dependencies added but not finished |
| ✓ | Babel | |
| ✓ | TravisCI | [https://travis-ci.org/alechp/graphql-query-factory](https://travis-ci.org/alechp/graphql-query-factory)|
| ☐ | Webpack | Babel has been useful for testing. Going to convert to webpack to enable uglification, tree-shaking, etc. |

----------------------------------------------

### Upcoming Releases

| Tag Name | Description |
|:---------|:------------|
| lib | core library |
| test | either 'graphql-query-factory-test' or internal ava tests |
| docs | any media that explains usage |

#### Version == 1.0.x
* [x] `lib`: make batchQueryExecute loop over original after target array is completed (currently truncates after initial execution)
* [x] `lib`: Fix issue with string literals in built query stirngs
* [x] `test-project`: fix constructor error thrown after importing batcher
* [x] `lib`: Implement factory shim that wraps builder and batcher
* [x] `test-ava`: factory test in factory-queries.js
* [x] `test-ava`: builder and batcher combined ava test in factory-queries.js
* [x] `lib`: export factory in index

#### Version == 1.1.x
* [x] `docs`: Add output source in README towards bottom of file (so doesn't obscure example)
* [x] `docs`: Add summary at top of README (recommended by @aurnik from Graph.cool community)
* [x] `docs`: Add link to test project at top of README
* [x] `lib`: Fix single-execute query bug
* [ ] `docs`: Create new graph.cool project
  * [ ] Update local graph.cool reference
  * [ ] Add .env file to repo with updated endpoint/token
* [x] `docs`: Add CLI screenshot and graphcool screenshot to [graphql-query-factory-test](https://github.com/alechp/graphql-query-factory-test)
* [ ] `lib`: Implement webpack (uglification, tree shaking, babel, etc.)
* [ ] `lib`: Refactor builder to not use classes
* [ ] `lib`: add stream version of builder for massive, local data streams
* [ ] `lib`: add async version of builder for remote data streams
* [ ] `lib`: Remove graphql-request dependency in favor of using fetch
* [ ] `lib`: update version to 2.0

#### Version == 1.2.x
* [ ] `lib`: Flow errors fixed
* [ ] `lib`: create flow-typed libdef for graphql-query-factory
* [ ] `docs`: create API docs
* [ ] `lib`: Add 'isOnline' check before executing queries to ensure that error messages aren't misleading
* [ ] `docs`: quick video overview


-----

Questions:
1. Is it worth integrating lerna into the project?
2. Need to test this on other GraphQL environments to ensure this works properly. Since this is going to be utilized for a CLI project and a CRA project, might be worth also doing vanilla experiments on express-graphql backend... ?
