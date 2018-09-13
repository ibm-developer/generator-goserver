/*
 * © Copyright IBM Corp. 2018
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Tests here do not stub out the subgenerators, so for the app generator
 * the real build and refresh subgenerators get called.
 */

/*'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const fs = require('fs');
const helpers = require('yeoman-test');
const myHelpers = require('../../lib/helpers.js');


let PROJECT_NAME = '';
let appPath = ''
function newAppPath() {
  do{
    PROJECT_NAME = 'Project Name' + Math.random().toString(36).substring(0, 12)
    appPath = path.join(
      process.env.GOPATH || '',
      'src/',
      myHelpers.sanitizeAppName(PROJECT_NAME)
    );
  }while(fs.existsSync(appPath))
}

function clean() {
  if (!process.env.GOPATH) return;
  let exec = require('child_process').exec;
  exec('rm -r ' + appPath);
}


describe('App integration test chose service watson assistant', function () {
  this.timeout(5000);
  
  beforeEach(function () {
    newAppPath();
    // Mock the options, set up an output folder and run the generator
    return helpers.run(path.join( __dirname, '../../generators/app'))
      .withPrompts({
        appName: PROJECT_NAME,
        addCloudServices: "true",
        services: [ "watson assistant" ] })
      .toPromise(); // Get a Promise back when the generator finishes
  });

  afterEach(() => {
    clean();
  });

  describe('basic file structure test', function () {
    it('generates the expected watson assistant files', function () {
      assert.file("services/service_watson_assistant.go");
    });
  });
  describe('services.go', () => {
    it('contains watson assistant', () => {
      assert.fileContent('services/services.go', 'WatsonAssistant')
    });
  });
  describe('server.go', () => {
    it('imports services', () => {
      assert.fileContent('server.go', '/services')
    });
  });
});

describe('App integration test chose service watson speech to text', function () {

  beforeEach(function () {
    newAppPath();
    // Mock the options, set up an output folder and run the generator
    return helpers.run(path.join( __dirname, '../../generators/app'))
      .withPrompts({
        appName: PROJECT_NAME,
        addCloudServices: "true",
        services: [ "watson speech to text" ] })
      .toPromise(); // Get a Promise back when the generator finishes
  });

  afterEach(() => {
    clean();
  });

  describe('basic file structure test', function () {
    it('generates the expected watson assistant files', function () {
      assert.file("services/service_watson_speech_to_text.go");
    });
  });
  describe('services.go', () => {
    it('contains watson speech to text', () => {
      assert.fileContent('services/services.go', 'WatsonSpeechToText')
    });
  });
  describe('server.go ', () => {
    it('imports services', () => {
      assert.fileContent('server.go', '/services')
    });
  });
});

describe('App integration test chose service watson test to speech', function () {

  beforeEach(function () {
    newAppPath();
    // Mock the options, set up an output folder and run the generator
    return helpers.run(path.join( __dirname, '../../generators/app'))
      .withPrompts({
        appName: PROJECT_NAME,
        addCloudServices: "true",
        services: [ "watson text to speech" ] })
      .toPromise(); // Get a Promise back when the generator finishes
  });

  afterEach(() => {
    clean();
  });

  describe('basic file structure test', function () {
    it('generates the expected watson text to speech files', function () {
      assert.file("services/service_watson_text_to_speech.go");
    });
  });
  describe('services.go', () => {
    it('contains watson text to speech', () => {
      assert.fileContent('services/services.go', 'WatsonTextToSpeech')
    });
  });
  describe('server.go', () => {
    it('imports services', () => {
      assert.fileContent('server.go', '/services')
    });
  });
});

describe('App integration test chose service watson tone analyzer', function () {

  beforeEach(function () {
    newAppPath();
    // Mock the options, set up an output folder and run the generator
    return helpers.run(path.join( __dirname, '../../generators/app'))
      .withPrompts({
        appName: PROJECT_NAME,
        addCloudServices: "true",
        services: [ "watson tone analyzer" ] })
      .toPromise(); // Get a Promise back when the generator finishes
  });

  afterEach(() => {
    clean();
  });

  describe('basic file structure test', function () {
    it('generates the expected watson tone analyzer files', function () {
      assert.file("services/service_watson_tone_analyzer.go");
    });
  });
  describe('services.go', () => {
    it('contains watson tone analyzer', () => {
      assert.fileContent('services/services.go', 'WatsonToneAnalyzer')
    });
  });
  describe('server.go', () => {
    it('imports services', () => {
      assert.fileContent('server.go', '/services')
    });
  });
});

describe('App integration test chose service watson visual recognition', function () {

  beforeEach(function () {
    newAppPath();
    // Mock the options, set up an output folder and run the generator
    return helpers.run(path.join( __dirname, '../../generators/app'))
      .withPrompts({
        appName: PROJECT_NAME,
        addCloudServices: "true",
        services: [ "watson visual recognition" ] })
      .toPromise(); // Get a Promise back when the generator finishes
  });

  afterEach(() => {
    clean();
  });

  describe('basic file structure test', function () {
    it('generates the expected watson visual recognition files', function () {
      assert.file("services/service_watson_visual_recognition.go");
    });
  });
  describe('services.go', () => {
    it('contains watson visual recognition', () => {
      assert.fileContent('services/services.go', 'WatsonVisualRecognition')
    });
  });
  describe('server.go', () => {
    it('imports services', () => {
      assert.fileContent('server.go', '/services')
    });
  });
});
*/
