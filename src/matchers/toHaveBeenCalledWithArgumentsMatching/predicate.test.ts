import { predicate } from './predicate';

describe('toHaveBeenCalledWithArgumentsMatching', () => {
    const fn = jest.fn();
    fn('arg1', 'arg2');
    fn('call2');
    fn('call3');
    fn();

    test('returns matching args if some call matches', () => {
        expect(predicate(fn, ['arg1', 'arg2'])).toEqual(['arg1', 'arg2']);
        expect(predicate(fn, ['call3'])).toEqual(['call3']);
    });

    test('matches matching args for a call with no parameters', () => {
        expect(predicate(fn, [])).toEqual([]);
    });

    test('returns matching args if expected is an asymmetric matcher', () => {
        expect(predicate(fn, expect.arrayContaining(['arg1']))).toEqual(['arg1', 'arg2']);
    });

    test('returns undefined if no call matches', () => {
        expect(predicate(fn, ['arg1'])).toBeUndefined();
        expect(predicate(fn, ['call2', 'arg1'])).toBeUndefined();
    });

    test('returns undefined if the mock has not been called', () => {
        expect(predicate(jest.fn(), [])).toBeUndefined();
    });
});
