import matcher from './';

expect.extend(matcher);

describe('.toFailTestWith', () => {
    test('fails for a callback that succeeds', () => {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        expect(() => {}).not.toFailTestWith('whatever');
    });

    test('passes for a callback that fails with an error matching a supplied RegExp', () => {
        expect(() => {
            expect('hello').toEqual('goodbye');
        }).toFailTestWith(/expect/i);
    });

    test('passes for a callback that fails with an error matching a supplied string', () => {
        expect(() => {
            throw new Error('This is an error');
        }).toFailTestWith('This is an error');
    });

    test('passes for a callback that fails with an error matching a supplied array of strings', () => {
        expect(() => {
            throw new Error('This is an error\n  that spills over to a second line');
        }).toFailTestWith([
            'This is an error',
            '  that spills over to a second line',
        ]);
    });

    test('passes for a callback that fails with an error matching a supplied array of matchers', () => {
        expect(() => {
            throw new Error('This is an error\n  that spills over to a second line');
        }).toFailTestWith([
            expect.stringMatching(/error/i),
            expect.stringMatching(/spills/i),
        ]);
    });

    test('fails for a callback that fails with an unexpected value', () => {
        expect(() => {
            expect('hello').toBe('goodbye');
        }).not.toFailTestWith(/random text/i);
    });
});
