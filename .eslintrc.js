module.exports = {
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  extends: ['@xclips/eslint-config'],
}; 