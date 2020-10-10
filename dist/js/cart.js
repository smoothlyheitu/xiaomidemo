require.config({
	paths :{
		'jquery' : "jquery-1.11.3",
		'jquery-cookie' : "jquery.cookie",
		"goodsCart" : "goodsCart"
	},
	shim:{
		//依赖关系
		"jquery-cookie" : ["jquery"]
	}
})
require(['goodsCart'],function(goodsCart){
	goodsCart.downLoad();
	goodsCart.cartHover();
	goodsCart.loadCarData()
	goodsCart.checkFunc()
	goodsCart.changeCars()
})