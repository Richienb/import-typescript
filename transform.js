"use strict"
const { compile } = require("ts-node").register({
	transpileOnly: true
})

const transform = (source, modulePath) => compile(source, modulePath)

module.exports = transform
