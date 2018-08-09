#!/bin/bash

echo
echo Clone sub generators
echo
cd ..
git clone -b $TRAVIS_BRANCH https://github.com/ibm-developer/generator-ibm-cloud-enablement.git
git clone -b $TRAVIS_BRANCH https://github.com/ibm-developer/generator-ibm-service-enablement.git
git clone -b $TRAVIS_BRANCH https://github.com/ibm-developer/generator-ibm-core-golang-gin.git
git clone -b $TRAVIS_BRANCH https://github.com/ibm-developer/generator-ibm-web.git
echo
echo Install and link generator-ibm-cloud-enablement 
echo 
cd generator-ibm-cloud-enablement 
npm install && npm link && cd -
echo
echo Install and link generator-ibm-service-enablement 
echo 
cd generator-ibm-service-enablement 
npm install && npm link && cd -
echo
echo Install and link generator-ibm-core-golang-gin  
echo 
cd generator-ibm-core-golang-gin 
npm install && npm link && cd -
echo
echo Install and link generator-ibm-web   
echo 
cd generator-ibm-web 
npm install && npm link && cd -
echo
echo Install other dependencies and local for applciation   
echo 
cd generator-goserver
npm install . \
    ../generator-ibm-core-golang-gin \
    ../generator-ibm-cloud-enablement \
    ../generator-ibm-service-enablement \
    ../generator-ibm-web
echo
