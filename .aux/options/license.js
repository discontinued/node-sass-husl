'use strict'

const _           = require('lodash')
const path        = require('path')
const Promise     = require('bluebird')
const readPackage = Promise.promisify(require('read-package-json'))

module.exports = Promise.method(function (options) {
	return readPackage(path.join(options.path.root, 'package.json'), _.noop, false).then(function (json) {
		const license = require('spdx-license-list/spdx-full')[json.license]
		license.url = license.url.split(/\n/)

		return license
	})
})
