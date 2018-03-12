require('require-dir')('./gulp');

const gulp = require('gulp');
const seq = require('run-sequence');
const argv = require('yargs').argv;
const server = require('./gulp/server.js');

gulp.task('default', ['coffee', 'stylus'], function(){
	if(argv.dev){
		seq('server');

		gulp.watch('assets/stylus/**/*', ['stylus']);
		gulp.watch('assets/coffee/**/*', ['coffee']);
		gulp.watch('public/**/*.html', function(){
			server.reload()
		});
	}
});
