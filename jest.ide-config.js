
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testPathIgnorePatterns: ["boneyard/"],
    snapshotResolver: './dist/resolvers/ide.js',
    collectCoverageFrom: [
        'src/**/*.ts',
    ],
    coverageReporters: [
        "text",
        "lcov",
        "html"
    ]
};
