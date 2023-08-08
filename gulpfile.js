const gulp = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');

// Task to bundle and minify for index
gulp.task('bundle-index', function() {
    return gulp.src(['styles/global.css', 'styles/nav-style.css', 'styles/index.css', 'styles/contact-me.css'])
        .pipe(concat('bundle-index.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./dist'));
});

// Task to bundle and minify for case studies
gulp.task('bundle-case-studies', function() {
    return gulp.src(['styles/global.css', 'styles/nav-style.css', 'styles/case-studies.css', 'styles/contact-me.css'])
        .pipe(concat('bundle-case-studies.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./dist'));
});

// Default task to run both
gulp.task('default', gulp.series('bundle-index', 'bundle-case-studies'));
