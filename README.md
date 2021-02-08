# `Aurelia_Basic_WebClient`

This project is bootstrapped by [aurelia-cli](https://github.com/aurelia/cli).

For more information, go to https://aurelia.io/docs/cli/webpack


This application covers the bellow features

1. Bootstrap form renderer
2. i18n
3. Aurelia fluent validation.
4. http service
5. Aurelia routing
6. Aurelia dialog service etc


## Run dev app

Run `npm start`, then open `http://localhost:8080`

You can change the standard webpack configurations from CLI easily with something like this: `npm start -- --open --port 8888`. However, it is better to change the respective npm scripts or `webpack.config.js` with these options, as per your need.

To enable Webpack Bundle Analyzer, do `npm run analyze` (production build).

To enable hot module reload, do `npm start -- --hmr`.

To change dev server port, do `npm start -- --port 8888`.

To change dev server host, do `npm start -- --host 127.0.0.1`

**PS:** You could mix all the flags as well, `npm start -- --host 127.0.0.1 --port 7070 --open --hmr`

For long time aurelia-cli user, you can still use `au run` with those arguments like `au run --env prod --open --hmr`. But `au run` now simply executes `npm start` command.

## Build for production

Run `npm run build`, or the old way `au build --env prod`.

## Unit tests

Run `au test` (or `au jest`).

To run in watch mode, `au test --watch` or `au jest --watch`.

This application is served by the .net 5 API https://github.com/ehshanul-hasan/Dot.Net.Core.CRUD
a similar client app with angular is also available in https://github.com/ehshanul-hasan/angular.basic

# Basic Commands For Library Installation

npm install bootstrap --save

npm install jquery --save

npm install popper.js --save

app.html
<template>
  <require from="bootstrap/css/bootstrap.css"></require>
  <h1>${message}</h1>
</template>


app.ts
import 'bootstrap';

npm i aurelia-form-renderer-bootstrap --save

npm install aurelia-validation --save

main.ts

aurelia.use
  .standardConfiguration()
  .plugin('aurelia-validation')
  .developmentLogging();

npm install aurelia-fetch-client

npm install aurelia-dialog

npm install aurelia-i18n
--npm install i18next i18next-xhr-backend

npm install i18next-resource-store-loader


