/**
 * Created by zhangrui on 1/28/16.
 */
var gulp = require("gulp");
var concat = require('gulp-concat');
var umdwrap = require("./");

var options = {
    name: 'demo',
    dep: [
        'mtb/lib-env',
        'mtb/lib-env2'
    ],
    exp: 'window.lib._libname_'
};

gulp.task('umd', function() {
    return gulp.src('./demo.js')
        .pipe(umdwrap(options))
        .pipe(concat('demo.umd.js'))
        .pipe(gulp.dest('./demo/'));
});

gulp.task('amd', function() {
    return gulp.src('./demo.js')
        .pipe(umdwrap(options, 'amd'))
        .pipe(concat('demo.amd.js'))
        .pipe(gulp.dest('./demo/'));
});

gulp.task('commonjs', function(){
    return gulp.src('./demo.js')
        .pipe(umdwrap(options, 'commonjs'))
        .pipe(concat('demo.common.js'))
        .pipe(gulp.dest('./demo/'));
});

gulp.task("demo", function(){
    gulp.start("amd", "umd", "commonjs");
});