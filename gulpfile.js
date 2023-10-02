import task from "gulp";

import gulp from "gulp";
// import sass from "gulp-sass".require('sass');
// const sass = require('gulp-sass')(require('sass'));
import gulpSass from "gulp-sass";
import nodeSass from "node-sass";
    
const sass = gulpSass(nodeSass);
import sourcemaps from "gulp-sourcemaps";
import watch from "gulp-watch";

gulp.task("sass-compile", function () {
  return gulp
    .src("./scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./css/"));
});
gulp.task("watch", function () {  
  gulp.watch("./scss/**/*.scss", gulp.series("sass-compile"));
});

function html() {
  src("src/**.html").pipe(
    include({
      prefix: "@@",
    })
  );
}
