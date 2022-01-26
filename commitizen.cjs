'use strict';

module.exports = {
    types: [
        { value: ':beetle:', name: 'bugfix' },
        {
            value: ':package:',
            name: 'package.json changes',
        },
        { value: ':books:', name: 'documentation' },
        { value: ':zap:', name: 'feature' },
        {
            value: ':lipstick:',
            name: 'refactor or codestyle changes',
        },
        { value: 'other', name: 'other changes' },
        { value: ':rotating_light:', name: 'somthing about tests' },
    ],

    scopes: [],

    messages: {
        type: 'What changes?',
        scope: '\nChoose:',
        subject: 'Description:\n',
        body: 'More info:\n',
        footer: 'PS:\n',
        confirmCommit: 'Is it OK?',
    },

    // Разрешим собственную ОБЛАСТЬ
    allowCustomScopes: false,

    // Запрет на Breaking Changes
    allowBreakingChanges: false,

    // Префикс для нижнего колонтитула
    footerPrefix: 'INFO:',

    // limit subject length
    subjectLimit: 72,
};
