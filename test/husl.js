'use strict'

const sass = require('node-sass')
const husl = require('../src/index.js')
const chai = require('chai')

function converter (data) {
	return sass.renderSync({
		data,
		functions: {
			'husl($arg)': husl,
			'huslp($arg)': husl.p
		}
	}).css.toString('utf8')
}

describe('Human-friendly HSL colors for node-sass.', function () {
	describe('sass color to husl converter', function () {
		it('converts basic colors', function () {
			const red = converter('body { content: quote(husl(#ff0000))};')
			.match(/[0-9\.]+/g)

			chai.expect(Math.round(red[0])).to.equal(12)
			chai.expect(Math.round(red[1])).to.equal(100)
			chai.expect(Math.round(red[2])).to.equal(53)
		})
	})

	describe('husl color to sass converter', function () {
		it('converts basic colors', function () {
			const red = converter('body { content: quote(husl((hue: 12.17705, saturation: 100, lightness: 53.23712, alpha: 0.9)))};')
			.match(/[0-9\.]+/g)

			chai.expect(Number(red[0])).to.equal(255)
			chai.expect(Number(red[1])).to.equal(0)
			chai.expect(Number(red[2])).to.equal(0)
			chai.expect(Number(red[3])).to.equal(0.9)
		})
	})
})
