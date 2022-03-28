import { predicate } from './predicate';

describe('toHaveBeenCalledWithArgumentsMatching', () => {
    const fn = jest.fn();
    fn('arg1', 'arg2');
    fn('call2');
    fn('call3');
    fn();

    test('returns true if some call matches', () => {
        expect(predicate(fn, ['arg1', 'arg2'])).toBe(true);
        expect(predicate(fn, ['call3'])).toBe(true);
    });

    test('matches calls with no parameters', () => {
        expect(predicate(fn, [])).toBe(true);
    });

    test('returns true if expected is a matcher', () => {
        expect(predicate(fn, expect.arrayContaining(['arg1']))).toBe(true);
    });

    test('returns false if no call matches', () => {
        expect(predicate(fn, ['arg1'])).toBe(false);
        expect(predicate(fn, ['call2', 'arg1'])).toBe(false);
    });

    test('returns false if the mock has not been called', () => {
        expect(predicate(jest.fn(), [])).toBe(false);
    });
});
