const gulp = require('gulp');
const ts = require('gulp-typescript');
const nodemon = require('gulp-nodemon');
const eslint = require('gulp-eslint');
const changed = require('gulp-changed');
const path = require('path');

const tsProject = ts.createProject('./tsconfig.json');
const DESTINATION = 'server/dist';

function watch(done) {
  const stream = nodemon({
    script: path.resolve(__dirname, 'server/bin/www'),
    ext: 'ts',
    watch: ['**/*.ts', '**/*.js'],
    ignore: ['node_modules', 'migrations', 'scripts', 'seeds', 'test', 'server/dist', 'tmp'],
    tasks: ['recompilejs'],
    done,
    verbose: true,
  })

  stream.on('restart', (files) => {
    console.log('files changed', files);
  });
}

function compilejs(done) {
  return tsProject.src()
    .pipe(tsProject())
    .on('error', () => {
      done();
      process.exit(1);
    })
    .pipe(gulp.dest(DESTINATION))
}

function recompilejs(done) {
  return tsProject.src()
    .pipe(changed(DESTINATION, { extension: '.js' }))
    .pipe(tsProject())
    .on('error', () => {
      done();
      process.exit(1);
    })
    .pipe(gulp.dest(DESTINATION))
}

function lint() {
  return gulp.src(['server/src/**/*.{ts,js}'])
    .pipe(eslint())
    .pipe(eslint.format('codeframe'))
    .pipe(eslint.failAfterError());
}

module.exports = {
  watch,
  compilejs,
  recompilejs,
  lint,
  default: gulp.series(compilejs, watch)
};


