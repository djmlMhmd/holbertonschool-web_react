// eslint-disable-next-line import/no-anonymous-default-export
export default {
    testEnvironment: 'node',
    transform: {},
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
    transformIgnorePatterns: [],
    globals: {
      'ts-jest': {
        tsConfig: 'tsconfig.json',
        diagnostics: false,
      },
    },
  };