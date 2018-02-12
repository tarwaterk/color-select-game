const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");
const babel = require("gulp-babel");
const autoprefixer = require("gulp-autoprefixer");
const nodemon = require("gulp-nodemon");

gulp.task("browser-sync", function() {
    browserSync.init({
        proxy: "localhost:8000",
        port: 4000
    });
});

gulp.task("buildStyles", function() {
    return gulp.src("./source/styles/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 version'],
            cascade: false
        }))
        .pipe(gulp.dest("./dist/styles"))
        .pipe(browserSync.stream());
});

gulp.task("buildScripts", function() {
    return gulp.src("source/scripts/*.js")
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest("dist/scripts"))
        .pipe(browserSync.stream());
});

gulp.task("buildServerStyles", function() {
    return gulp.src("./source/styles/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 version'],
            cascade: false
        }))
        .pipe(gulp.dest("./dist/styles"));
});
gulp.task("buildServerScripts", function() {
    return gulp.src("source/scripts/*.js")
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest("dist/scripts"));
});

gulp.task("nodemon", function() {
    nodemon({
        script: "server.js",
        ext: "html js",
        env: {"NODE_ENV": "development"}
    });
});

gulp.task("watch", function() {
    gulp.watch(["./*.html", "./dist/**/*.*"], function() {
        browserSync.reload();
    });
    gulp.watch("./source/styles/*.scss", ["buildStyles"]);
    gulp.watch("./source/scripts/*.js", ["buildScripts"]);
});

gulp.task("default", function() {
    gulp.start("buildStyles", "nodemon", "watch", "browser-sync");
});