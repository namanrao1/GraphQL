import { makeExecutableSchema } from "@graphql-tools/schema";

// Corrected typeDefs
const typeDefs = `
  type Link {
    id: String
    url: String
    description: String
  }

  type Query {
    info: String
    feed: [Link]
  }
`;

const links = [
  {
    id: 'link-0',
    url: 'https://graphql-yoga.com',
    description: 'The easiest way of setting up a GraphQL server'
  }
];

const resolvers = {
  Query: {
    info: () => 'This is the API of a Hackernews Clone',
    feed: () => links
  },
  Link: {
    id: (parent: any) => parent.id,
    description: (parent: any) => parent.description,
    url: (parent: any) => parent.url
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export { schema };
