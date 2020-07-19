import ToFail from './toFail';
import ToFailTest from './toFailTest';
import ToFailWith from './toFailWith';
import ToSucceed from './toSucceed';
import ToSucceedAndSatisfy from './toSucceedAndSatisfy';
import ToSucceedWith from './toSucceedWith';

export default {
    ...ToFail,
    ...ToFailTest,
    ...ToFailWith,
    ...ToSucceed,
    ...ToSucceedAndSatisfy,
    ...ToSucceedWith,
};

