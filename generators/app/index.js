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

'use strict';

const Generator = require('yeoman-generator');
const Bundle = require("../../package.json");
const process = require('process');
const Log4js = require('log4js');
const logger = Log4js.getLogger("generator-goserver");
const path = require('path');
const os = require('os');
const fs = require('fs');
const helpers = require('../../lib/helpers.js');
const services = require('./services/services');
const OPTION_BLUEMIX = 'bluemix';
const OPTION_SPEC = 'spec';

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    logger.level = "info";
    logger.info("Package info ::", Bundle.name, Bundle.version);

    // Bluemix option for YaaS integration
    this.argument(OPTION_BLUEMIX, {
      desc: 'Option for deploying with Bluemix. Stringified JSON.',
      required: false,
      hide: true,
      type: String
    });

    // Spec as json
    this.argument(OPTION_SPEC, {
      desc: 'The generator specification. Stringified JSON.',
      required: false,
      hide: true,
      type: String
    });

    /* Do this so there are no overwrite messages when
    subgenerators run. The overwrites are expected
    by design.
    */
    this.conflicter.force = true;
  }

  initializing() {
    this.interactiveMode = false;
    this.options.addServices = false;
    this.options.openApiFileType = 'yaml'; // Default
    let bluemixOk = this._sanitizeOption(this.options, OPTION_BLUEMIX);
    this._sanitizeOption(this.options, OPTION_SPEC);

    // Prompt the user if there is no bluemix object present
    if (!bluemixOk) {
      this.interactiveMode = true;
      this.options = {
        bluemix: { backendPlatform: 'GO' },
        spec: {}
      };
    } else {
      this.options.bluemix.backendPlatform = 'GO';
      // If bluemix contains app name, sanitize it
      if (this.options.bluemix.name && !this.options.bluemix.sanitizedName) {
        this.options.bluemix.sanitizedName = helpers.sanitizeAppName(this.options.bluemix.name);
      }
      // If bluemix exists, check if it includes any services
      Object.keys(this.options.bluemix).forEach((key) => {
        if (services.SERVICES.indexOf(key) > -1) {
          this.options.addServices = true;
        }
      });
      // If local user provides path to Swagger file in the --bluemix option
      if (this.options.bluemix.swaggerFilePath) {
        this.options.bluemix.swaggerFilePath = this.options.bluemix.swaggerFilePath.trim();
        let swagger = fs.readFileSync(this.options.bluemix.swaggerFilePath, "utf8");
        this.options.bluemix.openApiServers = [{ "spec": swagger }];
      }
    }
  }

  prompting() {

    if (!this.interactiveMode) return;

    let swaggerFileValidator = function (str) {
      if (str == "None") {
        return true;
      }
      else {
        if (fs.existsSync(str.trim())) {
          return true;
        }
        else {
          console.log("\n" + str + " not found.");
          return false;
        }
      }
    }

    let choseCloudServices = function (answers) {
      return answers.addCloudServices;
    }

    let prompts = [];
    prompts.push({
      type: 'input',
      name: 'appName',
      message: 'Project name',
      default: path.basename(process.cwd())
    });

    prompts.push({
      type: 'list',
      name: 'applicationType',
      message: `What type of application are you creating?`,
      choices: [
        {
          name: 'Microservice',
          value: 'MS'
        },
        {
          name: 'Webapp',
          value: 'WEBAPP'
        },
        {
          name: 'Blank',
          value: 'BLANK'
        }
      ],
      default: 'Webapp'
    });

    prompts.push({
      type: 'confirm',
      name: 'useSwagger',
      message: 'Do you want to provide a swagger file?',
      when: function(responses) {
        return responses.applicationType === 'BLANK';
      }
    });

    prompts.push({
      name: 'swaggerFileName',
      message: 'Provide the path to the swagger file:',
      validate: swaggerFileValidator,
      when: function(responses) {
        return responses.useSwagger;
      }
    });

    prompts.push({
      type: 'input',
      name: 'dockerRegistry',
      message: 'Provide the Docker Registry (space for none):',
      default: 'registry.ng.bluemix.net/' + os.userInfo().username
    });

    prompts.push({
      type: 'list',
      name: 'deploymentType',
      message: 'Choose a deployment type',
      choices: [
        {
          name: 'Cloud Foundry',
          value: 'CF'
        },
        {
          name: 'Kubernetes',
          value: 'Kube'
        },
        {
          name: 'VSI',
          value: 'VSI'
        }
      ],
      default: 'Cloud Foundry'
    });

    prompts.push({
      type: 'confirm',
      name: 'addCloudServices',
      message: 'Do you want to add IBM Cloud Services?',
      default: false
    });

    prompts.push({
      type: 'checkbox',
      name: 'services',
      message: 'Choose IBM Cloud Services',
      when: choseCloudServices,
      choices: services.SERVICE_CHOICES
    });

    return this.prompt(prompts).then(props => {
      this.options.addServices = props.addCloudServices;
      this.options.bluemix.name = props.appName;
      this.options.bluemix.sanitizedName = helpers.sanitizeAppName(props.appName);
      this.options.bluemix["server"] = [];
      this.options.bluemix.server.cloudDeploymentType = props.deploymentType;
      this.options.bluemix.server.name = this.options.bluemix.name;
      props.dockerRegistry = props.dockerRegistry.trim();
      this.options.bluemix.dockerRegistry = props.dockerRegistry.length > 0 ? props.dockerRegistry : '';
      this.options.spec.applicationType = props.applicationType;
      if (this.options.spec.applicationType === "WEBAPP"){
        // Go currently does not support AngularJS or React
        this.options.framework = "None";
      }

      if (props.useSwagger) {
        props.swaggerFileName = props.swaggerFileName.trim();
        let swagger = fs.readFileSync(props.swaggerFileName, "utf8");
        this.options.bluemix.openApiServers = [{ "spec": swagger }];
      }

      this._processServices(props);
    });
  }

  paths() {
    if (this.interactiveMode) {
      // Error out if the user does not have a GOPATH set up
      if (typeof process.env.GOPATH === 'undefined') {
        this.env.error("GOPATH environment variable not defined. For help setting the GOPATH visit this link: https://github.com/golang/go/wiki/SettingGOPATH");
      } else {
        // Place the app in GOPATH/src/<appname>
        this.destinationRoot(path.join(process.env.GOPATH, 'src/', this.options.bluemix.sanitizedName));
      }
    } 
  }

  // store specified option in bluemix object to drive generator-ibm-service-enablement
  _storeServiceName(service) {
    let service_name = services.SERVICES[services.SERVICE_LABELS.indexOf(service)];
    let service_data = require("./services/" + service_name);
    this.options.bluemix[service_name] = service_data[service_name];
    this.options.bluemix.server.services.push(service_name.toUpperCase() + "_INSTANCE_REPLACE_ME");
  }

  // process each service selected by user
  _processServices(answers) {
    if (answers.services) {
      if (!("server" in this.options.bluemix)) {
        this.options.bluemix["server"] = [];
      }
      let services = [];
      this.options.bluemix.server["services"] = services;

      answers.services.forEach(this._storeServiceName.bind(this));
    }
  }

  composeGenerators() {
    this.options.spec = this.options.spec || {}
    this.options.spec.applicationType = this.options.spec.applicationType || 'BLANK';
    this.options.bluemix.quiet = true; // suppress version messages

    this.composeWith(require.resolve('generator-ibm-core-golang-gin'), this.options);

    if (this.options.spec.applicationType === "WEBAPP"){
      this.composeWith(require.resolve('generator-ibm-web/generators/app'), this.options);
    }

    this.composeWith(require.resolve('generator-ibm-cloud-enablement'), this.options);

    this.composeWith(require.resolve('generator-ibm-service-enablement'), {
      bluemix: JSON.stringify(this.options.bluemix),
      spec: JSON.stringify(this.options.spec),
      starter: "{}",
      quiet: true
    });
  }

  end() {
    if (this.interactiveMode) {
      this.log(
        'Your project has been generated at ' +
        path.join(process.env.GOPATH, 'src/', this.options.bluemix.sanitizedName)
      );
    }
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      this.options
    );
  }

  // Return true if 'sanitized', false if missing, exception if bad data
  _sanitizeOption(options, name) {
    let optionValue = options[name];
    if (!optionValue) {
      this.log('Missing', name, 'parameter');
      return false;
    }

    if (typeof optionValue === 'string' && optionValue.indexOf('file:') === 0) {
      let fileName = optionValue.replace('file:', '');
      let filePath = this.destinationPath('./' + fileName);
      this.log('Reading', name, 'parameter from local file', filePath);
      this.options[name] = this.fs.readJSON(filePath);
      return true;
    }

    try {
      this.options[name] =
      typeof this.options[name] === 'string'
        ? JSON.parse(this.options[name])
        : this.options[name];
      return true;
    } catch (e) {
      this.log(e);
      throw new Error(
        name + ' parameter is expected to be a valid stringified JSON object'
      );
    }
  }
};
