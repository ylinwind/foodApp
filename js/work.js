/*******index*******/
$(".side ul").find('a').tap(function(){
		$(".detailInfo").html($(this).text());
		$(".detailInfo").animate({
			"width" : "100%",
			"height" : "93%",
			"opacity" : 1
		}, 500);
	});
/********点击显示用户信息侧边栏**/
	$(".icon-wode").tap(function(){
		$(".detailInfo").animate({
			"width" : 0,
			"height" : 0,
			"opacity" : 0
		}, 500);
		if ($(".side").offset().left === 0 ){
			$(".side").animate({
				"left" : "-50%"
			},1000);
		}
		else{
			$(".side").animate({
				"left" : 0
			},1000);
		}
	});
/*********滑动头部******/
	$(function(){
		changePosit();
	})
	function changePosit(){
		var width = $(".active").css("width"),
			left = $(".active").offset().left;
		$("#trans").animate({
			width : width,
			left : left
		}, 1000)
	}
	$("header").on("swipeLeft",function(e){
		e.preventDefault();
		if ($(".active").prev("a")) {
			$(".active").prev().addClass('active');
			$(".active").next().removeClass('active');
			changePosit();
		}
		return;
	});
	$("header").on("swipeRight",function(e){
		e.preventDefault();
		if ($(".active").next("a")) {
			$(".active").next("a").addClass('active');
			$(".active").prev("a").removeClass('active');
			changePosit();
		}
		return;
	});
/************获取更多***************/
	$(".list").eq(1).hide();
		$(".more").children('button').tap(function(e) {
			var menuId = parseInt(Math.random()*360);
			var data = "http://apis.juhe.cn/cook/index?key=b52e6b0ad30cb22d0c43cf85a29d96ca&cid="+menuId+"";
			$.ajax({
				url: 'ajax.php',
				type: 'GET',
				dataType: 'json',
				data: {data: data},
				success : function(json){
					console.log(json);
					var res = json.result.data,
						list = "";
					for(var i = 1;i<res.length;i++){
						list += `<li>
									<a href="foodDetail.html?id=${res[i].id}"><img src=${res[i].albums[0]} alt=""></a>
									<div>
										<h2>${res[i].imtro}</h2>
										<p>${res[i].burden}</p>
									</div>
								</li>`;
					}
					$(".list").eq(1).children('ul').html(list);
					$(".list").eq(1).show();
				}
			});
		})
/*************随机加载***********/
		$.getJSON('kind.json', function(json, textStatus) {
			var res = json.result,
				kindId = parseInt(Math.random()*350);
			for(var i = 0;i< res.length;i++){
				var lis = res[i].list;
				for(var j = 0 ; j < lis.length;j++){
					if(kindId == lis[j].id){
						var data1 = "http://apis.juhe.cn/cook/index?key=b52e6b0ad30cb22d0c43cf85a29d96ca&cid="+kindId+"",
							data2 = "http://apis.juhe.cn/cook/index?key=b52e6b0ad30cb22d0c43cf85a29d96ca&cid="+(kindId+1)+"",
							data3 = "http://apis.juhe.cn/cook/index?key=b52e6b0ad30cb22d0c43cf85a29d96ca&cid="+(kindId+2)+"",
							name = lis[j].name,
							name1 = lis[j+1].name;
						$.ajax({
							url: 'ajax.php',
							type: 'GET',
							dataType: 'json',
							data: {data: data1},
							success : function(json){
								var rest = json.result.data,
									str = "";
								for(var k = 0;k<rest.length-1;k++){
									str += `<li>
												<div>
													<h3>${rest[k].imtro}</h3>
													<p>${rest[k].tags}</p>
												</div>
												<a href="foodDetail.html?id=${rest[k].id}">
												<img src=${rest[k].albums[0]} alt="">
												</a>
											</li>`;
								}
								$(".yueList").children('ul').html(str);
								$(".kindTit").eq(1).find("a").eq(0).text(name);
							},
						});
						$.ajax({
							url: 'ajax.php',
							type: 'GET',
							dataType: 'json',
							data: {data: data2},
							success : function(json){
								var rest = json.result.data,
									str = "";
								for(var k = 0;k<rest.length-2;k++){
									str += `<li>
									<a href="foodDetail.html?id=${rest[k].id}">
									<img src=${rest[k].albums[0]} alt="">
									</a>
									<span>${rest[k].title}</span>
									</li>`;
								}
								$(".chuanList").children('ul').html(str);
								$(".kindTit").eq(0).find("a").eq(0).text(name1);
							},
						});
						$.ajax({
							url: 'ajax.php',
							type: 'GET',
							dataType: 'json',
							data: {data: data3},
							success : function(json){
								var rest = json.result.data,
									list = "",str="";
								for(var k = 0;k<rest.length/2;k++){
									// console.log(rest[k].albums[0]);
									str += `<div class="swiper-slide slideItem">
											<a href="foodDetail.html?id=${rest[k].id}">
											<img src=${rest[k].albums[0]} alt="">
											</a>
											</div>`;
								}
								for(var k = rest.length/2;k<rest.length - 1;k++){
									list += `<li>
												<a href="foodDetail.html?id=${rest[k].id}"><img src=${rest[k].albums[0]} alt=""></a>
												<div>
													<h2>${rest[k].imtro}</h2>
													<p>${rest[k].burden}</p>
												</div>
											</li>`;
								}
								$(".swiperWrapper").html(str);
								$(".list").eq(0).children('ul').html(list);
								var mySwiper = new Swiper('.swiper-container', {
									autoplay: 2000,//可选选项，自动滑动
									effect : 'coverflow',
									slidesPerView: 3,
									centeredSlides: true,
									loop : true,
									initialSlide :1,
								})
							},
						});
					}
				}
			}
		})
/******foodKinds***/
$(".find").tap(function(e){
			var foodName = $("#serId").text().trim();
			console.log(foodName)
			var data = `http://apis.juhe.cn/cook/query.php?key=b52e6b0ad30cb22d0c43cf85a29d96ca&menu=${foodName}&dtype=&pn=&rn=&albums=&`;
			console.log(e.type);
			console.log(data);
			$.ajax({
				url: 'ajax.php',
				type: 'GET',
				dataType: 'json',
				data: {data: data},
				success : function(json){
					console.log(json);
					var res = json.result.data,
						str = "";
					for(var i  = 0 ; i< res.length;i++){
						str += `<li><a href = "foodDetail.html?id=${res[i].id}">
									<img src="${res[i].albums[0]}" alt=""></a>
									<span>${res[i].title}</span>
								</li>`;
					}
					$(".egList").children('ul').html(str);
				},
				error:function(xhr,type){
			        console.log(type);
			        console.log(xhr);
				}
			});
		});
	/*******分类查找************/
		$(function(){
			var bigType = {};
			$(window).on("load", function(){
				$("#bigType_info").show();
				// 读取 bigType.json 文件中的内容 
				$.getJSON("kind.json",function(data, textStatus) {
						/*optional stuff to do after success */
					var res = data.result; // 所有地区
					// 遍历所有省份
					// console.log(res)
					for (var i = 0, len = res.length; i < len; i++) {
						var bigKind = res[i]; // 获取到当前遍历到的省份
						bigType[bigKind.name] = {}; // 相当于 adrress["内蒙古"] = {};
						var litType = bigKind.list; // 获取当前省份下的所有城市
						if (!litType)
							continue;
						for (var j = 0, l = litType.length; j < l; j++) {
							var foodKind = litType[j];
							bigType[bigKind.name][foodKind.name] = foodKind.name;
						}
					}
					initProvince();
				})
			});
			var colors = ['E74B60','4B003D','ADCF56','F18A01','73201A','3186C7','D01A0C'];
			// 初始化省份信息
			function initProvince(){
				var html = "",
					test = "";
				for (var attr in bigType) {
					var num = parseInt(Math.random()*colors.length);
					test +="<li><span class='icon iconfont icon-heart'"+
								"style='color:#"+colors[num]+"'></span>"+attr+"</li>";
				}
				$(".typeList").children('ul').html(test);
				$(".typeList").find("li").tap(function(e){
					var _name = this.innerText,
						str = `<span>${this.innerText}<em class="icon iconfont icon-cancel"></em></span>`;
					// $("#serId").val(this.innerText);
					$("#serId").append(str);
					initCity(_name);
				});
				
			}
			function initCity(_name) {
				// var prov = $("#serId").val();
				var prov = $("#serId").children('span').text();
				console.log(prov);
				var litType = bigType[prov];
				var html = "",
					test = "";
				for (var attr in litType) {
					var num = parseInt(Math.random()*colors.length);
					test +="<li><span class='icon iconfont icon-heart'"+
								"style='color:#"+colors[num]+"'></span>"+attr+"</li>";
				}
				$(".typeList").children('ul').html(test);
				$(".typeList").find("li").tap(function(e){
					var name_ =  this.innerText,
						id = 0,
						_data = "",
						str = `<span>${this.innerText}<em class="icon iconfont icon-cancel"></em></span>`;
						$("#serId").append(str);

					$.getJSON("kind.json",function(json, textStatus) {
						var res = json.result,
							lis = [],
							str = "";
							console.log(name_+":"+_name);
						for(var i = 0 ; i < res.length;i++){
							// console.log(res[i]);
							if (res[i].name === _name) {
								// console.log(res[i].list);
								var lis = res[i].list;
								for(var j  = 0 ; j < lis.length;j++){
									if (lis[j].name===name_) {
										id = lis[j].id;
										console.log(lis[j]);
									}
								}
							}
						}
						_data = "http://apis.juhe.cn/cook/index?key=b52e6b0ad30cb22d0c43cf85a29d96ca&cid="+id+"";
						console.log(_data);
						$.ajax({
						url: 'ajax.php',
						type: 'GET',
						dataType: 'json',
						data: {data: _data},
						success:function(json){
							console.log(json);
							var res = json.result.data,
								str = "";
							for(var i  = 0 ; i< res.length;i++){
								str += `<li><a href = "foodDetail.html?id=${res[i].id}">
											<img src="${res[i].albums[0]}" alt=""></a>
											<span>${res[i].title}</span>
										</li>`;
							}
							$(".egList").children('ul').html(str);
						},
						 error:function(xhr,type){
						        console.log(type);
						        console.log(xhr);
					        }
						})
					});
					$("#serId").val(this.innerText);
				});
			}
		});
