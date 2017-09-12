const builderQueries = require('./builder.js');
const { batcher } = require('../batcher.js');
const config = require('../config.js');

let val = batcher(builderQueries, 4, config);
module.exports = val;