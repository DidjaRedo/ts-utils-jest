import matcher from './';

expect.extend(matcher);

describe('.toFailTest', () => {
    test('passes for a callback that fails', () => {
        expect(() => {
            expect(true).toBe(false);
        }).toFailTest();
    });

    test('fails for a callback that succeeds', () => {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        expect(() => {}).not.toFailTest();
    });
});
