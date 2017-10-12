'use strict';

const exec = require('child_process').exec;
const del = require('del');

const outputDir = 'test/output';
const runWriter = (args, callback) => {
  exec(`node bin/svg-react-transformer.js ${args.join(' ')}`, callback);
};

describe('bin', () => {
  afterEach(() => {
    return del(outputDir, { force: true });
  });

  test('logs verbose output', done => {
    runWriter(
      ['test/fixtures/*.svg', '--out-dir', outputDir, '--verbose'],
      (error, stdout) => {
        expect(stdout).toMatchSnapshot();
        done();
      }
    );
  });
});
