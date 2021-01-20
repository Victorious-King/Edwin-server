/*
SQLyog Community v13.1.5  (64 bit)
MySQL - 10.4.10-MariaDB : Database - heroku_6f003d9194eccc5
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`heroku_6f003d9194eccc5` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `heroku_6f003d9194eccc5`;

/*Table structure for table `address` */

DROP TABLE IF EXISTS `address`;

CREATE TABLE `address` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `address` varchar(100) DEFAULT NULL,
  `comment` varchar(45) DEFAULT NULL,
  `country` varchar(3) DEFAULT NULL,
  `region` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `idPeople` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idPeople` (`idPeople`),
  CONSTRAINT `address_ibfk_1` FOREIGN KEY (`idPeople`) REFERENCES `people` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

/*Data for the table `address` */

insert  into `address`(`id`,`address`,`comment`,`country`,`region`,`city`,`idPeople`) values 
(1,'Tomas Street 24','this is peaciful','UK','London','London',43);

/*Table structure for table `bankaccount` */

DROP TABLE IF EXISTS `bankaccount`;

CREATE TABLE `bankaccount` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bank` varchar(45) DEFAULT NULL,
  `account_number` varchar(15) DEFAULT NULL,
  `comments` varchar(45) DEFAULT NULL,
  `is_selected` tinyint(4) DEFAULT NULL,
  `idPeople` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idPeople` (`idPeople`),
  CONSTRAINT `bankaccount_ibfk_1` FOREIGN KEY (`idPeople`) REFERENCES `people` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

/*Data for the table `bankaccount` */

insert  into `bankaccount`(`id`,`bank`,`account_number`,`comments`,`is_selected`,`idPeople`) values 
(1,'International bank','333212323232','very rich',12,43);

/*Table structure for table `commentsocial` */

DROP TABLE IF EXISTS `commentsocial`;

CREATE TABLE `commentsocial` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment` varchar(250) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `idUser` int(11) DEFAULT NULL,
  `idPeople` int(11) DEFAULT NULL,
  `idPost` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idUser` (`idUser`),
  KEY `idPeople` (`idPeople`),
  KEY `idPost` (`idPost`),
  CONSTRAINT `commentsocial_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `commentsocial_ibfk_2` FOREIGN KEY (`idPeople`) REFERENCES `people` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `commentsocial_ibfk_3` FOREIGN KEY (`idPost`) REFERENCES `postsocial` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

/*Data for the table `commentsocial` */

/*Table structure for table `company` */

DROP TABLE IF EXISTS `company`;

CREATE TABLE `company` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `document` varchar(15) DEFAULT NULL,
  `web` varchar(45) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `principal_email` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

/*Data for the table `company` */

insert  into `company`(`id`,`name`,`document`,`web`,`phone`,`principal_email`) values 
(1,'Plus500','plus.doc','plus@gmail.com','42425234','plus500@gmail.com');

/*Table structure for table `companycountries` */

DROP TABLE IF EXISTS `companycountries`;

CREATE TABLE `companycountries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `country` varchar(3) DEFAULT NULL,
  `document` varchar(15) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `idCompany` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idCompany` (`idCompany`),
  CONSTRAINT `companycountries_ibfk_1` FOREIGN KEY (`idCompany`) REFERENCES `company` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

/*Data for the table `companycountries` */

insert  into `companycountries`(`id`,`country`,`document`,`description`,`idCompany`) values 
(1,'UK','topcompany.doc','This company is one of 10 top companies in UK',1);

/*Table structure for table `employe` */

DROP TABLE IF EXISTS `employe`;

CREATE TABLE `employe` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `charge` varchar(45) DEFAULT NULL,
  `admission_date` date DEFAULT NULL,
  `dismissal_date` date DEFAULT NULL,
  `valoration` enum('1','2','3','4','5') DEFAULT NULL,
  `charge_description` longtext DEFAULT NULL,
  `currently` tinyint(4) DEFAULT NULL,
  `observation` longtext DEFAULT NULL,
  `idUser` int(11) DEFAULT NULL,
  `idPeople` int(11) DEFAULT NULL,
  `idCompany` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idUser` (`idUser`),
  KEY `idPeople` (`idPeople`),
  KEY `idCompany` (`idCompany`),
  CONSTRAINT `employe_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `employe_ibfk_2` FOREIGN KEY (`idPeople`) REFERENCES `people` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `employe_ibfk_3` FOREIGN KEY (`idCompany`) REFERENCES `company` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

/*Data for the table `employe` */

/*Table structure for table `interest` */

DROP TABLE IF EXISTS `interest`;

CREATE TABLE `interest` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `idPeople` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idPeople` (`idPeople`),
  CONSTRAINT `interest_ibfk_1` FOREIGN KEY (`idPeople`) REFERENCES `people` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

/*Data for the table `interest` */

insert  into `interest`(`id`,`name`,`idPeople`) values 
(1,'art',43);

/*Table structure for table `interested` */

DROP TABLE IF EXISTS `interested`;

CREATE TABLE `interested` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime DEFAULT NULL,
  `cv_link` varchar(100) DEFAULT NULL,
  `message` longtext DEFAULT NULL,
  `idPeople` int(11) DEFAULT NULL,
  `idUser` int(11) DEFAULT NULL,
  `idJob` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idPeople` (`idPeople`),
  KEY `idUser` (`idUser`),
  KEY `idJob` (`idJob`),
  CONSTRAINT `interested_ibfk_1` FOREIGN KEY (`idPeople`) REFERENCES `people` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `interested_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `interested_ibfk_3` FOREIGN KEY (`idJob`) REFERENCES `jobs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

/*Data for the table `interested` */

/*Table structure for table `jobprofession` */

DROP TABLE IF EXISTS `jobprofession`;

CREATE TABLE `jobprofession` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `idJob` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idJob` (`idJob`),
  CONSTRAINT `jobprofession_ibfk_1` FOREIGN KEY (`idJob`) REFERENCES `jobs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

/*Data for the table `jobprofession` */

/*Table structure for table `jobs` */

DROP TABLE IF EXISTS `jobs`;

CREATE TABLE `jobs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `summary` varchar(250) DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `expiration_date` datetime DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `number_places` int(11) DEFAULT NULL,
  `job_type` enum('on site','remote') DEFAULT NULL,
  `salary` varchar(11) DEFAULT NULL,
  `currency` varchar(3) DEFAULT NULL,
  `priority` enum('normal','high','urgent') DEFAULT NULL,
  `premium` tinyint(4) DEFAULT NULL,
  `active` tinyint(4) DEFAULT NULL,
  `check` tinyint(4) DEFAULT NULL,
  `language` varchar(3) DEFAULT NULL,
  `language_level` enum('basic','medium','high','native') DEFAULT NULL,
  `idUser` int(11) DEFAULT NULL,
  `idCompany` int(11) DEFAULT NULL,
  `idPeople` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idUser` (`idUser`),
  KEY `idCompany` (`idCompany`),
  KEY `idPeople` (`idPeople`),
  CONSTRAINT `jobs_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `jobs_ibfk_2` FOREIGN KEY (`idCompany`) REFERENCES `company` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `jobs_ibfk_3` FOREIGN KEY (`idPeople`) REFERENCES `people` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

/*Data for the table `jobs` */

/*Table structure for table `language` */

DROP TABLE IF EXISTS `language`;

CREATE TABLE `language` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(3) DEFAULT NULL,
  `level` enum('medium','high','basic','native') DEFAULT NULL,
  `idPeople` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idPeople` (`idPeople`),
  CONSTRAINT `language_ibfk_1` FOREIGN KEY (`idPeople`) REFERENCES `people` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

/*Data for the table `language` */

insert  into `language`(`id`,`name`,`level`,`idPeople`) values 
(1,'eng','medium',43),
(2,NULL,NULL,NULL);

/*Table structure for table `likesocial` */

DROP TABLE IF EXISTS `likesocial`;

CREATE TABLE `likesocial` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `liked` tinyint(4) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `idUser` int(11) DEFAULT NULL,
  `idPeople` int(11) DEFAULT NULL,
  `idPost` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idUser` (`idUser`),
  KEY `idPeople` (`idPeople`),
  KEY `iPost` (`idPost`),
  CONSTRAINT `likesocial_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `likesocial_ibfk_2` FOREIGN KEY (`idPeople`) REFERENCES `people` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `likesocial_ibfk_3` FOREIGN KEY (`idPost`) REFERENCES `postsocial` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

/*Data for the table `likesocial` */

/*Table structure for table `message` */

DROP TABLE IF EXISTS `message`;

CREATE TABLE `message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subject` varchar(45) DEFAULT NULL,
  `message` longtext DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `idUser` int(11) DEFAULT NULL,
  `idPeople` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idUser` (`idUser`),
  KEY `idPeople` (`idPeople`),
  CONSTRAINT `message_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `message_ibfk_2` FOREIGN KEY (`idPeople`) REFERENCES `people` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

/*Data for the table `message` */

/*Table structure for table `people` */

DROP TABLE IF EXISTS `people`;

CREATE TABLE `people` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cv_link` varchar(45) DEFAULT NULL,
  `photo` varchar(45) DEFAULT NULL,
  `corporate_email` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `corporate_phone` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `wage_aspiration` varchar(45) DEFAULT NULL,
  `profession` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4;

/*Data for the table `people` */

insert  into `people`(`id`,`cv_link`,`photo`,`corporate_email`,`email`,`corporate_phone`,`phone`,`wage_aspiration`,`profession`) values 
(43,'/cv/cv1.jpg','/photos/tomas.png','MiniSoft@gmail.com','Muler@gmail.com','45364254','35679824','500','Electronic Engineer');

/*Table structure for table `postsocial` */

DROP TABLE IF EXISTS `postsocial`;

CREATE TABLE `postsocial` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `image_link` varchar(100) DEFAULT NULL,
  `summary` varchar(125) DEFAULT NULL,
  `contact` longtext NOT NULL,
  `expirationdate` datetime DEFAULT NULL,
  `actived` tinyint(4) DEFAULT NULL,
  `prenium` tinyint(4) DEFAULT NULL,
  `checked` tinyint(4) DEFAULT NULL,
  `idUser` int(11) DEFAULT NULL,
  `idPeople` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idUser` (`idUser`),
  KEY `idPeople` (`idPeople`),
  CONSTRAINT `postsocial_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `postsocial_ibfk_2` FOREIGN KEY (`idPeople`) REFERENCES `people` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;

/*Data for the table `postsocial` */

/*Table structure for table `professionaspiration` */

DROP TABLE IF EXISTS `professionaspiration`;

CREATE TABLE `professionaspiration` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `idPeople` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idPeople` (`idPeople`),
  CONSTRAINT `professionaspiration_ibfk_1` FOREIGN KEY (`idPeople`) REFERENCES `people` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

/*Data for the table `professionaspiration` */

insert  into `professionaspiration`(`id`,`title`,`idPeople`) values 
(2,'The best profession',43),
(3,' best profession',43);

/*Table structure for table `tags` */

DROP TABLE IF EXISTS `tags`;

CREATE TABLE `tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `idPost` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idPost` (`idPost`),
  CONSTRAINT `tags_ibfk_1` FOREIGN KEY (`idPost`) REFERENCES `postsocial` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

/*Data for the table `tags` */

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `document_type` enum('passport','ID') DEFAULT NULL,
  `document` varchar(12) DEFAULT NULL,
  `nacionality` varchar(3) DEFAULT NULL,
  `currency` varchar(3) DEFAULT NULL,
  `unemployed` tinyint(4) DEFAULT NULL,
  `available` tinyint(4) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `register_date` datetime DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `idPeople` int(11) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idPeople` (`idPeople`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`idPeople`) REFERENCES `people` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4;

/*Data for the table `user` */

insert  into `user`(`id`,`name`,`last_name`,`document_type`,`document`,`nacionality`,`currency`,`unemployed`,`available`,`birthdate`,`register_date`,`password`,`idPeople`,`email`) values 
(11,'Mary','Tomas','ID','Mary.pdf','GM','GBP',40,46,'1988-03-04','2021-01-19 09:33:09','$2a$10$CQhY8JeX7nFomTexJ/jNNOgQRxOh0coIS20tU/OgnKkiIKzrbOzD6',43,'Mary@gmail.com');

/*Table structure for table `viewsocial` */

DROP TABLE IF EXISTS `viewsocial`;

CREATE TABLE `viewsocial` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `view` tinyint(4) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `idUser` int(11) DEFAULT NULL,
  `idPeople` int(11) DEFAULT NULL,
  `idPost` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idUser` (`idUser`),
  KEY `idPeople` (`idPeople`),
  KEY `idPost` (`idPost`),
  CONSTRAINT `viewsocial_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `viewsocial_ibfk_2` FOREIGN KEY (`idPeople`) REFERENCES `people` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `viewsocial_ibfk_3` FOREIGN KEY (`idPost`) REFERENCES `postsocial` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

/*Data for the table `viewsocial` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
