import { fail, succeed } from '@fgv/ts-utils';
import matcher from './';

expect.extend(matcher);

describe('.toSucceed', () => {
    test('passes with a success result', () => {
        expect(succeed('hello')).toSucceed();
    });

    test('fails with a failure result', () => {
        expect(fail('oops')).not.toSucceed();
    });
});
