"use strict";

//////////////////////////////


var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var combineMq = require('gulp-combine-mq');
var postcss = require("gulp-postcss");
var autoprefixer = require('gulp-autoprefixer');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var rigger = require('gulp-rigger');
var cssmin = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var rimraf = require('gulp-dest-clean');
var concat = require('gulp-concat');
var rename = require("gulp-rename");
var browserSync = require("browser-sync");
var reload = browserSync.reload;

var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: '',
        js: 'js/',
        css: 'css/',
        img: 'img/',
        fonts: 'fonts/'
    },
    src: { //Пути откуда брать исходники
        html: 'source/*.html', // все файлы с расширением .html
        js: ['source/js/vendors/*.js', 'source/js/*.js'],
        style: ['source/less/style.less'],
        img: 'source/img/**/*.{jpg,jpeg,png,gif}',
		    imgsvg: 'source/img/**/*.svg',
        fonts: 'source/fonts/**/*.*'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'source/**/*.html',
        js: 'source/js/**/*.js',
        style: 'source/less/**/*.less',
        img: 'source/img/**/*.{jpg,jpeg,png,gif}',
		    imgsvg: 'source/img/**/*.svg',
        fonts: 'source/fonts/**/*.*'
    },
    clean: './build'
};

// Переменная с настройками dev сервера
var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Pink"
};

// Сборка HTML
gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

// Сборка javascript
gulp.task('js:build', function () {
    gulp.src(path.src.js) //Найдем наши js
        .pipe(rigger()) //Прогоним через rigger
        // .pipe(sourcemaps.init()) //Инициализируем sourcemap
        // .pipe(sourcemaps.write()) //Пропишем карты
        .pipe(concat('main.js'))
        .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
        .pipe(uglify()) //Сожмем наш js
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
        .pipe(reload({stream: true})); //И перезагрузим сервер
});

// Сборка стилей
gulp.task('style:build', function () {
    gulp.src(path.src.style) //Выберем style.less
        // .pipe(sourcemaps.init())
        .pipe(less()) //Скомпилируем
        .pipe(autoprefixer()) //Добавим вендорные префиксы
		    .pipe(combineMq()) //Медиа-выражения
        // .pipe(sourcemaps.write())
        .pipe(concat('style.css'))
        .pipe(gulp.dest(path.build.css))
        .pipe(cssmin()) //Сожмем
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

// Сжатие картинок
gulp.task('imagemin:build', function () {
    gulp.src(path.src.img) //Выберем наши картинки
        .pipe(imagemin({ //Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

// Сжатие .svg
gulp.task('imagesvg:build', function () {
    gulp.src(path.src.imgsvg) //Выберем наши картинки
        .pipe(imagemin({ //Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

// Шрифты
gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

// Локальный веб-сервер
gulp.task('webserver', function () {
    browserSync(config);
});

// Очистка build
gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task("start", ["style"], function() {
  gulp.watch("less/**/*.less", ["style"]);
});

// Сборка
gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'imagemin:build',
	  'imagesvg:build'
]);

// Отслеживание изменений
gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('imagemin:build');
    });
    watch([path.watch.imgsvg], function(event, cb) {
        gulp.start('imagesvg:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});
