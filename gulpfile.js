var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('default', function() {

});

gulp.task('test-api', function() {
    global.express = require('./app');
    global.expect = require('chai').expect;
    global.request = require('supertest');

    return express.sequelize.sync({force: true})
        .then(function() {
            return gulp.src(['test/api/*.js'], { read: false })
                .pipe(mocha({
                    reporter: 'spec'
                }));
        });
});