DROP DATABASE yueStore;
CREATE DATABASE yueStore CHARSET=UTF8;
USE yueStore;
CREATE TABLE yue_user(
  uid   INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(25) NOT NULL DEFAULT '',
  upwd  VARCHAR(32) NOT NULL DEFAULT ''
);
SELECT * FROM yue_user;

--//��Ʒ�����
CREATE TABLE yue_product(
  did INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(256),
  detail VARCHAR(256),
  classify VARCHAR(64),
  price FLOAT(10,2),
  img_sm VARCHAR(64),
  img_lg VARCHAR(64),
  checkState INT /*0����ûѡ�У�1����ѡ��*/
  );
INSERT INTO yue_product(did,name,detail,classify,price,img_sm,img_lg,checkState) VALUES
(
  null,
  "OPPO R11 �ƶ���ͨ����4G�ֻ� ˫��˫�� ���Ľ�",
  "˫��ͷ�����ڴ棬��������",
  "���Ľ� 64G �ٷ�����",
  2978.00,
  "img/page/1.jpg",
  "img/page/1.jpg",
  0
),
(
  null,
  "OPPO R11 ȫ��ͨ4G+64G ˫��˫���ֻ� õ���ɫ",
  "����������!1Ԫ500M,��ʱ1Ԫ����",
  "õ���ɫ 64G �Ż���װ1",
  2999.00,
  "img/page/2.jpg",
  "img/page/2.jpg",
  0
),
(
  null,
  "ƻ�� iPhone 7 Plus ������ͷ��һ�ģ����ϣ� ��ˮ����",
  "1200���˫����ͷ���������ģ�",
  "����� 128G �ײͶ�",
  3999.00,
  "img/page/11.jpg",
  "img/page/11.jpg",
  0
),
(
  null,
  "��Ϊ HUAWEI nova 4GB+64GB�� õ��� �ƶ���ͨ����4G�ֻ�",
  "4K������Ƶ���㣡�������ģ�",
  "õ��� 64G �ٷ�����",
  2199.00,
  "img/page/6.jpg",
  "img/page/6.jpg",
  0
),
(
  null,
  "��Ϊnova2plus �ֻ� ������ ȫ��ͨ(4GB+128GB)�����",
  "��ѧ�佹˫��ͷ��ǰ�ð�������",
  "������ 64G �Ż���װ2",
  2899.00,
  "img/page/5.jpg",
  "img/page/5.jpg",
  0
),
(
  null,
  "��ͼ M8 �˹��������ģ� ������3D��������",
  "�������ģ�DTS��Ч��",
    "��°� 128G �ٷ�����",
  2999.00,
  "img/page/10.jpg",
  "img/page/10.jpg",
  0
),
(
  null,
  "���� ���Pro 64GB ̼��ɫ ȫ��ͨ �ƶ���ͨ����4G�ֻ� ˫��˫��",
  "�Զ�����������,����������ק",
   "̼��ɫ 64G �Ż���װ2",
  1590.00,
  "img/page/4.jpg",
  "img/page/4.jpg",
  0
),
(
  null,
  "��ҫ ��ҫ9 2000��佹˫�㣬 3D���漫�ⲣ��",
  "�������ģ�DTS��Ч��",
   "õ��� 64G �ٷ�����",
  1599.00,
  "img/page/9.jpg",
  "img/page/9.jpg",
  0
),
(
  null,
  "һ���ֻ�5 (A5000) 6GB+64GB ���һ� ˫��˫�� �ƶ���ͨ����4G�ֻ�",
  "6GB���ڴ�+��ͨ����835��������",
  "���һ� 64G �Ż���װ1",
  2999.00,
  "img/page/3.jpg",
  "img/page/3.jpg",
  0
),
(
  null,
  "HP/���� envy 13-ad019TU�ʼǱ����� �ᱡ��Я ����������",
  "��խ�߿�,ȫ�������й���",
  "Ӣ�ض� ��� i5-7200U Ӣ�ض� HD Graphics 620",
  5499.00,
  "img/page/7.jpg",
  "img/page/7.jpg",
  0
),
(
  null,
  "Huawei/��Ϊ M3ƽ�����WIFI 8.4Ӣ��4G�绰ͨ���ֻ�2K��������׿",
  "���,6����Ϣ��15�غ���",
  "M3 8.4Ӣ�� ��°� �ײ�һ",
  2688.00,
  "img/page/8.jpg",
  "img/page/8.jpg",
  0
);
SELECT * FROM yue_product;
--���ﳵ��
CREATE TABLE yue_cart(
    ctid INT PRIMARY KEY AUTO_INCREMENT, /*���ﳵ���*/
    userid INT,                          /*�û���ţ��ٶ����û�idΪ 1 �� 3 �������û�������*/
    did INT,                             /*��Ʒ���*/
    dishCount INT                      /*����*/
);
--������
CREATE TABLE yue_order(
    oid INT PRIMARY KEY AUTO_INCREMENT , /*�������*/
    uid INT,                              /*�û����*/
    did INT,                             /*��Ʒid*/
    dishCount INT,                     /*��������*/
    price FLOAT(8,2)                     /*��Ʒ���ۣ���Ҫ���أ���Ϊ��Ʒ�۸���ܲ���*/
);
SELECT * FROM yue_order;