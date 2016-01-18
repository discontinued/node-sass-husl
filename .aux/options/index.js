'use strict'

const _       = require('lodash')
const rd      = require('require-directory')
const path    = require('path')
const root    = require('find-root')
const Promise = require('bluebird')

const options = {path: {}}
options.path.root = path.resolve(root(__dirname))

options.error = function (error) {
	console.error(error)
}
const queue = []

_.cloneDeepWith(rd(module, __dirname), function (f, name) {
	if (_.isFunction(f)) {
		queue.push(f(options).then(function (result) {
			return [name, result]
		}))
	}
})

module.exports = Promise.all(queue)
.then(function (res) {
	return _.merge(options, _.fromPairs(res))
})
.catch(function (e) {
	options.error(e)
})

