import { fail, succeed } from '@fgv/ts-utils';
import matcher from './';

expect.extend(matcher);

describe('.toSucceedAndSatisfy', () => {
    test('passes with a success value and a callback that passes', () => {
        expect(succeed('hello')).toSucceedAndSatisfy((value: string) => value === 'hello');
    });

    test('fails with a success value but a callback that fails', () => {
        expect(succeed('hello')).not.toSucceedAndSatisfy((value: string) => value !== 'hello');
    });

    test('fails with a success value but a callback that fails an expectation', () => {
        expect(succeed('hello')).not.toSucceedAndSatisfy((value: string) => {
            expect(value).toBe('goodbye');
            return true;
        });
    });

    test('fails with a success value but a callback that throws an exception', () => {
        expect(succeed('hello')).not.toSucceedAndSatisfy((_value: string) => {
            throw new Error('UH OH AN ERRROR');
        });
    });

    test('fails with a failure value', () => {
        expect(fail('oops')).not.toSucceedAndSatisfy((value: string) => value === 'oops');
    });
});
