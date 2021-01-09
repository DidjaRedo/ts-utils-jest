import { DetailedResult, Result, ResultDetailType, ResultValueType } from '@fgv/ts-utils';
import { matcherName, predicate } from './predicate';
import { printExpectedDetailedResult, printReceivedDetailedResult } from '../../utils/matcherHelpers';

import { matcherHint } from 'jest-matcher-utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace jest {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars, @typescript-eslint/ban-types
        interface Matchers<R, T extends Result<unknown>|{}> {
            /**
             * Use .toSucceedWithDetail to verify that a DetailedResult<T, TD> is
             * a success and that the result value and detail matches the supplied
             * values
             */
            toSucceedWithDetail(expected: ResultValueType<T>|RegExp, detail: ResultDetailType<T>|undefined): R;
        }
    }
}

function passMessage<T extends DetailedResult<unknown, unknown>>(received: T, expected: ResultValueType<T>|RegExp, expectedDetail: ResultDetailType<T>|undefined): () => string {
    return () => [
        matcherHint(`.not.${matcherName}`),
        printExpectedDetailedResult('success', false, expected, expectedDetail),
        printReceivedDetailedResult(received),
    ].join('\n');
}

function failMessage<T extends DetailedResult<unknown, unknown>>(received: T, expected: ResultValueType<T>|RegExp, expectedDetail: ResultDetailType<T>|undefined): () => string {
    return () => [
        matcherHint(`${matcherName}`),
        printExpectedDetailedResult('success', true, expected, expectedDetail),
        printReceivedDetailedResult(received),
    ].join('\n');
}

export default {
    toSucceedWithDetail: function<T extends DetailedResult<unknown, unknown>> (
        received: T,
        expected: ResultValueType<T>|RegExp,
        detail: ResultDetailType<T>|undefined
    ): jest.CustomMatcherResult {
        const pass = predicate(received, expected, detail);
        if (pass) {
            return { pass: true, message: passMessage(received, expected, detail) };
        }

        return { pass: false, message: failMessage(received, expected, detail) };
    },
};
