'use strict'

const remark      = require('remark')

module.exports = function () {
	const $       = this.opts.$
	const gulp    = this.opts.gulp
	const options = this.opts.options

	return gulp.src('.aux/readme/*.mustache')
	.pipe($.plumber({errorHandler: options.error}))
	.pipe($.sort())
	.pipe($.concat('README.md'))
	.pipe($.mustache({
		package: options.package,
		license: options.license,
		year: new Date().getFullYear()
	}))
	.pipe($.tap( (file) => {
		const processor = remark().use([
			require('remark-toc'),
			require('remark-github')
		])
		const doc = processor.process(String(file.contents))
		file.contents = new Buffer(doc)
	}))
	.pipe(gulp.dest('./'))
}

