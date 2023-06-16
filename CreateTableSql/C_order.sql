-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: graduation
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `orderid` varchar(45) COLLATE utf8mb3_bin NOT NULL,
  `orderstate` int DEFAULT '1',
  `createtime` datetime DEFAULT NULL,
  `finishtime` datetime DEFAULT NULL,
  `userplayid` bigint DEFAULT NULL,
  `sellerid` bigint DEFAULT NULL,
  `commodityid` bigint DEFAULT NULL,
  `commodityname` varchar(45) COLLATE utf8mb3_bin DEFAULT NULL,
  `price` double DEFAULT NULL,
  `paystate` int DEFAULT '0',
  `sellername` varchar(45) COLLATE utf8mb3_bin DEFAULT NULL,
  `buyername` varchar(45) COLLATE utf8mb3_bin DEFAULT NULL,
  `deletemarkbuyer` tinyint DEFAULT NULL,
  `deletemarkseller` tinyint DEFAULT NULL,
  `buyerok` tinyint DEFAULT NULL,
  `sellerok` tinyint DEFAULT NULL,
  PRIMARY KEY (`orderid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES ('14121684210881471',1,'2023-05-16 12:21:21','0000-00-00 00:00:00',1,2,41,'桌子',30,0,'2号用户','1号用户',0,0,0,0),('24011684210906510',1,'2023-05-16 12:21:46','0000-00-00 00:00:00',2,1,40,'书本',20,0,'1号用户','2号用户',0,0,0,0);
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-22 20:46:25
