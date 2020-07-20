import { fail, succeed } from '../../ts-utils';
import { predicate } from './predicate';
import toFailWith from '../toFailWith';
import toSucceedWith from '../toSucceedWith';

expect.extend({
    ...toSucceedWith,
    ...toFailWith,
});

describe('toSucceedAndSatisfy', () => {
    test('succeeds with true for a succesful result value and a callback that passes', () => {
        expect(predicate(succeed('hello'), (value: string) => value === 'hello', true)).toSucceedWith(true);
    });

    test('succeeds with false for a successful result value but a callback that fails', () => {
        expect(predicate(succeed('hello'), (value: string) => value !== 'hello', true)).toSucceedWith(false);
    });

    test('succeeds with undefined for a failure result', () => {
        expect(predicate(fail<string>('oops'), (value: string) => value === 'oops', true)).toSucceedWith(undefined);
    });

    test('fails and propagates the error message if the callback throws', () => {
        expect(predicate(succeed('hello'), (_v: string) => {
            throw new Error('ERROR THROWN');
        }, true)).toFailWith(/ERROR THROWN/);
    });

    test('fails and propagates the error message if the callback contains a failing expect clause', () => {
        expect(predicate(succeed('hello'), (value: string) => {
            expect(value).toBe('goodbye');
            return true;
        }, true)).toFailWith(/expect/i);
    });
});

