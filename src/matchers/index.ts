import ToFail from './toFail';
import ToFailWith from './toFailWith';
import ToSucceed from './toSucceed';
import ToSucceedAndSatisfy from './toSucceedAndSatisfy';
import ToSucceedWith from './toSucceedWith';

export default {
    ...ToFail,
    ...ToFailWith,
    ...ToSucceed,
    ...ToSucceedAndSatisfy,
    ...ToSucceedWith,
};

