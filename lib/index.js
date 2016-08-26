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

var _appRootDir = require('app-root-dir');

var _appRootDir2 = _interopRequireDefault(_appRootDir);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

global.rootRequire = function () {
	let name = arguments.length <= 0 || arguments[0] === undefined ? 'development' : arguments[0];
	let path = arguments[1];

	return require(_appRootDir2.default.get() + path + name);
};