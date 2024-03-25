const {src, dest, watch, series} = require('gulp');

// css y sass
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
// const cssnano = require('cssnano')

// images
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');


function css(done) {
    // pasos: 1- identificar el archivo, 2. compilar, 3. guardar css
    src('./src/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        // .pipe(postcss([autoprefixer(), cssnano() ]))
        .pipe(postcss([autoprefixer()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./build/css'))

    done()        
}


function images(done) {
    src('./src/img/**/*')
        .pipe(imagemin({optimizationLevel: 3}))
        .pipe(dest('./build/img'))

    done()        
}

function versionWebp(done) {
    src('./src/img/**/*.{png,jpg}')
        .pipe(webp())
        .pipe(dest('./build/img'))
    
    done()        
}

function versionAvif(done) {
    const opciones = {quality:50} 

    src('./src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('./build/img'))
    
    done()        
}


function dev(done) {
    watch('./src/scss/**/*.scss', css)
    watch('./src/img/**/*.', images)

    done()    
}


exports.css = css;
exports.dev = dev;
exports.images = images;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series(images, versionWebp, versionAvif, css, dev);