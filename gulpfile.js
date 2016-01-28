/**
 * Created by zhangrui on 1/28/16.
 */
var gulp = require("gulp");
var umdwrap = require("./");

gulp.task('umdwrap', function() {
    return gulp.src('./demo.js')
        .pipe(umdwrap())
        .pipe(gulp.dest('./demo/'));
});