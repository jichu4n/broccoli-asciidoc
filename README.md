# broccoli-asciidoc
An [AsciiDoc](http://www.methods.co.nz/asciidoc/) filter for [Broccoli](https://github.com/broccolijs/broccoli) using [asciidoctor.js](https://github.com/asciidoctor/asciidoctor.js). It converts AsciiDoc files (`*.asciidoc`, `*.adoc` or `*.asc`) to HTML as part of a Broccoli build.

Since asciidoctor.js is a pure JavaScript implementation of AsciiDoc, no external dependencies are necessary.

## Installation

Install with:

```
npm install --save-dev broccoli-asciidoc
```

## Usage

Basic usage in `Brocfile.js`:

```js
var asciidocToHtml = require('broccoli-asciidoc');
var htmlFiles = asciidocToHtml(
  'path/to/asciidoc/files',
  { /* asciidoctor.js options */ });
```

The 2nd argument may be omitted if not specifying asciidoctor.js options.

Example usage with [Ember CLI](http://www.ember-cli.com/) in `ember-cli-build.js`:

```js
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var Funnel = require('broccoli-funnel');
var asciidocToHtml = require('broccoli-asciidoc');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {...});
  var asciidocHtmlAssets = Funnel(
    asciidocToHtml('asciidoc'),
    {
      destDir: 'assets'
    });
  ...
  return app.toTree([asciidocHtmlAssets]);
};
```

The above snippet will convert all AsciiDoc input files under the `asciidoc` directory in the project root and place output files under `dist/assets`.
