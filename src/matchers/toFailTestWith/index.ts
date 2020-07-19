import { matcherName, predicate } from './predicate';

import { Result } from '@fgv/ts-utils';
import { matcherHint } from 'jest-matcher-utils';
import { printExpectedResult } from '../../utils/matcherHelpers';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace jest {
        interface Matchers<R> {
            /**
             * Use .toFailTestWith to test a custom matcher by
             * verifying that a test case fails as expected and
             * reports an error matching a supplied value.
             * @param {string|string[]|RegExp} expected
             */
            toFailTestWith<T>(expected: string|string[]|RegExp): R;
        }
    }
}

function passMessage<T>(cbResult: Result<string>, expected: RegExp|string|string[]): () => string {
    const got: string[] = [];
    if (cbResult.isSuccess()) {
        got.push(`  Received: Callback failed with:\n>>>>\n${cbResult.value}\n<<<<`);
    }
    else if (cbResult.message === '') {
        got.push('  Received: Callback succeeded');
    }
    else {
        got.push(`  Received: Callback failed with:\n>>>>\n${cbResult.message}\n<<<<`);
    }

    return () => [
        matcherHint(`.not.${matcherName}`, 'callback', 'expectedMessage'),
        printExpectedResult('failure', false, expected),
        ...got,
    ].join('\n');
}

function failMessage<T>(cbResult: Result<string>, expected: RegExp|string|string[]): () => string {
    const got: string[] = [];
    if (cbResult.isSuccess()) {
        got.push(`  Received: Callback failed with:\n>>>>\n${cbResult.value}\n<<<<`);
    }
    else if (cbResult.message === '') {
        got.push('  Received: Callback succeeded');
    }
    else {
        got.push(`  Received: Callback failed with:\n>>>>\n${cbResult.message}\n<<<<`);
    }

    return () => [
        matcherHint(`${matcherName}`, 'callback', 'expectedMessage'),
        printExpectedResult('failure', true, expected),
        ...got,
    ].join('\n');
}

export default {
    toFailTestWith: function<T> (cb: () => void, expected: RegExp|string|string[]): jest.CustomMatcherResult {
        const cbResult = predicate(cb, expected);
        const pass = cbResult.isSuccess();
        if (pass) {
            return { pass: true, message: passMessage(cbResult, expected) };
        }

        return { pass: false, message: failMessage(cbResult, expected) };
    },
};
