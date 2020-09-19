declare namespace importTypescript {
	export interface Options {
		/**
		Whether to cache the transpiled code.

		@default true
		*/
		cache?: boolean
	}
}

/**
Import Typescript on the fly.
@param moduleId The module id.
@returns The imported module.
@example
```
const importTs = require("import-typescript")
const foo = importTs("./foo.ts")

foo()
```
*/
declare function importTypescript<ModuleType = unknown>(moduleId: string, options?: importTypescript.Options): ModuleType

export = importTypescript
