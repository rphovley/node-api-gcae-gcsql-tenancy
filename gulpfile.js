const gulp = require('gulp');
const ts = require('gulp-typescript');
const nodemon = require('gulp-nodemon');
const eslint = require('gulp-eslint');

const tsProject = ts.createProject('./tsconfig.json');
const DESTINATION = 'server/dist';

function watchNode(done) {
  //Restart node server if changes to file systeym happen
  const stream = nodemon({
    script: '',
    ext: 'ts',
    watch: ['**/*.ts', '**/*.js'],
    ignore: ['node_modules', 'migrations', 'scripts', 'seeds', 'test', 'server/dist', 'tmp'],
    exec: 'nodemon --nolazy --inspect=0.0.0.0:9222 -L ./server/bin/www',
    done,
    verbose: true,
  })

  

  stream.on('restart', (files) => {
    console.log('files changed, restarting node server: ', files);
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


function lint() {
  return gulp.src(['server/src/**/*.{ts,js}'])
    .pipe(eslint())
    .pipe(eslint.format('codeframe'))
    .pipe(eslint.failAfterError());
}

module.exports = {
  watchNode,
  compilejs,
  lint,
  default: gulp.series(compilejs, watchNode)
};


