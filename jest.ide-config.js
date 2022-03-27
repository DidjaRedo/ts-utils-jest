
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testPathIgnorePatterns: ["boneyard/"],
    snapshotResolver: './src/resolvers/ide.ts',
    collectCoverageFrom: [
        'src/**/*.ts',
    ],
    coverageReporters: [
        "text",
        "lcov",
        "html"
    ]
};
