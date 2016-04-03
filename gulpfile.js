var gulp = require('gulp');
var ts = require('gulp-typescript');
var plumber = require('gulp-plumber');

// TypeScript options JSON
var tsOptions = require('./node_config/ts-option');
tsOptions.typescript = require('typescript');
 
gulp.task('typescript', function () {
	return gulp.src('script/ts/**/*.ts')
		.pipe(plumber())
		.pipe(ts(tsOptions))
		.pipe(gulp.dest('script/js'));
});
