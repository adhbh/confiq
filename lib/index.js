'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (key) {
	var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	var _ref$path = _ref.path;
	let path = _ref$path === undefined ? '/config/' : _ref$path;
	var _ref$defaultName = _ref.defaultName;
	let defaultName = _ref$defaultName === undefined ? 'default' : _ref$defaultName;


	const defaultConfig = rootRequire(defaultName, path);

	const requiredConfig = rootRequire(process.env.NODE_ENV, path);

	const config = (0, _deepmerge2.default)(defaultConfig, requiredConfig);

	return config[key];
};

var _deepmerge = require('deepmerge');

var _deepmerge2 = _interopRequireDefault(_deepmerge);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const parentModFilename = module.parent.filename;
const parentDir = _path2.default.dirname(parentModFilename);

function findRoot(dir) {
	if (_fs2.default.existsSync(dir + '/package.json')) {
		return dir;
	} else {
		let parent = _path2.default.resolve(dir + '/..');
		return findRoot(parent);
	}
}

console.log(findRoot(parentDir));
global.rootRequire = function () {
	let name = arguments.length <= 0 || arguments[0] === undefined ? 'development' : arguments[0];
	let folder = arguments[1];

	return require(findRoot(parentDir) + folder + name);
};