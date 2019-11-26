# Magnolia React Tutorial

This tutorial shows step-by-step how to render data from Magnolia using ReactJS.

## Step 1
Lets create a React App. Please refer to this document for more information https://reactjs.org/docs/create-a-new-react-app.html#create-react-app
```
npx create-react-app my-app
cd my-app
npm start
```

## Step 2
Lets create a light-module. We won't discuss how to create light-module here, please refer to https://documentation.magnolia-cms.com/display/DOCS61/Light+modules for more information. You can find a sample light module in light-modules folder in this project.

## Step 3
Configure javascript-models app and roles. These configurations you can import them from content-import folder.
Please refer to this document https://documentation.magnolia-cms.com/display/DOCS61/Importing+and+exporting+data

## Step 4
Install `@magnolia/magnolia-react-renderer`, `copyfiles`, `rimraf`, and `renamer`. `@magnolia/magnolia-react-renderer` is a library that has `Page`, `Area`, and `Component` for rendering Magnolia edit bars in author mode. `copyfiles` and `rimraf` are helping to copy/remove files. It can be done by using OS's commands but we need to handle when it is run on MacOS, Windows, or Linux. `renamer` helps remove hash code on built files.
```
npm install --save @magnolia/magnolia-react-renderer
npm install --save-dev copyfiles
npm install --save-dev rimraf
npm install --save-dev renamer
```
## Step 5
Create a script to transpile the code. We don't use normal configuration because we don't want to split the code into multiple files.
Let's create `scripts/build-non-split.js`:
```javascript
/*
Prevent create-react-app from 'chunking' the js. Because chunking makes it hard to automatically include in Magnolia freemarker script.
Change the create-react-app config without 'ejecting'.

From this thread: https://github.com/facebook/create-react-app/issues/5306
*/
'use strict';

const rewire = require('rewire');
const defaults = rewire('react-scripts/scripts/build.js');
let config = defaults.__get__('config');

config.optimization.splitChunks = {
    cacheGroups: {
        default: false,
    },
};

config.optimization.runtimeChunk = false;
```
We also need to install `rewire` to override splitChunks config: `npm install --save-dev rewire`. After that, we edit build script like below:
```
"build": "node scripts/build-non-split.js"
```
## Step 6
Before running build script, we need to clean the previous build. After that, we also need to remove the hash code from files in build folder, because it's more complicated to include the hash code to our page template file. And we need to copy the build into webresources folder in light-module.
Please refer to the script as below:
```
"build": "npm run clean && node scripts/build-non-split.js",
"deploy": "npm run build && npm run build-rename && copyfiles -u 1 \"build/**/*\" light-modules/sample-light-module/webresources/",
"build-rename": "npm run build-rename-js && npm run build-rename-css",
"build-rename-js": "renamer --find \"/main.[^\\.]+.js/\" --replace \"main.js\" build/static/js/*.js",
"build-rename-css": "renamer --find \"/main\\.[^\\.]+\\.css/\" --replace \"main.css\" build/static/css/*.css",
"clean": "rimraf build && rimraf light-modules/sample-light-module/webresources"
```
As you can see, if we run `deploy` task, it will run `clean` -> `build` -> `build-rename` -> copy the build into webresources folder.
## Step 7
Start developing the app to render pages from REST API. Please the sample code from this project. Especially, `environment.js`, `mapping.js`, and `App.js`.
