/*
 © Copyright IBM Corp. 2017, 2018
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

'use strict';
const REGEX_LEADING_ALPHA = /^[^a-zA-Z]*/;
const REGEX_ALPHA_NUM = /[^a-zA-Z0-9-]/g;
const services = require('../generators/app/services/services');

// Sanitize application name
exports.sanitizeAppName = name => {
  name = name || 'appname';
  return name
    .toLowerCase()
    .replace(REGEX_LEADING_ALPHA, '')
    .replace(/ /g, '-')
    .replace(REGEX_ALPHA_NUM, '');
};

// Take a swagger path and convert the parameters to express format.
// i.e. convert "/path/to/{param1}/{param2}" to "/path/to/:param1/:param2"
exports.reformatPathToGoGin = path => path.replace(/{/g, ':').replace(/}/g, '');

exports.resourceNameFromPath = function(path) {
  // Grab the first valid element of a path (or partial path) and return it.
  return path.match(/^\/*([^/]+)/)[1];
};

// Appends service to provided bluemix json file
exports.storeServiceName = function(bluemix, service) {
  let service_name = services.SERVICES[services.SERVICE_LABELS.indexOf(service)];
  let service_data = require("../generators/app/services/" + service_name);
  bluemix[service_name] = service_data[service_name];
  bluemix.server.services.push(service_name.toUpperCase() + "_INSTANCE_REPLACE_ME");
  return bluemix;
}
