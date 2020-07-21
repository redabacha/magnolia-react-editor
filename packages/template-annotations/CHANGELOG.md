# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.5]
 - Allow using dialogs at area level. ([MGNLFE-58](https://jira.magnolia-cms.com/browse/MGNLFE-58))

## [1.0.3]
### Release unpublished, please upgrade to 1.0.4

## [1.0.2] - 2020-05-25
### Added
- `inEditorPreview()` method added to `EditorContextHelper`. ([MGNLFE-42](https://jira.magnolia-cms.com/browse/MGNLFE-42))

### Changed
- `inEditor()` and `inEditorPreview()` methods are now consistent with FreeMarker templating functions. ([MGNLFE-45](https://jira.magnolia-cms.com/browse/MGNLFE-45))

## [1.0.1] - 2020-04-28
### Added
- Introduced changelog file.
- Provide global object `this` to enable webpack builds. ([MGNLFE-23](https://jira.magnolia-cms.com/browse/MGNLFE-23))
- Add `EditorContextHelper` for checking whether the app is running in Page Editor, and for refreshing the control bars. ([MGNLFE-31](https://jira.magnolia-cms.com/browse/MGNLFE-31), [MGNLFE-26](https://jira.magnolia-cms.com/browse/MGNLFE-26))

## [1.0.0] - 2020-03-27
### Added
- first release

[Unreleased]: https://git.magnolia-cms.com/projects/MODULES/repos/frontend-helpers/browse/packages/template-annotations
[1.0.2]: https://www.npmjs.com/package/@magnolia/template-annotations/v/1.0.2
[1.0.1]: https://www.npmjs.com/package/@magnolia/template-annotations/v/1.0.1
[1.0.0]: https://www.npmjs.com/package/@magnolia/template-annotations/v/1.0.0
