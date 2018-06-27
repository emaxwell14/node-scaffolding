const { expect } = require('chai');
const { getMongoPaginationOptions, offsetToCursor } = require('./paginate');

const COUNT = 50;
const FIRST = 10;
const LAST = 5;
const AFTER = 30;
const BEFORE = 20;
const DEFAULT_RESULT = { skip: 0, limit: COUNT };

describe('paginate', () => {
    /**
     * No/invalid params
     */
    it('should return all when no paginate props', () => {
        expect(getMongoPaginationOptions(COUNT, {}))
            .to.deep.equal(DEFAULT_RESULT);
    });

    it('should throw error when first and last present', () => {
        expect(() => getMongoPaginationOptions(COUNT, { first: 1, last: 2 }))
            .to.throw('"first" and "last" cannot be present at same time');
    });

    it('should throw error when before and after present', () => {
        expect(() => getMongoPaginationOptions(COUNT, { before: 1, after: 2 }))
            .to.throw('"before" and "after" cannot be present at same time');
    });

    it('should throw error when first is less than 0', () => {
        expect(() => getMongoPaginationOptions(COUNT, { first: -1 }))
            .to.throw('"first" must be greater than 0');
    });

    it('should throw error when last is less than 0', () => {
        expect(() => getMongoPaginationOptions(COUNT, { last: -1 }))
            .to.throw('"last" must be greater than 0');
    });

    it('should throw error when after less that 0', () => {
        const afterCursor = offsetToCursor(-1);
        expect(() => getMongoPaginationOptions(COUNT, { after: afterCursor }))
            .to.throw('"after" cursor is invalid');
    });

    it('should throw error when before less that 0', () => {
        const beforeCursor = offsetToCursor(-1);
        expect(() => getMongoPaginationOptions(COUNT, { before: beforeCursor }))
            .to.throw('"before" cursor is invalid');
    });

    it('should return all when first is greater than count', () => {
        expect(getMongoPaginationOptions(COUNT, { first: COUNT + 1 }))
            .to.deep.equal(DEFAULT_RESULT);
    });

    it('should return all when last is greater than count', () => {
        expect(getMongoPaginationOptions(COUNT, { last: COUNT + 1 }))
            .to.deep.equal(DEFAULT_RESULT);
    });

    it('should throw error when after greater than count', () => {
        const afterCursor = offsetToCursor(COUNT + 1);
        expect(() => getMongoPaginationOptions(COUNT, { after: afterCursor }))
            .to.throw('"after" cursor is invalid');
    });

    it('should throw error when before greater than count', () => {
        const beforeCursor = offsetToCursor(COUNT + 1);
        expect(() => getMongoPaginationOptions(COUNT, { before: beforeCursor }))
            .to.throw('"before" cursor is invalid');
    });


    /**
     * Single Param
     */

    it('should return correct values when using only first', () => {
        expect(getMongoPaginationOptions(COUNT, { first: FIRST }))
            .to.deep.equal({ skip: 0, limit: FIRST });
    });

    it('should return correct values when using only last', () => {
        expect(getMongoPaginationOptions(COUNT, { last: LAST }))
            .to.deep.equal({ skip: COUNT - LAST, limit: COUNT });
    });

    it('should return correct values when using only after', () => {
        const afterCursor = offsetToCursor(AFTER);
        expect(getMongoPaginationOptions(COUNT, { after: afterCursor }))
            .to.deep.equal({ skip: AFTER, limit: COUNT });
    });

    it('should return correct values when using only before', () => {
        const beforeCursor = offsetToCursor(BEFORE);
        expect(getMongoPaginationOptions(COUNT, { before: beforeCursor }))
            .to.deep.equal({ skip: 0, limit: BEFORE });
    });

    /**
     * Multiple Params
     */

    it('should return correct values when using first and after', () => {
        const afterCursor = offsetToCursor(AFTER);
        expect(getMongoPaginationOptions(COUNT, { first: FIRST, after: afterCursor }))
            .to.deep.equal({ skip: AFTER, limit: AFTER + FIRST });
    });

    it('should return correct values when using first and before (where first offset less than cursor)', () => {
        const beforeCursor = offsetToCursor(BEFORE);
        expect(getMongoPaginationOptions(COUNT, { first: FIRST, before: beforeCursor }))
            .to.deep.equal({ skip: 0, limit: FIRST });
    });

    it('should return correct values when using first and before (where first offset greater than cursor)', () => {
        const SMALL_BEFORE = 5;
        const beforeCursor = offsetToCursor(SMALL_BEFORE);
        expect(getMongoPaginationOptions(COUNT, { first: FIRST, before: beforeCursor }))
            .to.deep.equal({ skip: 0, limit: SMALL_BEFORE });
    });

    it('should return correct values when using last and before', () => {
        const beforeCursor = offsetToCursor(BEFORE);
        expect(getMongoPaginationOptions(COUNT, { last: LAST, before: beforeCursor }))
            .to.deep.equal({ skip: BEFORE - LAST, limit: BEFORE });
    });

    it('should return correct values when using last and after (where last offset greater than cursor)', () => {
        const afterCursor = offsetToCursor(AFTER);
        expect(getMongoPaginationOptions(COUNT, { last: LAST, after: afterCursor }))
            .to.deep.equal({ skip: COUNT - LAST, limit: COUNT });
    });

    it('should return correct values when using last and after (where last offset is less than cursor)', () => {
        const LARGE_AFTER = 46;
        const afterCursor = offsetToCursor(LARGE_AFTER);
        expect(getMongoPaginationOptions(COUNT, { last: LAST, after: afterCursor }))
            .to.deep.equal({ skip: LARGE_AFTER, limit: COUNT });
    });
});
