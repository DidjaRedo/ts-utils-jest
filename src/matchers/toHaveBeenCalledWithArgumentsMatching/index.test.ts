import matcher from './';
import toFailTestAndMatchSnapshot from '../toFailTestAndMatchSnapshot';

expect.extend({
    ...matcher,
    ...toFailTestAndMatchSnapshot,
});

describe('.toHaveBeenCalledWithArgumentsMatching', () => {
    test('succeeds when arguments match', () => {
        const fn = jest.fn();
        fn('arg1', 'arg2');
        expect(fn).toHaveBeenCalledWithArgumentsMatching(['arg1', 'arg2']);
    });

    test('succeeds using an expect. matcher', () => {
        const fn = jest.fn();
        fn('arg1', 'arg2');
        expect(fn).toHaveBeenCalledWithArgumentsMatching(expect.arrayContaining(['arg2']));
    });

    test('fails if no matching call is found', () => {
        const fn = jest.fn();
        fn();
        expect(fn).not.toHaveBeenCalledWithArgumentsMatching(['arg1']);
    });

    test('fails if no function has not been called', () => {
        expect(jest.fn()).not.toHaveBeenCalledWithArgumentsMatching([]);
    });

    test('reports a helpful message if a call is not matched', () => {
        const fn = jest.fn();
        fn('call1');
        fn('call2');
        fn('call3');
        fn('call4');
        fn('call5');
        fn('call6');
        expect(() => {
            expect(fn).toHaveBeenCalledWithArgumentsMatching(['call7']);
        }).toThrowErrorMatchingSnapshot();
    });

    test('reports a helpful message if function was not called', () => {
        const fn = jest.fn();
        expect(() => {
            expect(fn).toHaveBeenCalledWithArgumentsMatching(['call7']);
        }).toThrowErrorMatchingSnapshot();
    });

    test('reports a helpful message if a .not test fails', () => {
        const fn = jest.fn();
        fn('arg1');
        expect(fn).not.toHaveBeenCalledWithArgumentsMatching([expect.any(String)]);
    });

    test('throws if argument is not a mock function', () => {
        expect(() => {
            expect({}).toHaveBeenCalledWithArgumentsMatching('whatever');
        }).toThrowErrorMatchingSnapshot();
    });
});
