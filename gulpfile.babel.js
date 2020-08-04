var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();

gulp.task('gulp_nodemon', function () {
  nodemon({
    script: './bin/www', //this is where my express server is
    ext: 'js html css', //nodemon watches *.js, *.html and *.css files
    env: { NODE_ENV: 'development' },
  });
});

gulp.task('sync', function () {
  browserSync.init({
    server: {
      port: 3002, //this can be any port, it will show our app
      proxy: 'http://localhost:8000/', //this is the port where express server works
      ui: { port: 3003 }, //UI, can be any port
      reloadDelay: 1000, //Important, otherwise syncing will not work
      baseDir: ['./'],
      routes: {
        '/node_modules': 'node_modules',
      },
    },
  });
  gulp.watch('routes/*.js').on('change', server.reload);
  // gulp.watch('./**/*.html', browserSync.reload);
  // gulp.watch('./**/*.css', browserSync.reload);
});

gulp.task('default', gulp.parallel('gulp_nodemon', 'sync'));
