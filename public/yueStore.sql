DROP DATABASE yueStore;
CREATE DATABASE yueStore CHARSET=UTF8;
USE yueStore;
CREATE TABLE yue_user(
  uid   INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(25) NOT NULL DEFAULT '',
  upwd  VARCHAR(32) NOT NULL DEFAULT ''
);
SELECT * FROM yue_user;

--//商品详情表
CREATE TABLE yue_product(
  did INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(256),
  detail VARCHAR(256),
  classify VARCHAR(64),
  price FLOAT(10,2),
  img_sm VARCHAR(64),
  img_lg VARCHAR(64),
  checkState INT /*0代表没选中，1代表选中*/
  );
INSERT INTO yue_product(did,name,detail,classify,price,img_sm,img_lg,checkState) VALUES
(
  null,
  "OPPO R11 移动联通电信4G手机 双卡双待 香槟金",
  "双镜头，大内存，长续航！",
  "香槟金 64G 官方标配",
  2978.00,
  "img/page/1.jpg",
  "img/page/1.jpg",
  0
),
(
  null,
  "OPPO R11 全网通4G+64G 双卡双待手机 玫瑰金色",
  "来张流量卡!1元500M,限时1元抢！",
  "玫瑰金色 64G 优惠套装1",
  2999.00,
  "img/page/2.jpg",
  "img/page/2.jpg",
  0
),
(
  null,
  "苹果 iPhone 7 Plus 两个镜头，一拍，即合， 防水防尘",
  "1200万后双摄像头，美颜自拍！",
  "日落辉 128G 套餐二",
  3999.00,
  "img/page/11.jpg",
  "img/page/11.jpg",
  0
),
(
  null,
  "华为 HUAWEI nova 4GB+64GB版 玫瑰金 移动联通电信4G手机",
  "4K高清视频拍摄！美颜自拍！",
  "玫瑰金 64G 官方标配",
  2199.00,
  "img/page/6.jpg",
  "img/page/6.jpg",
  0
),
(
  null,
  "华为nova2plus 手机 极光蓝 全网通(4GB+128GB)标配版",
  "光学变焦双镜头，前置暗光拍摄",
  "极光蓝 64G 优惠套装2",
  2899.00,
  "img/page/5.jpg",
  "img/page/5.jpg",
  0
),
(
  null,
  "美图 M8 人工智能自拍， 六曲面3D玻璃机身",
  "美颜自拍！DTS音效！",
    "皓月白 128G 官方标配",
  2999.00,
  "img/page/10.jpg",
  "img/page/10.jpg",
  0
),
(
  null,
  "锤子 坚果Pro 64GB 碳黑色 全网通 移动联通电信4G手机 双卡双待",
  "自定义来电语音,智能语义拖拽",
   "碳黑色 64G 优惠套装2",
  1590.00,
  "img/page/4.jpg",
  "img/page/4.jpg",
  0
),
(
  null,
  "荣耀 荣耀9 2000万变焦双摄， 3D曲面极光玻璃",
  "美颜自拍！DTS音效！",
   "玫瑰金 64G 官方标配",
  1599.00,
  "img/page/9.jpg",
  "img/page/9.jpg",
  0
),
(
  null,
  "一加手机5 (A5000) 6GB+64GB 月岩灰 双卡双待 移动联通电信4G手机",
  "6GB大内存+高通骁龙835处理器！",
  "月岩灰 64G 优惠套装1",
  2999.00,
  "img/page/3.jpg",
  "img/page/3.jpg",
  0
),
(
  null,
  "HP/惠普 envy 13-ad019TU笔记本电脑 轻薄便携 超薄超极本",
  "超窄边框,全金属钻切工艺",
  "英特尔 酷睿 i5-7200U 英特尔 HD Graphics 620",
  5499.00,
  "img/page/7.jpg",
  "img/page/7.jpg",
  0
),
(
  null,
  "Huawei/华为 M3平板电脑WIFI 8.4英寸4G电话通话手机2K高清屏安卓",
  "狂暑季,6期免息抢15重豪礼",
  "M3 8.4英寸 皓月白 套餐一",
  2688.00,
  "img/page/8.jpg",
  "img/page/8.jpg",
  0
);
SELECT * FROM yue_product;
--购物车表
CREATE TABLE yue_cart(
    ctid INT PRIMARY KEY AUTO_INCREMENT, /*购物车编号*/
    userid INT,                          /*用户编号：假定有用户id为 1 和 3 的两个用户有数据*/
    did INT,                             /*产品编号*/
    dishCount INT                      /*数量*/
);
--订单表
CREATE TABLE yue_order(
    oid INT PRIMARY KEY AUTO_INCREMENT , /*订单编号*/
    uid INT,                              /*用户编号*/
    did INT,                             /*产品id*/
    dishCount INT,                     /*购买数量*/
    price FLOAT(8,2)                     /*产品单价：需要记载，因为产品价格可能波动*/
);
SELECT * FROM yue_order;