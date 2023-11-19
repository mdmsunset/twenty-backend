import { GraphQLInputObjectType, GraphQLList, GraphQLNonNull } from 'graphql';

import { DateScalarType } from 'src/workspace/workspace-schema-builder/graphql-types/scalars';

export const DateFilterType = new GraphQLInputObjectType({
  name: 'DateFilter',
  fields: {
    eq: { type: DateScalarType },
    is: { type: DateScalarType },
    gt: { type: DateScalarType },
    gte: { type: DateScalarType },
    in: { type: new GraphQLList(new GraphQLNonNull(DateScalarType)) },
    lt: { type: DateScalarType },
    lte: { type: DateScalarType },
    neq: { type: DateScalarType },
  },
});
