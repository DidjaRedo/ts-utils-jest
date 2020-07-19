/*
 * Copyright (c) 2020 Erik Fortune
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import '../../src/jestHelpers';
import {
    fail,
    succeed,
} from '@fgv/ts-utils';

describe('Jest Helpers module', () => {
    describe('toSucceed matcher', () => {
        it('should pass with success results and not with failure results', () => {
            expect(succeed('hello')).toSucceed();
            expect(fail('oops')).not.toSucceed();
        });
    });

    describe('toFail matcher', () => {
        it('should pass with failure results and not pass with success results', () => {
            expect(succeed('hello')).not.toFail();
            expect(fail('oops')).toFail();
        });
    });

    describe('toSucceedWith matcher', () => {
        it('should pass with success results and matching values', () => {
            expect(succeed('hello')).toSucceedWith('hello');
        });

        it('should not pass with failures or non-matching success values', () => {
            expect(succeed('hello')).not.toSucceedWith('goodbye');
            expect(fail('oops')).not.toSucceedWith('oops');
        });

        it('should work with asymmetric matches', () => {
            expect(succeed({
                title: 'A title string',
                subtitles: ['subtitle 1', 'subtitle 2'],
            })).toSucceedWith(expect.objectContaining({
                title: expect.stringMatching(/.*title*/),
                subtitles: expect.arrayContaining([
                    'subtitle 1',
                    expect.stringContaining('2'),
                ]),
            }));

            expect(succeed({
                title: 'A title string',
                subtitles: ['subtitle 1', 'subtitle 2'],
            })).not.toSucceedWith(expect.objectContaining({
                title: expect.stringMatching(/.*title*/),
                subtitles: expect.arrayContaining([
                    'subtitle 1',
                    expect.stringContaining('3'),
                ]),
            }));
        });
    });

    describe('toFailWith matcher', () => {
        it('should pass with failure results that match the expected value as string or RegExp', () => {
            expect(fail('very long complicated message')).toFailWith(/complicated/i);
            expect(fail('very long complicated message')).toFailWith('complicated');
        });

        it('should not pass with success results or non-matching failure results', () => {
            expect(succeed('oops')).not.toFailWith('oops');
            expect(fail('message')).not.toFailWith('other message');
            expect(fail('message')).not.toFailWith(/massage/i);
        });
    });

    describe('toSucceedWithCallback', () => {
        it('should pass with success results if the callback does not assert', () => {
            const cb = jest.fn();
            expect(succeed({
                title: 'A title string',
                subtitles: ['subtitle 1', 'subtitle 2'],
            })).toSucceedWithCallback((value: { title: string, subtitles: string[] }) => {
                cb();
                expect(value.title).toEqual('A title string');
            });
            expect(cb).toHaveBeenCalled();
        });

        it('should not pass or invoke the callback for a failure result', () => {
            const cb = jest.fn();
            expect(fail('oops')).not.toSucceedWithCallback((value: { title: string, subtitles: string[] }) => {
                cb();
                expect(value.title).toEqual('A title string');
            });
            expect(cb).not.toHaveBeenCalled();
        });

        it('should not pass for a success result if the callback asserts', () => {
            const cb = jest.fn();
            expect(succeed({
                title: 'A title string',
                subtitles: ['subtitle 1', 'subtitle 2'],
            })).not.toSucceedWithCallback((value: { title: string, subtitles: string[] }) => {
                cb();
                expect(value.title).toEqual('some other string');
            });
            expect(cb).toHaveBeenCalled();
        });
    });

    it('should correctly report success or failure', () => {
        expect(2).toBeInRange(1, 3);
        expect(2).toBeInRange(1, 2);
        expect(2).toBeInRange(2, 5);
        expect(4).not.toBeInRange(1, 3);
        expect(4).not.toBeInRange(5, 10);

        const obj = { name: 'name', value: 'value' };
        expect('this').toBeOneOf(['this', 7, obj]);
        expect('that').not.toBeOneOf(['this', 7, obj]);
        expect(obj).toBeOneOf([obj]);
        expect({ ...obj }).toBeOneOf([obj]);
        expect({ ...obj, extra: 'extra' }).not.toBeOneOf([obj]);
        expect(obj).toBeOneOf(['this', 7, expect.objectContaining({ name: 'name' })]);
    });
});
