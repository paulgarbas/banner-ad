const { src, dest, watch, parallel } = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browsersync = require('browser-sync').create(); 
 
function style(cb) {
    src('scss/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(dest('css/'))
        .pipe(browsersync.stream());

        cb();
}

// BrowserSync
function browserSync() {
    browsersync.init({
        server: {
            baseDir: './'
        }
    });
}

// BrowserSync Reload
function browserSyncReload() {
    browsersync.reload();
}

function watchFiles() {
    watch('scss/**/*.scss', style);
    watch(['./*.html', './js/**/*.js'], browsersync.reload);
}

const watching = parallel(watchFiles, browserSync);
 
exports.style = style;
exports.browserSync = browserSync;
exports.watchFiles = watchFiles; 
exports.watching = watching;