'use strict';
//Importa os pacotes
var gulp = require("gulp"),
	less = require("gulp-less"),
	uglifycss = require("gulp-uglifycss"),
	plumber = require("gulp-plumber"),
	sourcemaps = require('gulp-sourcemaps'),
	concat = require("gulp-concat"),
	src = {};
	src.localLESSWatch = "../public/styles/less/*.less";
	src.localLESS = "../public/styles/less/main.less";
	src.localLESSDest = "../public/styles/css";
	src.localJS = "../public/styles/js/*.js";

gulp.task("less",function(){
	gulp.src(src.localLESS)
		.pipe(less())
		.pipe(sourcemaps.init())
			.pipe(plumber())
			.pipe(uglifycss())
			.pipe(concat('custom.css'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(src.localLESSDest));
});
gulp.task("watch",function(){
	gulp.watch([src.localLESSWatch], ['less']);
});
gulp.task("default",['less'])