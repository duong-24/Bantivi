//Hàm valid
function Validator(options){
    function getParent(element,select){
        while(element.parentElement){
            if(element.parentElement.matches(select)){
                return element.parentElement;
            }
            element=element.parentElement;
        }
    }
    var selectorRules={};

    function validate(inputElement,rule){

        ////Hàm thực hiện validate
        //value:inputElement.value
        //test:function: rule.test
        var errorMessage;
        var errorElment=getParent(inputElement,options.formGroupSelector).querySelector(options.errorSelector);
        //Lấy ra các rules của select
        var rules=selectorRules[rule.select];
        //Lặp qua từng rule & kiểm tra
        //Nếu có lỗi thì dừng kiểm tra
        for(var i=0;i<rules.length;++i){
            switch(inputElement.type){
                case 'checkbox':
                case 'radio':
                    errorMessage=rules[i](
                        formElement.querySelector(rule.select+':checked')
                    );
                    break;
                default:errorMessage=rules[i](inputElement.value);
            }

             if(errorMessage) break;
        }


        if(errorMessage){
            errorElment.innerText=errorMessage;
            getParent(inputElement,options.formGroupSelector).classList.add('invaild');
        }
        else{
            errorElment.innerText='';
            getParent(inputElement,options.formGroupSelector).classList.remove('invaild');
        }
        return !errorMessage;

    }
    //Lấy element của form cần validate
    var formElement=document.querySelector(options.form)
    if(formElement){
        //khi submit form
        formElement,onsubmit=function(e){
            e.preventDefault();
            var isFormVlaid=true;
            //Lặp qua từng rule và validate
            options.rules.forEach(function(rule){
                var inputElement=formElement.querySelector(rule.select);
                var isVlaid= validate(inputElement,rule);
                if(!isVlaid){
                    isFormVlaid=false;
                }
            });

           
            
            if(isFormVlaid){
                //trường hợp submit với javascript
               if(typeof options.onSubmit==='function'){
                var enableInputs=formElement.querySelectorAll('[name]');
                var formValues=Array.from(enableInputs).reduce(function(values,input){
                    switch(input.type){
                        case 'radio':
                            values[input.name]=formElement.querySelector('input[name="'+input.name + '"]:checked').value;
                            break;
                        case 'checkbox':
                            if(!input.matches(':checked')) {
                                values[input.name]='';
                                return values;
                            }
                                if(!Array.isArray(values[input.name])){
                                    values[input.name]=[];
                                }
                                values[input.name].push();
                            break;
                        default: values[input.name]=input.value;
                    }
                    return values;
                },{});
                   
                   options.onSubmit(formValues);
                    
               } 
               //trường hợp submit với hành vi mặc định
               else{
                    formElement.submit();
               }
               
            }

        }
        //Lặp qua mỗi rule và xử lý (lắng nghe suwk kiện blur,input,...)
        options.rules.forEach(function(rule){
            //Lưu lại các rules cho mỗi input
            if(Array.isArray(selectorRules[rule.select])){
                selectorRules[rule.select].push(rule.test);
            }
            else
            {
                selectorRules[rule.select]=[rule.test];
            }
 

            var inputElements=formElement.querySelectorAll(rule.select);
            Array.from(inputElements).forEach(function(inputElement){
                //Xử lý trườn hợp blur khỏi input
                inputElement.onblur=function(){
                    validate(inputElement,rule);
                }
                //Xử lý mỗi khi người dùng nhập vào input
                inputElement.oninput=function(){
                    var errorElment=getParent(inputElement,options.formGroupSelector).querySelector(options.errorSelector);
                    errorElment.innerText='';
                    getParent(inputElement,options.formGroupSelector).classList.remove('invaild');

                }
            })

        });
    }
}
//Định nghĩa các rules
//nguyeen tacs cuar cac rules:
//1.khi có lỗi => trả ra mesae lỗi
//2. khi hợp lệ => Không trả ra cái gì cả (undefined)
Validator.isRequired=function(select,message){
    return{
        select:select,
        test: function(value){
            return value?undefined:message||'Vui lòng nhập trường này';
        }
    };
}
Validator.isEmail=function(select,message){
    return{
        select:select,
        test: function(value){
            var regex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value)?undefined:message||'Trường này phải là email';
        }
    };
}
Validator.minLength=function(select,min,message){
    return{
        select:select,
        test: function(value){
            return value.length>=min?undefined:message||`Vui lòng nhập tối thiểu ${min} kí tự`;
        }
    };
}

Validator.isConfirmed=function(select,getConfimvalue,message){
    return{
        select:select,
        test:function(value){
            return value===getConfimvalue()?undefined:message||'Giá trị nhập vào không chính xác'
        }
    }
}
