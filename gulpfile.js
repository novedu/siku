//导入插件
let gulp = require('gulp');
let concat = require('gulp-concat');
let cssnano = require('gulp-cssnano');
let htmlmin = require('gulp-htmlmin');
let imagemin = require('gulp-imagemin');
let rename = require('gulp-rename');
let sass = require('gulp-sass');
let uglify = require('gulp-uglify');
let babel = require('gulp-babel');
let autoprefixer = require("gulp-autoprefixer");

// 二、创建任务

// // //处理css任务
// function fnCss() {
//     return gulp.src('./src/sass/*.css')
//         .pipe(cssnano())
//         .pipe(rename({ suffix: '.min' }))
//         .pipe(gulp.dest('./dist/css'))
// }

//处理js
function fnJs() {
    return gulp.src('./src/js/es6/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/js'))
}

//处理首页
function copyIndex() {
    return gulp.src("./src/index.html")
        .pipe(gulp.dest("./dist"))
}

// 处理html的指令：压缩
function htmlFn(){
    return gulp.src("./src/pages/**/*")
        .pipe(htmlmin({
            removeEmptyAttributes:true,
            collapseWhitespace:true
        }))
        .pipe(gulp.dest("./dist/pages"))
}

// 处理sass文件，编译为css文件
function sassFn(){
    return gulp.src("./src/sass/**/*")
        .pipe(sass())
        .pipe(autoprefixer("last 2 version","safari 5","ie 8","ie 9","opera 12.1","ios 6","android 4"))
        .pipe(cssnano())
        .pipe(rename({suffix : '.min'}))
        .pipe(gulp.dest("dist/css"))
}
exports.sass = sassFn;



//处理图片
function Img(){
    return gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
}

// libs文件夹的批量转存
function fnLibs(){
    return gulp.src("./src/libs/**/*")
        .pipe(gulp.dest("./dist/libs"))
}

//监听任务
function fnWatch() {
    gulp.watch('./src/js/es6/*.js', fnJs);
    // gulp.watch('./src/sass/*.css', fnCss);
    gulp.watch('./src/index.html',copyIndex);
    gulp.watch('./src/src/img/*',Img);
    gulp.watch("./src/libs/**/*",fnLibs);
    gulp.watch("./src/pages/**/*",htmlFn);
    gulp.watch("./src/sass/**/*",sassFn);
}

// 三、导出任务

// exports.css = fnCss;
exports.js = fnJs;
exports.index = copyIndex;
exports.img = Img;
exports.default = fnWatch;
exports.libs = fnLibs;
exports.html = htmlFn;
exports.all = gulp.series(fnJs,copyIndex,Img,fnLibs,htmlFn,sassFn);