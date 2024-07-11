-- MySQL dump 10.13  Distrib 8.0.34, for macos13 (arm64)
--
-- Host: mydevlogme.iptime.org    Database: minuet_db
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.22.04.1

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
-- Table structure for table `all_book_mark`
--

DROP TABLE IF EXISTS `all_book_mark`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `all_book_mark` (
  `bookmark_type` varchar(31) NOT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `member_id` bigint DEFAULT NULL,
  `news_id` bigint DEFAULT NULL,
  `region_news_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKrq9tl40a25dvbxeosnggyr2y4` (`member_id`),
  KEY `FKgr9y4g5t9h5s95dsifxd2c90c` (`news_id`),
  KEY `FK5ewnsyh7362k60t6x8o443cnn` (`region_news_id`),
  CONSTRAINT `FK5ewnsyh7362k60t6x8o443cnn` FOREIGN KEY (`region_news_id`) REFERENCES `region_news` (`id`),
  CONSTRAINT `FKgr9y4g5t9h5s95dsifxd2c90c` FOREIGN KEY (`news_id`) REFERENCES `news` (`id`),
  CONSTRAINT `FKrq9tl40a25dvbxeosnggyr2y4` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=160 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `book_mark`
--

DROP TABLE IF EXISTS `book_mark`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_mark` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `member_id` bigint DEFAULT NULL,
  `news_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKl0894dc2yqctftjaqgqyhpb34` (`member_id`),
  KEY `FK4vv38c8jxalnxb7gw2hdfwm1c` (`news_id`),
  CONSTRAINT `FK4vv38c8jxalnxb7gw2hdfwm1c` FOREIGN KEY (`news_id`) REFERENCES `news` (`id`),
  CONSTRAINT `FKl0894dc2yqctftjaqgqyhpb34` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `briefing`
--

DROP TABLE IF EXISTS `briefing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `briefing` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `time` time(6) DEFAULT NULL,
  `category_id` bigint DEFAULT NULL,
  `member_id` bigint DEFAULT NULL,
  `is_on` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK8jcw4ut0sfj0yugexabxnt7in` (`category_id`),
  KEY `FKh4oylrehkaoefjlxwso3god3j` (`member_id`),
  CONSTRAINT `FK8jcw4ut0sfj0yugexabxnt7in` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `FKh4oylrehkaoefjlxwso3god3j` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `devices`
--

DROP TABLE IF EXISTS `devices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `devices` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `festival`
--

DROP TABLE IF EXISTS `festival`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `festival` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `period` varchar(255) DEFAULT NULL,
  `poster` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `region_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1149qx9iv8bmu1qu9r6lbtclw` (`region_id`),
  CONSTRAINT `FK1149qx9iv8bmu1qu9r6lbtclw` FOREIGN KEY (`region_id`) REFERENCES `region` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hot_topic`
--

DROP TABLE IF EXISTS `hot_topic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hot_topic` (
  `publish_date` date DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `member_id` bigint DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK5f1lmconw0u6vfyfn8hdxgb1g` (`member_id`),
  CONSTRAINT `FK5f1lmconw0u6vfyfn8hdxgb1g` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `birth` date NOT NULL,
  `gender` bit(1) NOT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profile_img_path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news` (
  `bookmark_count` int NOT NULL,
  `dislike_count` int NOT NULL,
  `like_count` int NOT NULL,
  `publish_date` date DEFAULT NULL,
  `read_count` int NOT NULL,
  `category_id` bigint DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(14000) DEFAULT NULL,
  `imgurl` varchar(255) DEFAULT NULL,
  `newsurl` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `keyword` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKryugyuqj7jjkqd3byc5meoocy` (`category_id`),
  CONSTRAINT `FKryugyuqj7jjkqd3byc5meoocy` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36909 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `news_dislike`
--

DROP TABLE IF EXISTS `news_dislike`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news_dislike` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `member_id` bigint DEFAULT NULL,
  `news_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKcebqlcuvf6suj2pu7jo0bdyw` (`member_id`),
  KEY `FK9birpfyy7hr61mm5moyrbbk9s` (`news_id`),
  CONSTRAINT `FK9birpfyy7hr61mm5moyrbbk9s` FOREIGN KEY (`news_id`) REFERENCES `news` (`id`),
  CONSTRAINT `FKcebqlcuvf6suj2pu7jo0bdyw` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `news_like`
--

DROP TABLE IF EXISTS `news_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news_like` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `member_id` bigint DEFAULT NULL,
  `news_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKeol8q7ffk17d9r0vlxkc99bqm` (`member_id`),
  KEY `FK59kxvjk6grrvjgfo8pmkfu906` (`news_id`),
  CONSTRAINT `FK59kxvjk6grrvjgfo8pmkfu906` FOREIGN KEY (`news_id`) REFERENCES `news` (`id`),
  CONSTRAINT `FKeol8q7ffk17d9r0vlxkc99bqm` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=429 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pre_search`
--

DROP TABLE IF EXISTS `pre_search`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pre_search` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `word` varchar(255) DEFAULT NULL,
  `member_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKcfci0wsycgkr57pi1frjwodne` (`member_id`),
  CONSTRAINT `FKcfci0wsycgkr57pi1frjwodne` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=287 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `prefer_category`
--

DROP TABLE IF EXISTS `prefer_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prefer_category` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `category_id` bigint DEFAULT NULL,
  `member_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK6oydqshax7t5sjvnbb614g0s2` (`category_id`),
  KEY `FK6a9w9qhq2x7pxdryqq7fhu7yc` (`member_id`),
  CONSTRAINT `FK6a9w9qhq2x7pxdryqq7fhu7yc` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`),
  CONSTRAINT `FK6oydqshax7t5sjvnbb614g0s2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `region`
--

DROP TABLE IF EXISTS `region`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `region` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `region_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `region_book_mark`
--

DROP TABLE IF EXISTS `region_book_mark`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `region_book_mark` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `member_id` bigint DEFAULT NULL,
  `region_news_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_s8bvrnj5kuqwodpu01y5agw3a` (`region_news_id`),
  KEY `FKihqtr673sjq9xwpxdtipsm37u` (`member_id`),
  CONSTRAINT `FK9coq41leqy4abyh6wtfx3m265` FOREIGN KEY (`region_news_id`) REFERENCES `region_news` (`id`),
  CONSTRAINT `FKihqtr673sjq9xwpxdtipsm37u` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `region_dislike`
--

DROP TABLE IF EXISTS `region_dislike`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `region_dislike` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `member_id` bigint DEFAULT NULL,
  `region_news_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKbe91bfrfyj7r8we8j3ihppw8w` (`member_id`),
  KEY `FK74klfmhfx4sadxu428wa76v8a` (`region_news_id`),
  CONSTRAINT `FK74klfmhfx4sadxu428wa76v8a` FOREIGN KEY (`region_news_id`) REFERENCES `region_news` (`id`),
  CONSTRAINT `FKbe91bfrfyj7r8we8j3ihppw8w` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `region_like`
--

DROP TABLE IF EXISTS `region_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `region_like` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `member_id` bigint DEFAULT NULL,
  `region_news_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKjmtymudo5hlgqxe7jkjk4xyg` (`member_id`),
  KEY `FKp5th6qjg50fj7sb6o6hy6fy2i` (`region_news_id`),
  CONSTRAINT `FKjmtymudo5hlgqxe7jkjk4xyg` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`),
  CONSTRAINT `FKp5th6qjg50fj7sb6o6hy6fy2i` FOREIGN KEY (`region_news_id`) REFERENCES `region_news` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `region_news`
--

DROP TABLE IF EXISTS `region_news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `region_news` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `imgurl` varchar(255) DEFAULT NULL,
  `publish_date` date DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `region_id` bigint DEFAULT NULL,
  `keyword` varchar(255) DEFAULT NULL,
  `bookmark_count` int NOT NULL,
  `content` varchar(7000) DEFAULT NULL,
  `like_count` int NOT NULL,
  `newsurl` varchar(255) DEFAULT NULL,
  `dislike_count` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKk7m5117eytgbbyq8fk0knmn1h` (`region_id`),
  CONSTRAINT `FKk7m5117eytgbbyq8fk0knmn1h` FOREIGN KEY (`region_id`) REFERENCES `region` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1089 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_device`
--

DROP TABLE IF EXISTS `user_device`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_device` (
  `devices_id` bigint DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `member_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_4p7047kdd85yvsihm1678oq1k` (`devices_id`),
  UNIQUE KEY `UK_7t64cgn2mogki83jyg9v5t7u2` (`member_id`),
  CONSTRAINT `FKdixxbsv1po22a8yg80lq0dkcn` FOREIGN KEY (`devices_id`) REFERENCES `devices` (`id`),
  CONSTRAINT `FKhk8faoioot4wadi27elp6ws2t` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-04  1:53:27
