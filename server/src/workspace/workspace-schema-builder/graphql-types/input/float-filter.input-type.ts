import {
  GraphQLInputObjectType,
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql';

export const FloatFilterType = new GraphQLInputObjectType({
  name: 'FloatFilter',
  fields: {
    eq: { type: GraphQLFloat },
    gt: { type: GraphQLFloat },
    gte: { type: GraphQLFloat },
    in: { type: new GraphQLList(new GraphQLNonNull(GraphQLFloat)) },
    lt: { type: GraphQLFloat },
    lte: { type: GraphQLFloat },
    neq: { type: GraphQLFloat },
  },
});
