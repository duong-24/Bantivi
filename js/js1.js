var i=1;
function buttononclick(){
    i++;
    document.getElementById('values1').value=i;
}
function buttononclick2(){
    i--;
    document.getElementById('values1').value=i;
}
var x=0;
function giohang(){
    x++;
    document.getElementById('congthem').innerHTML=x;
    
}
onSubmit:function thanhcong(){
    console.log();
    alert("Mua hàng cần đăng nhập")
}