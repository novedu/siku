;(function(){
    const oName = document.querySelector(".uname");

    const oPwd = document.querySelector(".upwd");

    const okPwd = document.querySelector(".okpwd");

	const oSub = document.querySelector("#register");
	
	let ome = document.querySelectorAll('.regName_tips');

	let  onone = false;
	let  ontwo = false;
	let  onthree = false;
	oName.onblur = function(){
		if(this.value !=""){
			let reg = /^[\w]{4,16}$/;
			if(reg.test(this.value)){
				ome[0].innerHTML = '符合要求';
				onone = true;
			}else{
				ome[0].innerHTML = '请输入4-16位用户名'
				ome[0].style.color ='red'; 
				onone = false;
				this.value = '';
			}
		}else{
			ome[0].innerHTML = '用户名不能为空！'
			ome[0].style.color ='red'; 
			onone = false;
		}
	}

	oPwd.onblur = function(){
		if(this.value !=""){
			let reg = /^[\w]{4,16}$/;
			if(reg.test(this.value)){
				ome[1].innerHTML = '符合要求';
				ontwo = true;
			}else{
				ome[1].innerHTML = '请输入4-16密码';
				ontwo = false;
				this.value = '';
			}
		}else{
			ome[1].innerHTML = '密码不能为空！';
			ontwo = false;
		}
	}

	okPwd.onblur = function(){
		if(this.value !=""){
			if(this.value == oPwd.value){
				ome[2].innerHTML = '符合要求';
				
				onthree = true;
			}else{
				ome[2].innerHTML = '请确认密码一致'
				ome[2].style.color ='red'; 
				onthree = false;
				this.value = '';
			}
		}else{
			ome[2].innerHTML = '密码不能为空！'
			ome[2].style.color ='red'; 
			onthree = false;
		}
	}



    oSub.onclick = function(){
        var uname = oName.value;
		var upwd = oPwd.value; 
		console.log(onone ,ontwo , onthree)
       if(onone && ontwo && onthree ){
		  
		let cookieStr = $.cookie('registors') ? $.cookie('registors') : '';
				let cookieObj = convertCookieStrToCookieObj(cookieStr);
				if(uname in cookieObj){
					alert('用户名已存在！');
					return ;
				}else{
					cookieObj[uname] = upwd;
				}
				cookieStr = JSON.stringify(cookieObj);
				$.cookie('registors',cookieStr,{exppires:7,path:'/'});
				alert('注册成功！');
				location.href = 'log.html'
			}
			function convertCookieStrToCookieObj(str){
				if(!str){
					return {};
				}
				return JSON.parse(str);
			}

	   }
        







})();





