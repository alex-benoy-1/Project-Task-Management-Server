export default {
    testEnvironment: "node",

    roots: ["<rootDir>/tests"],

    testMatch: [
        "**/*.test.js"
    ],

    setupFiles: [
        "<rootDir>/jest.setup.js"
    ],

    clearMocks: true,

    collectCoverageFrom: [
        "src/**/*.js",
        "!src/server.js",
        "!src/configs/**"
    ],

    coverageDirectory: "coverage"
};