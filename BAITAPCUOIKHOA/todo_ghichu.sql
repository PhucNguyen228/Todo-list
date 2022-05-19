/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80027
 Source Host           : localhost:3306
 Source Schema         : tea_todo

 Target Server Type    : MySQL
 Target Server Version : 80027
 File Encoding         : 65001

 Date: 15/04/2022 20:40:25
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for todo_ghichu
-- ----------------------------
DROP TABLE IF EXISTS `todo_ghichu`;
CREATE TABLE `todo_ghichu` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(4000) DEFAULT NULL,
  `ghichu` varbinary(4000) DEFAULT NULL,
  `daxoa` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

SET FOREIGN_KEY_CHECKS = 1;
