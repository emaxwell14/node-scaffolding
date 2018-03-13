const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLEnumType,
} = require('graphql/type');
const Task = require('../model/Todo');

/**
 * generate projection object for mongoose.
 * Optimise query by only fetching required fields.
 * @param  {Object} fieldASTs
 * @return {Project}
 */
function getProjection (fieldASTs) {
    return fieldASTs.fieldNodes[0].selectionSet.selections.reduce((projections, selection) => {
        projections[selection.name.value] = true;
        return projections;
    }, {});
}


const statusEnumType = new GraphQLEnumType({
    name: 'StatusEnum',
    description: 'The status of the todo.',
    values: {
        pending: { value: "pending" },
        ongoing: { value: 'ongoing' },
        completed: { value: 'completed' },
    },
});

const todoType = new GraphQLObjectType({
    name: 'todo',
    description: 'todo item',
    fields: () => ({
        _id: {
            type: GraphQLString,
            description: 'The mongo id of the todo.',
        },
        name: {
            type: GraphQLString,
            description: 'The name of the todo.',
        },
        description: {
            type: GraphQLString,
            description: 'The description of the todo.',
        },
        createdDate: {
            type: GraphQLString,
            description: 'The created date of the todo'
        },
        status: {
            type: statusEnumType,
        },
    }),
});

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            todo: {
                type: new GraphQLList(todoType),
                    args: {
                    _id: {
                        name: '_id',
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve: (root, {itemId}, source, fieldASTs) => {
                    const projections = getProjection(fieldASTs);
                    const foundItems = new Promise((resolve, reject) => {
                        Task.find({itemId}, projections,(err, todos) => {
                            err ? reject(err) : resolve(todos);
                        })
                    });
                    return foundItems;
                }
            }
        }
    })

});

module.exports = {
    schema,
};
