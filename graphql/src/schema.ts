
import type { Link } from '@prisma/client'
import type { GraphQLContext } from './context'

// Define the Link type
import { makeExecutableSchema } from "@graphql-tools/schema";

// Define the Link type for GraphQL schema
interface GraphQLLink {
  id: string;
  description: string;
  url: string;
}

// Define the GraphQL schema
const typeDefs = /* GraphQL */ `
  type Query {
    info: String!
    feed: [GraphQLLink!]!
  }
 
  type Mutation {
    postLink(url: String!, description: String!): GraphQLLink!
  }
 
  type GraphQLLink {
    id: ID!
    description: String!
    url: String!
  }
`;

// Initialize an array of links
const links: GraphQLLink[] = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }
];

// Define resolvers
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: (parent: unknown, args: {}, context: GraphQLContext) => context.prisma.link.findMany()
  },
  GraphQLLink: {
    id: (parent: Link) => parent.id,
    description: (parent: Link) => parent.description,
    url: (parent: Link) => parent.url
  },
  Mutation: {
    async postLink(
      parent: unknown,
      args: { description: string; url: string },
      context: GraphQLContext
    ) {
      const newLink = await context.prisma.link.create({
        data: {
          url: args.url,
          description: args.description
        }
      })
      return newLink
    }
  }
}

// Create the schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export { schema };
