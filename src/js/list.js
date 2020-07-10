//吸顶菜单
var o_box = document.querySelector('.product_control');
window.onscroll = function () {
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  if (scrollTop >= 837) {
    o_box.style.position = 'fixed';
    o_box.style.top = 0;
  } else {
    o_box.style.position = 'relative';
    o_box.style.zIndex = 15;
    
  }
}