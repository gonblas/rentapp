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

CREATE DATABASE IF NOT EXISTS rentapp;
USE rentapp;


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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buildings`
--

LOCK TABLES `buildings` WRITE;
/*!40000 ALTER TABLE `buildings` DISABLE KEYS */;
INSERT INTO `buildings` VALUES
(1,'Avenida Santa Fe 1234',1,10,4,1,1,1,1,0,1),
(2,'Junín 567',2,15,6,1,1,0,0,1,1),
(3,'La Pampa 789',3,8,3,1,0,1,1,0,0),
(4,'Defensa 101',4,5,2,0,0,0,0,0,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES
(1,2,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/1-1.jpg'),
(2,2,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/1-2.jpg'),
(3,2,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/1-3.jpg'),
(4,5,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/2-1.jpg'),
(5,5,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/2-2.jpg'),
(6,8,'https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/test.jpg');
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `neighborhoods`
--

LOCK TABLES `neighborhoods` WRITE;
/*!40000 ALTER TABLE `neighborhoods` DISABLE KEYS */;
INSERT INTO `neighborhoods` VALUES
(1,'Palermo'),
(2,'Recoleta'),
(3,'Belgrano'),
(4,'San Telmo'),
(5,'Caballito');
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
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `neighborhood_id` int(11) DEFAULT NULL,
  `type` enum('apartment','house','ph') NOT NULL,
  `rental_value` float DEFAULT NULL,
  `expenses_value` float DEFAULT NULL,
  `rooms` int(11) DEFAULT NULL,
  `square_meters` int(11) DEFAULT NULL,
  `balconies` int(11) DEFAULT NULL,
  `backyard` tinyint(1) DEFAULT NULL,
  `garage` tinyint(1) DEFAULT NULL,
  `pet_friendly` tinyint(1) DEFAULT NULL,
  `location` enum('front','back','internal','n/a') DEFAULT NULL,
  `publisher_id` int(11) DEFAULT NULL,
  `building_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `neighborhood_id` (`neighborhood_id`),
  KEY `publisher_id` (`publisher_id`),
  KEY `building_id` (`building_id`),
  CONSTRAINT `properties_ibfk_1` FOREIGN KEY (`neighborhood_id`) REFERENCES `neighborhoods` (`id`),
  CONSTRAINT `properties_ibfk_2` FOREIGN KEY (`publisher_id`) REFERENCES `users` (`id`),
  CONSTRAINT `properties_ibfk_3` FOREIGN KEY (`building_id`) REFERENCES `buildings` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `properties`
--

LOCK TABLES `properties` WRITE;
/*!40000 ALTER TABLE `properties` DISABLE KEYS */;
INSERT INTO `properties` VALUES
(1,'2024-01-15',1,'Departamento luminoso en Palermo','1144444444','contacto@example.com','Avenida Scalabrini Ortiz 1550',1,'apartment',1500,300,2,60,1,1,1,1,'front',1,1),
(2,'2024-02-20',0,'Casa amplia con jardín en Recoleta','1155555555','propietario@example.com','Calle Posadas 345',2,'house',2000,400,5,200,2,1,1,1,'back',2,2),
(3,'2024-03-05',1,'PH moderno en Belgrano','1166666666','rentas@example.com','Calle Juramento 1234',3,'ph',1200,250,1,40,0,0,0,0,'internal',3,3),
(4,'2024-04-10',1,'Monoambiente en San Telmo','1177777777','mono@example.com','Calle Defensa 750',4,'apartment',800,150,1,30,0,0,0,1,'back',1,1),
(5,'2024-05-15',1,'Casa espaciosa en Caballito','1188888888','venta@example.com','Avenida Rivadavia 5400',5,'house',2500,450,4,180,1,1,1,1,'front',2,3),
(6,'2024-06-20',0,'PH clásico en San Telmo','1199999999','ph@example.com','Calle Chile 550',4,'ph',1000,200,2,55,1,0,0,1,'internal',3,2),
(7,'2024-07-01',1,'Departamento con balcón en Recoleta','1133333333','balcon@example.com','Calle Juncal 800',2,'apartment',1600,350,3,75,2,0,1,1,'front',1,1),
(8,'2024-08-10',1,'Loft moderno en Palermo','1122222222','loft@example.com','Calle Honduras 3000',1,'apartment',1400,280,1,50,0,0,0,1,'internal',2,3),
(9,'2024-09-25',0,'PH económico en Caballito','1155550000','economico@example.com','Calle Avellaneda 1600',5,'ph',700,100,1,25,0,1,0,0,'back',3,2),
(10,'2024-10-15',1,'Departamento tipo estudio en Belgrano','1144445555','estudio@example.com','Calle Mendoza 1300',3,'apartment',900,180,1,35,1,0,0,1,'internal',2,3),
(11,'2024-11-05',0,'Casa grande con garage en Recoleta','1155556666','garage@example.com','Calle Arenales 400',2,'house',2200,500,6,220,2,1,1,1,'front',3,1),
(12,'2024-12-10',1,'Departamento familiar en Palermo','1188887777','familiar@example.com','Calle Güemes 2000',1,'apartment',1800,380,4,90,1,1,1,1,'back',1,2);
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
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(1,'John Doe',0,'john.doe@example.com','securepass1','https://rentapp-bucket.s3.sa-east-1.amazonaws.com/avatars/1.jpeg'),
(2,'Real Estate Co.',1,'real.estate@example.com','securepass2','https://rentapp-bucket.s3.sa-east-1.amazonaws.com/avatars/1.jpeg'),
(3,'Jane Smith',0,'jane.smith@example.com','securepass3','https://rentapp-bucket.s3.sa-east-1.amazonaws.com/avatars/2.jpg'),
(4,'Another Real Estate Co.',1,'hola@example.com','messiwc2022','https://rentapp-bucket.s3.sa-east-1.amazonaws.com/avatars/3.jpeg'),
(5,'Yet Another Real Estate Co.',1,'hola12@example.com','test123','https://rentapp-bucket.s3.sa-east-1.amazonaws.com/avatars/3.jpeg');
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

-- Dump completed on 2024-11-09 20:59:12
