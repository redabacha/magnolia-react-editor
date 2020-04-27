# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.1] - 2020-04-28
Please excuse the breaking changes in 1.0.1. Changes are significant but it's easy to migrate. We will follow semver for future releases.

### Added
- Introduced changelog file.

### Changed
- Renamed `RendererContextService` to `EditorContextService`. ([MGNLFE-29](https://jira.magnolia-cms.com/browse/MGNLFE-29))
- Renamed `mgnl-page` directive to `editable-page` and `mgnl-area` to `editable-area`. ([MGNLFE-13](https://jira.magnolia-cms.com/browse/MGNLFE-13), [MGNLFE-26](https://jira.magnolia-cms.com/browse/MGNLFE-26))
- Use template-annotations library for refreshing the control bars, and checking whether the app is running in Page Editor. ([MGNLFE-31](https://jira.magnolia-cms.com/browse/MGNLFE-31))
- Aligned the way how content is accessed with react-editor library. Instead of `{{content.property}}`, you can use `{{property}}` directly. Special properties, like `@id` or `mgnl:template` are stored in metadata object. ([MGNLFE-32](https://jira.magnolia-cms.com/browse/MGNLFE-32))
- As a consequence, the `editable-area` directive now expects the area node and parent template instead of parent content and area name. See README for more details.


## [1.0.0] - 2020-03-27
### Added
- first release

[Unreleased]: https://git.magnolia-cms.com/projects/MODULES/repos/frontend-helpers/browse/packages/angular-editor
[1.0.1]: https://www.npmjs.com/package/@magnolia/angular-editor/v/1.0.1
[1.0.0]: https://www.npmjs.com/package/@magnolia/angular-editor/v/1.0.0
