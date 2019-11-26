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
