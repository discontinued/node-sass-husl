'use strict'

const $           = require('gulp-load-plugins')()
const gulp        = require('gulp')
let options       = false

require('./.aux/options')
.then(function (result) {
	options = result
})

require('deasync').loopWhile(function () {
	return !options
})

require('gulp-task-loader')(
	{
		dir: '.aux/build',
		options,
		$,
		gulp
	}
)

