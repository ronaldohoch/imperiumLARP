'use strict';
//Importa os pacotes
var gulp = require("gulp"),
	sass = require("gulp-sass"),
	uglifycss = require("gulp-uglifycss"),
	plumber = require("gulp-plumber"),
	sourcemaps = require('gulp-sourcemaps'),
	concat = require("gulp-concat"),
	src = {};
	src.localSCSS = "./public/assets/scss/*.scss";
	src.localSCSSDest = "./public/assets/css";
	src.localJS = "./public/assets/js/*.js";
gulp.task("scss",function(){
	gulp.src(src.localSCSS)
		.pipe(sass().on('error',sass.logError))
		.pipe(sourcemaps.init())
			.pipe(plumber())
			// .pipe(uglifycss())
			.pipe(concat('main.css'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(src.localSCSSDest));
});
gulp.watch([src.localSCSS], ["scss"]);
gulp.task("default",['scss'])
// var gulp = require("gulp");
// var concat = require("gulp-concat");
// var uglify = require("gulp-uglify");
// var uglifycss = require("gulp-uglifycss");
// var watch = require("gulp-watch");
// var plumber = require("gulp-plumber");
// //tarefa para minificar os js existentes
// //nÃ£o mudamos os nomes pois a mudanÃ§a serve para alterar arquivos existentes em produÃ§Ã£o
// var src = {};
// 	src.localSCSS = ".public/assets/css/*.css";
// 	src.localJS = "./public/assets/js/*.js";


// gulp.task("js",function(){
// 	gulp.src(src.localJS)
// 		.pipe(plumber())
// 		.pipe(uglify())
// 		.pipe(gulp.dest("js"));
// });
// //tarefa para minificar os css existentes
// //nÃ£o mudamos os nomes pois a mudanÃ§a serve para alterar arquivos existentes em produÃ§Ã£o
// gulp.task("css",function(){
// 	gulp.src(src.localSCSS)
// 		.pipe(plumber())
// 		.pipe(uglifycss())
// 		.pipe(gulp.dest("css"));
// })

// gulp.watch([src.localJS], ["js"]);
// gulp.watch([src.localSCSS], ["css"]);
//
// gulp.task("default",['js','css']);