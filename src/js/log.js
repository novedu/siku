; (function () {
    const oName = document.querySelector(".uname");

    const oPwd = document.querySelector(".upwd");

    const oSub = document.querySelector(".input_sub");


    oSub.onclick = function () {
        let uname = oName.value;
        let upwd = oPwd.value;
        if (!uname) {
            alert('用户名不能为空！');
            return;
        }
        let cookieStr = $.cookie('registors') ? $.cookie('registors') : '';
        let cookieObj = convertCookieStrToCookieObj(cookieStr);
        if (uname in cookieObj) {
            if (cookieObj[uname] === upwd) {
                alert('登录成功');
                location.href = '../index.html';
                oName.value = '';
                oPwd.value = '';
            } else {
                alert('请确认您的密码是否正确！');
            }
        } else {
            alert('用户名不存在！');
        }


    }
    function convertCookieStrToCookieObj(str) {
        if (!str) {
            return {};
        }
        return JSON.parse(str);
    }
})();

