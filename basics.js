// http://graphql.org/graphql-js/

const { graphql, buildSchema } = require('graphql');

const schema = buildSchema(`
    type Query {
        hello: string
    }
`);

const query = `
    query {
        hello
    }
`;

const resolvers = {
  hello() {
    return 'Hello World';
  }
};

graphql(schema, query, resolvers)
  .then(response => {
    console.log(response);
  });
