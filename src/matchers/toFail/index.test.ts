import { fail, succeed } from '@fgv/ts-utils';
import matcher from './';

expect.extend(matcher);

describe('.toFail', () => {
    test('passes with a failure result', () => {
        expect(fail('oops')).toFail();
    });

    test('fails with a success result', () => {
        expect(succeed('hello')).not.toFail();
    });
});
