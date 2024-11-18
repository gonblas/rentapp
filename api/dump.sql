/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.5.2-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: rentapp
-- ------------------------------------------------------
-- Server version	11.5.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `buildings`
--

DROP TABLE IF EXISTS `buildings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `buildings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `neighborhood_id` int(11) DEFAULT NULL,
  `floors` int(11) DEFAULT NULL,
  `apartments_per_floor` int(11) DEFAULT NULL,
  `elevator` tinyint(1) DEFAULT NULL,
  `pool` tinyint(1) DEFAULT NULL,
  `gym` tinyint(1) DEFAULT NULL,
  `terrace` tinyint(1) DEFAULT NULL,
  `bike_rack` tinyint(1) DEFAULT NULL,
  `laundry` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `neighborhood_id` (`neighborhood_id`),
  CONSTRAINT `buildings_ibfk_1` FOREIGN KEY (`neighborhood_id`) REFERENCES `neighborhoods` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buildings`
--

LOCK TABLES `buildings` WRITE;
/*!40000 ALTER TABLE `buildings` DISABLE KEYS */;
INSERT INTO `buildings` VALUES
(1,'Calle 1 N° 100',1,10,5,1,1,1,1,1,1),
(2,'Avenida 7 N° 200',2,6,4,0,0,0,0,0,0),
(3,'Calle 10 N° 300',3,8,3,0,0,0,0,0,0),
(4,'Avenida 13 N° 400',4,10,5,1,1,1,1,1,1),
(5,'Calle 5 N° 1001',11,12,6,1,0,1,1,0,1),
(6,'Avenida 19 N° 2002',12,15,4,1,1,0,1,1,1),
(7,'Calle 37 N° 3003',13,8,3,0,0,0,1,0,0),
(8,'Avenida 44 N° 4004',14,10,5,1,1,1,0,1,1),
(9,'Calle 52 N° 5005',15,20,10,1,1,1,1,1,1),
(10,'Avenida 60 N° 6006',16,6,4,0,0,1,0,0,1),
(11,'Calle 72 N° 7007',17,18,6,1,1,1,1,1,0),
(12,'Avenida 13 N° 8008',18,10,4,1,0,0,1,0,1),
(13,'Calle 15 N° 9009',19,7,3,0,0,0,0,1,0),
(14,'Avenida 38 N° 1010',20,5,5,1,1,0,0,0,1),
(15,'Calle 45 N° 1100',21,12,8,1,1,1,1,0,1),
(16,'Avenida 7 N° 1201',22,14,5,1,0,0,1,1,0),
(17,'Calle 66 N° 1302',23,10,7,1,1,0,1,1,1),
(18,'Avenida 25 N° 1403',24,4,3,0,0,0,0,0,0),
(19,'Calle 28 N° 1504',25,6,4,1,0,1,1,1,1),
(20,'Avenida 75 N° 1605',26,15,6,1,1,1,1,0,0),
(21,'Calle 10 N° 1706',27,9,5,1,0,0,1,0,1),
(22,'Calle 20 N° 1807',28,8,4,0,0,0,0,1,0),
(23,'Avenida 60 N° 1908',29,16,5,1,1,1,1,1,1),
(24,'Calle 1 N° 2009',30,5,3,0,0,0,0,0,0),
(25,'Avenida 45 N° 2110',31,6,6,1,1,0,0,0,1),
(26,'Calle 18 N° 2211',32,10,5,1,1,1,1,1,0),
(27,'Avenida 33 N° 2312',33,7,4,0,0,0,1,1,0),
(28,'Calle 41 N° 2413',34,4,2,0,0,0,0,0,0),
(29,'Avenida 13 N° 2514',35,20,8,1,1,1,1,1,1),
(30,'Calle 2 N° 2615',36,10,4,1,0,0,0,0,1),
(31,'Avenida 38 N° 2716',37,12,6,1,1,1,0,0,0),
(32,'Calle 60 N° 2817',38,8,3,0,1,1,1,1,0),
(33,'Calle 14 N° 2918',39,15,5,1,0,0,0,0,1),
(34,'Avenida 50 N° 3019',40,18,10,1,1,1,1,1,1),
(35,'Calle 48 N° 3120',41,6,4,0,0,1,0,1,0);
/*!40000 ALTER TABLE `buildings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `property_id` int(11) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `url` (`url`),
  KEY `property_id` (`property_id`),
  CONSTRAINT `images_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1944271894 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES
(1792999038,1,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/1/1792999038.webp'),
(1792999039,1,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/1/1792999039.webp'),
(1792999040,1,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/1/1792999040.webp'),
(1792999041,1,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/1/1792999041.webp'),
(1792999042,1,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/1/1792999042.webp'),
(1792999043,1,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/1/1792999043.webp'),
(1792999044,1,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/1/1792999044.webp'),
(1876674716,23,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/23/1876674716.webp'),
(1876674717,23,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/23/1876674717.webp'),
(1876674719,23,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/23/1876674719.jpg'),
(1876674720,23,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/23/1876674720.jpg'),
(1876674723,23,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/23/1876674723.webp'),
(1876674724,23,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/23/1876674724.webp'),
(1876674725,23,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/23/1876674725.webp'),
(1876674726,23,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/23/1876674726.webp'),
(1876674729,23,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/23/1876674729.webp'),
(1888286642,6,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/6/1888286642.webp'),
(1888286643,6,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/6/1888286643.webp'),
(1888286644,6,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/6/1888286644.webp'),
(1888286645,6,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/6/1888286645.webp'),
(1888286648,6,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/6/1888286648.webp'),
(1888286649,6,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/6/1888286649.webp'),
(1888286650,6,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/6/1888286650.webp'),
(1917822771,11,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/11/1917822771.webp'),
(1917822772,11,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/11/1917822772.webp'),
(1917822774,11,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/11/1917822774.webp'),
(1917822775,11,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/11/1917822775.jpg'),
(1917822776,11,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/11/1917822776.webp'),
(1917822778,11,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/11/1917822778.webp'),
(1917822779,11,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/11/1917822779.webp'),
(1917822780,11,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/11/1917822780.jpg'),
(1928255409,19,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/19/1928255409.webp'),
(1928255410,19,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/19/1928255410.jpg'),
(1928255411,19,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/19/1928255411.webp'),
(1928255412,19,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/19/1928255412.webp'),
(1928255413,19,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/19/1928255413.webp'),
(1928255415,19,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/19/1928255415.webp'),
(1928255416,19,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/19/1928255416.webp'),
(1931397494,15,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/15/1931397494.webp'),
(1931397496,15,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/15/1931397496.webp'),
(1931397498,15,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/15/1931397498.jpg'),
(1932688484,18,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/18/1932688484.jpg'),
(1932688499,18,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/18/1932688499.jpg'),
(1932688505,18,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/18/1932688505.jpg'),
(1932688508,18,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/18/1932688508.jpg'),
(1932688516,18,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/18/1932688516.webp'),
(1932688526,18,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/18/1932688526.jpg'),
(1932688530,18,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/18/1932688530.jpg'),
(1932688531,18,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/18/1932688531.jpg'),
(1933674374,10,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/10/1933674374.webp'),
(1933674379,10,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/10/1933674379.webp'),
(1933674381,10,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/10/1933674381.webp'),
(1933674382,10,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/10/1933674382.webp'),
(1933674385,10,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/10/1933674385.webp'),
(1933674387,10,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/10/1933674387.webp'),
(1933674388,10,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/10/1933674388.webp'),
(1934366741,8,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/8/1934366741.webp'),
(1934366742,8,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/8/1934366742.webp'),
(1934366743,8,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/8/1934366743.webp'),
(1934366748,8,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/8/1934366748.webp'),
(1934366749,8,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/8/1934366749.webp'),
(1934366751,8,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/8/1934366751.jpg'),
(1934366752,8,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/8/1934366752.webp'),
(1934678872,13,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/13/1934678872.webp'),
(1934678873,13,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/13/1934678873.webp'),
(1934678874,13,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/13/1934678874.webp'),
(1934678875,13,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/13/1934678875.webp'),
(1934678876,13,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/13/1934678876.webp'),
(1934678877,13,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/13/1934678877.webp'),
(1934678878,13,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/13/1934678878.webp'),
(1935639720,15,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/15/1935639720.webp'),
(1935639721,15,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/15/1935639721.webp'),
(1935639723,15,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/15/1935639723.webp'),
(1935639729,15,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/15/1935639729.jpg'),
(1936681696,14,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/14/1936681696.webp'),
(1936681697,14,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/14/1936681697.jpg'),
(1936681698,14,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/14/1936681698.webp'),
(1936681699,14,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/14/1936681699.webp'),
(1936681700,14,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/14/1936681700.webp'),
(1936681702,14,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/14/1936681702.webp'),
(1938419458,22,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/22/1938419458.webp'),
(1938419459,22,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/22/1938419459.webp'),
(1938419461,22,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/22/1938419461.webp'),
(1938419462,22,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/22/1938419462.webp'),
(1938419463,22,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/22/1938419463.jpg'),
(1938419464,22,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/22/1938419464.webp'),
(1938814500,3,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/3/1938814500.webp'),
(1938814502,3,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/3/1938814502.webp'),
(1938814503,3,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/3/1938814503.webp'),
(1938814504,3,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/3/1938814504.webp'),
(1939487785,21,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/21/1939487785.webp'),
(1939487786,21,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/21/1939487786.webp'),
(1939487788,21,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/21/1939487788.jpg'),
(1939487789,21,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/21/1939487789.webp'),
(1939487790,21,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/21/1939487790.jpg'),
(1939487791,21,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/21/1939487791.webp'),
(1939487793,21,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/21/1939487793.webp'),
(1939487794,21,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/21/1939487794.webp'),
(1939487795,21,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/21/1939487795.webp'),
(1939487796,21,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/21/1939487796.webp'),
(1939641006,12,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/12/1939641006.webp'),
(1939641008,12,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/12/1939641008.webp'),
(1939641009,12,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/12/1939641009.webp'),
(1939641011,12,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/12/1939641011.webp'),
(1939641013,12,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/12/1939641013.webp'),
(1939641014,12,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/12/1939641014.webp'),
(1939641016,12,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/12/1939641016.webp'),
(1939641017,12,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/12/1939641017.webp'),
(1940621322,5,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/5/1940621322.webp'),
(1940621323,5,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/5/1940621323.webp'),
(1940621324,5,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/5/1940621324.webp'),
(1940621325,5,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/5/1940621325.webp'),
(1940621333,5,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/5/1940621333.webp'),
(1941385231,4,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/4/1941385231.webp'),
(1941385232,4,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/4/1941385232.jpg'),
(1941385233,4,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/4/1941385233.webp'),
(1941385236,4,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/4/1941385236.webp'),
(1941385237,4,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/4/1941385237.webp'),
(1941385239,4,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/4/1941385239.webp'),
(1941385245,4,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/4/1941385245.webp'),
(1941385247,4,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/4/1941385247.webp'),
(1941385249,4,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/4/1941385249.webp'),
(1942081567,7,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/7/1942081567.webp'),
(1942081568,7,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/7/1942081568.webp'),
(1942081570,7,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/7/1942081570.webp'),
(1942081571,7,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/7/1942081571.webp'),
(1942081572,7,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/7/1942081572.webp'),
(1942385842,20,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/20/1942385842.webp'),
(1942385848,20,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/20/1942385848.webp'),
(1942385849,20,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/20/1942385849.webp'),
(1942385852,20,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/20/1942385852.webp'),
(1942385853,20,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/20/1942385853.webp'),
(1942385854,20,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/20/1942385854.webp'),
(1943477058,17,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/17/1943477058.webp'),
(1943477059,17,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/17/1943477059.webp'),
(1943477061,17,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/17/1943477061.webp'),
(1943477063,17,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/17/1943477063.webp'),
(1943477071,17,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/17/1943477071.webp'),
(1943477073,17,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/17/1943477073.webp'),
(1943477074,17,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/17/1943477074.jpg'),
(1943477075,17,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/17/1943477075.jpg'),
(1943477080,17,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/17/1943477080.webp'),
(1943477081,17,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/17/1943477081.jpg'),
(1943477082,17,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/17/1943477082.jpg'),
(1943666715,16,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/16/1943666715.webp'),
(1943666717,16,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/16/1943666717.webp'),
(1943666720,16,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/16/1943666720.webp'),
(1943666722,16,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/16/1943666722.webp'),
(1943666723,16,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/16/1943666723.jpg'),
(1943666725,16,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/16/1943666725.webp'),
(1943666727,16,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/16/1943666727.webp'),
(1943666730,16,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/16/1943666730.webp'),
(1943666732,16,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/16/1943666732.webp'),
(1943836821,9,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/9/1943836821.webp'),
(1943836823,9,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/9/1943836823.webp'),
(1943836824,9,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/9/1943836824.webp'),
(1943836827,9,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/9/1943836827.webp'),
(1943836829,9,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/9/1943836829.webp'),
(1943836830,9,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/9/1943836830.webp'),
(1943836831,9,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/9/1943836831.webp'),
(1943836833,9,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/9/1943836833.webp'),
(1943836836,9,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/9/1943836836.webp'),
(1944271881,2,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/2/1944271881.webp'),
(1944271882,2,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/2/1944271882.webp'),
(1944271891,2,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/2/1944271891.webp'),
(1944271892,2,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/2/1944271892.jpg'),
(1944271893,2,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/2/1944271893.webp');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `neighborhoods`
--

DROP TABLE IF EXISTS `neighborhoods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `neighborhoods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `neighborhoods`
--

LOCK TABLES `neighborhoods` WRITE;
/*!40000 ALTER TABLE `neighborhoods` DISABLE KEYS */;
INSERT INTO `neighborhoods` VALUES
(1,'Abasto'),
(2,'Altos de San Lorenzo'),
(3,'Arturo Seguí'),
(4,'Campos de la Enriqueta'),
(5,'Cayman Village'),
(6,'City Bell'),
(7,'Eduardo Arana'),
(8,'El Cedro'),
(9,'El Peligro'),
(10,'Etcheverry'),
(11,'Farm Club del Lago'),
(12,'Gorina'),
(13,'Haras del Sur'),
(14,'Ignacio Correas'),
(15,'Isla Martín García'),
(16,'José Hernández'),
(17,'La Arbolada'),
(18,'La Elisa'),
(19,'La Lula'),
(20,'La Plata'),
(21,'La Torre'),
(22,'Las Calandrias'),
(23,'Lisandro Olmos'),
(24,'Los Bosquecillos'),
(25,'Los Ceibos (La Plata)'),
(26,'Los Hornos'),
(27,'Manuel B Gonnet'),
(28,'Melchor Romero'),
(29,'Prados de la Vega'),
(30,'Ringuelet'),
(31,'San Carlos'),
(32,'San Lorenzo'),
(33,'Solar del Aguador'),
(34,'Swan'),
(35,'Tolosa'),
(36,'Transradio'),
(37,'Villa Elisa'),
(38,'Villa Elvira'),
(39,'Villa Garibaldi'),
(40,'Villa Montoro'),
(41,'Villa Parque Sicardi');
/*!40000 ALTER TABLE `neighborhoods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `properties`
--

DROP TABLE IF EXISTS `properties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `properties` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `publication_date` date DEFAULT NULL,
  `approved` tinyint(1) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `neighborhood_id` int(11) DEFAULT NULL,
  `rental_value` float DEFAULT NULL,
  `expenses_value` float DEFAULT NULL,
  `rooms` int(11) DEFAULT NULL,
  `square_meters` int(11) DEFAULT NULL,
  `balconies` int(11) DEFAULT NULL,
  `backyard` tinyint(1) DEFAULT NULL,
  `garage` tinyint(1) DEFAULT NULL,
  `pet_friendly` tinyint(1) DEFAULT NULL,
  `location` enum('front','back','internal') DEFAULT NULL,
  `publisher_id` int(11) DEFAULT NULL,
  `building_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `neighborhood_id` (`neighborhood_id`),
  KEY `publisher_id` (`publisher_id`),
  KEY `building_id` (`building_id`),
  CONSTRAINT `properties_ibfk_1` FOREIGN KEY (`neighborhood_id`) REFERENCES `neighborhoods` (`id`),
  CONSTRAINT `properties_ibfk_2` FOREIGN KEY (`publisher_id`) REFERENCES `users` (`id`),
  CONSTRAINT `properties_ibfk_3` FOREIGN KEY (`building_id`) REFERENCES `buildings` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `properties`
--

LOCK TABLES `properties` WRITE;
/*!40000 ALTER TABLE `properties` DISABLE KEYS */;
INSERT INTO `properties` VALUES
(1,'2024-11-01',1,'Departamento moderno con 3 habitaciones, balcón y cochera.','Calle Ficticia 123, La Plata',1,15000,2000,3,80,1,0,1,1,'front',1,1),
(2,'2024-11-05',1,'Departamento de 2 habitaciones con excelente vista.','Avenida Siempre Viva 456, La Plata',2,8000,1000,2,60,1,0,0,0,'back',2,2),
(3,'2024-11-07',0,'Departamento con 2 habitaciones, cocina independiente y balcón.','Calle Real 789, La Plata',3,10000,1200,2,65,1,0,1,1,'internal',3,3),
(4,'2024-11-10',1,'Departamento de 3 habitaciones con balcón al frente y cochera.','Calle del Sol 123, La Plata',4,18000,2500,3,120,1,0,1,1,'front',4,4),
(5,'2024-11-11',0,'Departamento en zona céntrica, con 1 habitación y vista panorámica.','Calle de la Luna 345, La Plata',5,9500,1100,1,50,1,0,0,1,'back',5,5),
(6,'2024-11-12',1,'Departamento de 2 habitaciones con patio privado.','Avenida de los Lagos 890, La Plata',6,15000,1500,2,80,0,0,1,0,'front',6,6),
(7,'2024-11-14',1,'Departamento en edificio nuevo, con amenities como gimnasio y piscina.','Avenida Libertador 234, La Plata',7,12000,1500,2,75,1,0,1,1,'front',7,7),
(8,'2024-11-16',0,'Departamento ideal para oficina, en excelente ubicación.','Calle Comercio 567, La Plata',8,22000,3000,3,100,0,0,1,0,'internal',8,8),
(9,'2024-11-18',1,'Departamento de 1 habitación, ideal para estudiantes.','Calle de la Estación 123, La Plata',9,6000,800,1,40,0,0,0,1,'front',9,9),
(10,'2024-11-20',1,'Departamento con 2 habitaciones, ubicado en una zona tranquila.','Avenida de los Pinos 678, La Plata',10,11000,1500,2,70,1,0,1,0,'back',10,10),
(11,'2024-11-22',0,'Departamento con terraza, ideal para reuniones al aire libre.','Calle Mayor 345, La Plata',11,14000,2000,2,85,1,0,1,1,'internal',11,11),
(12,'2024-11-23',1,'Departamento con 3 habitaciones, en zona residencial.','Calle Pacifico 678, La Plata',12,10500,1300,3,90,1,0,0,1,'front',12,12),
(13,'2024-11-24',1,'Departamento con cochera y balcón privado.','Calle Cerrada 123, La Plata',13,17000,2000,2,80,1,0,1,1,'back',13,13),
(14,'2024-11-25',0,'Departamento en edificio moderno, con amenities exclusivos.','Avenida del Río 456, La Plata',14,15000,2000,2,85,0,0,1,1,'front',14,14),
(15,'2024-11-26',1,'Departamento amplio con 3 habitaciones, en zona comercial.','Calle de la Paz 789, La Plata',15,13000,1500,3,110,1,0,1,0,'internal',15,15),
(16,'2024-11-28',1,'Departamento con cochera, en zona céntrica de la ciudad.','Calle Verde 321, La Plata',16,17000,2000,2,95,1,0,1,1,'front',16,16),
(17,'2024-11-30',1,'Departamento de 1 habitación, con amenities como pileta y gimnasio.','Avenida Libertador 123, La Plata',17,9500,1100,1,45,1,0,0,1,'internal',17,17),
(18,'2024-12-01',1,'Departamento con 2 habitaciones, amplio balcón y cochera.','Calle del Bosque 456, La Plata',18,16000,2000,2,90,1,0,1,1,'back',18,18),
(19,'2024-12-03',1,'Departamento moderno, con 2 habitaciones y 2 baños.','Avenida del Sol 789, La Plata',19,11000,1400,2,80,0,0,1,0,'front',19,19),
(20,'2024-12-05',0,'Departamento de lujo, con balcón, vista al mar y cochera.','Calle Los Álamos 345, La Plata',20,21000,2500,3,100,1,0,1,1,'internal',20,20),
(21,'2024-12-07',1,'Departamento con 2 habitaciones, en barrio tranquilo.','Calle Verde 789, La Plata',21,9500,1200,2,70,1,0,1,1,'back',21,21),
(22,'2024-12-08',1,'Departamento moderno con cochera y amplio balcón.','Avenida Siempre Viva 123, La Plata',22,16000,2000,3,130,1,0,1,1,'front',22,22),
(23,'2024-12-10',0,'Departamento en edificio moderno con piscina y gimnasio.','Calle del Mar 234, La Plata',23,14000,1700,2,75,1,0,1,1,'internal',23,23),
(24,'2024-12-12',1,'Departamento de 2 habitaciones con cochera y amplio living.','Calle de las Flores 567, La Plata',24,18000,2200,2,95,1,0,1,1,'front',24,24),
(25,'2024-12-15',1,'Departamento de 1 habitación, ideal para solteros o estudiantes.','Avenida de los Pinos 678, La Plata',25,7000,900,1,45,0,0,0,1,'front',25,25);
/*!40000 ALTER TABLE `properties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `is_real_estate` tinyint(1) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `has_phone_number` tinyint(1) DEFAULT NULL,
  `whatsapp_number` varchar(20) DEFAULT NULL,
  `has_whatsapp_number` tinyint(1) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(1,'Juan Pérez',1,'juanperez@email.com','password123','123456789',1,'987654321',1,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/avatars/1.jpg'),
(2,'Ana García',0,'anagarcia@email.com','password456','234567890',1,'876543210',0,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/avatars/2.jpg'),
(3,'Luis Rodríguez',1,'luisrodriguez@email.com','password789','345678901',0,'765432109',1,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/avatars/3.jpg'),
(4,'María López',0,'marialopez@email.com','password101','456789012',1,'654321098',0,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/avatars/4.jpg'),
(5,'Carlos Martínez',1,'carlosmartinez@email.com','password202','567890123',1,'543210987',1,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/avatars/5.jpg'),
(6,'Sofía Sánchez',0,'sofisanchez@email.com','password303','678901234',0,'432109876',0,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/avatars/6.jpg'),
(7,'Pedro Gómez',1,'pedrogomez@email.com','password404','789012345',1,'321098765',1,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/avatars/7.jpg'),
(8,'Isabel Ruiz',0,'isabelruiz@email.com','password505','890123456',0,'210987654',0,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/avatars/8.jpg'),
(9,'Javier Fernández',1,'javierfernandez@email.com','password606','901234567',1,'109876543',1,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/avatars/9.jpg'),
(10,'Lucía Jiménez',0,'luciajimenez@email.com','password707','012345678',1,'987654321',0,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/avatars/10.jpg'),
(11,'Roberto Díaz',1,'robertdiaz@email.com','password808','123456789',1,'876543210',1,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/avatars/11.jpg'),
(12,'Carmen Pérez',0,'carmenperez@email.com','password909','234567890',1,'765432109',0,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/avatars/12.jpg'),
(13,'Antonio Gómez',1,'antoniogomez@email.com','password010','345678901',1,'654321098',1,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/avatars/13.jpg'),
(14,'Raquel Martínez',0,'raquelmartinez@email.com','password111','456789012',0,'543210987',0,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/avatars/14.jpg'),
(15,'Felipe Rodríguez',1,'feliperodriguez@email.com','password212','567890123',1,'432109876',1,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/avatars/15.jpg'),
(16,'Marina López',0,'marinalopez@email.com','password313','678901234',0,'321098765',0,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/avatars/16.jpg'),
(17,'José García',1,'josegarcia@email.com','password414','789012345',1,'210987654',1,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/avatars/17.jpg'),
(18,'Elena Sánchez',0,'elenasanchez@email.com','password515','890123456',1,'109876543',0,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/avatars/18.jpg'),
(19,'Álvaro Fernández',1,'alvarofdez@email.com','password616','901234567',1,'987654321',1,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/avatars/19.jpg'),
(20,'Teresa Ruiz',0,'teresaruiz@email.com','password717','012345678',1,'876543210',0,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/avatars/20.jpg'),
(21,'Ricardo Díaz',1,'ricardodiaz@email.com','password818','123456789',0,'765432109',1,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/avatars/21.jpg'),
(22,'Beatriz López',0,'beatrizlopez@email.com','password919','234567890',1,'654321098',0,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/avatars/22.jpg'),
(23,'Martín González',1,'martingonzalez@email.com','password020','345678901',1,'543210987',1,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/avatars/23.jpg');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2024-11-15 22:17:27
