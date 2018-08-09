#  GoServer Generator

[![IBM Cloud powered][img-ibmcloud-powered]][url-cloud]

[img-ibmcloud-powered]: https://img.shields.io/badge/IBM%20Cloud-powered-blue.svg
[url-cloud]: http://bluemix.net

## Overview

This generator produces a Go + Gin server project with all the ingredients you need for a good start at building a cloud native application. You can choose between either a simple web app, microservice pattern, or a simple blank app.

You can also bring your own optional [Swagger document](https://swagger.io/) to direct code generation for top-down development.

### Monitoring and Health

The generated projects are pre-wired for monitoring and health checks. The app includes

1. [app metrics dashboard](github.com/afex/hystrix-go)

1. [Prometheus endpoint](github.com/prometheus/client_golang)

1. [Kubernetes http liveness probe](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/)

### Deployment Enablement  

The generated projects include deployment configuration for the following environments:

1. Docker

    The projects include Docker files to build images for both release and development

1. Kubernetes

    The projects include a Helm chart for deployment to Kubernetes.

1. Cloud Foundry

    The projects include a manifest for deployment to Cloud Foundry.

1. Dev-ops Pipeline

    The projects include a toolchain and pipeline definition for CI/CD deployment to the IBM Cloud.

## Pre-requisites

- Install [Yeoman](http://yeoman.io)

```bash
npm install -g yo
```

## Installation

```bash
npm install -g generator-goserver
```
## Usage

```bash
yo goserver
```

### Prompting

When running the generator with prompts, make sure you set up a [GOPATH](https://github.com/golang/go/wiki/SettingGOPATH). Your application directory will be generated at `$GOPATH/src/<application-name>`.

When you run 'yo goserver', it will prompt you for the following:

1. project name

    Specify the project name. It defaults to the current directory name.  This is a required value.

1. application type

    Specify the type of application you want to create. The options are basic web app, microservice, or a simple blank app.

1. Swagger doc file name (if blank application type selected)

    Specify the relative or absolute file name of a Swagger document to direct the project's code generation. A route stub will be scaffolded and registered for each route defined in the swagger document. This is an optional value.

1. Docker registery

    Specify a docker registry. This is an optional value.

1. Deployment type

    Specifies the environment to which you would want to deploy you app to. Options are Cloud Foundry, Kubernetes or VSI.

1. IBM Cloud Service Enablement.

    Specify Y|N whether or not you want to scaffold IBM Cloud service enablement into your project.  If you specify 'Y', you will be able to select one or more services from a checklist. For each service you select, configuration and access scaffolding code is generated.  IBM Cloud service enablement is optional.

### Bluemix mode (without prompting)
Use bluemix mode to create an app without having to use the UI. This is useful when you want to use this generator to build a project by only running a script instead of interactively.

#### Bluemix usage
To specify the name of the project use:
```bash
yo goserver --bluemix='{"name":"your-app-name"}'
```

To specify the type of your application:

```bash
yo go server --bluemix='{"name":"your-app-name"}' --spec='{"applicationType":"your-app-type"}'
```

The three valid application types are: WEBAPP, MS, and BLANK

To specify which services to add use:

```bash
yo goserver --bluemix='{"services":["service1", "service2"]}'
```
For valid services see below.

Full usage:
```bash
yo goserver --bluemix='{"name":"your-app-name","swaggerFilePath":"path-to-your-file","services":["service1", "service2"]}' --spec='{"applicationType":"your-app-type"}'
```

Note you can only provide a swagger path if it is a blank application.

#### Valid Services

* 'watson assistant'
* 'watson discovery'
* 'watson language translator'
* 'watson natural language classifier'
* 'watson language understanding'
* 'watson personality insights'
* 'watson speech to text'
* 'watson text to speech'
* 'watson tone analyzer'
* 'watson visual recognition'

## Project Build/Run

Build your generated project one of two ways:

1. If you want to run the project locally, first make sure you have [dep](https://github.com/golang/dep) for dependency management. Then run the following:

    ```
    dep ensure
    go run server.go
    ```

1. Containerized, using IBM Cloud Developer Tools.

    - Install [IBM Cloud Developer Tools](https://console.bluemix.net/docs/cli/idt/setting_up_idt.html#add-cli) on your machine  
    - Install the plugin with:`ibmcloud plugin install dev`

    Note that a containerized approach is supported through the tooling in special consideration of Kubernetes as a deployment environment, following the dev/prod parity principle of [12 Factor Apps](https://12factor.net/).

    There are `ibmcloud dev` commands to simplify this for you:

    1. `ibmcloud dev build`

        Builds Docker image for dev mode and does dep ensure to install dependencies.

    1. `ibmcloud dev test`

        Runs project unit tests in dev mode Docker container.

    1. `ibmcloud dev debug`

        Runs the project in debug mode in the dev mode Docker container. The app will start and listen on port 8181 by default for a debug client to attach and take control.

    1. `ibmcloud dev run`

        Runs the project in the release mode Docker container.  The release mode Docker container is built with GIN_MODE set to release.

## Project Deployment

### Docker

Build a Docker image and run project in a Docker container using Docker commands in the project root directory:

1. `docker build -t my-image .`
1. `docker run -p 8080:8080 --name my-container my-image`

Stop and optionally remove the container and image with the following commands:

1. `docker stop my-container`
1. `docker rm my-container`
1. `docker rmi my-image`

### Kubernetes Deployment

Deploy to Kubernetes using Helm or the IBM Cloud Developer Tools.

1. Helm

    1. Push your image to a Docker image accessible to your Kubernetes environment, such as [Docker Hub](dockerhub.com) or your company's private image registry.

    1. Install your project from the project's root directory, using the included Helm chart:

        helm install chart/`<project name>` --name=`<release name>` --set image.repository=`<image name>` --set image.tag=`<tag value>` --set image.pullPolicy=`<pull policy>`

        Where:

        - `<project name>`

            The name you gave to your project when you generated it.

        - `<release name>`

            An arbitrary name you give to this install instance.

        - `<image name>`

            The registry/image name of your release Docker image - e.g.
            'registry.ng.bluemix.net/myspace/myimage'

        - `<tag value>`

            The image tag value of your release Dockerimage - e.g. 'latest' or '1.0.0'

        - `<pull policy>`

            'Always' or 'IfNotPresent'.  See [Kubernetes image documentation](https://kubernetes.io/docs/concepts/containers/images/) for further explanation.

    Notes:  
    1. If the `helm install` command above gives you an error about not finding 'tiller', execute `helm init --upgrade`.

    1. The helm command installs to the Kubernetes environment pointed to by the KUBECONFIG environment variable. Make sure you are in configuration mode for your Kubernetes cluster.

    1. The Helm command is installed when you install the IBM Cloud Developer Tools.

    1. To delete the helm deployment, execute `helm del --purge <release name>`.

1. IBM Cloud Developer Tools

    `ibmcloud dev deploy --target container`

    Notes:

    1. The tool will prompt for registry/image name, then push your image and install your Helm chart to the Kubernetes environment pointed to by your KUBECONFIG environment variable.

    1. For IBM Cloud, set KUBECONFIG using the 'ibmcloud cs cluster-config `<cluster name>` command.  Note this command is installed as part of IBM Cloud Developer Tools.

### Clound Foundry Deployment

1. Add a host entry to the "manifest.yml" file (Ex. `host: my-app-name`).

1. If you want to connect to a service that is already provisioned in the Cloud, add the instance name in manifest.yml under `services` or replace the placeholder if you indicated a service on project creation

1. cf push

   Note: if you installed IBM Cloud Developer Tools, you can run the `ibmcloud cf push` command. Otherwise, install the cf command from [Pivotal](https://docs.run.pivotal.io/cf-cli/install-go-cli.html).

1. IBM Cloud Developer Tools

    `ibmcloud dev deploy`


## Development

Clone this repository and link it via npm

```bash
git clone https://github.com/ibm-developer/generator-goserver
cd generator-goserver
npm link
```

In a separate directory invoke the generator via

```bash
yo goserver
```

## Publishing Changes

In order to publish changes, you will need to make a pull request against `master` by either fork the repository or creating a new branch against `master`.

Make sure to follow the [conventional commit specification](https://conventionalcommits.org/) before contributing. To help you with commit a commit template is provide. Run `config.sh` to initialize the commit template to your `.git/config` or use [commitizen](https://www.npmjs.com/package/commitizen)

Once you are finished with your changes, run `npm test` to make sure all tests pass. Do a pull request against `master`, make sure the build passes. A team member will review and merge your pull request.
Once merged to `master` an auto generated pull request will be created against master to update the changelog. Make sure that the CHANGELOG.md and the package.json is correct before merging the pull request. After the auto generated pull request has been merged to `master` the version will be bumped and published to npm.
