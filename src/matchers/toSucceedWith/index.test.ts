import { fail, succeed } from '@fgv/ts-utils';
import matcher from './';

expect.extend(matcher);

describe('.toSucceedWith', () => {
    test('succeeds with a success result that matches expected', () => {
        expect(succeed('hello')).toSucceedWith('hello');
        expect(succeed('hello')).toSucceedWith(expect.stringMatching(/h.*/i));
    });

    test('fails with a failure result', () => {
        expect(fail('oops')).not.toSucceedWith('oops');
    });

    test('fails with a success result but a non-matching value', () => {
        expect(succeed('hello')).not.toSucceedWith('goodbye');
    });

    test('passes with a matching asymmetric match', () => {
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
    });

    test('fails with a non-matching asymmetric match', () => {
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
