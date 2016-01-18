# node-sass-husl

>  Human-friendly HSL colors for node-sass

<p align="right">
    <a href="https://github.com/epiloque/node-sass-husl/blob/master/LICENSE">
        <img src="https://img.shields.io/npm/l/node-sass-husl.svg"
             alt="license">
    </a>
    <a href="https://npmjs.org/package/node-sass-husl">
        <img src="https://img.shields.io/npm/v/node-sass-husl.svg"
             alt="npm version">
    </a>
    <a href="https://travis-ci.org/epiloque/node-sass-husl">
        <img src="https://img.shields.io/travis/epiloque/node-sass-husl.svg"
             alt="build status">
    </a>
</p>

# Table of contents

-   [Getting Started](#getting-started)

    -   [With node-sass](#with-node-sass)
    -   [With gulp-sass](#with-gulp-sass)

-   [How to use](#how-to-use)

-   [License](#license)

# Getting Started

```bash
$ npm install node-sass-husl
```

## With node-sass

```javascript
const husl = require('node-sass-husl')

sass.render({
    file: scss_filename,
    functions: {
        'husl($arg)': husl,
        'huslp($arg)': husl.p
    }
}, function (err, result) { /*...*/ })
```

## With gulp-sass

```javascript
const husl = require('node-sass-husl')

gulp.task('sass', function () {
    return gulp.src('./sass/**/*.scss')
    .pipe(sass({
        outputStyle: 'compressed',
        functions: {
            'husl($arg)': husl,
            'huslp($arg)': husl.p
        }
    }).on('error', sass.logError))
    .pipe(gulp.dest('./css'))
})
```

# How to use

node-sass-husl relies on an experimental Libsass (>= v3.0.0) feature. Use with caution.

```sass
husl((hue: 12.2, saturation: 100.0, lightness: 53.2, alpha: 0.9))
```

Returns a [Color](http://sass-lang.com/documentation/Sass/Script/Value/Color.html)
from a [Map](http://sass-lang.com/documentation/Sass/Script/Value/Map.html)
of hue, saturation, lightness, and alpha (optional) values.

```sass
husl(#ff0000)
```

Returns a [Map](http://sass-lang.com/documentation/Sass/Script/Value/Map.html)
of hue, saturation, lightness, and alpha values.

# License

Copyright (c) 2016 Mark Milstein <mailto:mark@epiloque.com>

node-sass-husl is licensed under the MIT License

    http://www.opensource.org/licenses/MIT
