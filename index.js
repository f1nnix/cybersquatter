var cybersquatter = require('./lib/index').default

// parse argument names
var names = process.argv.slice(2)

if (names.length === 0) {
  console.log(`Error: you must supply at least 1 name to check.\nExample: cybersquatter faceb00k`)
  process.exit(0)
}

cybersquatter(names)
