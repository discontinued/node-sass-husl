'use strict'

const sass = require('node-sass')
const colors = require('husl')

function mixin (arg, husl) {
	if (arg instanceof sass.types.Color) {
		const color = {rgb: {}}
		color.rgb.red = arg.getR() / 255
		color.rgb.green = arg.getG() / 255
		color.rgb.blue = arg.getB() / 255
		color.rgb.alpha = arg.getA()

		const labels = ['hue', 'saturation', 'lightness']
		color.husl = husl
		.fromRGB(color.rgb.red, color.rgb.green, color.rgb.blue)
		.reduce(function (o, v, i) {
			o[labels[i]] = v
			return o
		}, {})

		color.husl.alpha = color.rgb.alpha

		const map = new sass.types.Map(4)
		map.setKey(0, new sass.types.String('hue'))
		map.setValue(0, new sass.types.Number(color.husl.hue))
		map.setKey(1, new sass.types.String('saturation'))
		map.setValue(1, new sass.types.Number(color.husl.saturation))
		map.setKey(2, new sass.types.String('lightness'))
		map.setValue(2, new sass.types.Number(color.husl.lightness))
		map.setKey(3, new sass.types.String('alpha'))
		map.setValue(3, new sass.types.Number(color.husl.alpha))
		return map
	}
	else if (arg instanceof sass.types.Map) {
		const color = {husl: {}}
		for (let i = 0; i < arg.getLength(); i++) {
			color.husl[arg.getKey(i).getValue()] = arg.getValue(i).getValue()
		}

		if (typeof color.husl.alpha === 'undefined') {
			color.husl.alpha = 1
		}

		const labels = ['red', 'green', 'blue']

		color.rgb = husl
		.toRGB(color.husl.hue, color.husl.saturation, color.husl.lightness)
		.reduce(function (o, v, i) {
			o[labels[i]] = v * 255
			return o
		}, {})

		color.rgb.alpha = color.husl.alpha

		return new sass.types.Color(color.rgb.red, color.rgb.green, color.rgb.blue, color.rgb.alpha)
	}
	else {
		return new sass.types.Null()
	}
}


module.exports = function (arg) {
	return mixin(arg, colors)
}

module.exports.p = function (arg) {
	// https://github.com/husl-colors/husl/issues/24
	return mixin(arg, colors.p)
}
