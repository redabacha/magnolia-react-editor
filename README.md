# spa-angular-minimal

## Features

Demonstrates the [angular-renderer](https://git.magnolia-cms.com/projects/MODULES/repos/frontend-helpers/browse/angular-renderer/projects/angular-renderer) library in a simple application.

## Build the app

Set up URLs in src/environments/environment.ts accordingly and then run:

    npm install

    npm run build


## Setup Magnolia

1. Add `light-modules/angular-magnolia-int` into your light-modules directory.

2. Allow anonymous access to `/.rest/*` and `website:/angular-minimal`.

3. Import `content-importer/website.angular-minimal.yaml`.
