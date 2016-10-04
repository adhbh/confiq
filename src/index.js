import merge from 'deepmerge'
import path from 'path'
import fs from 'fs'

const parentModFilename = module.parent.filename
const parentDir = path.dirname(parentModFilename)
delete require.cache[__filename];

function findRoot (dir) {
	if(fs.existsSync(dir + '/package.json')) {
		return dir
	} else {
		let parent = path.resolve(dir + '/..')
		return findRoot(parent)
	}
}

global.rootRequire = function (name = 'development', folder) {
	return require(findRoot(parentDir) + folder + name);
}

export default function (key, { path = '/config/', defaultName = 'default' } = {}) {

	const defaultConfig = rootRequire(defaultName, path)

	const requiredConfig = rootRequire(process.env.NODE_ENV, path)

	const config = merge(defaultConfig, requiredConfig)

	return config[key]
}