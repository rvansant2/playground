var gulp = require('gulp'),
    sass = require('gulp-sass');

//Sass
gulp.task('sass', function() {
    gulp.src('scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css/'));
});
//Watch tasks
gulp.task('watch', function() {
    gulp.watch('scss/**/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'watch']);