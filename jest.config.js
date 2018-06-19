module.exports = {
    globals: {
        FRAMEWORK_ID: 'mss-bff',
        __DEV__: 'true',
        MIX_PANEL_TOKEN: '1234453453',
        MICRO_SERVICE_URL: 'http://qa.com',
    },
    testEnvironment: 'node',
    coverageThreshold: {
        global: {
            statements: 90,
            branches: 90,
            functions: 90,
            lines: 90,
        }
    }
};

