/**
 * Created by bjwsl-001 on 2017/6/19.
 */
var app=angular.module("yue",["ionic"]);
//配置状态
app.config(function ($stateProvider, $ionicConfigProvider, $urlRouterProvider) {
    $ionicConfigProvider.tabs.position("bottom");
    $stateProvider.state("Start", {
        url: "/yueStart",
        templateUrl: "tpl/start.html"
    })
        .state("Home", {
            url: "/yueHome",
            templateUrl: "tpl/home.html",
            controller:"HomeCtrl"
        })
        .state("Detail", {
            url: "/yueDetail/:id",
            templateUrl: "tpl/detail.html",
            controller:"DetailCtrl"
        })
        .state("Cart", {
            url: "/yueCart/:did",
            templateUrl: "tpl/cart.html",
            controller:"CartCtrl"
        })
        .state("Order", {
            url: "/yueOrder",
            templateUrl: "tpl/order.html",
            controller:"OrderCtrl"
        })
        .state("Login", {
            url: "/yueLogin",
            templateUrl: "tpl/login.html",
            controller:"LoginCtrl"
        })
        .state("Register", {
            url: "/yueRegister",
            templateUrl: "tpl/register.html",
            controller:"RegisterCtrl"
        })
        .state("Page", {
            url: "/yuePage/:kw",
            templateUrl: "tpl/page.html",
            controller:"PageCtrl"
        })
        .state("Person", {
            url: "/yuePerson",
            templateUrl: "tpl/person.html",
            controller:"PersonCtrl"
        })
    $urlRouterProvider.otherwise("/yueStart");
});
//创建一个父控制器
app.controller("parentCtrl",["$scope","$state","$ionicPopup",
    function($scope,$state,$ionicPopup){
        //用于跳转页面，可传参
        $scope.jump=function(desState,arg){
            $state.go(desState,arg);
        }
        //检测是否登录，如果已登录则跳转到指定页面（可传参），未登录则跳转到登录页面
        $scope.jumpJudge=function(desState,arg){
            if(localStorage["loginUname"]){
                $scope.jump(desState,arg);
            }else{
                $scope.jump("Login");
            }
        }
        //弹窗显示提示信息，可添加点击确认后要执行的操作
        $scope.alertMsg=function(tipMsg,func){
            var alerPopup=$ionicPopup.alert({
                title:"提示信息",
                template:tipMsg
            });
            alerPopup.then(func);
        }
    }
]);
//home
app.controller("HomeCtrl",["$scope",
    function($scope){
        //加载搜索关键词的列表
        $scope.inputTxt={kw:""};
        $scope.$watch("inputTxt.kw",function(){
            var productId=$scope.inputTxt.kw;
        })
        $scope.sendMsg=function(){
            $scope.jump("Page",{kw:$scope.inputTxt.kw})
        }
    }
])
//login
app.controller("LoginCtrl",["$scope","$httpParamSerializerJQLike","$ionicPopup",
    function($scope,$httpParamSerializerJQLike,$ionicPopup){
        //登录按钮点击事件
        $("#UserLoginBtn").click(function(){
            var LoginName=$("#loginName").val();
            var LoginUpwd=$("#loginUpwd").val();
            //把从页面获取到的用户名和密码序列化，发送请求，查询数据库中是否存在该用户
            var result={uname:LoginName,upwd:LoginUpwd};
            var data=$httpParamSerializerJQLike(result);
            $.ajax({
                type:"POST",
                url:"/user/login",
                data:data,
                success:function(result){
                    $scope.result=result;
                    if(result.code===200){
                        //从数据库中成功获取数据，把用户名，密码，用户uid保存到本地存储中
                        function aterLogin(){
                            localStorage["loginUname"]=LoginName;
                            localStorage["loginUpwd"]=LoginUpwd;
                            localStorage["loginUid"]=result.uid;
                            $scope.jump("Cart");
                        }
                        $scope.alertMsg("登录成功！",aterLogin());
                    }else{
                        $scope.alertMsg("请检查用户名/密码是否输入正确");
                    }
                }
            })
        })

    }
]);
//register
app.controller("RegisterCtrl",["$scope","$ionicPopup","$httpParamSerializerJQLike",
    function($scope,$ionicPopup,$httpParamSerializerJQLike){
        //点击获取验证码按钮随机生成一个5位数的验证码并弹窗显示，不存入数据库
        $("#testBtn").click(function(){
            var randomNum=parseInt(Math.random()*(99999-10000+1)+10000);
            $scope.randomN=randomNum.toString();
            $scope.alertMsg(randomNum);
        });
        $("#UserRegisterBtn").click(function(){
            var testVal=$("#test").val();
            var phoneNum=$("#phoneNum").val();
            var upwdVal=$("#upwd").val();
            var upwdVal2=$("#upwd2").val();
            //获取checkbox的选中状态（选中/未选中）
            var isAgree=$("#isAgree").prop("checked")
            var regPhone=/^1[34578]\d{9}$/;
            var regPwd=/^\w{6,12}$/;
            //正则判断电话号码，密码的格式，密码与确认密码的内容是否一致，验证码输入正确，CheckBox处于被选中状态
            if(regPhone.test(phoneNum)&&($scope.randomN===testVal)&&regPwd.test(upwdVal)&&(upwdVal==upwdVal2)&&isAgree){
                var result={uname:phoneNum,upwd:upwdVal};
                var data=$httpParamSerializerJQLike(result);
                $.ajax({
                    type:"POST",
                    url:"/user/register",
                    data:data,
                    success:function(result){
                        //查询数据库，如果成功注册，则跳转到登录页面，如果数据库中已存在该用户名，则提示该手机号已被注册
                        if(result.code===200){
                            $scope.alertMsg("注册成功，点击确定跳转到登录页面",$scope.jump("Login"));
                        }else{
                            $scope.alertMsg(result.msg);
                        }
                    }
                });
            }
            else{
                $scope.alertMsg("输入错误");
            }
        })
    }
]);
//person
app.controller("PersonCtrl",["$scope",
    function ($scope) {
        $scope.userName = localStorage["loginUname"];
        //退出登录，并清除本地存储中的用户信息，跳转到登录页面
        $scope.exitClick = function () {
            localStorage['loginUname'] = "";
            localStorage['loginUpwd'] = "";
            localStorage['loginUid'] = "";
            $scope.jump("Login");
        }
        //跳转到个人订单页
        $scope.allOrder=function(){
            $scope.jumpJudge("Order")
        }
    }
]);
//detail
app.controller("DetailCtrl",["$scope","$ionicPopup","$stateParams","$http","$httpParamSerializerJQLike",
    function($scope,$ionicPopup,$stateParams,$http,$httpParamSerializerJQLike){
        //从page页面把选中的产品的did传递到detail页面
        var didSend={txt:$stateParams.id};
        var data=$httpParamSerializerJQLike(didSend);
        //获取page页面选中的产品对于的detail详情信息
        $http.post("/product/detail",data).success(function(result){
            $scope.detailData=result[0];
        })
        //点击加入购物车，如果还没登录则跳转到登录页面，如果已经登录则把该产品的did，用户的uid，数量count：-1（标识，点击加入购物车添加的）发送请求查询数据库，更新购物车
        $scope.addCart=function(){
            if(localStorage["loginUname"]){
                var addResult={did:$stateParams.id,uid:localStorage["loginUid"],count:-1};
                var addData=$httpParamSerializerJQLike(addResult)
                $http.post("/product/cart_update",addData)
                    .success(function(result){
                        $scope.alertMsg("已加入购物车");
                    })
            }else{
                $scope.jump("Login");
            }
        }
        //立即购买，定为库存不足
        $scope.buyNow=function(){
            if(localStorage["loginUname"]){
                $scope.alertMsg("库存不足");
            }else{
                $scope.jump("Login");
            }
        }
        //点击购物车图标，如果已登录则跳转到购物车页面，未登录则跳转到登录页面
        $scope.toCart=function(){
            //此处传递产品的did是为了在cart左上角的返回键点击时可以准确返回前一个页面
            $scope.jumpJudge("Cart");
        }
    }
]);
//cart
app.controller("CartCtrl",["$scope","$stateParams","$httpParamSerializerJQLike","$http",
    function($scope,$stateParams,$httpParamSerializerJQLike,$http){
        $scope.cartSelect=[];
        //查询数据库获取cart购物车页面详情
            var data=$httpParamSerializerJQLike({uid:localStorage["loginUid"]});
            $http.post("product/cart_select",data)
                .success(function(result){
                    $scope.cartSelect=result;
                });
        //传入参数：产品did，产品数量count，更新购物车
        function update(did,count){
            var postData={did:did,uid:localStorage["loginUid"],count:count};
            var data=$httpParamSerializerJQLike(postData);
            $http.post("product/cart_update",data)
            .success(function(result){
                })
        }
        //点击“-”按钮，则产品数量减1，同时更新购物车，如果产品数量已为1，则return
        $scope.munus=function(index){
            var product=$scope.cartSelect[index];
            if(product.dishCount==1){
                return;
            }else{
                product.dishCount--;
                update(product.did,product.dishCount);
            }
        }
        //点击“+”按钮，则产品数量加1，同时更新购物车
        $scope.add=function(index){
            var product=$scope.cartSelect[index];
            product.dishCount++;
            update(product.did,product.dishCount);
        }
        //计算总价，如果产品的checkbox被勾选，则计算，否则不把该产品列入总价
        $scope.sumAll=function(){
            result=0;
            angular.forEach($scope.cartSelect,function(value,key){
                //遍历购物车列表$scope.cartSelect，判断每个产品是否为选中状态，如果被选中则加入计算
                    value.checkState=Boolean(value.checkState)
                    console.log(value.checkState,typeof(value.checkState))
                if(value.checkState===true){
                    result+=(value.price*value.dishCount);
                }
            }
            )
            return result;
        }
        //传入参数：产品did，用户uid，删除选中的产品
        function deletePro(did){
            var deleteId={did:did,uid:localStorage["loginUid"]};
            var data=$httpParamSerializerJQLike(deleteId);
            $http.post("/product/cart_delete",data).success(function(result){
                $scope.cartSelect=result;
            })
        }
        //删除购物车中选中的产品
        $scope.deleteCart=function(){
            angular.forEach($scope.cartSelect,function(value,key){
                if(value.checkState===true){
                    deletePro(value.did);
                }
            })
        }
        //点击结算按钮，跳转到个人订单页
        $scope.jumpToOrder=function(){
            angular.forEach($scope.cartSelect,function(value,key){
                if(value.checkState===true){
                    var data={uid:localStorage["loginUid"],did:value.did,dishCount:value.dishCount,price:value.price}
                    var sendData=$httpParamSerializerJQLike(data);
                    $http.post("/product/order_add",sendData).success(function(result){
                        deletePro(result);
                    })
                }
            })
            $scope.jump("Order");
        }
        //返回所有的购物车列表的产品的勾选状态的并集，可判断是否全部选中
        $scope.chooseSome=function(){
            var result=true;
            angular.forEach($scope.cartSelect,function(value,key){
                result=result&&value.checkState;
            });
            $scope.selectAll=result;
        }
        //把所有的购物车列表的产品全部选中
        $scope.chooseAll=function(){
            angular.forEach($scope.cartSelect,function(value,key){
                value.checkState=$scope.selectAll;
            })
        }
    }
]);
//order
app.controller("OrderCtrl",["$scope","$http","$httpParamSerializerJQLike",
    function($scope,$http,$httpParamSerializerJQLike){
    if(localStorage["loginUid"]){
        var data=$httpParamSerializerJQLike({uid:localStorage["loginUid"]});
        $http.post("/product/order_detail",data).success(function(result){
            $scope.orderAll=result;
        })
    }
    }])
//page
app.controller("PageCtrl", ["$scope", "$http","$httpParamSerializerJQLike","$stateParams",
    function ($scope, $http,$httpParamSerializerJQLike,$stateParams) {
        console.log($stateParams.kw);
        if($stateParams.kw){
            $scope.inputTxt={kw:$stateParams.kw};
            $scope.$watch("inputTxt.kw",function(){
                var productId=$scope.inputTxt.kw;
                console.log(productId)
                if(productId){
                    var result={txt:productId};
                    var data=$httpParamSerializerJQLike(result);
                    $http.post("/product/kw",data).success(function(result){
                        if(result){
                            $scope.pageList=result;
                        }
                    })
                }
            })

        }else{
            //获取产品列表
            $scope.pageList=[];
            $http.get("/product/page")
                .success(function (result) {
                    $scope.pageList=result;
                });

            //加载搜索关键词的列表
            $scope.inputTxt={kw:""};
            $scope.$watch("inputTxt.kw",function(){
                var productId=$scope.inputTxt.kw;
                if(productId){
                    var result={txt:productId};
                    var data=$httpParamSerializerJQLike(result);
                    $http.post("/product/kw",data).success(function(result){
                        if(result){
                            $scope.pageList=result;
                        }
                    })
                }
            })
        }


    }
]);



