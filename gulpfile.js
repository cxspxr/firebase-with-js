const gulp = require('gulp');
const bs = require('browser-sync');


gulp.task('server', function() {
    bs.init({
        server: './',
        ghostMode: false,
        open: false,
        notify: false
    });
});

gulp.task('watch', function() {
    gulp.watch('index.html', function() {
        bs.reload();
    });

    gulp.watch('js/*.js', function() {
        bs.reload();
    });
});

gulp.task('default', ['server', 'watch']);
