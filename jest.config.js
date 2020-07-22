
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testPathIgnorePatterns: ["boneyard/"],
    snapshotResolver: './dist/resolvers/cli.js',
    collectCoverageFrom: [
        'src/**/*.ts',
    ],
    coverageReporters: [
        "text",
        "lcov",
        "html"
    ]
};
