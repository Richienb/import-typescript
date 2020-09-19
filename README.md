# import-typescript [![Travis CI Build Status](https://img.shields.io/travis/com/Richienb/import-typescript/master.svg?style=for-the-badge)](https://travis-ci.com/Richienb/import-typescript)

Import Typescript on the fly.

[![NPM Badge](https://nodei.co/npm/import-typescript.png)](https://npmjs.com/package/import-typescript)

## Install

```sh
npm install import-typescript
```

## Usage

```js
const importTs = require("import-typescript")
const foo = importTs("./foo.ts")

foo()
```

## API

### importTypescript(moduleId, options?)

#### moduleId

Type: `string`

The module id.

#### options

Type: `object`

##### cache

Type: `boolean`\
Default: `true`

Whether to cache the transpiled code.
