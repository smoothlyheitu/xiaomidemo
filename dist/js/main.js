/* 
	配置当前这个项目用到了哪些模块
	遵从AMD规范
	所有js文件的后缀省略
 */
require.config({
	paths : {
		"jquery" : 'jquery-1.11.3',
		"jquery-cookie" : "jquery.cookie",
		'nav' : "nav",
		'slide' : "slide",
		"data" : "data"
	},
	skim : { 
		//设置依赖关系	
		"jquery-cookie" : ["jquery"]
	}
})
require(['nav','slide','data'],function(nav,slide,data){
	nav.download(),
	nav.banner(),
	nav.leftNavDownload(),
	nav.leftNavTab(),
	nav.topNavDownload(),
	nav.topNavTop(),
	nav.searchTab(),
	slide.download(),
	slide.slideTab(),
	data.download(),
	data.tabMenu()
})