require.config({
	paths : {
		'jquery' : "jquery-1.11.3",
		"nav" : "nav",
		'goodsList' : 'goodsList'
 	}
})
require(['nav','goodsList'],function(nav,goodsList){
	nav.leftNavDownload();
	nav.topNavDownload();
	nav.topNavTop();
	nav.leftNavTab();
	nav.searchTab();
	nav.allGoodsTab();
	goodsList.downLoad();
	goodsList.banner();
})