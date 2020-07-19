import './index';

import { fail, succeed } from '@fgv/ts-utils';

describe('verify matchers accessibility', () => {
    test('toFail exists and works', () => {
        expect(fail('oops')).toFail();
        expect(succeed('hi')).not.toFail();
    });

    test('toFailWith exists and works', () => {
        expect(fail('oops')).toFailWith('oops');
    });

    test('toSucceed exists and works', () => {
        expect(succeed('howdy')).toSucceed();
    });

    test('toSucceedWith exists and works', () => {
        expect(succeed('howdy')).toSucceedWith('howdy');
    });

    test('toSucceedAndSatisfy exists and works', () => {
        expect(succeed('howdy')).toSucceedAndSatisfy((v: string) => {
            expect(v).toBe('howdy');
            return true;
        });
    });
});
