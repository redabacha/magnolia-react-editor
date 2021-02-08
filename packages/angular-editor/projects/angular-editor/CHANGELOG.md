# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.6] - 2021-02-08
### Added
- Log a warning when a template ID is not mapped to any component. ([MGNLFE-50](https://jira.magnolia-cms.com/browse/MGNLFE-50))
- Refresh Page Editor after the frame is ready. ([MGNLFE-85](https://jira.magnolia-cms.com/browse/MGNLFE-85))
- Support for new template-annotations endpoint. See the documentation or sample projects for more details. ([MGNLFE-77](https://jira.magnolia-cms.com/browse/MGNLFE-77), [MGNLFE-91](https://jira.magnolia-cms.com/browse/MGNLFE-91))
- Allow users to define custom area templates. ([MGNLFE-61](https://jira.magnolia-cms.com/browse/MGNLFE-61))

### Changed
- Migrate the `peerDependencies` section deprectated in npm 7.0.0. ([MGNLFE-84](https://jira.magnolia-cms.com/browse/MGNLFE-84))

## [1.0.5] - 2020-07-21

## [1.0.4] - 2020-06-23
### Changed
- No Add Component action with Angular 9. ([MGNLFE-54](https://jira.magnolia-cms.com/browse/MGNLFE-54))

## [1.0.3]
### Release unpublished, please upgrade to 1.0.4

## [1.0.2] - 2020-05-25
### Changed
- Use `inEditor()` and `inEditorPreview()` from template-annotations library. ([MGNLFE-42](https://jira.magnolia-cms.com/browse/MGNLFE-42))

## [1.0.1] - 2020-04-29
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
[1.0.6]: https://www.npmjs.com/package/@magnolia/angular-editor/v/1.0.6
[1.0.5]: https://www.npmjs.com/package/@magnolia/angular-editor/v/1.0.5
[1.0.4]: https://www.npmjs.com/package/@magnolia/angular-editor/v/1.0.4
[1.0.3]: https://www.npmjs.com/package/@magnolia/angular-editor/v/1.0.3
[1.0.2]: https://www.npmjs.com/package/@magnolia/angular-editor/v/1.0.2
[1.0.1]: https://www.npmjs.com/package/@magnolia/angular-editor/v/1.0.1
[1.0.0]: https://www.npmjs.com/package/@magnolia/angular-editor/v/1.0.0
