/* 
	第三方插件
	gulp-scss
	gulp-minify-css
	gulp-rename
 */
const gulp = require('gulp');
const scss = require('gulp-sass');
const minifyCSS = require('gulp-minify-css');
const rename = require('gulp-rename');
gulp.task("scss",async function(){
	return gulp.src('stylesheet/index.scss')
	.pipe(scss())
	.pipe(gulp.dest('dist/css'))
	.pipe(minifyCSS())
	.pipe(rename("index.min.css"))
	.pipe(gulp.dest('dist/css'))
	.pipe(connect.reload())
})
// 批量处理
gulp.task('scssAll',async function(){
	return gulp.src('stylesheet/*.scss')
	.pipe(scss())
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload())
})

//处理js
gulp.task("script",async function(){
	return gulp.src(['*.js','!gulpfile.js'])
	.pipe(gulp.dest('dist/js'))
	.pipe(connect.reload())
})
gulp.task('copy-html',async function(){
	return gulp.src('*.html')
	.pipe(gulp.dest('dist'))
	.pipe(connect.reload())
})
//处理数据
gulp.task('data',async function(){
	return gulp.src(['*.json','!package.json'])
	.pipe(gulp.dest('dist/data'))
	.pipe(connect.reload())
})
//处理图片
gulp.task('images',async function(){
	return gulp.src('images/**/*')
	.pipe(gulp.dest('dist/images'))
	.pipe(connect.reload())
})
gulp.task("build",gulp.series(["scss","images","data","script","copy-html",'scssAll'],async function(){
	await console.log("任务执行完毕")
}))

//建立监听
gulp.task('watch',async function(){
	gulp.watch("stylesheet/index.scss",async function(){
		gulp.src('stylesheet/index.scss')
		.pipe(scss())
		.pipe(gulp.dest('dist/css'))
		.pipe(minifyCSS())
		.pipe(rename("index.min.css"))
		.pipe(gulp.dest('dist/css'))
	});
	gulp.watch("stylesheet/*.scss",async function(){
		gulp.src('stylesheet/*.scss')
		.pipe(scss())
		.pipe(gulp.dest("dist/css"))
	});
	gulp.watch(["*.js","!gulpfile.js"],async function(){
		gulp.src(['*.js','!gulpfile.js'])
		.pipe(gulp.dest('dist/js'))
	});
	gulp.watch("*.html",async function(){
		gulp.src('*.html')
		.pipe(gulp.dest('dist'))
	});
	gulp.watch(['*.json','!package.json'],async function(){
		gulp.src(['*.json','!package.json'])
		.pipe(gulp.dest('dist/data'))
	});
	gulp.watch('images/**/*',async function(){
		gulp.src('images/**/*')
		.pipe(gulp.dest('dist/images'))
	});
})
// const connect = require("gulp-connect");
// gulp.task('server',function(){
// 	connect.server({
// 		root : 'dist',
// 		port : 8887,
// 		livereload:true
// 	})
// })
// gulp.task('default',gulp.series(['watch','server']))