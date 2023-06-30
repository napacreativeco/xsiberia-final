// GULPFILE.JS
'use strict';

const gulp = require('gulp');
const { series } = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const minify = require('gulp-minify');


/* =========================
   Build Styles
   ========================= */
function buildStyles() {
    return gulp.src('./src/scss/throne.scss')
        .pipe(sass().on('error',sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ["last 2 versions"]
        }))
        .pipe(cleanCSS({ debug: true },(details) => {
            console.log(`${details.name}: ${details.stats.originalSize}`);
            console.log(`${details.name}: ${details.stats.minifiedSize}`);
        }))
        .pipe(gulp.dest('./assets/'));
};

exports.buildStyles = buildStyles;

/* =========================
   Build Scripts
   ========================= */
function buildScripts() {
    return gulp.src(['./src/js/throne.js'])
        .pipe(gulp.dest('./assets/'));
};

exports.buildScripts = buildScripts;

function watch() {
    gulp.watch('./src/scss/**/*.scss',buildStyles);
    gulp.watch('./src/js/**/*.js',buildScripts);
}
exports.watch = watch;

exports.default = series(buildStyles,buildScripts,watch);