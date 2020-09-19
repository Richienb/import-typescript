const test = require("ava")
const importTypescript = require(".")

test("main", t => {
	const fixture = importTypescript("./fixture.ts")
	t.is(fixture(), "foo")
})
