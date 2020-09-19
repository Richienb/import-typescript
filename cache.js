"use strict"
const fs = require("fs")
const path = require("path")
const crypto = require("crypto")
const findCacheDir = require("find-cache-dir")
const tempDirectory = require("temp-dir")
const transform = require("./transform")

let directory

const cacheFilename = (source, options, version) => {
	const hash = crypto.createHash("md4")
	const contents = JSON.stringify({ source, options, version })
	hash.update(contents)

	return hash.digest("hex") + ".js"
}

const handleCache = (directory, parameters) => {
	const { modulePath, options, source, version } = parameters

	if (!options.cache) {
		return transform(source, options, modulePath)
	}

	const file = path.join(directory, cacheFilename(source, options, version))

	try {
		return fs.readFileSync(file).toString()
	} catch {}

	const fallback = directory !== tempDirectory

	try {
		fs.mkdirSync(directory, { recursive: true })
	} catch (error) {
		if (fallback) {
			return handleCache(tempDirectory, parameters)
		}

		throw error
	}

	const result = transform(source, modulePath)

	try {
		fs.writeFileSync(file, result)
	} catch (error) {
		if (fallback) {
			return handleCache(tempDirectory, parameters)
		}

		throw error
	}

	return result
}

module.exports = parameters => {
	if (!directory) {
		directory = findCacheDir({ name: "import-jsx" }) || tempDirectory
	}

	return handleCache(directory, parameters)
}
