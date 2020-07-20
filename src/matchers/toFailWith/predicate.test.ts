import { fail, succeed } from '@fgv/ts-utils';
import { predicate } from './predicate';

describe('toFailWith', () => {
    test('fails with a failure result and matching string, RegExp or undefined', () => {
        expect(predicate(fail('oops'), 'oops')).toBe(true);
        expect(predicate(fail('oops'), /o.*/i)).toBe(true);
        expect(predicate(fail(undefined as unknown as string), undefined)).toBe(true);
    });

    test('fails with a success result', () => {
        expect(predicate(succeed('hello'), 'hello')).toBe(false);
    });

    test('fails with a failure result but non-matching string or RegExp', () => {
        expect(predicate(fail('oops'), 'error')).toBe(false);
        expect(predicate(fail('oops'), /x.*/i)).toBe(false);
    });
});
