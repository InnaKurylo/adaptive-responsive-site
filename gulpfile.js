const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass")(require("sass"));
const clean = require("gulp-clean");
const imagemin = import("gulp-imagemin");
const minify = require("gulp-minify");
const paths = {
  images: {
    src: "src/img/*",
    dest: "dist/img",
  },
  scripts: {
    src: "src/js/*.js",
    dest: "dist/js/",
  },
  styles: {
    src: "./src/scss/**/*.scss",
    dest: "./dist/css",
  },
};

async function images_to_dist() {
  const imagemin = await import("gulp-imagemin");
  const imagePlugins = [
    imagemin.svgo({ plugins: [{ name: "removeViewBox", active: true }] }),
  ];
  return gulp
    .src(paths.images.src)
    .pipe(imagemin.default(imagePlugins))
    .pipe(gulp.dest(paths.images.dest));
}

exports.img = images_to_dist;

function clear() {
  return gulp
    .src("./dist/*", {
      read: false,
    })
    .pipe(clean());
}

exports.clear = clear;

function buildStyles() {
  return gulp
    .src(paths.styles.src)
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(gulp.dest(paths.styles.dest));
}

exports.buildStyles = buildStyles;

function buildScripts() {
  return gulp
    .src(paths.scripts.src)
    .pipe(minify({ noSource: true }))
    .pipe(gulp.dest(paths.scripts.dest));
}

exports.buildScripts = buildScripts;

function watchStyles() {
  gulp.watch(paths.styles.src, buildStyles).on("change", browserSync.reload);
  gulp.watch("*.html").on("change", browserSync.reload);
}

exports.watchStyles = watchStyles;

function watchScripts() {
  gulp.watch(paths.scripts.src, buildScripts).on("change", browserSync.reload);
}

exports.watchScripts = watchScripts;

function serve(cb) {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
  cb();
}

exports.serve = serve;

async function buildImgAndRunServer(cb) {
  await images_to_dist();
  serve(cb);
}

gulp.task("autoprefixer", () => {
  const autoprefixer = require("autoprefixer");
  const sourcemaps = require("gulp-sourcemaps");
  const postcss = require("gulp-postcss");

  return gulp
    .src("./src/*.css")
    .pipe(sourcemaps.init())
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist"));
});

exports.dev = gulp.parallel(watchStyles, watchScripts, buildImgAndRunServer);
exports.default = gulp.series(clear, gulp.parallel(buildStyles, buildScripts));
