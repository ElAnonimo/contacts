var gulp = require('gulp'), // Сообственно Gulp JS
    csso = require('gulp-csso'), // Минификация CSS
    uglify = require('gulp-uglify'), // Минификация JS
    rename = require('gulp-rename'),
    header = require('gulp-header'),
    replace = require('gulp-replace'),
    size = require('gulp-size'),
    open = require('gulp-open'),
    todo = require('gulp-todo'),
    m_replace = require('gulp-m-replace'),
    data_uri = require('gulp-data-uri'),
    exec = require('gulp-exec'),
    prefix = require('gulp-autoprefixer'),
    mocha = require('gulp-mocha'),
    browserSync = require('browser-sync'),
    reload      = browserSync.reload,
    rimraf = require('gulp-rimraf'), //удаление файлов и папок
    concat = require('gulp-concat'); // Склейка файлов


gulp.task('core', function() {
    gulp.src(['./static/aksjsl/dev/core/core.js'])
        .pipe(uglify())
        .pipe(rename({basename: "core.min"}))
        .pipe(gulp.dest('./static/aksjsl/build/core'));

});

gulp.task('components_css', function(e) {
    var stream = gulp.src(['./static/aksjsl/dev/components/**/main.css'])
        .pipe(prefix("last 5 version", "> 1%", "ie >= 8"))
        .pipe(data_uri())
        .pipe(csso())
        .pipe(rename({basename: "main.min"}))
        .pipe(gulp.dest('./static/aksjsl/build/components'));
    return stream;
});
gulp.task('clear_components_css', ['components_js'], function(e) {
    var stream = gulp.src(['./static/aksjsl/build/components/**/main.min.css'], {read:false})
        .pipe(rimraf());
    return stream;
});
gulp.task('components_js', ['components_css'], function(e) {
    var stream = gulp.src(['./static/aksjsl/dev/components/**/main.js'])
        .pipe(uglify())
        .pipe(m_replace(/{%CSS%}/g,"<%= file.path %>"))
        .pipe(rename({basename: "main.min"}))
        .pipe(gulp.dest('./static/aksjsl/build/components'));
    return stream;
});

gulp.task('test', function(e) {
    var stream = gulp.src(['./test/*.html'])
        .pipe(exec('mocha-phantomjs <%= file.path %>'));
    return stream;
});

gulp.task('size-dev', function(e) {
    var stream = gulp.src(['./static/aksjsl/dev/core/core.js','./static/aksjsl/dev/components/**/main.js','./static/aksjsl/dev/components/**/main.css'])
        .pipe(size({title:'dev size - '}));
    return stream;
});
gulp.task('size-build', function(e) {
    var stream = gulp.src(['./static/aksjsl/build/core/core.min.js','./static/aksjsl/build/components/**/main.min.js'])
        .pipe(size({title:'build size - '}));
    return stream;
});
gulp.task('size', ['components_css', 'components_js', 'core'], function(e) {
    gulp.run('size-dev');
    gulp.run('size-build');
});

gulp.task('components', function(e) {
    gulp.run('components_css');
    gulp.run('components_js');
    gulp.run('clear_components_css');
});

gulp.task('todo', function(e) {
    gulp.src(['./static/aksjsl/dev/core/core.js','./static/aksjsl/dev/components/**/main.js'])
        .pipe(todo({fileName: 'todo.md',newLine: '\n'}))
        .pipe(gulp.dest('./'));
});

gulp.task('build', function() {
    gulp.run('todo','core', 'components', 'size');
});

gulp.task('browser-sync', function() {
    browserSync({
        proxy: "http://localhost:89/"
    });
});
gulp.task('reload', function() {
    reload();
});
gulp.task('sync', ['browser-sync'], function () {
    gulp.watch(["./static/aksjsl/dev/components/**/main.css","./static/aksjsl/dev/components/**/main.js",
        "./static/aksjsl/dev/core/core.js", "./static/aksjsl/aksjsl.js",
        "./../aksjsconf/static/**.html", "./../aksjsconf/static/formsn/**.json"], ['reload']);
});

//mocha -R spec test/selenium/test_ref.js
//export PATH=$PATH:/home/eremeev/selenium/
// -b false go after error
//-R list
