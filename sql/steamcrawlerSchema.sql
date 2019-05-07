-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  mar. 07 mai 2019 à 21:08
-- Version du serveur :  5.7.19
-- Version de PHP :  7.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `steamcrawler`
--

-- --------------------------------------------------------

--
-- Structure de la table `history`
--

DROP TABLE IF EXISTS `history`;
CREATE TABLE IF NOT EXISTS `history` (
  `id_history` int(64) NOT NULL AUTO_INCREMENT,
  `id_item` int(64) NOT NULL,
  `date` text COLLATE utf8mb4_bin NOT NULL,
  `price` float NOT NULL,
  `volume` text COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`id_history`),
  UNIQUE KEY `id_history_2` (`id_history`),
  KEY `id_history` (`id_history`)
) ENGINE=InnoDB AUTO_INCREMENT=21397 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Structure de la table `item`
--

DROP TABLE IF EXISTS `item`;
CREATE TABLE IF NOT EXISTS `item` (
  `id_item` int(64) NOT NULL AUTO_INCREMENT,
  `market_name` text COLLATE utf8mb4_bin NOT NULL,
  `market_hash_name` text COLLATE utf8mb4_bin NOT NULL,
  `border_color` text COLLATE utf8mb4_bin NOT NULL,
  `image` text COLLATE utf8mb4_bin NOT NULL,
  `dateMaj` varchar(10) COLLATE utf8mb4_bin DEFAULT '12/12/2019',
  PRIMARY KEY (`id_item`),
  UNIQUE KEY `id_item` (`id_item`)
) ENGINE=InnoDB AUTO_INCREMENT=13094 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
