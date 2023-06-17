DROP TABLE IF EXISTS `usercolumns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usercolumns` (
  `pk_usercomlumns` int NOT NULL,
  `title` varchar(45) COLLATE utf8mb3_bin DEFAULT NULL,
  `dataIndex` varchar(45) COLLATE utf8mb3_bin DEFAULT NULL,
  `key` varchar(45) COLLATE utf8mb3_bin DEFAULT NULL,
  `align` varchar(45) COLLATE utf8mb3_bin DEFAULT 'center',
  `state` int DEFAULT NULL,
  PRIMARY KEY (`pk_usercomlumns`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usercolumns`
--

LOCK TABLES `usercolumns` WRITE;
/*!40000 ALTER TABLE `usercolumns` DISABLE KEYS */;
INSERT INTO `usercolumns` VALUES (1,'账号','username','username','center',1),(2,'角色','roleid','roleid','center',1),(3,'邮箱','email','email','center',1),(4,'是否登录','islogin','islogin','center',1),(5,'账号状态','state','state','center',1),(6,'昵称','nickname','nickname','center',1),(7,'电话','photo','photo','center',1),(8,'地址','address','address','center',1),(9,'金额','money','money','center',1);
/*!40000 ALTER TABLE `usercolumns` ENABLE KEYS */;
UNLOCK TABLES;

INSERT INTO `` (`pk_usercomlumns`,`title`,`dataIndex`,`key`,`align`,`state`) VALUES (1,'账号','username','username','center',1);
INSERT INTO `` (`pk_usercomlumns`,`title`,`dataIndex`,`key`,`align`,`state`) VALUES (2,'角色','roleid','roleid','center',1);
INSERT INTO `` (`pk_usercomlumns`,`title`,`dataIndex`,`key`,`align`,`state`) VALUES (3,'邮箱','email','email','center',1);
INSERT INTO `` (`pk_usercomlumns`,`title`,`dataIndex`,`key`,`align`,`state`) VALUES (4,'是否登录','islogin','islogin','center',1);
INSERT INTO `` (`pk_usercomlumns`,`title`,`dataIndex`,`key`,`align`,`state`) VALUES (5,'账号状态','state','state','center',1);
INSERT INTO `` (`pk_usercomlumns`,`title`,`dataIndex`,`key`,`align`,`state`) VALUES (6,'昵称','nickname','nickname','center',1);
INSERT INTO `` (`pk_usercomlumns`,`title`,`dataIndex`,`key`,`align`,`state`) VALUES (7,'电话','photo','photo','center',1);
INSERT INTO `` (`pk_usercomlumns`,`title`,`dataIndex`,`key`,`align`,`state`) VALUES (8,'地址','address','address','center',1);
INSERT INTO `` (`pk_usercomlumns`,`title`,`dataIndex`,`key`,`align`,`state`) VALUES (9,'金额','money','money','center',1);
