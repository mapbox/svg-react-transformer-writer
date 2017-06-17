'use strict';

const execa = require('execa');
const tempy = require('tempy');
const fs = require('fs');
const pify = require('pify');
const path = require('path');
const svgReactTransformer = require('@mapbox/svg-react-transformer');

test('basic use case', () => {
  const tmpDir = tempy.directory();
  return execa('./cli.js', ['fixtures/**', '--out-dir', tmpDir])
    .then(result => {
      return pify(fs.readdir)(tmpDir);
    })
    .then(outputFiles => {
      expect(outputFiles).toEqual(['airplane.js', 'apple.js', 'big.js']);
    });
});

test('file content matches svgReactTransformer.svgToComponentModule with name provided', () => {
  const tmpDir = tempy.directory();
  const fixtureContent = fs.readFileSync(
    path.join(__dirname, 'fixtures/apple.svg'),
    'utf8'
  );
  return execa('./cli.js', ['fixtures/apple.svg', '--out-dir', tmpDir])
    .then(result => {
      return Promise.all([
        pify(fs.readFile)(path.join(tmpDir, 'apple.js'), 'utf8'),
        svgReactTransformer.svgToComponentModule(fixtureContent, {
          name: 'apple'
        })
      ]);
    })
    .then(data => {
      expect(data[0]).toBe(data[1]);
    });
});

test('--config works', () => {
  const tmpDir = tempy.directory();
  const configPath = path.join(__dirname, './fixtures/config.js');
  const fixtureContent = fs.readFileSync(
    path.join(__dirname, 'fixtures/apple.svg'),
    'utf8'
  );
  return execa('./cli.js', [
    'fixtures/apple.svg',
    '--out-dir',
    tmpDir,
    '--config',
    configPath
  ])
    .then(result => {
      return Promise.all([
        pify(fs.readFile)(path.join(tmpDir, 'apple.js'), 'utf8'),
        svgReactTransformer.svgToComponentModule(fixtureContent, {
          name: 'apple',
          svgoPlugins: [
            { removeDimensions: true }
          ]
        })
      ]);
    })
    .then(data => {
      expect(data[0]).toBe(data[1]);
    });
});
