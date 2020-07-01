-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 01, 2020 at 06:32 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.2.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rogue_like`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `join_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`username`, `email`, `password`, `join_date`) VALUES
('Bob Ross', 'bross@gmail.com', '1233', '2020-07-01 16:30:33'),
('Bobby', 'bobby@gmail.com', '1234', '2020-04-23 00:20:56'),
('Brock Obama', 'bobama@yahoo.mail', '1234', '2020-04-15 21:13:30'),
('Edmund_Bridges', 'edmundbridges2@gmail.com', 'CoSc4415', '2020-04-10 21:05:06'),
('Jimmy', 'jimmy@gmail.com', '1234', '2020-04-17 01:14:41'),
('Karson_Etchings', 'SQLTester@yahoo.com', '4415CoSc', '2020-04-10 21:06:32');

-- --------------------------------------------------------

--
-- Table structure for table `consumable`
--

CREATE TABLE `consumable` (
  `item_name` varchar(255) NOT NULL,
  `effect` varchar(1023) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `consumable`
--

INSERT INTO `consumable` (`item_name`, `effect`) VALUES
('Health Pack', 'healthPack(5)'),
('Health Shield', 'healthPack(10)');

-- --------------------------------------------------------

--
-- Table structure for table `defeated`
--

CREATE TABLE `defeated` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `hazard_name` varchar(255) NOT NULL,
  `player_death` tinyint(1) NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `defeated`
--

INSERT INTO `defeated` (`id`, `username`, `hazard_name`, `player_death`, `time`) VALUES
(10, 'Edmund_Bridges', 'Mook', 0, '2020-04-22 18:52:44'),
(11, 'Edmund_Bridges', 'Mook', 0, '2020-04-22 18:52:44'),
(12, 'Edmund_Bridges', 'Mook', 0, '2020-04-22 18:52:48'),
(13, 'Edmund_Bridges', 'Mook', 0, '2020-04-22 18:52:48'),
(14, 'Edmund_Bridges', 'Mook', 0, '2020-04-22 18:52:52'),
(15, 'Edmund_Bridges', 'Mook', 0, '2020-04-22 18:52:52'),
(16, 'Edmund_Bridges', 'Acid Trap', 1, '2020-04-22 18:55:35'),
(17, 'Edmund_Bridges', 'Acid Trap', 1, '2020-04-22 18:55:39'),
(18, 'Edmund_Bridges', 'Mook', 0, '2020-04-22 19:06:36'),
(19, 'Edmund_Bridges', 'Mook', 0, '2020-04-22 19:06:36'),
(20, 'Edmund_Bridges', 'Mook', 0, '2020-04-22 19:16:32'),
(21, 'Edmund_Bridges', 'Mook', 0, '2020-04-22 19:16:32'),
(22, 'Edmund_Bridges', 'Mook', 0, '2020-04-22 19:17:12'),
(23, 'Edmund_Bridges', 'Mook', 0, '2020-04-22 19:17:12'),
(24, 'Edmund_Bridges', 'Mook', 1, '2020-04-22 19:17:32'),
(25, 'Edmund_Bridges', 'Mook', 0, '2020-04-22 19:17:32'),
(26, 'Edmund_Bridges', 'Mook', 0, '2020-04-22 19:17:40'),
(27, 'Edmund_Bridges', 'Mook', 0, '2020-04-22 19:17:40'),
(28, 'Edmund_Bridges', 'Mook', 0, '2020-04-22 19:18:33'),
(29, 'Edmund_Bridges', 'Mook', 0, '2020-04-22 19:18:33'),
(30, 'Edmund_Bridges', 'Mook', 0, '2020-04-22 19:18:53'),
(31, 'Edmund_Bridges', 'Mook', 0, '2020-04-22 19:18:53'),
(32, 'Edmund_Bridges', 'Mook', 0, '2020-04-22 19:22:34'),
(33, 'Edmund_Bridges', 'Mook', 0, '2020-04-22 19:22:34'),
(34, 'Edmund_Bridges', 'Mook', 0, '2020-04-22 19:22:40'),
(35, 'Edmund_Bridges', 'Mook', 0, '2020-04-22 19:22:40'),
(36, 'Edmund_Bridges', 'Mook', 0, '2020-04-22 19:22:45'),
(37, 'Edmund_Bridges', 'Mook', 0, '2020-04-22 19:22:45'),
(38, 'Edmund_Bridges', 'Mook', 0, '2020-04-22 19:22:50'),
(39, 'Edmund_Bridges', 'Mook', 0, '2020-04-22 19:22:50'),
(40, 'Edmund_Bridges', 'Acid Trap', 1, '2020-04-22 22:11:12'),
(41, 'Edmund_Bridges', 'Mook', 0, '2020-04-22 22:11:17'),
(42, 'Edmund_Bridges', 'Mook', 0, '2020-04-22 22:11:17'),
(43, 'Edmund_Bridges', 'Mook', 0, '2020-04-22 22:11:27'),
(44, 'Edmund_Bridges', 'Acid Trap', 1, '2020-04-22 22:11:27'),
(45, 'Edmund_Bridges', 'Mook', 0, '2020-04-22 23:57:29'),
(46, 'Edmund_Bridges', 'Mook', 0, '2020-04-22 23:57:29'),
(47, 'Edmund_Bridges', 'Mook', 0, '2020-04-22 23:57:35'),
(48, 'Edmund_Bridges', 'Mook', 0, '2020-04-22 23:57:35'),
(49, 'Edmund_Bridges', 'Mook', 0, '2020-04-22 23:57:42'),
(50, 'Edmund_Bridges', 'Mook', 0, '2020-04-22 23:57:42'),
(51, 'Edmund_Bridges', 'Acid Trap', 1, '2020-04-22 23:57:42'),
(52, 'Edmund_Bridges', 'Acid Trap', 1, '2020-04-22 23:58:28'),
(53, 'Edmund_Bridges', 'Mook', 1, '2020-04-22 23:58:28'),
(66, 'Bob Ross', 'Rat Swarm', 0, '2020-07-01 16:30:46'),
(67, 'Bob Ross', 'Mook', 0, '2020-07-01 16:30:46'),
(68, 'Bob Ross', 'Rat Swarm', 0, '2020-07-01 16:30:46'),
(69, 'Bob Ross', 'Mook', 0, '2020-07-01 16:30:46'),
(70, 'Bob Ross', 'Mook', 0, '2020-07-01 16:31:00'),
(71, 'Bob Ross', 'Rat Swarm', 0, '2020-07-01 16:31:00'),
(72, 'Bob Ross', 'Rat Swarm', 0, '2020-07-01 16:31:00'),
(73, 'Bob Ross', 'Rat Swarm', 0, '2020-07-01 16:31:00'),
(74, 'Bob Ross', 'Mook', 0, '2020-07-01 16:31:00'),
(75, 'Bob Ross', 'Rat Swarm', 0, '2020-07-01 16:31:00'),
(76, 'Bob Ross', 'Rat Swarm', 0, '2020-07-01 16:31:00');

-- --------------------------------------------------------

--
-- Table structure for table `drop_table`
--

CREATE TABLE `drop_table` (
  `hazard_name` varchar(255) NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `drop_rate` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `drop_table`
--

INSERT INTO `drop_table` (`hazard_name`, `item_name`, `drop_rate`) VALUES
('Goblin Boss', 'Pump Shotgun', 0.2),
('Mook', 'Health Pack', 0.5),
('Mook', 'Pistol', 0.2),
('Rat Swarm', 'Health Shield', 0.2),
('Rat Swarm', 'Pump Shotgun', 0.1),
('Warlock', 'Health Pack', 0.3),
('Warlock', 'Health Shield', 0.1);

-- --------------------------------------------------------

--
-- Table structure for table `enemy`
--

CREATE TABLE `enemy` (
  `hazard_name` varchar(255) NOT NULL,
  `enemy_type` varchar(255) NOT NULL,
  `aggression` varchar(1023) NOT NULL,
  `base_damage` int(11) NOT NULL,
  `health` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `enemy`
--

INSERT INTO `enemy` (`hazard_name`, `enemy_type`, `aggression`, `base_damage`, `health`) VALUES
('Goblin Boss', 'Boss', 'Line of sight', 3, 10),
('Mook', 'Grunt', 'Line of sight', 1, 1),
('Rat Swarm', 'Mini-boss', 'Line of sight', 1, 1),
('Warlock', 'Grunt', 'Line of sight', 2, 3);

-- --------------------------------------------------------

--
-- Table structure for table `equipment`
--

CREATE TABLE `equipment` (
  `item_name` varchar(255) NOT NULL,
  `equipment_type` varchar(255) NOT NULL,
  `value` int(11) NOT NULL,
  `effect` varchar(1023) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `equipment`
--

INSERT INTO `equipment` (`item_name`, `equipment_type`, `value`, `effect`) VALUES
('Pistol', 'Arms', 2, 'Deals a small amount of damage, with quick reload and no knock back.'),
('Pump Shotgun', 'Arms', 3, 'Deals significant damage up close, but has a slow reload speed.');

-- --------------------------------------------------------

--
-- Table structure for table `hazard`
--

CREATE TABLE `hazard` (
  `hazard_name` varchar(255) NOT NULL,
  `minimum_difficulty` int(11) NOT NULL,
  `difficulty` int(11) NOT NULL,
  `rare_spawn_rate` float(10,0) NOT NULL,
  `description` varchar(1023) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hazard`
--

INSERT INTO `hazard` (`hazard_name`, `minimum_difficulty`, `difficulty`, `rare_spawn_rate`, `description`) VALUES
('Acid Trap', 1, 1, 0, 'Sprays acid.'),
('Flame Trap', 1, 1, 0, 'When hit by this trap, the player takes 2 damage every second, for 2 seconds.'),
('Goblin Boss', 2, 3, 0, 'A measly goblin leader, who\'s stronger than a Mook, but can still be defeated with ease.'),
('Mook', 1, 1, 0, 'A simple enemy that deals little damage and dies in one hit.'),
('Rat Swarm', 1, 2, 0, 'A single rat is no threat to the player, but when there\'s 12 of them...'),
('Warlock', 1, 2, 0, 'A ranged Warlock that casts swift fireballs at the player.');

-- --------------------------------------------------------

--
-- Table structure for table `hazard_spawn_table`
--

CREATE TABLE `hazard_spawn_table` (
  `hazard_name` varchar(255) NOT NULL,
  `level_type` varchar(255) NOT NULL,
  `spawn_rate` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hazard_spawn_table`
--

INSERT INTO `hazard_spawn_table` (`hazard_name`, `level_type`, `spawn_rate`) VALUES
('Acid Trap', 'Forest', 0.2),
('Flame Trap', 'Swamp', 0.2),
('Goblin Boss', 'Forest', 0.1),
('Mook', 'Forest', 0.2),
('Rat Swarm', 'Forest', 0.3),
('Rat Swarm', 'Swamp', 0.1),
('Warlock', 'Swamp', 0.2);

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

CREATE TABLE `item` (
  `item_name` varchar(255) NOT NULL,
  `rarity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `item`
--

INSERT INTO `item` (`item_name`, `rarity`) VALUES
('Health Pack', 1),
('Health Shield', 1),
('Pistol', 2),
('Pump Shotgun', 3);

-- --------------------------------------------------------

--
-- Table structure for table `level`
--

CREATE TABLE `level` (
  `level_type` varchar(255) NOT NULL,
  `effect` varchar(255) NOT NULL,
  `description` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `level`
--

INSERT INTO `level` (`level_type`, `effect`, `description`) VALUES
('forest', 'Health restoring items drop more frequently.', 'This serene pine forest offers the bounty of nature to help you combat the unnatural forces that threaten it.'),
('Swamp', 'The player loses 15% movement speed at all times.', 'This swamp has proven to be difficult to maneuver, leading to the death of countless travelers.');

-- --------------------------------------------------------

--
-- Table structure for table `played_on`
--

CREATE TABLE `played_on` (
  `username` varchar(255) NOT NULL,
  `seed` int(11) NOT NULL,
  `difficulty` int(11) NOT NULL,
  `level_type` varchar(255) NOT NULL,
  `rating` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  `died` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `played_on`
--

INSERT INTO `played_on` (`username`, `seed`, `difficulty`, `level_type`, `rating`, `score`, `died`) VALUES
('Bob Ross', 1058819640, 2, 'forest', 5, 12, 0),
('Bob Ross', 1819803860, 4, 'forest', 5, 26, 0),
('Edmund_Bridges', 111111111, 1, 'forest', 10, 0, 1),
('Edmund_Bridges', 576737297, 4, 'forest', 5, 12, 0),
('Edmund_Bridges', 682248725, 3, 'forest', 1, 12, 0),
('Edmund_Bridges', 778640118, 2, 'forest', 3, 8, 0),
('Edmund_Bridges', 951118219, 3, 'forest', -1, 8, 0),
('Edmund_Bridges', 1588535330, 7, 'forest', -1, 20, 0),
('Edmund_Bridges', 1781877827, 5, 'forest', 5, 16, 0),
('Edmund_Bridges', 1941364977, 2, 'forest', 4, 8, 0);

-- --------------------------------------------------------

--
-- Table structure for table `random_seed`
--

CREATE TABLE `random_seed` (
  `seed` int(11) NOT NULL,
  `difficulty` int(11) NOT NULL,
  `level_type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `random_seed`
--

INSERT INTO `random_seed` (`seed`, `difficulty`, `level_type`) VALUES
(111111111, 1, 'forest'),
(1058819640, 2, 'forest'),
(1819803860, 4, 'forest');

-- --------------------------------------------------------

--
-- Table structure for table `trap`
--

CREATE TABLE `trap` (
  `hazard_name` varchar(255) NOT NULL,
  `trap_type` varchar(255) NOT NULL,
  `effect` varchar(1023) NOT NULL,
  `activation` varchar(1023) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `trap`
--

INSERT INTO `trap` (`hazard_name`, `trap_type`, `effect`, `activation`) VALUES
('Acid Trap', 'Proximity 10, Damage 1, Reset 6', 'trapDamage(2)', 'A creature gets within 10 feet of the trap.'),
('Flame Trap', 'Proximity 12, Damage 2, Reset 6', 'trapDamage(3)', 'A creature gets within 12 feet of the trap.');

-- --------------------------------------------------------

--
-- Table structure for table `treasure_spawn`
--

CREATE TABLE `treasure_spawn` (
  `level_type` varchar(255) NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `spawn_rate` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `treasure_spawn`
--

INSERT INTO `treasure_spawn` (`level_type`, `item_name`, `spawn_rate`) VALUES
('Forest', 'Health Pack', 3),
('Forest', 'Pistol', 0.01),
('Forest/Swamp', 'Health Shield', 2),
('Swamp', 'Pump Shotgun', 0.01);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `consumable`
--
ALTER TABLE `consumable`
  ADD PRIMARY KEY (`item_name`);

--
-- Indexes for table `defeated`
--
ALTER TABLE `defeated`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `drop_table`
--
ALTER TABLE `drop_table`
  ADD PRIMARY KEY (`hazard_name`,`item_name`);

--
-- Indexes for table `enemy`
--
ALTER TABLE `enemy`
  ADD PRIMARY KEY (`hazard_name`);

--
-- Indexes for table `equipment`
--
ALTER TABLE `equipment`
  ADD PRIMARY KEY (`item_name`);

--
-- Indexes for table `hazard`
--
ALTER TABLE `hazard`
  ADD PRIMARY KEY (`hazard_name`);

--
-- Indexes for table `hazard_spawn_table`
--
ALTER TABLE `hazard_spawn_table`
  ADD PRIMARY KEY (`hazard_name`,`level_type`);

--
-- Indexes for table `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`item_name`);

--
-- Indexes for table `level`
--
ALTER TABLE `level`
  ADD PRIMARY KEY (`level_type`);

--
-- Indexes for table `played_on`
--
ALTER TABLE `played_on`
  ADD PRIMARY KEY (`username`,`seed`,`difficulty`,`level_type`);

--
-- Indexes for table `random_seed`
--
ALTER TABLE `random_seed`
  ADD PRIMARY KEY (`seed`,`difficulty`,`level_type`),
  ADD KEY `level_type` (`level_type`);

--
-- Indexes for table `trap`
--
ALTER TABLE `trap`
  ADD PRIMARY KEY (`hazard_name`);

--
-- Indexes for table `treasure_spawn`
--
ALTER TABLE `treasure_spawn`
  ADD PRIMARY KEY (`level_type`,`item_name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `defeated`
--
ALTER TABLE `defeated`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `random_seed`
--
ALTER TABLE `random_seed`
  ADD CONSTRAINT `random_seed_ibfk_1` FOREIGN KEY (`level_type`) REFERENCES `level` (`level_type`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
