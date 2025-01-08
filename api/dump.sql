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
  `publisher_id` int(11) DEFAULT NULL,
  `approved` tinyint(1) DEFAULT NULL,
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
  CONSTRAINT `buildings_ibfk_1` FOREIGN KEY (`neighborhood_id`) REFERENCES `neighborhoods` (`id`),
  CONSTRAINT `buildings_ibfk_2` FOREIGN KEY (`publisher_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  `rental_value` float DEFAULT NULL,
  `expenses_value` float DEFAULT NULL,
  `rooms` int(11) DEFAULT NULL,
  `square_meters` int(11) DEFAULT NULL,
  `balconies` int(11) DEFAULT NULL,
  `backyard` tinyint(1) DEFAULT NULL,
  `garage` tinyint(1) DEFAULT NULL,
  `pet_friendly` tinyint(1) DEFAULT NULL,
  `location` enum('front','back','internal','side') DEFAULT NULL,
  `publisher_id` int(11) DEFAULT NULL,
  `building_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `publisher_id` (`publisher_id`),
  KEY `building_id` (`building_id`),
  CONSTRAINT `properties_ibfk_2` FOREIGN KEY (`publisher_id`) REFERENCES `users` (`id`),
  CONSTRAINT `properties_ibfk_3` FOREIGN KEY (`building_id`) REFERENCES `buildings` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


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
  `is_admin` tinyint(1) DEFAULT 0,
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
(1,'Admin',0,1,'admin@rentapp.com','$2b$12$oaUhz/Ejhhk5JTwZkUIbROM.DkiufOahsgn8QWFLQmuIhsttiB9mW','123-456-789',1,'123-456-789',1,'');
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
