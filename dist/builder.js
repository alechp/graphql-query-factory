function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const chalk = require('chalk'); //https://www.npmjs.com/package/chalk
const log = console.log;

function builder(query, variables) {
  let queryStringsPromise = new QueryBuilder(query, variables);
  return queryStringsPromise;
}
class QueryBuilder {
  constructor(queryTemplate, queryVariables) {
    this.query = queryTemplate;
    this.vars = queryVariables;
    let queries = this.buildQueries();
    return queries;
  }
  getQuery() {
    return this.query;
  }
  setQuery(query) {
    this.query = query;
  }
  getVariables() {
    return this.vars;
  }
  setVariables(vars) {
    this.vars = vars;
  }
  extractQueryParams(query) {
    return _asyncToGenerator(function* () {
      /* We already have getVariables to define the variables being passed in explicitly.
       The purpose of this function is to extract the parameters from the query call signature.
       The regex used here works for single line and multiline call signatures alike.
       e.g. query nameOfQuery($param: String!, $param2: String!) { }
       e.g. query nameOfQuery($param: String!,
                              $param2: String!) { }
       */
      let regex = /\$\w+(?=[\):])/g;
      try {
        let queryParams = query.match(regex);
        return queryParams;
      } catch (error) {
        log(`queryFactory::query Error: ${chalk.red(error)}`);
      }
    })();
  }
  injectQueryArguments(queryTemplate, queryParams, queryVariables) {
    return _asyncToGenerator(function* () {
      let query = queryTemplate,
          queryOriginal = queryTemplate;
      let queries = [];
      // let queryOriginal = queryTemplate;
      try {
        for (let varObj of queryVariables) {
          //grab first object...
          for (let [key, value] of Object.entries(varObj)) {
            // split object into key value pairs and iterate over for each key
            let regexp = new RegExp(`\\$${key}`, 'g');
            let matchIncrementor = 0;
            let newQuery = query.replace(regexp, function (match, pos, original) {
              matchIncrementor++;
              return matchIncrementor == 2 ? value : match;
              //replace the second instance of the query.
              // 1st instance = query parameter in query signature
              // 2nd instance (replace) = query argument
            });
            query = newQuery;
            // we asssign this query so that the next replace will already have the previous argument passed in
          }
          queries.push(query); // begin building array of queries
          query = queryOriginal; //reset query to the original query passed into this function so that we can perform same parsing on next set of variables
        }
        return queries;
      } catch (error) {
        log(`Error: ${error}`);
      }
    })();
  }
  buildQueries() {
    var _this = this;

    return _asyncToGenerator(function* () {
      let q = _this.getQuery();
      let qVars = _this.getVariables();
      try {
        let qParams = yield _this.extractQueryParams(q);
        let qWithArguments = yield _this.injectQueryArguments(q, qParams, qVars);
        return qWithArguments;
      } catch (error) {
        log(`buildQuery error: ${error}`);
      }
    })();
  }
}
module.exports = builder;