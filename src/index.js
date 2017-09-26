const builder = require("./builder.js");
const batcher = require("./batcher.js");
const factory = require("./factory.js");

let graphqlQueryFactory = {
  builder,
  batcher
  factory
}
module.exports = graphqlQueryFactory;
