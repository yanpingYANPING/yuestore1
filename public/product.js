/**
 * Created by bjwsl-001 on 2017/6/30.
 */
const pool=require("./pool");
module.exports={
    //获取产品列表页page的信息
    page:(req,res)=>{
        pool.getConnection((err,conn)=>{
            conn.query("SELECT did,name,detail,price,img_sm FROM yue_product",(err,result)=>{
                res.json(result);
                conn.release();
            })
        })
    },
    //获取产品列表页page中对应的关键词的产品列表
    kw:(req,res)=>{
        var txt=req.body.txt;
        pool.getConnection((err,conn)=>{
            conn.query("SELECT did,name,detail,price,img_sm FROM yue_product WHERE name LIKE ?",['%'+txt+'%'],(err,result)=>{
                res.json(result);
                conn.release();
            });
        })
    },
    //获取对应产品的详情页detail信息
    detail:(req,res)=>{
        var did=req.body.txt;
        pool.getConnection((err,conn)=>{
            conn.query("SELECT did,name,price,img_lg FROM yue_product WHERE did=?",[did],(err,result)=>{
                res.json(result);
                conn.release();
            })
        })
    },
    //根据用户uid，产品did，产品数量count，更新购物车信息
    cart_update:(req,res)=>{
        var cartDid=req.body.did;
        var cartUid=req.body.uid;
        var cartCount=req.body.count;
        pool.getConnection((err,conn)=>{
            conn.query("SELECT ctid FROM yue_cart WHERE userid=? AND did=?",[cartUid,cartDid],(err,result)=>{
                //先查询购物车，判断是否曾经购买过该商品，如果购买过则直接更新购物车，如果没有购买过则往购物车列表中插入新数据
                if(result.length>0){
                    //count=-1，在detail中点击加入购物车
                    if(cartCount==-1){
                        conn.query("UPDATE yue_cart SET dishCount=dishCount+1 WHERE userid=? AND did=?",[cartUid,cartDid],(err,result)=>{
                            var data={code:200,msg:"之前曾经购买过该商品，则更新购买数量加1,加入购物车"};
                            res.json(data);
                        })
                    }
                 else{
                        //count！=-1，在cart中点击“-”或“+”按钮造成数量改变
                        conn.query("UPDATE yue_cart SET dishCount=? WHERE userid=? AND did=?",[cartCount,cartUid,cartDid],(err,result)=>{
                            var data={code:300,msg:"之前曾经购买过该商品，则更新购买数量为参数中的$count，修改购物车中在+/-"};
                            res.json(data);
                        });
                    }
                }else{
                    conn.query("INSERT INTO yue_cart VALUES(null,?,?,1)",[cartUid,cartDid],(err,result)=>{
                        var data={code:500,msg:"之前从未购买过该商品，则添加购买记录，购买数量为1"};
                        res.json(data);
                    })
                }
                conn.release();
            })
        })
    },
    //根据用户uid查询购物车列表信息
    cart_select:(req,res)=>{
        var uid=req.body.uid;
        pool.getConnection((err,conn)=>{
            conn.query("SELECT yue_cart.ctid,yue_cart.did,yue_cart.dishCount,yue_product.name,yue_product.classify,yue_product.checkState,yue_product.price,yue_product.img_sm FROM yue_product,yue_cart WHERE yue_cart.did=yue_product.did AND yue_cart.userid=?",[uid],(err,result)=>{
                res.json(result);
                conn.release();
            })
        })
    },
    //删除购物车中选中的产品
    cart_delete:(req,res)=>{
        var did=req.body.did;
        var uid=req.body.uid;
        pool.getConnection((err,conn)=>{
            //删除选中产品
            conn.query("DELETE FROM yue_cart WHERE did=?",[did],(err,result)=>{
                //删除后更新购物车列表
                conn.query("SELECT yue_cart.ctid,yue_cart.did,yue_cart.dishCount,yue_product.name,yue_product.classify,yue_product.checkState,yue_product.price,yue_product.img_sm FROM yue_product,yue_cart WHERE yue_cart.did=yue_product.did AND yue_cart.userid=?",[uid],(err,result)=>{
                    res.json(result);
                    conn.release();
                })
            })
        })
    },
    // 添加订单信息
    order_add:(req,res)=>{
        var uid=req.body.uid;
        var did=req.body.did;
        var dishCount=req.body.dishCount;
        var price=req.body.price;
        var data={a1:did,a2:dishCount,a3:price};
        pool.getConnection((err,conn)=>{
            conn.query("INSERT INTO yue_order VALUES(null,?,?,?,?)",[uid,did,dishCount,price],(err,result)=>{
                //增加成功后返回产品的did，用于删除购物车对于的产品
                res.json(did);
                conn.release();
            })
        })
    },
    //在订单页显示订单详情
    order_detail:(req,res)=>{
        var uid=req.body.uid;
        pool.getConnection((err,conn)=>{
            conn.query("SELECT yue_order.oid,yue_order.price,yue_order.dishCount,yue_product.img_sm,yue_product.name,yue_product.classify FROM yue_order,yue_product WHERE yue_order.did=yue_product.did AND yue_order.uid=?",[uid],(err,result)=>{
                res.json(result);
                conn.release();
            })
        })
    }
}
