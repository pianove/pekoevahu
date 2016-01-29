// Include gulp
var gulp = require('gulp');

// Include Plugins
var jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    cssmin = require('gulp-minify-css'),
    imgmin = require('imagemin-jpeg-recompress'),
    gutil = require('gulp-util'),
    connect = require('gulp-connect'),
//    sass = require('gulp-ruby-sass'),
    webserver = require('gulp-webserver'),
    sourcemaps = require('gulp-sourcemaps'),
//    imagemin = require('gulp-imagemin'),
    minifyhtml = require('gulp-minify-html');


//Paths to various files
var paths = {
    scripts: ['js/*.js','bower_components/jquery/dist/jquery.js'],
    stylesSass: ['scss/style.scss','scss/styles/*.scss'],
    styles: ['css', 'styles/*.css', 'css/*.css'],
    images: ['img/**/*', 'images/**/*'],
    content: ['index.html','*.html']
};

// Lint Task
gulp.task('lint', function() {
    gulp.src(paths.scripts)
        .pipe(jshint())        .pipe(jshint.reporter('default'));
});


// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src(paths.stylesSass)
        .pipe(sass())
        .pipe(gulp.dest('public/scss'));
});


// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(paths.scripts)
        .pipe(concat('js/all.js'))
        .pipe(gulp.dest('public'))
        .pipe(rename('all.min.js'))
        .pipe(uglify().on('error', gutil.log))
        .pipe(gulp.dest('public/js'));
});


// Concatenate & Minify CSS
gulp.task('cssmin', function() {
    return gulp.src(paths.styles)
        .pipe(cssmin())
        .pipe(concat('all.css'))
        .pipe(rename('all.min.css'))
        .pipe(gulp.dest('public/css'));
});

// Optimize jpg
gulp.task('imgmin', function () {
    return gulp.src(paths.images)
//        .pipe(imgmin({loops: 3})())
        .pipe(gulp.dest('public/images/'));
});

//Minify html
gulp.task('content', function() {
    return gulp.src(paths.content)
        .pipe(minifyhtml({
            empty: true,
            quotes: true
        }))
        .pipe(gulp.dest('public'));
});



// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['lint']);
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.stylesSass, ['sass']);
    gulp.watch(paths.styles, ['cssmin']);
    gulp.watch(paths.content, ['content']);
    gulp.watch(paths.images, ['imgmin']);
});

//Connect to local server
gulp.task('webserver', function() {
    connect.server({
//        livereload: true
    });
});


// Default Task
gulp.task('default', ['lint', 'sass', 'scripts','cssmin','imgmin', 'content', 'webserver', 'watch']);
