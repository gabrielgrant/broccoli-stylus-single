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
var compileLess = require('broccoli-stylus-single');

var outputTree = compileLess(inputTrees, inputFile, outputFile, options)
```

* **`inputTrees`**: An array of trees that act as the include paths for
  stylus. If you have a single tree, pass `[tree]`.

* **`inputFile`**: Relative path of the main `.styl` file to compile. This
  file must exist in one of the `inputTrees`.

* **`outputFile`**: Relative path of the output CSS file.

* **`options`**: A hash of options for stylus.

* **`options.module`**: Stylus module to use instead of the provided version.

### Example

```js
var appCss = compileLess(sourceTrees, 'myapp/app.styl', 'assets/app.css')
```

### Using a specific Stylus version

This plugin comes bundled with a recent version of Stylus, but you may want or need to use a specific version instead.

Include `stylus` in your project's `package.json` and `require` it as the value for this plugin's `module` option.

```js
var appCss = compileLess(sourceTrees, 'myapp/app.styl', 'assets/app.css', {
  module: require('stylus')
});
```
