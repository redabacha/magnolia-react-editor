# spa-angular-minimal

## Features

Demonstrates the [angular-renderer](https://git.magnolia-cms.com/projects/MODULES/repos/frontend-helpers/browse/angular-renderer/projects/angular-renderer) library in a simple application.

## Build the dependencies locally

Until we release the package or set-up a private NPM registry, you need to build the
dependencies locally. This requires few changes in the `package.json` files.

First, clone the repository and install the template-annotations project:

    git clone https://git.magnolia-cms.com/scm/modules/frontend-helpers.git

    cd template-annotations

    npm ci && npm run build

After this, replace the version version string of `@magnolia/template-annotations` to absolute path of template-annotations **in both** `angular-renderer/package.json` **and** `angular-renderer/projects/angular-renderer/package.json`:

    "@magnolia/template-annotations": "/some/path/frontend-helpers/template-annotations"

Then you can build angular-renderer library with `npm ci && npm run build`.

In the `package.json` of the sample app, change the version string of `@magnolia/angular-renderer` to absulte path of the built library:

    "@magnolia/angular-renderer": "/some/path/frontend-helpers/angular-renderer/dist/angular-renderer"


## Build the dependencies using verdaccio

Install and run verdaccio and set up user:

    npm install --global verdaccio

    verdaccio

    npm adduser --registry http://localhost:4873

Clone the repository, install & publish the template-annotations project:

    git clone https://git.magnolia-cms.com/scm/modules/frontend-helpers.git

    cd template-annotations

    npm ci && npm run build

    npm publish --registry http://localhost:4873

Install & publish the angular-renderer project:

    cd angular-renderer

    npm ci --registry http://localhost:4873 && npm run build

    cd dist/angular-renderer

    npm publish --registry http://localhost:4873

Build the sample app:

    npm ci --registry http://localhost:4873

    npm run build

Note: you can avoid the `--registry` parameter if you set up the registry globally:

    npm config set registry http://localhost:4873


## Build the app

Set up URLs in src/environments/environment.ts accordingly and then run:

    npm install

    ng build


## Setup Magnolia

1. Add `light-modules/angular-magnolia-int` into your light-modules directory.

2. Allow anonymous access to `/.rest/*` and `website:/angular-minimal`.

3. Import `content-importer/website.angular-minimal.yaml`.
