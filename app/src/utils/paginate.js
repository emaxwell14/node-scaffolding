const PAGINATE_PREFIX = 'PAGINATE:';

function offsetToCursor(str) {
    return Buffer.from(`${PAGINATE_PREFIX}${str}`, 'ascii').toString('base64');
}

function cursorToOffset(cursor) {
    const string = Buffer.from(cursor, 'base64').toString('ascii');
    return parseInt(string.substring(PAGINATE_PREFIX.length), 10);
}

/**
 * From pagination args passed by user, getting the properties required for mongo
 *
 * @param count - total in collection
 * @param first - integer for number of results at start
 * @param last - integer for number of results at end
 * @param before - cursor of where to start counting back from. Cursor converted to index
 * @param after - cursor of where to start counting forward from. Cursor converted to index
 * @returns {{skip: number, limit: *}}
 */
const getMongoPaginationOptions = (count, { first, last, before, after }) => {
    if (first && last) {
        throw new Error('"first" and "last" cannot be present at same time');
    }
    if (before && after) {
        throw new Error('"before" and "after" cannot be present at same time');
    }

    if (first < 0) {
        throw new Error('"first" must be greater than 0');
    }
    if (last < 0) {
        throw new Error('"last" must be greater than 0');
    }

    let startOffset = 0;
    let endOffset = count;

    // Get before and after indices based on their cursor values
    if (after) {
        startOffset = cursorToOffset(after);
        if (startOffset < 0 || startOffset > count) {
            throw new Error('"after" cursor is invalid');
        }
    }

    if (before) {
        endOffset = cursorToOffset(before);
        if (endOffset < 0 || endOffset > count) {
            throw new Error('"before" cursor is invalid');
        }
    }

    // Update offsets based on first and last
    if (first) {
        endOffset = Math.min(endOffset, startOffset + first);
    }

    if (last) {
        startOffset = Math.max(startOffset, endOffset - last);
    }

    return {
        skip: startOffset,
        limit: endOffset,
    };
};

/**
 * Query a collection and get results based on pagination args passed in
 *
 * @param collection - Mongoose Model
 * @param query - Mongo query
 * @param projection - Mongo projection
 * @param paginationArgs - GraphQL pagination options
 * @returns results formatted according to Relay Connection Spec
 */
const getPaginatedCollection = (collection, query, projection, paginationArgs) =>
    collection.count(query).then(count =>
        collection.find(query, projection, getMongoPaginationOptions(count, paginationArgs)).then((data) => {
            const edges = data.map((node, index) => ({
                cursor: offsetToCursor(index),
                node,
            }));

            // TODO additional data not in result
            return {
                edges,
                totalCount: count,
                pageInfo: {
                    cursor: edges[edges.length - 1].cursor,
                    hasPreviousPage: Boolean(paginationArgs.first && count > paginationArgs.first),
                    hasNextPage: Boolean(paginationArgs.last && count > paginationArgs.last),
                },
            };
        }),
    );

module.exports = { getPaginatedCollection, getMongoPaginationOptions, offsetToCursor };
