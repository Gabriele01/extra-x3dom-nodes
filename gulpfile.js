var gulp = require('gulp'); 
var concat = require('gulp-concat'); 
var uglify = require('gulp-uglify'); 
// var order = require('gulp-order'); 
var del = require('del'); 

var paths = {
     scripts : ['nodes/*/*.js'],
     out : ['./lib']
};

gulp.task('min',  function (){
     return  gulp.src(paths.scripts)
            .pipe(uglify())
            .pipe(concat('extra-x3dom-nodes.min.js'))
            .pipe(gulp.dest('./build'))
});

gulp.task('debug', function(){
    return gulp.src(paths.scripts)
           .pipe(concat('extra-x3dom-nodes.debug.js'))
           .pipe(gulp.dest('./build'));
});

gulp.task('default', [ 'min', 'debug']); 
