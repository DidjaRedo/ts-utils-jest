/// <reference types="jest"/>

import { Result } from '@fgv/ts-utils';

declare namespace jest {
    interface Matchers<R> {
        /**
         * Use .toSucceed to verify that a Result<T> is a success
         */
        toSucceed<T>(): R;

        /**
         * Use .toSucceedWith to verify that a Result<T> is a success
         * and that the result value matches the supplied value
         * @param {T} expected
         */
        toSucceedWith<T>(expected: T): R;

        /**
         * Use .toSucceedAndSatisfy to verify that a Result<T> is a success
         * and that the result value matches the supplied predicate
         * @param {(value: T) => boolean} predicate
         */
        toSucceedAndSatisfy<T>(predicate: (value: T) => boolean): R;

        /**
         * Use .toFail to verify that a Result<T> is a failure
         */
        toFail<T>(): R;

        /**
         * Use .toFailWith to verify that a Result<T> is a failure
         * that matches a supplied string, RegExp or undefined value
         * @param {string|RegExp|undefined} message
         */
        toFailWith<T>(expected: string|RegExp|undefined): R;
    }
}
