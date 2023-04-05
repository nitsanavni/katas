import { test } from "./approvals";

import { approval } from "./approvals-wip";

const sampleFunction = (ret: string) => () => ret;

test("testing sampleFunction - passing", () => {
    // given
    const testMe = sampleFunction("sampleFunction - actual result");

    // when
    approval().verify(testMe());

    // then - return a string that shows that the approval test passed
});

// TODO - testing sampleFunction - failing
