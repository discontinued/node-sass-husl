'use strict'

module.exports = function () {
	const $       = this.opts.$
	const gulp    = this.opts.gulp
	const options = this.opts.options

	return gulp.src('.aux/license/*.mustache')
	.pipe($.plumber({errorHandler: options.error}))
	.pipe($.sort())
	.pipe($.concat('LICENSE'))
	.pipe($.mustache({
		package: options.package,
		license: options.license,
		year: new Date().getFullYear()
	}))
	.pipe(gulp.dest('./'))
}

