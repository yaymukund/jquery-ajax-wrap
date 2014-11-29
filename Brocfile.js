var compileModules = require('broccoli-es6-module-transpiler'),
    pickFiles = require('broccoli-static-compiler'),
    mergeTrees = require('broccoli-merge-trees'),
    AMDFormatter = require('es6-module-transpiler-amd-formatter'),
    Funnel = require('broccoli-funnel');

var amd, bundle, cjs;

amd = compileModules('lib', {
  formatter: new AMDFormatter(),
  output: 'amd'
});

cjs = compileModules('lib', {
  formatter: 'commonjs',
  output: 'commonjs'
});

bundle = compileModules('lib', {
  formatter: 'bundle',
  output: 'jquery-ajax-wrap.js'
});

bundle = new Funnel(bundle, {
  srcDir: '.',
  destDir: 'bundle'
});

module.exports = mergeTrees([amd, bundle, cjs]);
