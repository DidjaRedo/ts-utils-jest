import { equals } from 'expect/build/jasmineUtils';

export const matcherName = 'toHaveBeenCalledWithArgumentsMatching';

export function predicate(received: jest.Mock, expected: unknown): unknown[] | undefined {
    for (const args of received.mock.calls) {
        if (equals(args, expected)) {
            return args;
        }
    }
    return undefined;
}
