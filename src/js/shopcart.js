// 渲染页面
var data = JSON.parse(localStorage.data);

for (var i = 0; i < data.length; i++) {
	var str =
		`<tr order = ${data[i].order}>
					<td>
						<input class = "xuan" type="checkbox" >
						<img src="${data[i].src}" alt=""></td>
					<td>
						<p>${data[i].name}</p>
						<p>最小订货量：1套</p>
						<p>库存：有库存</p>
					</td>
					<td id="money">￥${data[i].price}</td>
					<td>
						<div class="zuo">-</div>
						<div class="num">${data[i].num}</div>
						<div class="you">+</div>
					</td>
					<td id ="sum">${(data[i].price * data[i].num).toFixed(2)}</td>
					<td><a id ="del" href="javascript:;">删除</a></td>
				</tr>`
	$("tbody").append(str);
}

// 点击更改商品数量
$(".you").click(function() {
	$(this).parent().children(".num").html(parseInt($(this).parent().children(".num").html()) + 1);
	_num(this);
	// 如果当前商品是选中状态那么就去改变结算栏的数量和价钱
	if ($(this).parent().parent().find(".xuan")[0].checked) {
		let re = /((\d|\.)+)/;
		let num = Number(re.exec($("#good_num").html())[1]);
		let sum = Number(re.exec($("#rmb").html())[1]);
		let b = Number(re.exec($(this).parent().parent().find("#money").html())[1]);
		$("#good_num").html("已选" + (num + 1) + "件商品");
		$("#rmb").html("总计应付:<br>￥" + (sum + b).toFixed(2) + "元");
	}
})
$(".zuo").click(function() {
	if ($(this).parent().children(".num").html() == "1") {
		$(this).parent().children(".num").html(1);
	} else {
		$(this).parent().children(".num").html(parseInt($(this).parent().children(".num").html()) - 1);
		_num(this);
		if ($(this).parent().parent().find(".xuan")[0].checked) {
			let re = /((\d|\.)+)/;
			let num = Number(re.exec($("#good_num").html())[1]);
			let sum = Number(re.exec($("#rmb").html())[1]);
			let b = Number(re.exec($(this).parent().parent().find("#money").html())[1]);
			$("#good_num").html("已选" + (num - 1) + "件商品");
			$("#rmb").html("总计应付:<br>￥" + (sum - b).toFixed(2) + "元");
		}
	}

})
//点击左右按钮 更改local storage 并计算价格 渲染页面
function _num(that) {
	for (let i = 0; i < data.length; i++) {
		let a = $(that).parent().parent().attr("order");
		if (data[i].order == a) {
			data[i].num = $(that).parent().children(".num").html();
			$(that).parent().next().html((data[i].price * data[i].num).toFixed(2));
		}
	}
	// 将更改后的值存储在本地
	localStorage.data = JSON.stringify(data);

}
// 全选全部选
var all = document.querySelectorAll(".all");
var xuan = document.querySelectorAll(".xuan");
for (var i = 0; i < all.length; i++) {
	let on_off = true;
	all[i].onclick = function() {
		if (on_off) {
			let a = 0;
			let b = 0;
			for (var j = 0; j < xuan.length; j++) {
				xuan[j].checked = true;
				// 选中所有商品 计算数量 计算总价  渲染页面				
				a += Number($(".xuan:eq(" + j + ")").parent().parent().find(".num").html());
				b += Number($(".xuan:eq(" + j + ")").parent().parent().find("#sum").html());
			}
			$("#good_num").html("已选" + a + "件商品");
			$("#rmb").html("总计应付:￥" + b.toFixed(2) + "元");
			on_off = false;
		} else {
			for (var j = 0; j < xuan.length; j++) {
				xuan[j].checked = false;
			}
			on_off = true;
			$("#good_num").html("已选" + 0 + "件商品");
			$("#rmb").html("总计应付:<br>￥0.00元");
		}
	}
}

$(".xuan").click(function() {
	//更改商品数
	let a = Number($(this).parent().parent().find(".num").html());
	let b = Number($(this).parent().parent().find("#sum").html());
	let re = /((\d|\.)+)/;
	let num = Number(re.exec($("#good_num").html())[1]);
	let sum = Number(re.exec($("#rmb").html())[1]);
	if (this.checked) {
		//选中时加上商品数量
		$("#good_num").html("已选" + (num + a) + "件商品");
		// 选中时计算商品总价
		$("#rmb").html("总计应付:<br>￥" + (sum + b).toFixed(2) + "元");
	} else {
		//取消时减去商品数量
		$("#good_num").html("已选" + (num - a) + "件商品");
		// 选中时计算商品总价
		$("#rmb").html("总计应付:<br>￥" + (sum - b).toFixed(2) + "元");
	}
})
// 点击删除
function remove() {
	let del = document.querySelector("#del");
		del.onclick = function(){
			$(this).parent().parent().remove();
					data.splice(0, 1);
					localStorage.data = JSON.stringify(data);
				}
	}
remove();

// 点击全部删除

$("#rem").click(function() {
	// 选中时  将选中的行的order记录下来 放进一个数组 然后去遍历这个数组 在data中搜索这个order 如果存在 就将对应下标的data数据删除
	let arr = [];
	for (let i = 0; i < $(".xuan").size(); i++) {
		if ($(".xuan").eq(i)[0].checked) {
			arr.push($(".xuan").eq(i).parent().parent().attr("order"));
		}
	}
	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < $(".xuan").size(); j++) {
			if (arr[i] == $(".xuan").eq(j).parent().parent().attr("order")) {
				$(".xuan").eq(j).parent().parent().remove();
			}
		}
		for (let j = 0; j < data.length; j++) {
			if (arr[i] == data[j].order) {
				data.splice(j, 1);
			}
		}
		localStorage.data = JSON.stringify(data);
	}

})

//结算
function pay(){
	$(".button").click(function(){
		let re = /((\d|\.)+)/;
		let rmb = Number(re.exec($("#rmb").html())[1]).toFixed(2);
		$(".modal").find("h2").html(`总计应付:${rmb}元`);
		
	})
}
pay();