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
-- Table structure for table `commodity`
--

DROP TABLE IF EXISTS `commodity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commodity` (
  `commodityid` bigint NOT NULL AUTO_INCREMENT,
  `userid` bigint NOT NULL,
  `classifyid` bigint NOT NULL,
  `commodityname` varchar(45) COLLATE utf8mb3_bin NOT NULL,
  `image` varchar(200) COLLATE utf8mb3_bin DEFAULT NULL,
  `detail` varchar(45) COLLATE utf8mb3_bin DEFAULT NULL,
  `price` double DEFAULT '0',
  `state` int DEFAULT '0',
  `ispay` int DEFAULT '0',
  `failbecause` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT '"无"',
  PRIMARY KEY (`commodityid`),
  KEY `userid_idx` (`userid`) /*!80000 INVISIBLE */,
  KEY `classifyidforgein_idx` (`classifyid`),
  CONSTRAINT `classifyidforgein` FOREIGN KEY (`classifyid`) REFERENCES `classify` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `useridforgein` FOREIGN KEY (`userid`) REFERENCES `user` (`userid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commodity`
--

LOCK TABLES `commodity` WRITE;
/*!40000 ALTER TABLE `commodity` DISABLE KEYS */;
INSERT INTO `commodity` VALUES (39,1,4,'手机','http://localhost:8080/glut/image/userId_1/commodityid_39','一号用户手机',200,1,0,'无'),(40,1,1,'书本','http://localhost:8080/glut/image/userId_1/commodityid_40','一号用户书籍',20,3,1,'无'),(41,2,2,'桌子','http://localhost:8080/glut/image/userId_2/commodityid_41','二号用户桌子',30,3,1,'无'),(42,2,4,'瑜伽垫','http://localhost:8080/glut/image/userId_2/commodityid_42','二号用户瑜伽垫',10,1,0,'无');
/*!40000 ALTER TABLE `commodity` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-22 20:46:26
