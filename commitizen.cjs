'use strict';

module.exports = {
    types: [
        { value: ':beetle', name: 'Bug fix' },
        {
            value: ':package',
            name: 'Building, packages, config changes',
        },
        { value: ':books', name: 'Documentation changes' },
        { value: ':zap:', name: 'Adding feature' },
        {
            value: ':lipstick',
            name: 'Refactor or codestyle changes',
        },
        { value: 'other', name: 'Other changes' },
        { value: ':rotating_light', name: 'Tests related' },
    ],

    scopes: [],

    messages: {
        type: 'Type of changes',
        scope: 'Scope (optional) -- ',
        subject: 'Description -- ',
        confirmCommit: 'Is this commit message suitable?',
    },

    skipQuestions: ['body', 'footer'],
    allowCustomScopes: false,
    allowBreakingChanges: false,
    subjectLimit: 72,
};
