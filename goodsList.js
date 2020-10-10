define(["jquery"],function($){
	//数据下载
	function downLoad(){
		$.ajax({
			url: 'data/goodsList2.json',
			success : function(result){
				//创建大图的数据在页面上
				$(`<div data-v-61428f58 class = 'section'>
                    <div data-v-61428f58 class = 'components-list-box'>
                        <div data-v-a2d6c756 class="channel-product-imgText">
                            <div data-v-a2d6c756 class = 'channel-product-top'>
                                <div data-v-a2d6c756 class = 'product-cell shadow product_with_tag product_tag_1'>
                                    <div data-v-a2d6c756 class = 'figure'>
                                        <a href="goodsDesc.html?product_id=${result[0].product_id}">
                                            <img data-v-a2d6c756 style = 'background-color: rgb(178, 184, 205);' src="${result[0].image}" alt=""/>
                                        </a>
                                    </div>
                                    <div data-v-a2d6c756 class = 'content'>
                                        <h3 data-v-a2d6c756 class = 'title'>
                                            <a data-v-a2d6c756 href="goodsDesc.html?product_id=${result[0].product_id}">
                                               ${result[0].name}
                                            </a>
                                        </h3>
                                        <p data-v-a2d6c756 class = 'desc'>${result[0].desc}</p>
                                        <p data-v-a2d6c756 class = 'price'>
                                            <strong data-v-a2d6c756>${result[0].price}</strong>元
                                            <span data-v-a2d6c756>起</span>
                                            <del data-v-a2d6c756>${result[0].del}</del>
                                        </p>
                                        <p data-v-a2d6c756 class = 'link'>
                                            <a data-v-a2d6c756 href="#">立即购买</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`).appendTo('.app-body')
				for(var i = 1;i < result.length;i++){
					//每两个商品创建一行
					if(i % 2 != 0){
						var row = $(`<div data-v-61428f58 class = 'section'>
							<div data-v-61428f58 class = 'components-list-box'>
								<div data-v-45ef62b1 class = 'channel-product channel-product-two4'>
									<div data-v-45ef62b1 class = 'row'>
									</div>
								</div>
							</div>
						</div>`).appendTo('.app-body')
					}
					$(`<div data-v-45ef62b1 class = 'span10 product-cell shadow'>
						<div data-v-45ef62b1 class = 'figure'>
							<a data-v-45ef62b1 href="goodsDesc.html?product_id=${result[i].product_id}" class = 'exposure'>
								<img data-v-45ef62b1 style = 'background-color: rgb(189, 193, 217);' src="${result[i].image}" alt=""/>
							</a>
						</div>
						<h3 data-v-45ef62b1 class = 'title'>
							<a data-v-45ef62b1 href="goodsDesc.html?product_id = ${result[i].product_id}">${result[i].name}</a>
						</h3>
						<p data-v-45ef62b1 class = 'desc'>${result[i].desc}</p>
						<p data-v-45ef62b1 class = 'price'>
							<strong data-v-45ef62b1>${result[i].price}</strong>元
							<span data-v-45ef62b1>起</span>
							<del data-v-45ef62b1>${result[i].del}</del>
						</p>
					</div>`).appendTo(row.find('.row'))
				}
			},
			error : function(error){
				console.log(error)
			}
		})
	}
	
	//实现商品列表页轮播图效果
	function banner(){
		var oDiv = $('.swiper-container .swiper-wrapper');
		var oBtn = $(".swiper-container .swiper-pagination a");
		var pre = $('.swiper-button-prev');
		var next = $('.swiper-button-next');
		var iNow = 0;
		var timer = null;
		//点击小按钮的效果
		oBtn.click(function(){
			iNow = $(this).index();
			tab()
			return false;//取消默认行为
		})
		 
		 pre.click(function(){
			iNow --;
			if(iNow == -1){
				iNow = 1;
			}
			tab();
		 })
		 next.click(function(){
			 iNow ++;
			 tab();
		 })
		//定时器
		timer = setInterval(function(){
			iNow ++;
			tab();
		},2000)
		//切换函数
		function tab(){
			oBtn.removeClass('swiper-pagination-bullet-active').eq(iNow).addClass("swiper-pagination-bullet-active");
			if(iNow == 2){
				oBtn.removeClass('swiper-pagination-bullet-active').eq(0).addClass("swiper-pagination-bullet-active");
			}
			oDiv.animate({left: -2560 * iNow},1000,function(){
				if(iNow == 2){
					iNow = 0;
					oDiv.css('left','0');
				}
			});
			// console.log(iNow +"aa")
			// console.log(oDiv.css('left'))
		}
		//添加移入移出效果
		$('.swiper-container').mouseenter(function(){
			clearInterval(timer)
		}).mouseleave(function(){
			timer = setInterval(function(){
				iNow ++;
				tab();
			},2000)
		})
	}
	return {
		downLoad : downLoad,
		banner : banner
	}
})