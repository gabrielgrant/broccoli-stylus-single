var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var includePathSearcher = require('include-path-searcher');
var merge = require('lodash.merge');
var RSVP = require('rsvp');
var CachingWriter = require('broccoli-caching-writer');

StylusCompiler.prototype = Object.create(CachingWriter.prototype);
StylusCompiler.prototype.constructor = StylusCompiler;

// Use the stylus module in the root project if available;
// otherwise, use the one included with this plugin
var codependency = require('codependency');
var requirePeer = codependency.register(module, { index: ['peerDependencies'] });
var stylus = requirePeer('stylus', { optional: true }) || require('stylus');

module.exports = StylusCompiler
function StylusCompiler (inputNodes, inputFile, outputFile, options) {
  if (!(this instanceof StylusCompiler)) return new StylusCompiler(inputNodes, inputFile, outputFile, options);
  CachingWriter.call(this, inputNodes, {
    annotation: options.annotation,
    cacheInclude: options.cacheInclude,
    cacheExclude: options.cacheExclude
  });
  this.inputFile = inputFile;
  this.outputFile = outputFile;
  this.stylusOptions = options || {};
}

StylusCompiler.prototype.build = function () {
  var data;
  var stylusOptions = {
    filename: includePathSearcher.findFileSync(this.inputFile, this.inputPaths),
    paths: this.inputPaths
  };
  merge(stylusOptions, this.stylusOptions);
  stylusOptions.paths = [path.dirname(stylusOptions.filename)].concat(stylusOptions.paths);
  data = fs.readFileSync(stylusOptions.filename, 'utf8');

  var destFile = path.join(this.outputPath, this.outputFile);
  var promise = new RSVP.Promise(function(resolve, reject) {
    stylus.render(data, stylusOptions, function (e, css) {
      if (e) {
        reject(e);
      }
      mkdirp.sync(path.dirname(destFile));
      fs.writeFileSync(destFile, css, { encoding: 'utf8' });

      resolve();
    });
  });

  return promise;
};

