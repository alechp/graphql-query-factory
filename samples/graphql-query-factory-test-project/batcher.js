const builderQueries = require('./builder.js');
const { batcher } = require('graphql-query-factory');

let val = batcher(builderQueries, 4);
module.exports = val;