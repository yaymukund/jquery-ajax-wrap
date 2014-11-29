/*
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * Inspired by ic-ajax:
 *
 * https://github.com/instructure/ic-ajax/blob/master/lib/main.js
 */
var $, PromiseClass;

var configure = function(options) {
  $ = options.jQuery;
  PromiseClass = options.Promise;
};

var request = function() {
  return raw.apply(null, arguments).then(function(result) {
    return result.response;
  }, null, 'ic-ajax: unwrap raw ajax response');
};

var raw = function() {
  return _makePromise(_parseArgs.apply(null, arguments));
};

var _makePromise = function(options) {
  return new PromiseClass(function(resolve, reject) {
    options.success = _makeSuccess(resolve);
    options.error = _makeError(reject);
    $.ajax(options);
  }, 'ic-ajax: ' + (options.type || 'GET') + ' to ' + options.url);
};

var _parseArgs = function() {
  var options = {};

  if (arguments.length === 1) {
    if (typeof arguments[0] === 'string') {
      options.url = arguments[0];
    } else {
      options = arguments[0];
    }
  } else if (arguments.length === 2) {
    options = arguments[1];
    options.url = arguments[0];
  }

  if (options.success || options.error) {
    throw new Error(
      'request should use promises, received "success" or "error" callback'
    );
  }

  return options;
};

var _makeSuccess = function(resolve) {
  return function(response, textStatus, jqXHR) {
    resolve({
      response: response,
      textStatus: textStatus,
      jqXHR: jqXHR
    });
  };
};

var _makeError = function(reject) {
  return function(jqXHR, textStatus, errorThrown) {
    reject({
      jqXHR: jqXHR,
      textStatus: textStatus,
      errorThrown: errorThrown
    });
  };
};

export {
  configure,
  request,
  raw
};
