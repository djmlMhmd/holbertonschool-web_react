const isEsm = process.execArgv.includes('--experimental-vm-modules');

module.exports = {
  testEnvironment: 'jsdom',
  testTimeout: 10000,
  maxWorkers: 1,
  forceExit: true,
  detectOpenHandles: false,
  moduleNameMapper: {
    '^axios$': 'jest-mock-axios',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/fileTransformer.cjs',
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
  },
  extensionsToTreatAsEsm: isEsm ? ['.jsx'] : [],
  setupFilesAfterEnv: ['<rootDir>/setupTests.cjs'],
};
