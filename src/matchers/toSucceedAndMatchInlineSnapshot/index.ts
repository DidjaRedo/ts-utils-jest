/* eslint-disable @typescript-eslint/no-unused-vars,no-unused-vars */
import { Context, toMatchInlineSnapshot } from 'jest-snapshot';
import { Result } from '@fgv/ts-utils';
import { matcherHint } from 'jest-matcher-utils';
import { printReceivedResult } from '../../utils/matcherHelpers';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace jest {
        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars, @typescript-eslint/ban-types
        interface Matchers<R, T> {
            /**
             * Use .toSucceedAndMatchInlineSnapshot to verify that a Result<T> is a success
             * and that the result value matches an inline snapshot
             */
            // eslint-disable-next-line @typescript-eslint/ban-types
            toSucceedAndMatchInlineSnapshot<T>(snapshot: string|undefined): R;
        }
    }
}

const matcherName = 'toSucceedAndMatchInlineSnapshot';

export default {
    // eslint-disable-next-line @typescript-eslint/ban-types
    toSucceedAndMatchInlineSnapshot: function<T> (this: jest.MatcherContext, received: Result<T>, snapshot: string|undefined): jest.CustomMatcherResult {
        const context = this as unknown as Context;
        if (received.isFailure()) {
            return {
                pass: false, message: (): string => {
                    return [
                        matcherHint(`${matcherName}`, 'callback'),
                        'Expected:\n  Callback to succeed with a result that matches the snapshot',
                        printReceivedResult(received),
                    ].join('\n');
                },
            };
        }
        return toMatchInlineSnapshot.call(
            context,
            received.value,
            {},
            snapshot,
        ) as jest.CustomMatcherResult;
    },
};
