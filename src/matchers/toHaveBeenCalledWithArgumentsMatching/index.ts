import { getTypeOfProperty, getValueOfPropertyOrDefault, Result, ResultValueType, succeed } from '@fgv/ts-utils';
import { matcherName, predicate } from './predicate';
import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace jest {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars, @typescript-eslint/ban-types
        interface Matchers<R> {
            /**
             * Use .toSucceedWith to verify that a Result<T> is a success
             * and that the result value matches the supplied value
             * @param {unknown} expected
             */
            toHaveBeenCalledWithArgumentsMatching(expected: unknown): R;
        }
    }
}

function passMessage(received: jest.Mock, expected: unknown, matched: unknown[]): () => string {
    return () => [
        matcherHint(`.not.${matcherName}`),
        'Expected no call with arguments matching:',
        `    ${printExpected(expected)}`,
        `Received (${received.mock.calls.length} total):`,
        `    ${printReceived(matched)}`,
    ].join('\n');
}

function failMessage(received: jest.Mock, expected: unknown): () => string {
    return () => [
        matcherHint(`${matcherName}`),
        'Expected call with arguments matching:',
        `    ${printExpected(expected)}`,
        `Received (${received.mock.calls.length} total):`,
        ...received.mock.calls.slice(-3).reverse().map((c) => `    ${printReceived(c)}`),
    ].join('\n');
}

function isMock(received: unknown): received is jest.Mock {
    if (received !== null && !Array.isArray(received)) {
        return getValueOfPropertyOrDefault('_isMockFunction', received as object) === true
            && getTypeOfProperty('mock', received as object) === 'object';
    }
    return false;
}

export default {
    toHaveBeenCalledWithArgumentsMatching: function (received: jest.Mock, expected: unknown): jest.CustomMatcherResult {
        if (!isMock(received)) {
            throw new Error('Test error: toHaveBeenCalledWithArgumentsMatching called with other than jest.Mock');
        }

        const matched = predicate(received, expected);
        if (matched !== undefined) {
            return { pass: true, message: passMessage(received, expected, matched) };
        }

        return { pass: false, message: failMessage(received, expected) };
    },
};
