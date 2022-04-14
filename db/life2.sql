/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 50734
 Source Host           : localhost:3306
 Source Schema         : life2

 Target Server Type    : MySQL
 Target Server Version : 50734
 File Encoding         : 65001

 Date: 25/01/2022 09:52:32
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for bill
-- ----------------------------
DROP TABLE IF EXISTS `bill`;
CREATE TABLE `bill`  (
  `billId` char(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '账单id',
  `userId` char(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户id',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '标题',
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备注',
  `date` datetime(0) NOT NULL COMMENT '日期',
  `expend` float(10, 2) NOT NULL DEFAULT 0.00 COMMENT '支付',
  `income` float(10, 2) NOT NULL DEFAULT 0.00 COMMENT '收入',
  `billTypeId` int(11) NOT NULL COMMENT '账本类型id',
  `iconId` int(11) NOT NULL COMMENT '图标id',
  `image` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '账单相关图片数组',
  PRIMARY KEY (`billId`) USING BTREE,
  INDEX `billTypeId`(`billTypeId`) USING BTREE,
  INDEX `iconId`(`iconId`) USING BTREE,
  CONSTRAINT `bill_ibfk_1` FOREIGN KEY (`billTypeId`) REFERENCES `billtype` (`BillTypeId`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `bill_ibfk_2` FOREIGN KEY (`iconId`) REFERENCES `icon` (`iconId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for billtype
-- ----------------------------
DROP TABLE IF EXISTS `billtype`;
CREATE TABLE `billtype`  (
  `BillTypeId` int(11) NOT NULL AUTO_INCREMENT COMMENT '账单类型id',
  `billTypeName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '账单类型名',
  PRIMARY KEY (`BillTypeId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of billtype
-- ----------------------------
INSERT INTO `billtype` VALUES (1, '日常');

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `commentId` int(10) NOT NULL AUTO_INCREMENT COMMENT '评论id',
  `date` datetime(0) NOT NULL COMMENT '评论时间',
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '评论内容',
  `recordId` int(10) NOT NULL COMMENT '记录id',
  `userId` char(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '评论用户id',
  `username` char(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '评论用户名',
  PRIMARY KEY (`commentId`) USING BTREE,
  INDEX `userId`(`userId`) USING BTREE,
  INDEX `recordId`(`recordId`) USING BTREE,
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`recordId`) REFERENCES `record` (`recordId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for endose
-- ----------------------------
DROP TABLE IF EXISTS `endose`;
CREATE TABLE `endose`  (
  `endoseId` int(10) NOT NULL AUTO_INCREMENT COMMENT '赞同id',
  `recordId` int(11) NOT NULL COMMENT '记录id',
  `collect` enum('0','1') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '0不收藏 1收藏',
  `favourite` enum('0','1') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0' COMMENT '0不喜欢 1喜欢',
  `userId` char(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '赞同人用户id',
  PRIMARY KEY (`endoseId`) USING BTREE,
  INDEX `userId`(`userId`) USING BTREE,
  INDEX `recordId`(`recordId`) USING BTREE,
  CONSTRAINT `endose_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `endose_ibfk_2` FOREIGN KEY (`recordId`) REFERENCES `record` (`recordId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for icon
-- ----------------------------
DROP TABLE IF EXISTS `icon`;
CREATE TABLE `icon`  (
  `iconId` int(11) NOT NULL AUTO_INCREMENT COMMENT '图标id',
  `iconTypeId` int(10) NOT NULL COMMENT ' 图标类型id',
  `iconTitle` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '图标名称',
  PRIMARY KEY (`iconId`) USING BTREE,
  INDEX `iconTypeId`(`iconTypeId`) USING BTREE,
  CONSTRAINT `icon_ibfk_1` FOREIGN KEY (`iconTypeId`) REFERENCES `icontype` (`iconTypeId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of icon
-- ----------------------------
INSERT INTO `icon` VALUES (1, 45, '房租');
INSERT INTO `icon` VALUES (2, 89, '餐饮');
INSERT INTO `icon` VALUES (3, 97, '零食');
INSERT INTO `icon` VALUES (4, 118, '水果');
INSERT INTO `icon` VALUES (5, 90, '旅游');
INSERT INTO `icon` VALUES (6, 33, '医疗');
INSERT INTO `icon` VALUES (7, 107, '服饰');
INSERT INTO `icon` VALUES (8, 99, '美容');
INSERT INTO `icon` VALUES (9, 61, '烂账');
INSERT INTO `icon` VALUES (10, 57, '学习');
INSERT INTO `icon` VALUES (11, 77, '日常');
INSERT INTO `icon` VALUES (12, 129, '押金');
INSERT INTO `icon` VALUES (13, 132, '宠物');
INSERT INTO `icon` VALUES (14, 22, '交通');
INSERT INTO `icon` VALUES (15, 65, '母婴');

-- ----------------------------
-- Table structure for icontype
-- ----------------------------
DROP TABLE IF EXISTS `icontype`;
CREATE TABLE `icontype`  (
  `iconTypeId` int(10) NOT NULL AUTO_INCREMENT COMMENT '图标类型id',
  `iconTypeName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '图标类型名称',
  `iconTypeUrl` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '图标类型地址',
  `level` int(3) NOT NULL COMMENT '级别 0是一级',
  PRIMARY KEY (`iconTypeId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 133 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of icontype
-- ----------------------------
INSERT INTO `icontype` VALUES (1, '娱乐', NULL, 0);
INSERT INTO `icontype` VALUES (2, '交通', NULL, 0);
INSERT INTO `icontype` VALUES (3, '医护', NULL, 0);
INSERT INTO `icontype` VALUES (4, '居家', NULL, 0);
INSERT INTO `icontype` VALUES (5, '学习', NULL, 0);
INSERT INTO `icontype` VALUES (6, '母婴', NULL, 0);
INSERT INTO `icontype` VALUES (7, '生活', NULL, 0);
INSERT INTO `icontype` VALUES (8, '购物', NULL, 0);
INSERT INTO `icontype` VALUES (9, '金融', NULL, 0);
INSERT INTO `icontype` VALUES (10, '其他', NULL, 0);
INSERT INTO `icontype` VALUES (11, NULL, 'amusement1.png', 1);
INSERT INTO `icontype` VALUES (12, NULL, 'amusement2.png', 1);
INSERT INTO `icontype` VALUES (13, NULL, 'amusement3.png', 1);
INSERT INTO `icontype` VALUES (14, NULL, 'amusement4.png', 1);
INSERT INTO `icontype` VALUES (15, NULL, 'amusement5.png', 1);
INSERT INTO `icontype` VALUES (16, NULL, 'amusement6.png', 1);
INSERT INTO `icontype` VALUES (17, NULL, 'amusement7.png', 1);
INSERT INTO `icontype` VALUES (18, NULL, 'amusement8.png', 1);
INSERT INTO `icontype` VALUES (19, NULL, 'amusement9.png', 1);
INSERT INTO `icontype` VALUES (20, NULL, 'car1.png', 2);
INSERT INTO `icontype` VALUES (21, NULL, 'car2.png', 2);
INSERT INTO `icontype` VALUES (22, NULL, 'car3.png', 2);
INSERT INTO `icontype` VALUES (23, NULL, 'car4.png', 2);
INSERT INTO `icontype` VALUES (24, NULL, 'car5.png', 2);
INSERT INTO `icontype` VALUES (25, NULL, 'car6.png', 2);
INSERT INTO `icontype` VALUES (26, NULL, 'car7.png', 2);
INSERT INTO `icontype` VALUES (27, NULL, 'car8.png', 2);
INSERT INTO `icontype` VALUES (28, NULL, 'car9.png', 2);
INSERT INTO `icontype` VALUES (29, NULL, 'medical1.png', 3);
INSERT INTO `icontype` VALUES (30, NULL, 'medical2.png', 3);
INSERT INTO `icontype` VALUES (31, NULL, 'medical3.png', 3);
INSERT INTO `icontype` VALUES (32, NULL, 'medical4.png', 3);
INSERT INTO `icontype` VALUES (33, NULL, 'medical5.png', 3);
INSERT INTO `icontype` VALUES (34, NULL, 'medical6.png', 3);
INSERT INTO `icontype` VALUES (35, NULL, 'medical7.png', 3);
INSERT INTO `icontype` VALUES (36, NULL, 'medical8.png', 3);
INSERT INTO `icontype` VALUES (37, NULL, 'medical9.png', 3);
INSERT INTO `icontype` VALUES (38, NULL, 'medical10.png', 3);
INSERT INTO `icontype` VALUES (39, NULL, 'medical11.png', 3);
INSERT INTO `icontype` VALUES (40, NULL, 'home1.png', 4);
INSERT INTO `icontype` VALUES (41, NULL, 'home2.png', 4);
INSERT INTO `icontype` VALUES (42, NULL, 'home3.png', 4);
INSERT INTO `icontype` VALUES (43, NULL, 'home4.png', 4);
INSERT INTO `icontype` VALUES (44, NULL, 'home5.png', 4);
INSERT INTO `icontype` VALUES (45, NULL, 'home6.png ', 4);
INSERT INTO `icontype` VALUES (46, NULL, 'home7.png ', 4);
INSERT INTO `icontype` VALUES (47, NULL, 'home8.png', 4);
INSERT INTO `icontype` VALUES (48, NULL, 'home9.png', 4);
INSERT INTO `icontype` VALUES (49, NULL, 'home10.png', 4);
INSERT INTO `icontype` VALUES (50, NULL, 'home11.png', 4);
INSERT INTO `icontype` VALUES (51, NULL, 'home12.png', 4);
INSERT INTO `icontype` VALUES (52, NULL, 'study1.png', 5);
INSERT INTO `icontype` VALUES (53, NULL, 'study2.png', 5);
INSERT INTO `icontype` VALUES (54, NULL, 'study3.png', 5);
INSERT INTO `icontype` VALUES (55, NULL, 'study4.png', 5);
INSERT INTO `icontype` VALUES (56, NULL, 'study5.png', 5);
INSERT INTO `icontype` VALUES (57, NULL, 'study6.png', 5);
INSERT INTO `icontype` VALUES (58, NULL, 'study7.png', 5);
INSERT INTO `icontype` VALUES (59, NULL, 'study8.png', 5);
INSERT INTO `icontype` VALUES (60, NULL, 'study9.png', 5);
INSERT INTO `icontype` VALUES (61, NULL, 'study10.png', 5);
INSERT INTO `icontype` VALUES (62, NULL, 'study11.png', 5);
INSERT INTO `icontype` VALUES (63, NULL, 'study12.png', 5);
INSERT INTO `icontype` VALUES (64, NULL, 'baby1.png', 6);
INSERT INTO `icontype` VALUES (65, NULL, 'baby2.png', 6);
INSERT INTO `icontype` VALUES (66, NULL, 'baby3.png', 6);
INSERT INTO `icontype` VALUES (67, NULL, 'baby4.png', 6);
INSERT INTO `icontype` VALUES (68, NULL, 'baby5.png', 6);
INSERT INTO `icontype` VALUES (69, NULL, 'baby6.png', 6);
INSERT INTO `icontype` VALUES (70, NULL, 'baby7.png', 6);
INSERT INTO `icontype` VALUES (71, NULL, 'baby8.png', 6);
INSERT INTO `icontype` VALUES (72, NULL, 'baby9.png', 6);
INSERT INTO `icontype` VALUES (73, NULL, 'baby10.png', 6);
INSERT INTO `icontype` VALUES (74, NULL, 'life1.png', 7);
INSERT INTO `icontype` VALUES (75, NULL, 'life2.png', 7);
INSERT INTO `icontype` VALUES (76, NULL, 'life3.png', 7);
INSERT INTO `icontype` VALUES (77, NULL, 'life4.png', 7);
INSERT INTO `icontype` VALUES (78, NULL, 'life5.png', 7);
INSERT INTO `icontype` VALUES (79, NULL, 'life6.png', 7);
INSERT INTO `icontype` VALUES (80, NULL, 'life7.png', 7);
INSERT INTO `icontype` VALUES (81, NULL, 'life8.png', 7);
INSERT INTO `icontype` VALUES (82, NULL, 'life9.png', 7);
INSERT INTO `icontype` VALUES (83, NULL, 'life10.png', 7);
INSERT INTO `icontype` VALUES (84, NULL, 'life11.png', 7);
INSERT INTO `icontype` VALUES (85, NULL, 'life12.png', 7);
INSERT INTO `icontype` VALUES (86, NULL, 'life13.png', 7);
INSERT INTO `icontype` VALUES (87, NULL, 'life14.png', 7);
INSERT INTO `icontype` VALUES (88, NULL, 'life15.png', 7);
INSERT INTO `icontype` VALUES (89, NULL, 'life16.png', 7);
INSERT INTO `icontype` VALUES (90, NULL, 'life17.png', 7);
INSERT INTO `icontype` VALUES (91, NULL, 'life18.png', 7);
INSERT INTO `icontype` VALUES (92, NULL, 'life19.png', 7);
INSERT INTO `icontype` VALUES (93, NULL, 'life20.png', 7);
INSERT INTO `icontype` VALUES (94, NULL, 'life21.png', 7);
INSERT INTO `icontype` VALUES (95, NULL, 'life22.png', 7);
INSERT INTO `icontype` VALUES (96, NULL, 'life23.png', 7);
INSERT INTO `icontype` VALUES (97, NULL, 'life24.png', 7);
INSERT INTO `icontype` VALUES (98, NULL, 'shop1.png', 8);
INSERT INTO `icontype` VALUES (99, NULL, 'shop2.png', 8);
INSERT INTO `icontype` VALUES (100, NULL, 'shop3.png', 8);
INSERT INTO `icontype` VALUES (101, NULL, 'shop4.png', 8);
INSERT INTO `icontype` VALUES (102, NULL, 'shop5.png', 8);
INSERT INTO `icontype` VALUES (103, NULL, 'shop6.png', 8);
INSERT INTO `icontype` VALUES (104, NULL, 'shop7.png', 8);
INSERT INTO `icontype` VALUES (105, NULL, 'shop8.png', 8);
INSERT INTO `icontype` VALUES (106, NULL, 'shop9.png', 8);
INSERT INTO `icontype` VALUES (107, NULL, 'shop10.png', 8);
INSERT INTO `icontype` VALUES (108, NULL, 'shop11.png', 8);
INSERT INTO `icontype` VALUES (109, NULL, 'shop12.png', 8);
INSERT INTO `icontype` VALUES (110, NULL, 'shop13.png', 8);
INSERT INTO `icontype` VALUES (111, NULL, 'shop14.png', 8);
INSERT INTO `icontype` VALUES (112, NULL, 'shop15.png', 8);
INSERT INTO `icontype` VALUES (113, NULL, 'life24.png', 7);
INSERT INTO `icontype` VALUES (114, NULL, 'life25.png', 7);
INSERT INTO `icontype` VALUES (115, NULL, 'life26.png', 7);
INSERT INTO `icontype` VALUES (116, NULL, 'life27.png', 7);
INSERT INTO `icontype` VALUES (117, NULL, 'life28.png', 7);
INSERT INTO `icontype` VALUES (118, NULL, 'life29.png', 7);
INSERT INTO `icontype` VALUES (119, NULL, 'fund1.png', 9);
INSERT INTO `icontype` VALUES (120, NULL, 'fund2.png', 9);
INSERT INTO `icontype` VALUES (121, NULL, 'fund3.png', 9);
INSERT INTO `icontype` VALUES (122, NULL, 'fund4.png', 9);
INSERT INTO `icontype` VALUES (123, NULL, 'fund5.png', 9);
INSERT INTO `icontype` VALUES (124, NULL, 'fund6.png', 9);
INSERT INTO `icontype` VALUES (125, NULL, 'fund7.png', 9);
INSERT INTO `icontype` VALUES (126, NULL, 'fund8.png', 9);
INSERT INTO `icontype` VALUES (127, NULL, 'fund9.png', 9);
INSERT INTO `icontype` VALUES (128, NULL, 'fund10.png', 9);
INSERT INTO `icontype` VALUES (129, NULL, 'fund11.png', 9);
INSERT INTO `icontype` VALUES (130, NULL, 'fund12.png', 9);
INSERT INTO `icontype` VALUES (131, NULL, 'other.png', 10);
INSERT INTO `icontype` VALUES (132, NULL, 'life30.png', 7);

-- ----------------------------
-- Table structure for record
-- ----------------------------
DROP TABLE IF EXISTS `record`;
CREATE TABLE `record`  (
  `recordId` int(10) NOT NULL COMMENT '记录id',
  `userName` char(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '发表人用户昵称',
  `recordText` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '记录内容',
  `recordImage` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '记录图片',
  `power` enum('0','1') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '1' COMMENT '观看权限 0不可看 1可看',
  PRIMARY KEY (`recordId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for relation
-- ----------------------------
DROP TABLE IF EXISTS `relation`;
CREATE TABLE `relation`  (
  `id` int(11) NOT NULL COMMENT ' ',
  `ownId` char(11) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户id',
  `friendId` char(11) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '好友id',
  `power` enum('0','1') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0' COMMENT '0不可见 1可见',
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `ownId`(`ownId`) USING BTREE,
  INDEX `friendId`(`friendId`) USING BTREE,
  CONSTRAINT `relation_ibfk_1` FOREIGN KEY (`ownId`) REFERENCES `user` (`userId`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `relation_ibfk_2` FOREIGN KEY (`friendId`) REFERENCES `user` (`userId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `userId` char(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户id',
  `userName` char(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '昵称',
  `password` char(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `image` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户头像',
  `gender` enum('0','1','2') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0' COMMENT '性别 0未定义 1男 2女',
  `phone` char(11) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '手机号码',
  `birthdate` datetime(0) NULL DEFAULT NULL COMMENT '出生日期',
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '邮件',
  `role` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '角色 是否为会员',
  PRIMARY KEY (`userId`) USING BTREE,
  UNIQUE INDEX `userName`(`userName`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'test', 'test123', NULL, '0', '13078964567', '2022-01-24 00:00:00', 'test@com', NULL);

SET FOREIGN_KEY_CHECKS = 1;
