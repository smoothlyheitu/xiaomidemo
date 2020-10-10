define(['jquery','jquery-cookie'],function($){
	//加载已经加入购物车的商品
	/* 
		1.cookie中只存储了 商品的id和数量
		2.加载数据，必须使用商品的具体信息，数据源
			goodsCarList.json
			goodsList.json (goodsList2.json他们两个的数据差不多，goodsList.json更详细，我们不需要太详细
			就使用 goodsList2.json)
		【注】找出加入购物车的商品数据（详情）	
		new Promise处理两次按照顺序加载数据
	 */
	function loadCarData(){ 
		//清空旧的数据
		$('#J_cartListBody .J_cartGoods').html('')
		new Promise(function(resolve,reject){
			$.ajax({
				url:'data/goodsCarList.json',
				success : function(obj){
					resolve(obj.data);
				},
				error : function(error){
					reject(error)
				}
			})
		}).then(function(arr1){
			return new Promise(function(resolve,reject){
				$.ajax({
					url:'data/goodsList2.json',
					success : function (arr2){
						//将两份数据合并
						var newArr = arr1.concat(arr2);
						resolve(newArr)
					},
					error : function(error){
						reject(error)
					}
				})
			}).then(function(arr){
				//arr所有商品的信息,我们需要在页面上加载购物车的数据
				//通过已经加入购物车的商品，找出这些数据，哪些被加载到购物车上了
				//1.将所有购物车中的数据拿到
				var cookieStr = $.cookie('goods');
				if(cookieStr){
					var cookieArr = JSON.parse(cookieStr);
					var newArr = [];
					for(var i = 0; i < cookieArr.length;i++){
						for(var j = 0;j < arr.length;j++){
							if(cookieArr[i].id == arr[j].product_id || cookieArr[i].id == arr[j].goodsid){
								arr[j].num = cookieArr[i].num;
								//设置商品的id
								arr[j].id = arr[j].product_id ? arr[j].product_id : arr[j].goodsid; 
								newArr.push(arr[j]);
							}
						}
					}
					//2.通过循环将加载的数据添加到页面上
					for(var i = 0;i < newArr.length;i++){
						var node = $(`
						<div class="item-row clearfix" id="${newArr[i].id}"> 
							<div class="col col-check">  
								<i class="iconfont icon-checkbox icon-checkbox-selected J_itemCheckbox" data-itemid="2192300031_0_buy" data-status="1">√</i>  
							</div> 
							<div class="col col-img">  
								<a href="//item.mi.com/${newArr[i].id}" target="_blank"> 
									<img alt="" src="${newArr[i].image}" width="80" height="80"> 
								</a>  
							</div> 
							<div class="col col-name">  
								<div class="tags">   
								</div>     
								<div class="tags">  
								</div>   
								<h3 class="name">  
									<a href="//item.mi.com/${newArr[i].id}" target="_blank"> 
										${newArr[i].name}
									</a>  
								</h3>        
							</div> 
							<div class="col col-price"> 
								${newArr[i].price}	
								<p class="pre-info">  </p> 
							</div> 
							<div class="col col-num">  
								<div class="change-goods-num clearfix J_changeGoodsNum"> 
									<a href="javascript:void(0)" class="J_minus">
										<i class="iconfont"></i>
									</a> 
									<input tyep="text" name="2192300031_0_buy" value="${newArr[i].num}" data-num="1" data-buylimit="20" autocomplete="off" class="goods-num J_goodsNum" "=""> 
									<a href="javascript:void(0)" class="J_plus"><i class="iconfont"></i></a>   
								</div>  
							</div> 
							<div class="col col-total"> 
								${(newArr[i].price * newArr[i].num).toFixed(1)}元
								<p class="pre-info">  </p> 
							</div> 
							<div class="col col-action"> 
								<a id="2192300031_0_buy" data-msg="确定删除吗？" href="javascript:void(0);" title="删除" class="del J_delGoods"><i class="iconfont"></i></a> 
							</div> 	
					</div>  `).appendTo('#J_cartListBody .J_cartGoods')
					}
					isCheckAll();
				}
			})
		})
	}
	
	function downLoad(){ 
		$.ajax({
			url: "data/goodsCarList.json",
			success : function(result){
				var arr = result.data;
				for(var i = 0;i < arr.length; i++){
					$(`<li class="J_xm-recommend-list span4">    
						<dl> 
							<dt> 
								<a href="#"> 
									<img src="${arr[i].image}"  alt="小米净水器1A（厨下式）"> 
								</a> 
							</dt> 
							<dd class="xm-recommend-name"> 
								<a href="#"> 
									${arr[i].name} 
								</a> 
							</dd> 
							<dd class="xm-recommend-price">${arr[i].price}元</dd> 
							<dd class="xm-recommend-tips">   ${arr[i].comments}人好评    
								<a href="#" class="btn btn-small btn-line-primary" style="display: none;" id = "${arr[i].goodsid}">加入购物车</a>  
							</dd> 
							<dd class="xm-recommend-notice">

							</dd> 
						</dl>  
					</li>`).appendTo('#J_miRecommendBox  .xm-recommend .row');
				}
			},
			error:function(error){
				console.log(error)
			}
		})
	}
	//添加移入移出操作
	function cartHover(){
		
		$('#J_miRecommendBox  .xm-recommend .row').on('mouseenter','.J_xm-recommend-list',function(){
			$(this).find('.xm-recommend-tips a').css('display','block')
		}) 
		$('#J_miRecommendBox  .xm-recommend .row').on('mouseleave','.J_xm-recommend-list',function(){
			$(this).find('.xm-recommend-tips a').css('display','none')
		})
		
		// 通过事件委托实现加入购物车操作
		$('#J_miRecommendBox  .xm-recommend .row').on('click','.xm-recommend-tips a',function(ev){
			var id = this.id;
			var first = $.cookie('goods') == null ? true : false;//判断cookie是否被创建过
			if(first){//如果没有被创建过
				var cookieArr = [{id:id,num : 1}]
				$.cookie('goods',JSON.stringify(cookieArr),{
					expirse : 7 
				})
			}else{ //被创建过，判断其中有没有我们要加载的数据
				var same = false; //假设没有
				var cookieStr = $.cookie('goods');
				var cookieArr = JSON.parse(cookieStr);
				for(var i = 0; i < cookieArr.length; i++){
					if(cookieArr[i].id == id){ //有的话
						cookieArr[i].num ++;
						same = true;
						break;
					}
				}
				if(!same){ //没有我们要添加的数据
					var obj = {id : id,num : 1};
					cookieArr.push(obj);
				}
				$.cookie('goods',JSON.stringify(cookieArr),{
					expirse : 7
				});
			}
			isCheckAll();
			loadCarData();
			
			return false;
		})
	}

	//全选按钮和单选按钮 添加点击
	function checkFunc(){
		//全选
		$('#J_cartBox .list-head .col-check').find('i').click(function(){
			//获取每一个单个商品选项框
			var allChecks = $('#J_cartListBody .item-row .col-check').find('i');
			if($(this).hasClass('icon-checkbox-selected')){
				$(this).add(allChecks).removeClass('icon-checkbox-selected');
			}else{
				$(this).add(allChecks).addClass('icon-checkbox-selected');
			}
			isCheckAll();
		})
		$('#J_cartListBody .J_cartGoods').on('click','.item-row .col-check i',function(){
			if($(this).hasClass('icon-checkbox-selected')){
				$(this).removeClass('icon-checkbox-selected');
			}else{
				$(this).addClass('icon-checkbox-selected');
			}
			isCheckAll();
		})
	}
	
	//判断有多少个被选中
	function isCheckAll(){
		var allChecks = $('#J_cartListBody').find('.item-row');
		var isAll = true;//假设是否都选中
		var total = 0;//计算总数
		var count = 0;//计算被选中的数量
		var totalCount = 0;//记录总数
		allChecks.each(function(index,item){
			if(!$(this).find('.col-check i').hasClass('icon-checkbox-selected')){
				isAll = false;
			}else{
				total += parseFloat($(this).find('.col-price').html().trim()) * parseFloat($(this).find('.col-num input').val());
				//被选中的商品
				count += parseInt($(this).find('.col-num input').val());
			}
			//计算所有加购物车的商品一共有几件
			totalCount += parseInt($(this).find('.col-num input').val());
		})
		$('#J_cartTotalNum').html(totalCount);
		$('#J_selTotalNum').html(count)
		$('#J_cartTotalPrice').html(total);
		
		//判断是否全选
		if(isAll){
			$('#J_cartBox .list-head .col-check').find('i').addClass('icon-checkbox-selected')
		}else{
			$('#J_cartBox .list-head .col-check').find('i').removeClass('icon-checkbox-selected')
		}
	}
	
	//给页面上的商品添加删除，或者数量增减的操作
	function changeCars(){
		//商品添加删除功能
		$('#J_cartListBody .J_cartGoods').on('click',".col-action .J_delGoods i",function(){
			var id = $(this).closest('.item-row').remove().attr('id');
			//在cookie中删除
			var cookieStr = $.cookie('goods');
			var cookieArr = JSON.parse(cookieStr);
			for(var i = 0;i < cookieArr.length; i++){
				if(id == cookieArr[i].id){
					cookieArr.splice(i,1);
					break;
				}
			}
			cookieArr.length == 0 ? $.cookie('goods',null) : $.cookie('goods',JSON.stringify(cookieArr),{expirse:7})
			isCheckAll();
			return false;
		})
		
		//给每一个+和-添加事件
		$('#J_cartListBody .J_cartGoods').on('click','.J_minus,.J_plus',function(){
			var id = $(this).closest('.item-row').attr('id');
			var cookieStr = $.cookie('goods');
			var cookieArr = JSON.parse(cookieStr);
			for(var i = 0;i < cookieArr.length;i++){
				if(cookieArr[i].id == id){
					//找到了
					if($(this).attr('class') =='J_minus'){
						cookieArr[i].num == 1 ? alert("数量已经为1,不能减少~") : cookieArr[i].num --;
					}else{
						cookieArr[i].num ++;
					}
					break;
				}
			}
			//更新页面的商品
			$(this).siblings('input').val(cookieArr[i].num);
			//更新一下页面上的价格
			var price = parseFloat($(this).closest('.col-num').siblings('.col-price').html().trim());
			$(this).closest('.col-num').siblings('.col-total').html((price * cookieArr[i].num).toFixed(1) + "元");
			
			//更改数据存储到cookie
			$.cookie('goods',JSON.stringify(cookieArr),{expirse:7})
			//重新计算总价
			isCheckAll();
			return false;
		})
	}
	return {
		downLoad : downLoad,
		cartHover : cartHover,
		loadCarData : loadCarData,
		checkFunc : checkFunc,
		changeCars : changeCars
	}
})