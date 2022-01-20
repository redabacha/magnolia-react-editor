## [2.2.6](https://github.com/redabacha/magnolia-frontend-helpers/compare/v2.2.5...v2.2.6) (2022-01-20)


### Bug Fixes

* use content id as a key ([ebf3c41](https://github.com/redabacha/magnolia-frontend-helpers/commit/ebf3c41465064e69d9200505d3575517f1dccf13))

## [2.2.5](https://github.com/redabacha/magnolia-frontend-helpers/compare/v2.2.4...v2.2.5) (2021-12-24)


### Performance Improvements

* add babel compiler assumptions ([ebd80ae](https://github.com/redabacha/magnolia-frontend-helpers/commit/ebd80ae378ff02bda8e903871f15fb42c8f54c92))

## [2.2.4](https://github.com/redabacha/magnolia-frontend-helpers/compare/v2.2.3...v2.2.4) (2021-06-28)


### Reverts

* Revert "fix: run mgnlRefresh on every render" ([11d9044](https://github.com/redabacha/magnolia-frontend-helpers/commit/11d904454d72e8f78bd1b0417bda1101ae598d55))
* Revert "fix: delete injected markup on cleanup" ([f215e7b](https://github.com/redabacha/magnolia-frontend-helpers/commit/f215e7b68553aad04c16b2201c4949770fc9cb3c))

## [2.2.3](https://github.com/redabacha/magnolia-frontend-helpers/compare/v2.2.2...v2.2.3) (2021-06-07)


### Bug Fixes

* include content in console.error ([#13](https://github.com/redabacha/magnolia-frontend-helpers/issues/13)) ([06c4071](https://github.com/redabacha/magnolia-frontend-helpers/commit/06c4071f9008b2a3d3a75f2f04c27fb991677426))

## [2.2.2](https://github.com/redabacha/magnolia-frontend-helpers/compare/v2.2.1...v2.2.2) (2021-05-24)


### Bug Fixes

* delete injected markup on cleanup ([769a860](https://github.com/redabacha/magnolia-frontend-helpers/commit/769a8602f911cd3bfd6ed9a18a533b27d0f5e2ff))

## [2.2.1](https://github.com/redabacha/magnolia-frontend-helpers/compare/v2.2.0...v2.2.1) (2021-05-24)


### Bug Fixes

* run mgnlRefresh on every render ([7dadab8](https://github.com/redabacha/magnolia-frontend-helpers/commit/7dadab8bd382f401c6e084f5cd0cb001a26ae9a9))

# [2.2.0](https://github.com/redabacha/magnolia-frontend-helpers/compare/v2.1.2...v2.2.0) (2021-05-21)


### Features

* allow custom render set in EditablePage ([d3f3ab7](https://github.com/redabacha/magnolia-frontend-helpers/commit/d3f3ab72a0f83b9fcba61484a195f1b50c8aab1e))

## [2.1.2](https://github.com/redabacha/magnolia-frontend-helpers/compare/v2.1.1...v2.1.2) (2021-05-19)


### Bug Fixes

* set children type in EditableAreaProps ([cdaf9da](https://github.com/redabacha/magnolia-frontend-helpers/commit/cdaf9da8e3cecb8c32610245e9c50f1ed20df451))

## [2.1.1](https://github.com/redabacha/magnolia-frontend-helpers/compare/v2.1.0...v2.1.1) (2021-05-19)


### Bug Fixes

* update EditableAreaProps type ([20d9bf7](https://github.com/redabacha/magnolia-frontend-helpers/commit/20d9bf746cd9db253124498f1e3863f867478e0e))

# [2.1.0](https://github.com/redabacha/magnolia-frontend-helpers/compare/v2.0.0...v2.1.0) (2021-05-19)


### Bug Fixes

* set files field in package.json ([e76d98c](https://github.com/redabacha/magnolia-frontend-helpers/commit/e76d98c446d4dd43c0c97a9e0d4c9663b6dd1424))


### Features

* allow custom render for EditableArea ([55f833e](https://github.com/redabacha/magnolia-frontend-helpers/commit/55f833ed99b407b207257b5f78cfc9a4ca04a026))
* use babel instead of microbundle ([db6641e](https://github.com/redabacha/magnolia-frontend-helpers/commit/db6641ec7ba640c863c89ae62b2edef7ed1708e7))

# [2.0.0](https://github.com/redabacha/magnolia-frontend-helpers/compare/v1.1.3...v2.0.0) (2021-03-18)


### Code Refactoring

* remove templateDefinitions support ([143adac](https://github.com/redabacha/magnolia-frontend-helpers/commit/143adaccbb237dd3168887b6fcf7918b29a8570d))


### Features

* export hooks ([6411c97](https://github.com/redabacha/magnolia-frontend-helpers/commit/6411c977d55d1855140c1907ad1a1bce9510e340))


### BREAKING CHANGES

* templateDefinitions was deprecated and has now been removed. Use templateAnnotations instead.

## [1.1.3](https://github.com/redabacha/magnolia-frontend-helpers/compare/v1.1.2...v1.1.3) (2021-03-09)


### Bug Fixes

* useEffect instead of useLayoutEffect to avoid ssr warning ([cb5b0d4](https://github.com/redabacha/magnolia-frontend-helpers/commit/cb5b0d4447b7e90e99a443ee04065fc84cb1fe92))

## [1.1.2](https://github.com/redabacha/magnolia-frontend-helpers/compare/v1.1.1...v1.1.2) (2021-03-01)


### Bug Fixes

* use children before component mapping in EditablePage ([5fa024a](https://github.com/redabacha/magnolia-frontend-helpers/commit/5fa024af32fb88ec3d61b6bd0fe55bc1930007dd))

## [1.1.1](https://github.com/redabacha/magnolia-frontend-helpers/compare/v1.1.0...v1.1.1) (2021-02-28)


### Bug Fixes

* add build step to release workflow ([f9e8717](https://github.com/redabacha/magnolia-frontend-helpers/commit/f9e8717fee5ab6ec0b3e6b828f567650dc84fe6e))

# [1.1.0](https://github.com/redabacha/magnolia-frontend-helpers/compare/v1.0.14...v1.1.0) (2021-02-28)


### Features

* add release workflow ([c87a034](https://github.com/redabacha/magnolia-frontend-helpers/commit/c87a034ecbdd5c2746a1e2638a9441837a189f72))
