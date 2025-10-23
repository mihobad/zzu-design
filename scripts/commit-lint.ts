import { readFileSync } from 'node:fs';
import { logger } from 'rslog';

const commitRE = /^(revert: )?(fix|feat|docs|perf|test|types|style|build|chore|ci|release|refactor|breaking change)(\(.+\))?: .{1,50}/;
const mergeRE = /Merge /;

function commitLint(gitParams: string) {
    const commitMsg = readFileSync(gitParams, 'utf-8').trim();

    if (!commitRE.test(commitMsg) && !mergeRE.test(commitMsg)) {
        logger.error(`invalid commit message: "${commitMsg}".

Proper commit message format is required for automated changelog generation.

Examples: 

- fix(button): incorrect style
- feat(button): incorrect style
- docs(button): fix typo

Allowed Types:

- fix
- feat
- docs
- perf
- test
- types
- build
- chore
- ci
- release
- refactor
- breaking change
- Merge branch 'button' into 'main'
`);
        process.exit(1);
    }
}

commitLint(process.argv[2]);
