# spa-angular-minimal

## Features

Demonstrates mapping of content between trivial Angular application and Magnolia.


## Dependencies

This light-module is dependent on [magnolia-headless-rendering](https://git.magnolia-cms.com/projects/SERVICES/repos/magnolia-headless-rendering/browse),
which sets up endpoints for retrieving component mappings and HTML comments for editbars.


## Build the app

Set up URLs in webresources-sources/src/environments/environment.ts accordingly and then run in webresources-sources folder:

    npm install

    npm run build


## Setup Magnolia

1. Create a new role `rest-angular` with access to `/.rest/angular-endpoint*` and `website:/angular-minimal` and assign it to anonymous user.

2. If you're using site module, add `headless-base` to `/travel/templates/availability/enableAllWithRenderType`.

Then, create `angular-minimal` page.


## Information on Magnolia CMS

This directory is a Magnolia 'light module'.
https://docs.magnolia-cms.com
