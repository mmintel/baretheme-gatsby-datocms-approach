module.exports = {
  hooks: {
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
    'pre-commit': 'NODE_ENV=production lint-staged && npm run test',
    update: 'lernaupdate',
  },
};
