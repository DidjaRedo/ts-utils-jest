
import { Result } from '@fgv/ts-utils';

export const matcherName = 'toFail';

export function predicate<T>(received: Result<T>): boolean {
    return received.isFailure();
}
