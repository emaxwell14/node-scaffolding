const { GraphQLEnumType } = require('graphql/type');

module.exports = new GraphQLEnumType({
    name: 'StatusEnum',
    description: 'The status of a task.',
    values: {
        pending: { value: 'pending' },
        ongoing: { value: 'ongoing' },
        completed: { value: 'completed' },
    },
});
