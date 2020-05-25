# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.2] - 2020-05-25
### Changed
- Fix dynamic components not reacting on content changes. ([MGNLFE-40](https://jira.magnolia-cms.com/browse/MGNLFE-40))
- Use `inEditor()` and `inEditorPreview()` from template-annotations library. ([MGNLFE-42](https://jira.magnolia-cms.com/browse/MGNLFE-42))

## [1.0.1] - 2020-04-28
Please excuse the breaking changes in 1.0.1. Changes are significant but it's easy to migrate. We will follow semver for future releases.

### Added
- Introduced changelog file.
- Provide global object `this` to enable webpack builds. ([MGNLFE-23](https://jira.magnolia-cms.com/browse/MGNLFE-23))

### Changed
- Renamed `RendererContext` to `EditorContext`. ([MGNLFE-29](https://jira.magnolia-cms.com/browse/MGNLFE-29))
- Renamed `Page` directive to `EditablePage` and `Area` to `EditableArea`. ([MGNLFE-13](https://jira.magnolia-cms.com/browse/MGNLFE-13), [MGNLFE-26](https://jira.magnolia-cms.com/browse/MGNLFE-26))
- Instead of passing `componentMappings` as an argument to `Page` directive, the `EditablePage` directive now expects `config` argument with object containing `componentMappings` sub-property. ([MGNLFE-30](https://jira.magnolia-cms.com/browse/MGNLFE-30))
- Use template-annotations library for refreshing the control bars, and checking whether the app is running in Page Editor. ([MGNLFE-31](https://jira.magnolia-cms.com/browse/MGNLFE-31))


## [1.0.0] - 2020-03-27
### Added
- first release

[Unreleased]: https://git.magnolia-cms.com/projects/MODULES/repos/frontend-helpers/browse/packages/react-editor
[1.0.2]: https://www.npmjs.com/package/@magnolia/react-editor/v/1.0.2
[1.0.1]: https://www.npmjs.com/package/@magnolia/react-editor/v/1.0.1
[1.0.0]: https://www.npmjs.com/package/@magnolia/react-editor/v/1.0.0
