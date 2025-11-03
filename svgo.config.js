module.exports = {
  multipass: true,
  plugins: [
    { name: 'preset-default', params: { overrides: { removeViewBox: false } } },
    { name: 'convertStyleToAttrs' },
    { name: 'removeDimensions', active: false }
  ]
};
