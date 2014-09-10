# broccoli-stylus-single

The broccoli-stylus-single plugin compiles `.styl` files with
[Stylus](http://learnboost.github.io/stylus/).

This plugin is designed to compile a single, primary input file
into a single output file, with a tree of `@include`d dependencies. This
differs from [broccoli-stylus](https://github.com/sindresorhus/broccoli-stylus/),
which compiles each `.styl` file individually into a `.css` file and doesn't
support `@include`s or a single output file depending on multiple inputs.

This code is based heavily on
[broccoli-sass](https://github.com/joliss/broccoli-sass/)

## Installation

```bash
npm install --save-dev broccoli-stylus-single
```

## Usage

```js
var compileStylus = require('broccoli-stylus-single');

var outputTree = compileStylus(inputTrees, inputFile, outputFile, options)
```

* **`inputTrees`**: An array of trees that act as the include paths for
  stylus. If you have a single tree, pass `[tree]`.

* **`inputFile`**: Relative path of the main `.styl` file to compile. This
  file must exist in one of the `inputTrees`.

* **`outputFile`**: Relative path of the output CSS file.

* **`options`**: A hash of options for stylus.

### Example

```js
var appCss = compileStylus(sourceTrees, 'myapp/app.styl', 'assets/app.css')
```

### Stylus Version

This plugin uses a recent Stylus version, but can utilize a specific version of your choice. To require a specific version simply specify it in your project's `package.json` along with this plugin.

In this example `package.json`, the latest pre-1.0 version of Stylus will be used instead of the version bundled with this plugin:

```json
{
  "name": "your-project",
  "dependencies": {
    "broccoli-stylus-single": "0.1.2",
    "stylus": "0.x",
    …
  }
}
```
