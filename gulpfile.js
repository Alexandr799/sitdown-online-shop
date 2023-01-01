const { src, dest, series, watch } = require("gulp");
const htmlmin = require("gulp-htmlmin");
const path = require('path')
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const image = require("gulp-image");
const browserSync = require("browser-sync").create();
const sourcemaps = require("gulp-sourcemaps");
const del = require("del");
const sass = require("gulp-sass")(require("sass"));
const webpack = require("webpack-stream");
const webpackConfig = require("./webpack.config.js");
const webp = require('gulp-webp');

const clean = () => {
  return del("dist");
};

const cleanImg = () => {
  return del(['./dist/assets/images/*.jpg','./dist/assets/images/*.png']);
};

const resourcesFonts = () => {
  return src("./src/assets/fonts/**").pipe(dest("dist/assets/fonts"));
};

const resourcesImg = () => {
  return src("./src/assets/images/**").pipe(webp()).pipe(dest("dist/assets/images"));
};

const compilireCssDev = () => {
  return src([
    "./src/style/index.scss",
    "./src/style/catalog.scss",
    "./src/style/cart.scss",
    "./src/style/corp.scss",
  ])
    .pipe(sass().on("error", sass.logError))
    .pipe(dest("./src/style/css"))
    .pipe(browserSync.stream());
};

const compilireCssBuild = () => {
  return src([
    "./src/style/index.scss",
    "./src/style/catalog.scss",
    "./src/style/cart.scss",
    "./src/style/corp.scss",
  ])
    .pipe(sass().on("error", sass.logError))
    .pipe(dest("./src/style/css"));
};

const stylesDev = () => {
  return src("./src/style/css/*.css")
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(dest("dist/style"))
    .pipe(browserSync.stream());
};

const stylesBuild = () => {
  return src("./src/style/css/*.css")
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(cleanCSS({ level: 2 }))
    .pipe(dest("dist/style"));
};

const indexDev = () => {
  return src("./src/index.html").pipe(dest("dist")).pipe(browserSync.stream());
};

const indexBuild = () => {
  return src("./src/index.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest("dist"));
};

const htmlDev = () => {
  return src("./src/views/**/*.html")
    .pipe(dest("dist/views"))
    .pipe(browserSync.stream());
};

const htmlBuild = () => {
  return src("./src/views/**/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest("dist/views"));
};

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'dist',
      index:'index.html',
    },
    port: 8080
  });
};

const imagesBuild = () => {
  return src([
    "./src/assets/images/*.jpg",
    "./src/assets/images/*.jpeg",
    "./src/assets/images/*.svg",
    "./src/assets/images/*.png",
  ])
    .pipe(image())
    .pipe(webp())
    .pipe(dest("dist/assets/images"));
};

const webpackBundlDev = () => {
  webpackConfig.mode = "development";
  return src([
    "./src/scripts/index.js",
    "./src/scripts/cart.js",
    "./src/scripts/def.js",
    "./src/scripts/catalog.js",
  ])
    .pipe(webpack(webpackConfig))
    .pipe(dest("dist/scripts"));
};

const webpackBundlBuild = () => {
  webpackConfig.mode = "production";
  return src(
    "./src/scripts/index.js",
    "./src/scripts/cart.js",
    "./src/scripts/def.js",
    "./src/scripts/catalog.js"
  )
    .pipe(webpack(webpackConfig))
    .pipe(dest("dist/scripts"));
};

watch("./src/style/**/*.scss", compilireCssDev);
watch("./src/index.html", indexDev);
watch("./src/views/**/*.html", htmlDev);
watch("./src/style/**/*.css", stylesDev);
watch("./src/scripts/**/*.js", webpackBundlDev);
watch("./src/assets/fonts/**", resourcesFonts);
watch("./src/assets/images/**", resourcesImg);

exports.clean = clean;
exports.dev = series(
  clean,
  resourcesFonts,
  resourcesImg,
  compilireCssDev,
  stylesDev,
  indexDev,
  htmlDev,
  webpackBundlDev,
  watchFiles
);
exports.build = series(
  clean,
  resourcesFonts,
  resourcesImg,
  compilireCssBuild,
  stylesBuild,
  webpackBundlBuild,
  indexBuild,
  htmlBuild,
  imagesBuild,
  cleanImg
);
