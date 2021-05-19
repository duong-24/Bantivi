var i=1;
function buttononclick(){
    i++;
    document.getElementById('values1').value=i;
}
function buttononclick2(){
    i--;
    if(i>0)
    {
        document.getElementById('values1').value=i--;
    }
    else 
    i=1;
}
var x=0;
function giohang(){
    var a=document.getElementById('values1').value;
    x=parseInt(x)+parseInt(a);
    document.getElementById('congthem').innerHTML=x;
    console.log(x)
}
function giohang1(){
    var d=document.getElementById('value3').value;
    x=parseInt(x)+parseInt(d);
    document.getElementById('congthem').innerHTML=x;
    console.log(x)

}
onSubmit:function thanhcong(){
    console.log();
    alert("Mua hàng cần đăng nhập")
}