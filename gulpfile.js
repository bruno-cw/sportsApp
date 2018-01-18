var gulp = require('gulp')
var args = require('yargs').argv;
var merge = require('merge-stream')
var del = require('del')
var browserSync = require('browser-sync')
var plugins = require('gulp-load-plugins')({ lazy: true });

// ---------------------------------------------------------
// Default task to display all tasks listed
// How to run: gulp
// ---------------------------------------------------------
gulp.task('help', plugins.taskListing);
gulp.task('default', ['help']);

// ---------------------------------------------------------
// Analyzes the JavaScript files using jscs and jshint
// How to run: gulp vet
// ---------------------------------------------------------
gulp.task('validate', function () {
  log('Analyzing source with JSHint and JSCS');

  return gulp
    .src('src/sections/**/*.js')
    .pipe(plugins.if(args.verbose, plugins.print()))
    .pipe(plugins.jscs())
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish', { verbose: true }))
    .pipe(plugins.jshint.reporter('fail'));
});


// ---------------------------------------------------------
// STEP 1 - Delete the contents of the existing www folder
// ---------------------------------------------------------
gulp.task('build-clean', function () {
  log('Erased www folder');
  return del(['www/*']);

});

// ---------------------------------------------------------
// STEP 2 - Minify CSS and JS files; copy all images and fonts to www folder
// ---------------------------------------------------------
gulp.task('build-cssjs', ['build-clean'], function () {

  log('Minimizing CSS, JavaScript and copying files to www');

  var html = gulp.src('src/index.html')
    .pipe(plugins.useref())
    .pipe(plugins.if('*.js', plugins.uglify()))
    .pipe(plugins.if('*.css', plugins.csso({ restructure: false })))
    .pipe(gulp.dest('www'))

  var templates = gulp.src('src/sections/**/*.html')
    .pipe(plugins.angularTemplatecache({ root: 'sections/', module: 'sportsApp' }))
    .pipe(gulp.dest('www/assets/js/'));

  var fonts = gulp.src('src/assets/fonts/*')
    .pipe(gulp.dest('www/assets/fonts'))

  var images = gulp.src('src/assets/images/**/*')
    .pipe(gulp.dest('www/assets/images'))

  gulp.src('src/res/**/*')
    .pipe(gulp.dest('www/res'))


  return merge(html, templates, fonts, images)

})

// ---------------------------------------------------------
// STEP 3 - Add Angular .html template files
// ---------------------------------------------------------

gulp.task('build-templates', ['build-cssjs'], function () {

  log('Adding Angular templates to www build');

  gulp.src('./www/index.html')
    .pipe(plugins.inject(gulp.src('./www/assets/js/templ*.js', { read: false }), { relative: true }))
    .pipe(gulp.dest('./www'));

});

// ---------------------------------------------------------
// Main task to clean-up, minify and add templates
// How to run: gulp build
// ---------------------------------------------------------

gulp.task('build', ['build-cssjs', 'build-templates']);


// ---------------------------------------------------------
// Runs Browser Sync to perform cross-browser testing
// How to run: gulp serve-dev
// ---------------------------------------------------------

gulp.task('server', function () {
  startBrowserSync();

});

function startBrowserSync() {

  if (browserSync.active) {
    return;
  }

  log('Starting BrowserSync');

  var options = {

    port: 3000,
    files: [
      '/src/**/*.html',
      '/src/**/*.css',
      './src/**/*.js'
    ],
    startPath: "./src",
    server: true,
    ghostMode: {
      clicks: true,
      location: false,
      forms: true,
      scroll: true
    },
    injectChanges: true,
    logFileChanges: true,
    logLevel: 'debug',
    logPrefix: 'gulp-patterns',
    notify: true,
    reloadDelay: 1000 //1000
  };

  browserSync(options);

}


// ---------------------------------------------------------
// Aditional support functions
// ---------------------------------------------------------

function log(msg) {
  if (typeof (msg) === 'object') {
    for (var item in msg) {
      if (msg.hasOwnProperty(item)) {
        plugins.util.log(plugins.util.colors.green(msg[item]));
      }
    }
  } else {
    plugins.util.log(plugins.util.colors.green(msg));
  }
}


