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

'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const fs = require('fs');
const helpers = require('yeoman-test');
const myHelpers = require('../../lib/helpers.js');

describe('App integration test chose service watson assistant', function () {
  this.timeout(5000);

  let bluemixOptions = fs.readFileSync(path.join(__dirname, '../../test/resources/bluemix-template.json'), 'utf8');
  bluemixOptions = myHelpers.storeServiceName(JSON.parse(bluemixOptions), 'watson assistant');
  before(function () {

    // Mock the options, set up an output folder and run the generator
    return helpers.run(path.join( __dirname, '../../generators/app'))
      .withOptions({
        bluemix: bluemixOptions
      })
      .toPromise(); // Get a Promise back when the generator finishes
  });

  describe('basic file structure test', function () {
    it('generates the expected watson assistant files', function () {
      assert.file("services/service_watson_conversation.go");
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

describe('App integration test chose service watson discovery', function () {

  let bluemixOptions = fs.readFileSync(path.join(__dirname, '../../test/resources/bluemix-template.json'), 'utf8');
  bluemixOptions = myHelpers.storeServiceName(JSON.parse(bluemixOptions), 'watson discovery');
  before(function () {

    // Mock the options, set up an output folder and run the generator
    return helpers.run(path.join( __dirname, '../../generators/app'))
      .withOptions({
        bluemix: bluemixOptions
      })
      .toPromise(); // Get a Promise back when the generator finishes
  });

  describe('basic file structure test', function () {
    it('generates the expected watson discovery files', function () {
      assert.file("services/service_watson_discovery.go");
    });
  });
  describe('services.go', () => {
    it('contains watson assistant', () => {
      assert.fileContent('services/services.go', 'WatsonDiscovery')
    });
  });
  describe('server.go', () => {
    it('imports services', () => {
      assert.fileContent('server.go', '/services')
    });
  });
});

describe('App integration test chose service watson language translator', function () {

  let bluemixOptions = fs.readFileSync(path.join(__dirname, '../../test/resources/bluemix-template.json'), 'utf8');
  bluemixOptions = myHelpers.storeServiceName(JSON.parse(bluemixOptions), 'watson language translator');
  before(function () {

    // Mock the options, set up an output folder and run the generator
    return helpers.run(path.join( __dirname, '../../generators/app'))
      .withOptions({
        bluemix: bluemixOptions
      })
      .toPromise(); // Get a Promise back when the generator finishes
  });

  describe('basic file structure test', function () {
    it('generates the expected watson language translator files', function () {
      assert.file("services/service_watson_language_translator.go");
    });
  });
  describe('services.go', () => {
    it('contains watson assistant', () => {
      assert.fileContent('services/services.go', 'WatsonLanguageTranslator')
    });
  });
  describe('server.go', () => {
    it('imports services', () => {
      assert.fileContent('server.go', '/services')
    });
  });
});

describe('App integration test chose service watson natural language classifier', function () {

  let bluemixOptions = fs.readFileSync(path.join(__dirname, '../../test/resources/bluemix-template.json'), 'utf8');
  bluemixOptions = myHelpers.storeServiceName(JSON.parse(bluemixOptions), 'watson natural language classifier');
  before(function () {

    // Mock the options, set up an output folder and run the generator
    return helpers.run(path.join( __dirname, '../../generators/app'))
      .withOptions({
        bluemix: bluemixOptions
      })
      .toPromise(); // Get a Promise back when the generator finishes
  });

  describe('basic file structure test', function () {
    it('generates the expected watson natural language classifier files', function () {
      assert.file("services/service_watson_natural_language_classifier.go");
    });
  });
  describe('services.go', () => {
    it('contains watson assistant', () => {
      assert.fileContent('services/services.go', 'WatsonNaturalLanguageClassifier')
    });
  });
  describe('server.go', () => {
    it('imports services', () => {
      assert.fileContent('server.go', '/services')
    });
  });
});

describe('App integration test chose service watson natural language understanding', function () {

  let bluemixOptions = fs.readFileSync(path.join(__dirname, '../../test/resources/bluemix-template.json'), 'utf8');
  bluemixOptions = myHelpers.storeServiceName(JSON.parse(bluemixOptions), 'watson natural language understanding');
  before(function () {

    // Mock the options, set up an output folder and run the generator
    return helpers.run(path.join( __dirname, '../../generators/app'))
      .withOptions({
        bluemix: bluemixOptions
      })
      .toPromise(); // Get a Promise back when the generator finishes
  });

  describe('basic file structure test', function () {
    it('generates the expected watson natural language understanding files', function () {
      assert.file("services/service_watson_natural_language_understanding.go");
    });
  });
  describe('services.go', () => {
    it('contains watson assistant', () => {
      assert.fileContent('services/services.go', 'WatsonNaturalLanguageUnderstanding')
    });
  });
  describe('server.go', () => {
    it('imports services', () => {
      assert.fileContent('server.go', '/services')
    });
  });
});

describe('App integration test chose service watson personality insights', function () {

  let bluemixOptions = fs.readFileSync(path.join(__dirname, '../../test/resources/bluemix-template.json'), 'utf8');
  bluemixOptions = myHelpers.storeServiceName(JSON.parse(bluemixOptions), 'watson personality insights');
  before(function () {

    // Mock the options, set up an output folder and run the generator
    return helpers.run(path.join( __dirname, '../../generators/app'))
      .withOptions({
        bluemix: bluemixOptions
      })
      .toPromise(); // Get a Promise back when the generator finishes
  });

  describe('basic file structure test', function () {
    it('generates the expected watson personality insights files', function () {
      assert.file("services/service_watson_personality_insights.go");
    });
  });
  describe('services.go', () => {
    it('contains watson assistant', () => {
      assert.fileContent('services/services.go', 'WatsonPersonalityInsights')
    });
  });
  describe('server.go', () => {
    it('imports services', () => {
      assert.fileContent('server.go', '/services')
    });
  });
});
