var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');

gulp.task('default', function() {
    nodemon({
        script: './server/server',
        // this listens to changes in any of these files/routes and restarts the application
        watch: ["./server/server", "app.js", "routes/", "server/"],
        ext: 'js'
        // Below i'm using es6 arrow functions but you can remove the arrow and have it a normal .on('restart', function() { // then place your stuff in here }
    }).on('restart', () => {
        gulp.src('./server/server')
    });
});

gulp.task('serve', function() {
    browserSync.init({
        proxy: 'localhost:3000'
    });
    gulp.watch(['./client/*/**', './public/css/stylesheet.css']).on('change', browserSync.reload);
});