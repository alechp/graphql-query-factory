### Todo
> The TODO Sections represents smaller tasks that fit within the context of the Roadmap.

### Big Rocks
| Status | Summary | Comment |
|:-------|:---------|:--------|
| ✓ | factory | Combines Builder & Batcher |
| ✓ | builder | Builds individual query strings based on the number of variable combinations you have. |
| ✓ | batcher | Executes the entire array of GraphQL Query Strings. |
| ✓ | Ava | |
| ☐ | Flow | Dependencies added but not finished |
| ✓ | Babel | |
| ✓ | TravisCI | [https://travis-ci.org/alechp/graphql-query-factory](https://travis-ci.org/alechp/graphql-query-factory)|
| ☐ | Webpack | Babel has been useful for testing. Going to convert to webpack to enable uglification, tree-shaking, etc. |

----------------------------------------------

| Tag Name | Description |
|:---------|:------------|
| lib | core library |
| test | either 'graphql-query-factory-test' or internal ava tests |
| docs | any media that explains usage |

#### Version <= 1.0
* [x] `lib`: make batchQueryExecute loop over original after target array is completed (currently truncates after initial execution)
* [x] `lib`: Fix issue with string literals in built query stirngs
* [x] `test-project`: fix constructor error thrown after importing batcher
* [x] `lib`: Implement factory shim that wraps builder and batcher
* [x] `test-ava`: factory test in factory-queries.js
* [x] `test-ava`: builder and batcher combined ava test in factory-queries.js
* [x] `lib`: export factory in index
* [ ] `lib`: add stream version of builder for massive, local data streams
* [ ] `lib`: add async version of builder for remote data streams

#### Version == 2.0
* [ ] `lib`: Implement webpack (uglification, tree shaking, babel, etc.)
* [ ] `lib`: update version to 2.0

#### Version >= 2.0
* [ ] `lib`: Flow errors fixed
* [ ] `lib`: create flow-typed of docs
* [ ] `docs`: create API docs
* [ ] `lib`: Add 'isOnline' check before executing queries to ensure that error messages aren't misleading