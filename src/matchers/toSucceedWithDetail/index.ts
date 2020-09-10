import { matcherName, predicate } from './predicate';
import { printExpectedDetailedResult, printReceivedDetailedResult } from '../../utils/matcherHelpers';

import { DetailedResult } from '../../ts-utils';
import { matcherHint } from 'jest-matcher-utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace jest {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
        interface Matchers<R> {
            /**
             * Use .toSucceedWith to verify that a Result<T> is a success
             * and that the result value matches the supplied value
             * @param {unknown} expected
             */
            toSucceedWithDetail<TD>(expected: unknown, detail: TD|undefined): R;
        }
    }
}

function passMessage<T, TD>(received: DetailedResult<T, TD>, expected: T, expectedDetail: TD|undefined): () => string {
    return () => [
        matcherHint(`.not.${matcherName}`),
        printExpectedDetailedResult('success', false, expected, expectedDetail),
        printReceivedDetailedResult(received),
    ].join('\n');
}

function failMessage<T, TD>(received: DetailedResult<T, TD>, expected: T, expectedDetail: TD|undefined): () => string {
    return () => [
        matcherHint(`${matcherName}`),
        printExpectedDetailedResult('success', true, expected, expectedDetail),
        printReceivedDetailedResult(received),
    ].join('\n');
}

export default {
    toSucceedWithDetail: function<T, TD> (received: DetailedResult<T, TD>, expected: unknown, detail: TD|undefined): jest.CustomMatcherResult {
        const pass = predicate(received, expected, detail);
        if (pass) {
            return { pass: true, message: passMessage(received, expected, detail) };
        }

        return { pass: false, message: failMessage(received, expected, detail) };
    },
};
