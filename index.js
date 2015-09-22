/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                           *
 *  Copyright (C) 2015 Chuan Ji <ji@chu4n.com>                               *
 *                                                                           *
 *  Licensed under the Apache License, Version 2.0 (the "License");          *
 *  you may not use this file except in compliance with the License.         *
 *  You may obtain a copy of the License at                                  *
 *                                                                           *
 *   http://www.apache.org/licenses/LICENSE-2.0                              *
 *                                                                           *
 *  Unless required by applicable law or agreed to in writing, software      *
 *  distributed under the License is distributed on an "AS IS" BASIS,        *
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. *
 *  See the License for the specific language governing permissions and      *
 *  limitations under the License.                                           *
 *                                                                           *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

'use strict';

var Filter = require('broccoli-filter');
var RSVP = require('rsvp');
var asciidoctor = require('asciidoctor.js')();

function AsciiDocFilter(inputTree, options) {
  if (!(this instanceof AsciiDocFilter)) {
    return new AsciiDocFilter(inputTree, options);
  }

  this.inputTree = inputTree;
  this.asciidoctorOptions = asciidoctor.Opal.hash(options || {});
}

AsciiDocFilter.prototype = Object.create(Filter.prototype);
AsciiDocFilter.prototype.constructor = AsciiDocFilter;

AsciiDocFilter.prototype.extensions = ['asciidoc', 'adoc', 'asc'];
AsciiDocFilter.prototype.targetExtension = 'html';

AsciiDocFilter.prototype.processString = function (asciidocString) {
  var asciidoctorProcessor = asciidoctor.Asciidoctor(true);
  return new RSVP.Promise(function(resolve) {
    var html = asciidoctorProcessor.$convert(
      asciidocString, this.asciidoctorOptions);
    resolve(html);
  }.bind(this));
};

module.exports = AsciiDocFilter;