"use strict";

const chalk = require("chalk"); //https://www.npmjs.com/package/chalk
const gql = require("graphql-tag");
const log = console.log;

function builder(query, variables) {
  let qb = new QueryBuilder(query, variables);
  let queries = qb.buildQueries();
  return queries;
}

class QueryBuilder {
  constructor(queryTemplate, queryVariables) {
    this.query = queryTemplate;
    this.vars = queryVariables;
  }
  getQuery() {
    return this.query;
  }
  setQuery(query) {
    this.query = query;
  }
  getQueryParams() {
    return this.params;
  }
  setQueryParams(params) {
    this.params = params;
  }
  getVariables() {
    return this.vars;
  }
  setVariables(vars) {
    this.vars = vars;
  }
  extractQueryParams(query) {
    /*
      In:
      -----------------------------------------------
      mutation {
        createContent(
          markup: $markup
          raw: $raw
        ) {
          markup
          raw
        }
      }
      Out:
      -----------------------------------------------
     [$markup, $raw]
    */
    let regex = /\$\w+/g;
    // let regex = /\$\w+(?=[\):])/g;
    let queryParams = query.match(regex);
    if (queryParams !== null) {
      this.setQueryParams(queryParams);
      log(`Query params set: ${queryParams} ... Set globally as well: ${() => getQueryParams()}`);
    } else {
      log(`${chalk.red("setQueryParams() failed in extractQueryParams() of " + this.constructor.name + " because queryParams were null")}`);
    }
  }
  injectQueryArguments(template, params, variables) {
    const queryOriginal = template;
    let query = template;
    let queries = [];
    for (let v of variables) {
      for (let [key, value] of Object.entries(v)) {
        let regex = new RegExp(`\\$${key}`, "g");
        let inc = 0;
        let queryNew = query.replace(regex, (match, pos, orig) => {
          inc++;
          return inc == 1 ? value : match;
        });
        query = queryNew;
      }
      queries.push(query);
      query = queryOriginal;
    }
    return queries;
  }
  //This version of injectQueryArguments expects there to be a call signature in the mutation
  // injectQueryArguments(
  //   queryTemplate: string,
  //   queryParams: Array<string>,
  //   queryVariables: mixed
  // ): Array<string> {
  //   let query: string = queryTemplate,
  //     queryOriginal: string = queryTemplate;
  //   let queries: Array<string> = [];
  //   // let queryOriginal = queryTemplate;
  //   try {
  //     for (let varObj of queryVariables) {
  //       //grab first object...
  //       for (let [key, value] of Object.entries(varObj)) {
  //         // split object into key value pairs and iterate over for each key
  //         let regexp = new RegExp(`\\$${key}`, "g");
  //         let matchIncrementor: number = 0;
  //         let newQuery: string = query.replace(
  //           regexp,
  //           (match, pos, original) => {
  //             matchIncrementor++;
  //             return matchIncrementor == 2 ? value : match;
  //             //replace the second instance of the query.
  //             // 1st instance = query parameter in query signature
  //             // 2nd instance (replace) = query argument
  //           }
  //         );
  //         query = newQuery;
  //         // we asssign this query so that the next replace will already have the previous argument passed in
  //       }
  //       queries.push(query); // begin building array of queries
  //       query = queryOriginal; //reset query to the original query passed into this function so that we can perform same parsing on next set of variables
  //     }
  //     return queries;
  //   } catch (error) {
  //     log(`Error: ${error}`);
  //   }
  // }
  async buildQueries() {
    let q = this.getQuery();
    let v = this.getVariables();
    try {
      let p = await this.extractQueryParams(q);
      let interpolatedQuery = await this.injectQueryArguments(q, p, v);
      return interpolatedQuery;
    } catch (error) {
      log(`buildQueries() of ${this.constructor.name} failed because ${chalk.red(error)}`);
    }
  }
}

module.exports = {
  QueryBuilder,
  builder
};