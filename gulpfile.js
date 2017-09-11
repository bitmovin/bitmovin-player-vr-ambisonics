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

var paths = {
  source: {
    html: ['./src/html/*.html'],
    tsmain: ['./src/ts/main.ts'],
    ts: ['./src/ts/**/*.ts'],
  },
  target: {
    html: './dist',
    js: './dist/js',
    jsframework: './dist/js/framework',
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
var production = false;

// Deletes the target directory containing all generated files
gulp.task('clean', del.bind(null, [paths.target.html]));

// TypeScript linting
gulp.task('lint-ts', function() {
  return gulp.src(paths.source.ts)
  .pipe(tslint({
    formatter: 'verbose',
    configuration: {
      rules: {
        'class-name': true,
        'comment-format': [true, 'check-space'],
        'indent': [true, 'spaces'],
        'no-duplicate-variable': true,
        'no-eval': true,
        'no-internal-module': true,
        'no-trailing-whitespace': true,
        'no-var-keyword': false,
        'one-line': [true, 'check-open-brace', 'check-whitespace'],
        'quotemark': [true, 'single'],
        'semicolon': false,
        'triple-equals': [true, 'allow-null-check'],
        'typedef-whitespace': [true, {
          'call-signature': 'nospace',
          'index-signature': 'nospace',
          'parameter': 'nospace',
          'property-declaration': 'nospace',
          'variable-declaration': 'nospace'
        }],
        'variable-name': [true, 'ban-keywords'],
        'whitespace': [true,
          'check-branch',
          'check-decl',
          'check-operator',
          'check-separator',
          'check-type'
        ]
      }
    }
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
  .pipe(source('bitmovinplayer-analytics-conviva.js'))
  .pipe(buffer())
  .pipe(gulp.dest(paths.target.js));

  if (production) {
    // Minify JS
    stream.pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(rename({extname: '.min.js'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.target.js));
  }

  stream.pipe(browserSync.reload({stream: true}));
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
  production = true;
  runSequence('lint', 'build', callback);
});

gulp.task('default', ['build']);

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
        routes: {
          '/conviva': './conviva'
        }
      }
    });

    gulp.watch(paths.source.html, ['html']).on('change', browserSync.reload);
    catchBrowserifyErrors = true;
    gulp.watch(paths.source.ts, ['browserify']);
  });
});

// Prepares the project for a npm release
// After running this task, the project can be published to npm or installed from this folder.
gulp.task('npm-prepare', ['build-prod'], function() {
  // https://www.npmjs.com/package/gulp-typescript
  var tsProject = ts.createProject('tsconfig.json');
  var tsResult = gulp.src(paths.source.ts).pipe(tsProject());

  return merge([
    tsResult.dts.pipe(gulp.dest(paths.target.jsframework)),
    tsResult.js.pipe(gulp.dest(paths.target.jsframework))
  ]);
});