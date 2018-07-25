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

'use strict';

// labels for prompt checkbox
const CHECKBOX_WATSON_CONVERSATION = "watson assistant";
const CHECKBOX_WATSON_DISCOVERY = "watson discovery";
const CHECKBOX_WATSON_LANGUAGE_TRANSLATOR = "watson language translator";
const CHECKBOX_WATSON_NATURAL_LANGUAGE_CLASSIFIER = "watson natural language classifier";
const CHECKBOX_WATSON_NATURAL_LANGUAGE_UNDERSTANDING = "watson natural language understanding";
const CHECKBOX_WATSON_PERSONALITY_INSIGHTS = "watson personality insights";
const CHECKBOX_WATSON_SPEECH_TO_TEXT = "watson speech to text";
const CHECKBOX_WATSON_TEXT_TO_SPEECH = "watson text to speech";
const CHECKBOX_WATSON_TONE_ANALYZER = "watson tone analyzer";
const CHECKBOX_WATSON_VISUAL_RECOGNITION = "watson visual recognition";



// array of labels for easy index lookup
const SERVICE_LABELS= [
  CHECKBOX_WATSON_CONVERSATION,
  CHECKBOX_WATSON_DISCOVERY,
  CHECKBOX_WATSON_LANGUAGE_TRANSLATOR,
  CHECKBOX_WATSON_NATURAL_LANGUAGE_CLASSIFIER,
  CHECKBOX_WATSON_NATURAL_LANGUAGE_UNDERSTANDING,
  CHECKBOX_WATSON_PERSONALITY_INSIGHTS,
  CHECKBOX_WATSON_SPEECH_TO_TEXT,
  CHECKBOX_WATSON_TEXT_TO_SPEECH,
  CHECKBOX_WATSON_TONE_ANALYZER,
  CHECKBOX_WATSON_VISUAL_RECOGNITION
];

// checkbox array for prompt
const SERVICE_CHOICES= [
  {"name":CHECKBOX_WATSON_CONVERSATION},
  {"name":CHECKBOX_WATSON_DISCOVERY},
  {"name":CHECKBOX_WATSON_LANGUAGE_TRANSLATOR},
  {"name":CHECKBOX_WATSON_NATURAL_LANGUAGE_CLASSIFIER},
  {"name":CHECKBOX_WATSON_NATURAL_LANGUAGE_UNDERSTANDING},
  {"name":CHECKBOX_WATSON_PERSONALITY_INSIGHTS},
  {"name":CHECKBOX_WATSON_SPEECH_TO_TEXT},
  {"name":CHECKBOX_WATSON_TEXT_TO_SPEECH},
  {"name":CHECKBOX_WATSON_TONE_ANALYZER},
  {"name":CHECKBOX_WATSON_VISUAL_RECOGNITION}
];

/*
keys to select services via generator-ibm-service-enablement.
must match SCAFFOLDER_PROJECT_PROPERTY_NAME value in corresponding
service sub-generator (e.g. service-alert-notification)
*/

const SERVICES= [
  "conversation",
  "discovery",
  "languageTranslator",
  "naturalLanguageClassifier",
  "naturalLanguageUnderstanding",
  "personalityInsights",
  "speechToText",
  "textToSpeech",
  "toneAnalyzer",
  "visualRecognition"
];

module.exports = {
  SERVICE_LABELS,
  SERVICE_CHOICES,
  SERVICES
};
