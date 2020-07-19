import { fail, succeed } from '@fgv/ts-utils';
import matcher from './';

expect.extend(matcher);

describe('.toFailWith', () => {
    test('passes with a failure result and matching string or RegExp', () => {
        expect(fail('oops')).toFailWith('oops');
        expect(fail('oops')).toFailWith(/o.*/i);
    });

    test('fails with a success result', () => {
        expect(succeed('hello')).not.toFailWith('hello');
    });

    test('fails with a failure result but non-matching string or RegExp', () => {
        expect(fail('oops')).not.toFailWith('error');
        expect(fail('oops')).not.toFailWith(/x.*/i);
    });
});
