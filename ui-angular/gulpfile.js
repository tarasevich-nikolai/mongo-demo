var gulp = require('gulp'),
    requireDir = require('require-dir');

requireDir('./gulp/tasks', {recurse: true});

gulp.task('default', ['dist'], function() {

});

process.on('uncaughtException', function(err) {
   console.log("Error occured: ", err);
   console.log("Restart required");
});