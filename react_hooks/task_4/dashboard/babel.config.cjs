const isEsm = process.execArgv.includes('--experimental-vm-modules');

module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' }, modules: isEsm ? false : 'commonjs' }],
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
};
