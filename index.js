"use strict"
// Based on https://github.com/vadimdemedes/import-jsx/tree/28687c2761b0df5551414e9b3c75033171d8ed8d
const path = require("path")
const resolveFrom = require("resolve-from")
const callerPath = require("caller-path")
const cache = require("./cache")
const { version } = require("./package.json")

const importTypescript = (moduleId, options) => {
	if (typeof moduleId !== "string") {
		throw new TypeError(`Expected a string, got ${typeof moduleId}`)
	}

	options = {
		cache: true,
		...options
	}

	const modulePath = resolveFrom(path.dirname(callerPath()), moduleId)

	if (!options.cache) {
		delete require.cache[modulePath]
	}

	const hookExtension = ".ts"

	const oldExtension = require.extensions[hookExtension]

	require.extensions[hookExtension] = module => {
		const oldCompile = module._compile

		module._compile = source => {
			const result = cache({
				modulePath,
				options,
				source,
				version
			})

			module._compile = oldCompile
			module._compile(result, modulePath)
		}

		require.extensions[hookExtension] = oldExtension
		oldExtension(module, modulePath)
	}

	const module = require(modulePath)
	require.extensions[hookExtension] = oldExtension

	if (!options.cache) {
		delete require.cache[modulePath]
	}

	return module
}

module.exports = importTypescript
