const gulp = require('gulp');
const del = require('del');
const gulpNodemon = require('gulp-nodemon');
const gulpTypescript = require('gulp-typescript').createProject('tsconfig.json');

const DIST_FOLDER = './bin';

gulp.task('clean', cleanProjectDist = () => {
    return del(`${DIST_FOLDER}/**/*`);
});

gulp.task('build', gulp.series(['clean'], buildProject = () => {
    return gulp.src(['typings/**/*.ts', 'src/**/*.ts'])
        .pipe(gulpTypescript())
        .pipe(gulp.dest(`${DIST_FOLDER}`));
}));

gulp.task('start', gulp.series(['build'], startApp = (done) => {
    return gulpNodemon({
        exec: 'node --inspect=5858',
        ignore: '*',
        script: `${DIST_FOLDER}/index.js`,
        env: { 'NODE_ENV': 'development' },
        done: done
    });
}));