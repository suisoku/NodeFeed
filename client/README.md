# Client

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.0.

## Description

NodeFeed's description ... .

## Installation

```bash
# with npm
$ npm install
# with yarn
$ yarn install
```

## Running the app

```bash
# development
$ npm start
# or
$ ng serve
# build for production
$ npm run build
```

## Test

```bash
# unit tests
$ npm run test
# e2e tests : Be sure to have the latest version of chrome
$ npm run e2e
# test coverage
$ npm run coverage
```

## Generate the Documentation

The documenation will be useful by commenting the code.

```bash
# build
$ npm run compodoc:build
# build and serve
$ npm run compodoc:build-and-serve
# serve and open
$ npm run compodoc:serve
```

## Git best practices

### Branches naming :

To help the code review and the reverts if needed, having a better branches naming could be useful and help the reviewer to focus on the main changes during the pull request:

- features: start the name by _**feature/task-name-and-more**_
- update: start the name by _**update/whatever-you-want**_ : when updating dependencies or something similar
- bugs: start the name by _**hotfix/x.y.z+1**_, **x.y.z** is the version where the bug was catched
- release : start the name by _**release/x+n.y+m.z+p**_, **x.y.z** is the previous version. According the changes and following the [semever](https://semver.org/lang/fr/) convention, increase the x or y or z, not all in the same time.

### Before any PR

Please make sure everything is **OK** :

```bash
# lint OK
$ npm run lint
# test OK
$ npm run test
# build OK
$ npm run build
# or in one command for the lazzy peaple, a all in one script
$ npm run pre-push
```

### Workflow strategy

We need to choose either [Gitflow](https://www.atlassian.com/fr/git/tutorials/comparing-workflows/gitflow-workflow) or [Oneflow](https://www.endoflineblog.com/oneflow-a-git-branching-model-and-workflow)
