const { Language } = require('klasa');

module.exports = class extends Language {
    constructor(...args) {
        super(...args, {
            name: 'en-CA',
            enabled: true
        });

        this.language = {
            DEFAULT: (key) => `${key} has not been localized for en-CA yet.`,
            DEFAULT_LANGUAGE: 'Default Language'
        };
    }
};