import { fail, succeed } from '../../ts-utils';
import { predicate } from './predicate';

describe('toSucceedWith', () => {
    test('returns true with success results and matching values', () => {
        expect(predicate(succeed('hello'), 'hello')).toBe(true);
    });

    test('returns false with failed results', () => {
        expect(predicate(fail('oops'), 'oops')).toBe(false);
    });

    test('returns false with a successful result but non-matching success value', () => {
        expect(predicate(succeed('hello'), 'goodbye')).toBe(false);
    });

    test('returns true for success with a matching asymmetric match', () => {
        expect(predicate(
            succeed({
                title: 'A title string',
                subtitles: ['subtitle 1', 'subtitle 2'],
            }),
            expect.objectContaining({
                title: expect.stringMatching(/.*title.*/i),
                subtitles: expect.arrayContaining([
                    'subtitle 1',
                    expect.stringContaining('2'),
                ]),
            })
        )).toBe(true);
    });

    test('returns false for success with a non-matching asymmetric match', () => {
        expect(predicate(
            succeed({
                title: 'A title string',
                subtitles: ['subtitle 1', 'subtitle 2'],
            }),
            expect.objectContaining({
                title: expect.stringMatching(/.*title*/),
                subtitles: expect.arrayContaining([
                    'subtitle 1',
                    expect.stringContaining('3'),
                ]),
            })
        )).toBe(false);
    });
});
