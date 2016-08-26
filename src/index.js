import merge from 'deepmerge'
import appRootDir from 'app-root-dir'

global.rootRequire = function (name = 'development', path) {
	return require(appRootDir.get() + path + name);
}

export default function (key, { path = '/config/', defaultName = 'default' } = {}) {

	const defaultConfig = rootRequire(defaultName, path)

	const requiredConfig = rootRequire(process.env.NODE_ENV, path)

	const config = merge(defaultConfig, requiredConfig)

	return config[key]
}