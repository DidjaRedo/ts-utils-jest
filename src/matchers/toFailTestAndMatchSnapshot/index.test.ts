import matcher from './';

expect.extend({
    ...matcher,
});

describe('.toFailTestAndMatchSnapshot', () => {
    test('passes for a test that fails with a result matching the snapshot', () => {
        expect(() => {
            expect(true).toBe(false);
        }).toFailTestAndMatchSnapshot();
    });
});
