const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const jsonminify = require("gulp-jsonminify");
const imagemin = require("gulp-imagemin");
const autoprefixer = require("gulp-autoprefixer");

// Where your Less files are located
const srcDir = './styles';
// Where your CSS files will be generated
const dstDir = './styles';


//automatic save css
// gulp.task('sass', function() {
// 	gulp
// 		.src(`${srcDir}/*.scss`)
// 		.pipe(less())
// 		.pipe(gulp.dest(dstDir));
// });

// gulp.task('default', ['sass'], function() {
// 	gulp.watch(`${srcDir}/*.scss`, ['sass']);
// });

var autoprefixBrowsers = ['> 1%', 'last 2 versions', 'firefox >= 4', 'safari 7', 'safari 8', 'IE 8', 'IE 9', 'IE 10', 'IE 11'];



gulp.task("sass", function() {
  gulp.src(`${srcDir}/*.scss`)
      .pipe(sass().on("error", sass.logError))
      .pipe(autoprefixer({
        // browsers: ['last 1 versions'],
        // browsers: autoprefixBrowsers,
        "overrideBrowserslist": [
          "> 1%",
          "last 2 versions"
        ],
        cascade: false
      }))
      .pipe(gulp.dest("dist/styles"))
});




//end automatic save css


// minify javascript
gulp.task("minify", function() {
  gulp.src("script/*.js")
      .pipe(uglify())
      .pipe(gulp.dest("dist/script"))
});

//minify json
gulp.task("jsonminify", function() {
  gulp.src("data/*.json")
      .pipe(jsonminify())
      .pipe(gulp.dest("dist/data"))
});
//end minify json

//optimize images
gulp.task("imagemin", function() {
  gulp.src("img/*")
      .pipe(imagemin())
      .pipe(gulp.dest("dist/img"))
});
//end optimize images

// copy html files
gulp.task("copyHTML", function() {
  gulp.src("*.html")
      .pipe(gulp.dest("dist"))
});
//end copy html files

// copy cssfiles
gulp.task("copyCSS", function() {
  gulp.src("styles/*.css")
      .pipe(gulp.dest("dist/styles"))
});
//end copy css files

// copy fonts
gulp.task("copyFONTS", function() {
  gulp.src("fonts/*.*")
      .pipe(gulp.dest("dist/fonts"))
});
//end copy fonts

gulp.task("default", ["sass", "minify", "jsonminify", "imagemin", "copyHTML", "copyCSS", "copyFONTS"]);

gulp.task("watch", function() {
  gulp.watch("styles/*.scss", ["sass"]);
  gulp.watch("script/*.js", ["minify"]);
  gulp.watch("data/*.json", ["jsonminify"]);
  gulp.watch("img/*", ["imagemin"]);
  gulp.watch("*.html", ["copyHTML"]);
  gulp.watch("styles/*.css", ["copyCSS"]);
  gulp.watch("fonts/*.*", ["copyFONTS"]);
});
