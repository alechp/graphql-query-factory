const builtMutations = [
  `mutation {
  createContent(
    markup: "markupA"
    raw: "rawA"
  ) {
    markup
    raw
  }
}`,
  `mutation {
  createContent(
    markup: "markupB"
    raw: "rawB"
  ) {
    markup
    raw
  }
}`,
  `mutation {
  createContent(
    markup: "markupC"
    raw: "rawC"
  ) {
    markup
    raw
  }
}`,
  `mutation {
  createContent(
    markup: "markupD"
    raw: "rawD"
  ) {
    markup
    raw
  }
}`,
  `mutation {
  createContent(
    markup: "markupE"
    raw: "rawE"
  ) {
    markup
    raw
  }
}`,
  `mutation {
  createContent(
    markup: "markupF"
    raw: "rawF"
  ) {
    markup
    raw
  }
}`,
  `mutation {
  createContent(
    markup: "markupG"
    raw: "rawG"
  ) {
    markup
    raw
  }
}`
];

const mutationVariables = [
  {
    markup: "markupA",
    raw: "rawA"
  },
  {
    markup: "markupB",
    raw: "rawB"
  },
  {
    markup: "markupC",
    raw: "rawC"
  },
  {
    markup: "markupD",
    raw: "rawD"
  },
  {
    markup: "markupE",
    raw: "rawE"
  },
  {
    markup: "markupF",
    raw: "rawF"
  },
  {
    markup: "markupG",
    raw: "rawG"
  }
];
let singleQueryReturnComparison = `{"createContent":{"markup":"markup1","raw":"raw1"}}`;
let batchQueryReturnComparison = [
  { createContent: { markup: "markupA", raw: "rawA" } },
  { createContent: { markup: "markupB", raw: "rawB" } },
  { createContent: { markup: "markupC", raw: "rawC" } },
  { createContent: { markup: "markupD", raw: "rawD" } },
  { createContent: { markup: "markupE", raw: "rawE" } },
  { createContent: { markup: "markupF", raw: "rawF" } },
  { createContent: { markup: "markupG", raw: "rawG" } }
];

const mutationTemplate = `mutation {
  createContent(
    markup: $markup
    raw: $raw
  ) {
    markup
    raw
  }
}`;

const builtMutation = `mutation {
  createContent(
    markup: "markup1"
    raw: "raw1"
  ) {
    markup
    raw
  }
}`;

let mock = {
  template: mutationTemplate,
  variables: mutationVariables,
  batchQuery: builtMutations,
  singleQuery: builtMutation,
  batchReturn: batchQueryReturnComparison,
  singleReturn: singleQueryReturnComparison
};

module.exports = mock;
