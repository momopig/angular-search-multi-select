var gulp = require('gulp');
var runSequence = require('run-sequence');
var gulpif = require('gulp-if');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var webpack = require("webpack");
var webpackConfig = require("./webpack.config.js");
var connect = require('gulp-connect');

//路径
var jsSrc = './src/.dist_js/*.js',
    jsSrcMap = './src/.dist_js/*.map',
    jsDist = './dist/js',
    docsDist = './docs/js',

    condition = false;


//html min options
var htmlminOptions = {
    removeComments: true,//清除HTML注释
    collapseWhitespace: true,//压缩HTML
    collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==>     <input />
    removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input     />
    removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
    minifyJS: true,//压缩页面JS
    minifyCSS: true//压缩页面CSS
}

//使用webpack 构建js模块文件
gulp.task("webpack", function (callback) {
    var config = Object.create(webpackConfig);
    // run webpack
    webpack(config, function (err, stats) {
        callback && callback();
    });
});

//压缩js生成版本号
gulp.task('devJs', function () {
    return gulp.src(jsSrc)
        .pipe(gulpif(condition, rev()))
        .pipe(gulp.dest(jsDist))
        .pipe(gulp.dest(docsDist))
        .pipe(gulpif(condition, rev.manifest()))
        .pipe(gulpif(condition, gulp.dest('./src/.rev/js')));
});
gulp.task('devJsSourceMap', function() {
    return gulp.src(jsSrcMap)
        .pipe(gulp.dest(jsDist))
        .pipe(gulp.dest(docsDist));
})

//对文件修改的舰艇，实现修改即自动编译
gulp.task('watch', function () {
    condition = false;
    gulp.watch('./src/**/*', ['webpack']);
    gulp.watch(jsSrc, ['devJs']);
    gulp.watch(jsSrcMap, ['devJsSourceMap']);
});

//开发环境
gulp.task('dev', function (done) {
    condition = false;
    runSequence(
        ['webpack'],
        ['devJs', 'devJsSourceMap'],
        done
    );
});

//跨域API代理
gulp.task('demo', function (done) {
    runSequence(
        ['dev'],
        ['watch'],
        ['connect'],
        done
    );
});

gulp.task('connect', function () {
    connect.server({
        root: ['./docs', './node_modules', './dist'],
        debug: true,
        port: 8082
    });
});
