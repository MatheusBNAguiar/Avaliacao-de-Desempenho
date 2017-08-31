var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    jade = require('gulp-jade'),
    sass = require('gulp-ruby-sass'),
    notify = require("gulp-notify"),
    bower = require('gulp-bower'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

var config = {
    sassPath: './dev/sass',
    bowerDir: './bower_components'
}



gulp.task('scripts', function() {
    return gulp.src('./dev/js/*.js')
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./src/js'))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./src/js'));
});
gulp.task('css', function() {
    return gulp.src('./dev/css/*.css')
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./src/css'));
});


gulp.task('convertImage',function(){
  gulp.src('dev/img/*')
  .pipe(imagemin())
  .pipe(gulp.dest('./src/img'))
});

gulp.task('sass', function() {
  return sass(config.sassPath + '/main-style.scss',{
    style: 'ore',
    loadPath: [
      './dev/sass',
    ]
  })
  .on("error", notify.onError(function (error) {
    return "Error: " + error.message;
  }))
  .pipe(gulp.dest('./dev/css/'));
});


gulp.task('watch', function() {
  gulp.watch(config.sassPath + '/main-style.scss', ['sass']);
  gulp.watch('./dev/css/*', ['css']);
  gulp.watch('./dev/img/*', ['convertImage']);
  gulp.watch('./dev/js/*.js', ['scripts']);
});
