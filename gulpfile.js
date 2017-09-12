var gulp = require('gulp');

// Gulp plugins
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var tslint = require('gulp-tslint');
var ts = require('gulp-typescript');

// Browserify
var browserify = require('browserify');
var tsify = require('tsify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

// Various stuff
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var merge = require('merge2');
var nativeTslint = require('tslint');

var paths = {
  source: {
    html: ['./src/html/*.html'],
    tsmain: ['./src/ts/main.ts'],
    ts: ['./src/ts/**/*.ts'],
  },
  target: {
    html: './dist',
    js: './dist/js',
  }
};

var browserifyInstance = browserify({
  basedir: '.',
  debug: true,
  entries: paths.source.tsmain,
  cache: {},
  packageCache: {}
}).plugin(tsify);

var catchBrowserifyErrors = false;

// Deletes the target directory containing all generated files
gulp.task('clean', del.bind(null, [paths.target.html]));

// TypeScript linting
gulp.task('lint-ts', function() {
  // The program is required for type checking rules to work: https://palantir.github.io/tslint/usage/type-checking/
  var program = nativeTslint.Linter.createProgram("./tsconfig.json");

  return gulp.src(paths.source.ts)
  .pipe(tslint({
    formatter: 'verbose',
    program: program,
  }))
  .pipe(tslint.report({
    // Print just the number of errors (instead of printing all errors again)
    summarizeFailureOutput: true
  }))
});

// Runs all linters
gulp.task('lint', function(callback) {
  // this fails at first error so we can't run all linters sequentially with runSequence and then print the errors
  runSequence('lint-ts', callback);
  // TODO check in Gulp 4.0 if all linters can be run sequentially before aborting due to an error
});

// Copies html files to the target directory
gulp.task('html', function() {
  return gulp.src(paths.source.html)
  .pipe(gulp.dest(paths.target.html));
});

// Compiles JS and TypeScript to JS in the target directory
gulp.task('browserify', function() {
  var browserifyBundle = browserifyInstance.bundle();

  if (catchBrowserifyErrors) {
    // Normally an error breaks a running task. For permanent tasks like watch/serve, we want the task to
    // stay alive and ignore errors, so we catch them here and print them to the console.
    browserifyBundle.on('error', console.error.bind(console));
  }

  // Compile output JS file
  var stream = browserifyBundle
  .pipe(source('bitmovinplayer-vr-ambisonics.js'))
  .pipe(buffer())
  .pipe(gulp.dest(paths.target.js));

  // Minified production build
  stream.pipe(sourcemaps.init({loadMaps: true}))
  .pipe(uglify())
  .pipe(rename({extname: '.min.js'}))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(paths.target.js));

  return stream.pipe(browserSync.reload({stream: true}));
});

// Builds the complete project from the sources into the target directory
gulp.task('build', function(callback) {
  // First run 'clean', then the other tasks
  // TODO remove runSequence on Gulp 4.0 and use built in serial execution instead
  runSequence('clean',
    ['html', 'browserify'],
    callback);
});

gulp.task('build-prod', function(callback) {
  runSequence('lint', 'build', callback);
});

gulp.task('default', ['build-prod']);

// Watches files for changes and runs their build tasks
gulp.task('watch', function() {
  // Watch for changed html files
  gulp.watch(paths.source.html, ['html']);

  // Watch files for changes through Browserify with Watchify
  catchBrowserifyErrors = true;
  return browserifyInstance
  .plugin(watchify)
  // When a file has changed, rerun the browserify task to create an updated bundle
  .on('update', function() {
    gulp.start('browserify');
  })
  .bundle();
});

// Serves the project in the browser and updates it automatically on changes
gulp.task('serve', function() {
  runSequence(['build'], function() {
    browserSync({
      notify: false,
      port: 9000,
      server: {
        baseDir: [paths.target.html],
        index: 'test.html',
      }
    });

    gulp.watch(paths.source.html, ['html']).on('change', function() { runSequence('html', browserSync.reload); });
    catchBrowserifyErrors = true;
    gulp.watch(paths.source.ts, ['browserify']);
  });
});
