# svg-react-transformer-cli

[![Build Status](https://travis-ci.org/mapbox/svg-react-transformer-cli.svg?branch=master)](https://travis-ci.org/mapbox/svg-react-transformer-cli)

Transform SVGs into React component module files.

Provides a Node API and a CLI.
Runs SVG files through the `svgToComponentModule` function of [svg-react-transformer](https://github.com/mapbox/svg-react-transformer), then writes the React component modules to new files.

## Node API

`svgReactTransformerWriter(files, outDir, options)`

**files** `string | Array<string>` - Globs that point to your SVG files.
Files without an `.svg` extension are automatically ignored.

**outDir** `string` - Path to an output directory, where React component modules will be written.

**options** `?Object`

You can pass all of [the options from `svgToComponentModule`](https://github.com/mapbox/svg-react-transformer#svgtocomponentmodule) (e.g. SVGO plugins, a component template).
The `name` option is automatically provided, derived from the basename of each input SVG file.

You can also pass the following:

- **filenameTemplate** `?Function` - Determines the filenames of output React component modules.
  Receives the input SVG file basename as an argument; should return the JS basename.
  Default value is an identity function, so `foo-bar_baz.svg` becomes `foo-bar_baz.js`.

## CLI

The CLI allows you to do everything the Node API does, by providing the option to load a configuration module, which exports an `options` object.

Run `--help` for details.
