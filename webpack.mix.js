
// webpack.mix.js

let mix = require('laravel-mix');

mix.browserSync({
    proxy: 'http://127.0.0.1:8000/'
})

mix.js('src/app.js', 'dist').setPublicPath('dist');