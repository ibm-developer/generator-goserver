## <%= bluemix.name %>

[![](https://img.shields.io/badge/IBM%20Cloud-powered-blue.svg)](https://bluemix.net)
![Platform](https://img.shields.io/badge/platform-go-lightgrey.svg?style=flat)

### Table of Contents

* [Summary](#summary)
* [Requirements](#requirements)
* [Configuration](#configuration)
* [Run](#run)

<a name="summary"></a>
### Summary

<% if (spec.applicationType == 'WEBAPP') { -%>
The Web basic starter contains an opinionated set of files for web serving:

- `public/index.html`
- `public/404.html`
- `public/500.html`
<% } -%>
<% if (spec.applicationType == 'MS') { -%>
A microservice is an individual component of an application that follows the microservice architecture - an architectural style that structures an application as a collection of loosely coupled services, which implement business capabilities. The microservice exposes a RESTful API matching a [Swagger](http://swagger.io) definition.
<% } -%>

<% if (spec.applicationType == 'BLANK') { -%>
This is a blank app FIX
<% } -%>
<% if (spec.applicationType == 'BLANK') { -%>
We add a swagger FIX
<% } -%>

#### Dockerfile

Update the `CMD` line at the bottom of the Dockerfile to match the run-command you use to start your project.

#### Gopkg.toml

Ensure that all of your `dep` dependencies are stored inside of `Gopkg.toml`.

#### cli-config.yml

Update the following commands in `cli-config.yml` to match the commands you use in your project:
* `test-cmd`: The command to execute tests for the code in the tools container<br/>
(i.e. `go test`)
* `build-cmd-debug`: The command to build the code and docker image for `DEBUG`<br/>
(i.e. `go build` to ensure that the application compiles cleanly)
* `debug-cmd`: The command to execute debug of the code in the tools container<br/>
(i.e. `delve`)

<a name="enablement"></a>
### IBM Cloud Enablement

<a name="requirements"></a>
### Requirements
#### Local Development Tools Setup (optional)

- If you don't already have it, install [Go](https://golang.org/dl/)

TODO: SOMETHING ABOUT GOPATH AND MOVING APP TO GOPATH TO RUN LOCALLY
- Install dep

#### IBM Cloud development tools setup (optional)

1. Install [IBM Cloud Developer Tools](https://console.bluemix.net/docs/cli/idt/setting_up_idt.html#add-cli) on your machine  
2. Install the plugin with: `bx plugin install dev -r bluemix`

#### IBM Cloud DevOps setup (optional)

[![Create Toolchain](https://console.ng.bluemix.net/devops/graphics/create_toolchain_button.png)](https://console.ng.bluemix.net/devops/setup/deploy/)

[IBM Cloud DevOps](https://www.ibm.com/cloud-computing/bluemix/devops) services provides toolchains as a set of tool integrations that support development, deployment, and operations tasks inside IBM Cloud. The "Create Toolchain" button creates a DevOps toolchain and acts as a single-click deploy to IBM Cloud including provisioning all required services.

<a name="configuration"></a>
### Configuration

The project contains IBM Cloud specific files that are used to deploy the application as part of an IBM Cloud DevOps flow. The `.bluemix` directory contains files used to define the IBM Cloud toolchain and pipeline for your application. The `manifest.yml` file specifies the name of your application in IBM Cloud, the timeout value during deployment, and which services to bind to.

Credentials are either taken from the VCAP_SERVICES environment variable if in IBM Cloud, or from a config file if running locally.

#### Using IBM Cloud development CLI

The IBM Cloud development plugin makes it easy to compile and run your application if you do not have all of the tools installed on your computer yet. Your application will be compiled with Docker containers. To compile and run your app, run:

```bash
bx dev build
bx dev run
```

#### Using your local development environment
To run your application locally:

```bash
dep ensure
go run server.go
```

Once the Go toolchain has been installed, you can compile a Go project with:

```bash
go install
```

Your sources will be compiled to your `$GOPATH/bin` directory.

##### Endpoints

Your application is running at: `http://localhost:8080` in your browser.

<% if (spec.applicationType == 'MS') { -%>
- Your [Swagger UI](http://swagger.io/swagger-ui/) is running on: `/explorer`
- Your Swagger definition is running on: `/swagger/api`
<% } -%>
- Health endpoint: `/health`
