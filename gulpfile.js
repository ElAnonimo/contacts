var gulp = require('gulp'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    ngmin = require('gulp-ngmin'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-minify-css'),
    rimraf = require('gulp-rimraf'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;
var path = {
    build: { // Куда складывать готовые после сборки файлы
      js: 'build/js/'
    },
    src: { // Пути, откуда брать исходники
      js: 'src/js/main.js'// В стилях и скриптах понадобятся только main файлы
    },
    watch: { // За изменением каких файлов хотим наблюдать
      js: 'src/js/*.js'
    },
    clean: './build'
};
var config = {
    server: {
      baseDir: "./"
    },
    tunnel: true,
    host: 'localhost',
    port: 8000,
    logPrefix: "-"
};
gulp.task('js:build', function () {
    gulp.src(path.src.js) // Найдем main файл
			.pipe(rigger()) 
			.pipe(sourcemaps.init()) // Инициализируем sourcemap
			.pipe(ngmin())
			.pipe(uglify({mangle: false})) // Сожмем js
			.pipe(sourcemaps.write()) // Пропишем карты
			.pipe(gulp.dest(path.build.js)) // Поместим готовый файл в build
			.pipe(reload({stream: true})); // И перезагрузим сервер
});
gulp.task('build', [
  'js:build'
]);
gulp.task('watch', function(){
    watch([path.watch.js], function(event, cb) {
      gulp.start('js:build');
    });
});
gulp.task('webserver', function () {
  browserSync(config);
});

gulp.task('default', ['build', 'webserver', 'watch']);