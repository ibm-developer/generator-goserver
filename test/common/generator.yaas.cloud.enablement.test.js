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
/**
 * Tests here do not stub out the subgenerators, so for the app generator
 * the real build and refresh subgenerators get called.
 */

'use strict'
const tests = require('common-codegen-tests');
const generatorLocation = require('path').join(__dirname, '../../generators/app');
const APPNAME = 'testApp';

//common generator tests
function assertCommonTests(options, backendPlatform) {
  tests.test('test-cli-config', generatorLocation, backendPlatform, options);
  //run the docker test slightly differently as need to specify a back level version of the test
  const dockerTest = tests.test('test-docker');
  dockerTest.generatorLocation = generatorLocation;
  dockerTest.platform = backendPlatform;
  dockerTest.options = options;
  dockerTest.version = '0.0.3';
  tests.test('test-bluemix', generatorLocation, backendPlatform, options);
}

describe('Golang generator for MS : yaas, no bluemix services', function () {
  this.timeout(25000);
  const ymock = new tests.YMock(APPNAME, "GO", { spec: {applicationType: "MS"}});
  const options = ymock.getOptions();
  options.bluemix.backendPlatform = options.backendPlatform;
  assertCommonTests(options, 'GO');
});

describe('Golang generator for Web app : yaas, no bluemix services', function () {
  this.timeout(25000);
  const ymock = new tests.YMock(APPNAME, "GO", { spec: {applicationType: "WEBAPP"}});
  const options = ymock.getOptions();
  options.bluemix.backendPlatform = options.backendPlatform;
  assertCommonTests(options, 'GO');
});
