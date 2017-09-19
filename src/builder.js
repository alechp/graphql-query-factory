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
  getQueryParams(): Array<string> {
    return this.params;
  }
  setQueryParams(params) {
    this.params = params;
  }
  getVariables(): Array<mixed> {
    return this.vars;
  }
  setVariables(vars) {
    this.vars = vars;
  }
  extractQueryParams(query: string) {
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
      log(
        `Query params set: ${queryParams} ... Set globally as well: ${this
          .params}`
      );
    } else {
      log(
        `${chalk.red(
          "setQueryParams() failed in extractQueryParams() of " +
            this.constructor.name +
            " because queryParams were null"
        )}`
      );
    }
  }
  injectQueryArguments(
    template: string,
    params: Array<string>,
    variables: mixed
  ): Array<string> {
    const queryOriginal: string = template;
    let query: string = template;
    let queries: Array<string> = [];
    for (let v of variables) {
      for (let [key, value] of Object.entries(v)) {
        let regex = new RegExp(`\\$${key}`, "g");
        let inc: number = 0;
        let queryNew: string = query.replace(regex, (match, pos, orig) => {
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

  async buildQueries() {
    let q: string = this.getQuery();
    let v: mixed = this.getVariables();
    try {
      let p: ?Array<string> = await this.extractQueryParams(q);
      let interpolatedQuery: Array<string> = await this.injectQueryArguments(
        q,
        p,
        v
      );
      return interpolatedQuery;
    } catch (error) {
      log(
        `buildQueries() of ${this.constructor.name} failed because ${chalk.red(
          error
        )}`
      );
    }
  }
}

module.exports = {
  QueryBuilder,
  builder
};
