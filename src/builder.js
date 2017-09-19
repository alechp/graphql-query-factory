//@flow

const chalk = require("chalk"); //https://www.npmjs.com/package/chalk
const gql = require("graphql-tag");
const log = console.log;

function builder(query: string, variables: Array<mixed>): mixed {
  let qb = new QueryBuilder(query, variables);
  let queries = qb.buildQueries();
  return queries;
}

class QueryBuilder {
  query: string;
  vars: Array<mixed>;
  constructor(queryTemplate: string, queryVariables: Array<mixed>) {
    this.query = queryTemplate;
    this.vars = queryVariables;
  }
  getQuery(): string {
    return this.query;
  }
  setQuery(query) {
    this.query = query;
  }
  getVariables(): Array<mixed> {
    return this.vars;
  }
  setVariables(vars) {
    this.vars = vars;
  }
  extractQueryParams(query: string): ?Array<string> {
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
  }
  injectQueryArguments(
    queryTemplate: string,
    queryParams: Array<string>,
    queryVariables: mixed
  ): Array<string> {
    let query: string = queryTemplate,
      queryOriginal: string = queryTemplate;
    let queries: Array<string> = [];
    // let queryOriginal = queryTemplate;
    try {
      for (let varObj of queryVariables) {
        //grab first object...
        for (let [key, value] of Object.entries(varObj)) {
          // split object into key value pairs and iterate over for each key
          let regexp = new RegExp(`\\$${key}`, "g");
          let matchIncrementor: number = 0;
          let newQuery: string = query.replace(
            regexp,
            (match, pos, original) => {
              matchIncrementor++;
              return matchIncrementor == 2 ? value : match;
              //replace the second instance of the query.
              // 1st instance = query parameter in query signature
              // 2nd instance (replace) = query argument
            }
          );
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
  }
  async buildQueries() {
    let q: string = this.getQuery();
    let qVars: mixed = this.getVariables();
    try {
      let qParams: ?Array<string> = await this.extractQueryParams(q);
      let qWithArguments: Array<string> = await this.injectQueryArguments(
        q,
        qParams,
        qVars
      );
      return qWithArguments;
    } catch (error) {
      log(`buildQuery error: ${error}`);
    }
  }
}

module.exports = {
  QueryBuilder,
  builder
};
