import { Result, captureResult, fail, succeed } from '@fgv/ts-utils';
import { equals } from 'expect/build/jasmineUtils';

export const matcherName = 'toFailTestWith';

export function predicate<T>(cb: () => void, expected: string|string[]|RegExp): Result<string> {
    const cbResult = captureResult(() => cb());
    if (cbResult.isFailure()) {
        let success = false;
        if (expected instanceof RegExp) {
            success = (cbResult.message.match(expected) !== null);
        }
        else if (typeof expected === 'string') {
            success = (cbResult.message === expected);
        }
        else if (Array.isArray(expected)) {
            success = equals(cbResult.message.split('\n'), expected);
        }
        return (success ? succeed(cbResult.message) : fail(cbResult.message));
    }
    return fail('');
}
