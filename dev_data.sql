-- phpMyAdmin SQL Dump
-- version 4.3.5
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 19, 2015 at 10:27 AM
-- Server version: 5.5.37-log
-- PHP Version: 5.5.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `papertask`
--

-- --------------------------------------------------------

--
-- Table structure for table `BankInfo`
--

CREATE TABLE IF NOT EXISTS `BankInfo` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `paypal` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `alipay` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `account` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `country` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `swift` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `accountNo` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `routingNumber` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `BankInfo`
--

INSERT INTO `BankInfo` (`id`, `user_id`, `paypal`, `alipay`, `account`, `address`, `city`, `country`, `swift`, `name`, `accountNo`, `routingNumber`) VALUES
(1, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 8, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(5, 7, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6, 9, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(7, 10, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(8, 17, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `CatTool`
--

CREATE TABLE IF NOT EXISTS `CatTool` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=113 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `CatTool`
--

INSERT INTO `CatTool` (`id`, `name`) VALUES
(1, 'Alchemy Catalyst'),
(2, 'Déjà vu X'),
(3, 'Idiom WorldServer'),
(4, 'Kbabel'),
(5, 'Lingvo 12'),
(6, 'MemoQ'),
(7, 'Multilizer'),
(8, 'MultiTrans 4'),
(9, 'OmegaT'),
(10, 'SDL Passolo'),
(11, 'SDL Synergy'),
(12, 'SDL Trados 2009'),
(13, 'SDL Trados 2011'),
(14, 'SDL Trados 7'),
(15, 'SDL/Trados 2006'),
(16, 'SDL/Trados 2007'),
(17, 'SDLX 2007 Standard edition'),
(18, 'SDLX Lite'),
(19, 'Similis Freelance'),
(20, 'Similis Gratuiciel'),
(21, 'STAR Group Transit XV'),
(22, 'STAR Transit Satellite PE'),
(23, 'Swordfish'),
(24, 'Sun Open Language Tools(Java)'),
(25, 'Translation Office 3000'),
(26, 'Transolution'),
(27, 'WinTitus 1.0'),
(28, 'Wordfast'),
(29, 'Alchemy Catalyst'),
(30, 'Déjà vu X'),
(31, 'Idiom WorldServer'),
(32, 'Kbabel'),
(33, 'Lingvo 12'),
(34, 'MemoQ'),
(35, 'Multilizer'),
(36, 'MultiTrans 4'),
(37, 'OmegaT'),
(38, 'SDL Passolo'),
(39, 'SDL Synergy'),
(40, 'SDL Trados 2009'),
(41, 'SDL Trados 2011'),
(42, 'SDL Trados 7'),
(43, 'SDL/Trados 2006'),
(44, 'SDL/Trados 2007'),
(45, 'SDLX 2007 Standard edition'),
(46, 'SDLX Lite'),
(47, 'Similis Freelance'),
(48, 'Similis Gratuiciel'),
(49, 'STAR Group Transit XV'),
(50, 'STAR Transit Satellite PE'),
(51, 'Swordfish'),
(52, 'Sun Open Language Tools(Java)'),
(53, 'Translation Office 3000'),
(54, 'Transolution'),
(55, 'WinTitus 1.0'),
(56, 'Wordfast'),
(57, 'Alchemy Catalyst'),
(58, 'Déjà vu X'),
(59, 'Idiom WorldServer'),
(60, 'Kbabel'),
(61, 'Lingvo 12'),
(62, 'MemoQ'),
(63, 'Multilizer'),
(64, 'MultiTrans 4'),
(65, 'OmegaT'),
(66, 'SDL Passolo'),
(67, 'SDL Synergy'),
(68, 'SDL Trados 2009'),
(69, 'SDL Trados 2011'),
(70, 'SDL Trados 7'),
(71, 'SDL/Trados 2006'),
(72, 'SDL/Trados 2007'),
(73, 'SDLX 2007 Standard edition'),
(74, 'SDLX Lite'),
(75, 'Similis Freelance'),
(76, 'Similis Gratuiciel'),
(77, 'STAR Group Transit XV'),
(78, 'STAR Transit Satellite PE'),
(79, 'Swordfish'),
(80, 'Sun Open Language Tools(Java)'),
(81, 'Translation Office 3000'),
(82, 'Transolution'),
(83, 'WinTitus 1.0'),
(84, 'Wordfast'),
(85, 'Alchemy Catalyst'),
(86, 'Déjà vu X'),
(87, 'Idiom WorldServer'),
(88, 'Kbabel'),
(89, 'Lingvo 12'),
(90, 'MemoQ'),
(91, 'Multilizer'),
(92, 'MultiTrans 4'),
(93, 'OmegaT'),
(94, 'SDL Passolo'),
(95, 'SDL Synergy'),
(96, 'SDL Trados 2009'),
(97, 'SDL Trados 2011'),
(98, 'SDL Trados 7'),
(99, 'SDL/Trados 2006'),
(100, 'SDL/Trados 2007'),
(101, 'SDLX 2007 Standard edition'),
(102, 'SDLX Lite'),
(103, 'Similis Freelance'),
(104, 'Similis Gratuiciel'),
(105, 'STAR Group Transit XV'),
(106, 'STAR Transit Satellite PE'),
(107, 'Swordfish'),
(108, 'Sun Open Language Tools(Java)'),
(109, 'Translation Office 3000'),
(110, 'Transolution'),
(111, 'WinTitus 1.0'),
(112, 'Wordfast');

-- --------------------------------------------------------

--
-- Table structure for table `Company`
--

CREATE TABLE IF NOT EXISTS `Company` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `telephone` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `fax` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `city` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `country` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `website` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Company`
--

INSERT INTO `Company` (`id`, `name`, `telephone`, `fax`, `address`, `city`, `country`, `website`) VALUES
(1, 'IBM', '121212', '2121', '12sddasd', '1dsadasdas', NULL, 'www.ibm.com');

-- --------------------------------------------------------

--
-- Table structure for table `Country`
--

CREATE TABLE IF NOT EXISTS `Country` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=193 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Country`
--

INSERT INTO `Country` (`id`, `name`) VALUES
(1, 'Zambia'),
(2, 'Zaire'),
(3, 'Zimbabwe'),
(35, 'South Africa'),
(5, 'Yugoslavia'),
(6, 'Yemen'),
(7, 'Vietnam'),
(8, 'Uzbekistan'),
(9, 'Uruguay'),
(10, 'United States of America'),
(11, 'United Kingdom'),
(12, 'United Arab Emirates'),
(13, 'Ukraine'),
(14, 'Uganda'),
(15, 'Turkmenistan'),
(16, 'Turkey'),
(17, 'Tunisia'),
(18, 'Trinidad and Tobago'),
(19, 'Tonga'),
(20, 'Togo'),
(21, 'Thailand'),
(22, 'Tanzania'),
(23, 'Tajikstan'),
(24, 'Taiwan (China)'),
(25, 'Syria'),
(26, 'Switzerland'),
(27, 'Sweden'),
(28, 'Swaziland'),
(29, 'Suriname'),
(30, 'Sudan'),
(31, 'St.Vincent'),
(32, 'St.Lucia'),
(33, 'Sri Lanka'),
(34, 'Spain'),
(36, 'Somali'),
(37, 'Solomon Is'),
(38, 'Slovenia'),
(39, 'Slovakia'),
(40, 'Singapore'),
(41, 'Sierra Leone'),
(42, 'Seychelles'),
(43, 'Senegal'),
(44, 'Saudi Arabia'),
(45, 'Sao Tome and Principe'),
(46, 'San Marino'),
(47, 'Samoa Western'),
(48, 'Samoa Eastern'),
(49, 'Saint Vincent'),
(50, 'Saint Lueia'),
(51, 'Russia'),
(52, 'Romania'),
(53, 'Reunion'),
(54, 'Qatar'),
(55, 'PuertoRico'),
(56, 'Portugal'),
(57, 'French Polynesia'),
(58, 'Poland'),
(59, 'Philippines'),
(60, 'Peru'),
(61, 'Paraguay'),
(62, 'Papua New Cuinea'),
(63, 'Panama'),
(64, 'Pakistan'),
(65, 'Oman'),
(66, 'Norway'),
(67, 'North Korea'),
(68, 'Nigeria'),
(69, 'Niger'),
(70, 'Nicaragua'),
(71, 'NewZealand'),
(72, 'Netherlands'),
(73, 'Netheriands Antilles'),
(74, 'Nepal'),
(75, 'Nauru'),
(76, 'Namibia'),
(77, 'Mozambique'),
(78, 'Morocco'),
(79, 'Montserrat Is'),
(80, 'Mongolia'),
(81, 'Monaco'),
(82, 'Moldova, Republic of'),
(83, 'Mexico'),
(84, 'Mauritius'),
(85, 'Martinique'),
(86, 'Mariana Is'),
(87, 'Malta'),
(88, 'Mali'),
(89, 'Maldives'),
(90, 'Malaysia'),
(91, 'Malawi'),
(92, 'Madagascar'),
(93, 'Macao (China)'),
(94, 'Luxembourg'),
(95, 'Lithuania'),
(96, 'Liechtenstein'),
(97, 'Libya'),
(98, 'Liberia'),
(99, 'Lesotho'),
(100, 'Lebanon'),
(101, 'Latvia'),
(102, 'Laos'),
(103, 'Kyrgyzstan'),
(104, 'Kuwait'),
(105, 'Korea'),
(106, 'Kenya'),
(107, 'Kazakstan'),
(108, 'Kampuchea (Cambodia)'),
(109, 'Jordan'),
(110, 'Japan'),
(111, 'Jamaica'),
(112, 'IvoryCoast'),
(113, 'Italy'),
(114, 'Israel'),
(115, 'Ireland'),
(116, 'Iraq'),
(117, 'Iran'),
(118, 'Indonesia'),
(119, 'India'),
(120, 'Iceland'),
(121, 'Hungary'),
(122, 'Hongkong (China)'),
(123, 'Honduras'),
(124, 'Haiti'),
(125, 'Guyana'),
(126, 'Guinea'),
(127, 'Guatemala'),
(128, 'Guam'),
(129, 'Grenada'),
(130, 'Greece'),
(131, 'Gibraltar'),
(132, 'Ghana'),
(133, 'Germany'),
(134, 'Georgia'),
(135, 'Gambia'),
(136, 'Gabon'),
(137, 'French Guiana'),
(138, 'France'),
(139, 'Finland'),
(140, 'Fiji'),
(141, 'Ethiopia'),
(142, 'Estonia'),
(143, 'EISalvador'),
(144, 'Egypt'),
(145, 'Ecuador'),
(146, 'Dominica Rep.'),
(147, 'Djibouti'),
(148, 'Denmark'),
(149, 'Czech Republic'),
(150, 'Cyprus'),
(151, 'Cuba'),
(152, 'Costa Rica'),
(153, 'Cook Is.'),
(154, 'Congo'),
(155, 'Colombia'),
(156, 'China'),
(157, 'Chile'),
(158, 'Chad'),
(159, 'Central African Republic'),
(160, 'Cayman Is.'),
(161, 'Canada'),
(162, 'Cameroon'),
(163, 'Burundi'),
(164, 'Burma'),
(165, 'Burkina-faso'),
(166, 'Bulgaria'),
(167, 'Brunei'),
(168, 'Brazil'),
(169, 'Botswana'),
(170, 'Bolivia'),
(171, 'Bermuda Is.'),
(172, 'Benin'),
(173, 'Belize'),
(174, 'Belgium'),
(175, 'Belarus'),
(176, 'Barbados'),
(177, 'Bangladesh'),
(178, 'Bahrain'),
(179, 'Bahamas'),
(180, 'Azerbaijan'),
(181, 'Austria'),
(182, 'Australia'),
(183, 'Ascension'),
(184, 'Armenia'),
(185, 'Argentina'),
(186, 'Antigua and Barbuda'),
(187, 'Anguilla'),
(188, 'Andorra'),
(189, 'Algeria'),
(190, 'Albania'),
(191, 'Afghanistan'),
(192, 'Angola');

-- --------------------------------------------------------

--
-- Table structure for table `CvFile`
--

CREATE TABLE IF NOT EXISTS `CvFile` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `path` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `size` int(11) NOT NULL,
  `time` int(11) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `CvFile`
--

INSERT INTO `CvFile` (`id`, `user_id`, `name`, `path`, `size`, `time`) VALUES
(1, 6, 'LICENSE.txt', 'uploads/LICENSE.txt', 1548, 1421373756);

-- --------------------------------------------------------

--
-- Table structure for table `DesktopSoftware`
--

CREATE TABLE IF NOT EXISTS `DesktopSoftware` (
  `id` int(11) NOT NULL,
  `code` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=145 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `DesktopSoftware`
--

INSERT INTO `DesktopSoftware` (`id`, `code`, `name`) VALUES
(1, 'Acrobat8', 'Adobe Acrobat 8'),
(2, 'Acrobat9', 'Adobe Acrobat 9'),
(3, 'Acrobat7-', 'Adobe Acrobat <=7'),
(4, 'FrameMaker8', 'Adobe FrameMaker 8'),
(5, 'FrameMaker7-', 'Adobe FrameMaker <=7'),
(6, 'IllustratorCS1-', 'Adobe Illustrator <=CS1'),
(7, 'IllustratorCS2', 'Adobe Illustrator CS2'),
(8, 'IllustratorCS3', 'Adobe Illustrator CS3'),
(9, 'InDesignCS3-', 'Adobe InDesign <=CS(3.0)'),
(10, 'InDesignCS24', 'Adobe InDesign CS2(4.0)'),
(11, 'InDesignCS35', 'Adobe InDesign CS3(5.0)'),
(12, 'PageMaker7', 'Adobe PageMaker 7.0'),
(13, 'PhotoshopCS8-', 'Adobe Photoshop <=CS(8.0)'),
(14, 'PhotoshopCS29', 'Adobe Photoshop CS2(9.0)'),
(15, 'PhotoshopCS310', 'Adobe Photoshop CS3(10.0)'),
(16, 'PhotoshopElements', 'Adobe Photoshop Elements'),
(17, 'AutoCAD', 'AutoCAD'),
(18, 'CorelDRAWGraphicsSuiteX4', 'CorelDRAW Graphics Suite X4'),
(19, 'FilmMakerPro8.5', 'FilmMaker Pro 8.5'),
(20, 'FilmMakerPro9', 'FilmMaker Pro 9'),
(21, 'FilmMakerPro8-', 'FilmMaker Pro <=8'),
(22, 'Indesign', 'Indesign'),
(23, 'Interleaf-QuickSilver', 'Interleaf/QuickSilver'),
(24, 'Excel2004-', 'Microsoft Excel <=2004'),
(25, 'Excel2007', 'Microsoft Office Excel 2007'),
(26, 'Excel2008', 'Microsoft Office Excel 2008'),
(27, 'PowerPoint2007', 'Microsoft Office PowerPoint 2007'),
(28, 'PowerPoint2008', 'Microsoft Office PowerPoint 2008'),
(29, 'Visio2003', 'Microsoft Office Visio 2003'),
(30, 'Visio2007', 'Microsoft Office Visio 2007'),
(31, 'Word2007', 'Microsoft Office Word 2007'),
(32, 'Word2008', 'Microsoft Office Word 2008'),
(33, 'PowerPoint2004-', 'Microsoft PowerPoint <=2004'),
(34, 'Word2004-', 'Microsoft Word <=2004'),
(35, 'QuarkExpress7', 'Quark Express 7'),
(36, 'QuarkExpress8', 'Quark Express 8'),
(37, 'Acrobat8', 'Adobe Acrobat 8'),
(38, 'Acrobat9', 'Adobe Acrobat 9'),
(39, 'Acrobat7-', 'Adobe Acrobat <=7'),
(40, 'FrameMaker8', 'Adobe FrameMaker 8'),
(41, 'FrameMaker7-', 'Adobe FrameMaker <=7'),
(42, 'IllustratorCS1-', 'Adobe Illustrator <=CS1'),
(43, 'IllustratorCS2', 'Adobe Illustrator CS2'),
(44, 'IllustratorCS3', 'Adobe Illustrator CS3'),
(45, 'InDesignCS3-', 'Adobe InDesign <=CS(3.0)'),
(46, 'InDesignCS24', 'Adobe InDesign CS2(4.0)'),
(47, 'InDesignCS35', 'Adobe InDesign CS3(5.0)'),
(48, 'PageMaker7', 'Adobe PageMaker 7.0'),
(49, 'PhotoshopCS8-', 'Adobe Photoshop <=CS(8.0)'),
(50, 'PhotoshopCS29', 'Adobe Photoshop CS2(9.0)'),
(51, 'PhotoshopCS310', 'Adobe Photoshop CS3(10.0)'),
(52, 'PhotoshopElements', 'Adobe Photoshop Elements'),
(53, 'AutoCAD', 'AutoCAD'),
(54, 'CorelDRAWGraphicsSuiteX4', 'CorelDRAW Graphics Suite X4'),
(55, 'FilmMakerPro8.5', 'FilmMaker Pro 8.5'),
(56, 'FilmMakerPro9', 'FilmMaker Pro 9'),
(57, 'FilmMakerPro8-', 'FilmMaker Pro <=8'),
(58, 'Indesign', 'Indesign'),
(59, 'Interleaf-QuickSilver', 'Interleaf/QuickSilver'),
(60, 'Excel2004-', 'Microsoft Excel <=2004'),
(61, 'Excel2007', 'Microsoft Office Excel 2007'),
(62, 'Excel2008', 'Microsoft Office Excel 2008'),
(63, 'PowerPoint2007', 'Microsoft Office PowerPoint 2007'),
(64, 'PowerPoint2008', 'Microsoft Office PowerPoint 2008'),
(65, 'Visio2003', 'Microsoft Office Visio 2003'),
(66, 'Visio2007', 'Microsoft Office Visio 2007'),
(67, 'Word2007', 'Microsoft Office Word 2007'),
(68, 'Word2008', 'Microsoft Office Word 2008'),
(69, 'PowerPoint2004-', 'Microsoft PowerPoint <=2004'),
(70, 'Word2004-', 'Microsoft Word <=2004'),
(71, 'QuarkExpress7', 'Quark Express 7'),
(72, 'QuarkExpress8', 'Quark Express 8'),
(73, 'Acrobat8', 'Adobe Acrobat 8'),
(74, 'Acrobat9', 'Adobe Acrobat 9'),
(75, 'Acrobat7-', 'Adobe Acrobat <=7'),
(76, 'FrameMaker8', 'Adobe FrameMaker 8'),
(77, 'FrameMaker7-', 'Adobe FrameMaker <=7'),
(78, 'IllustratorCS1-', 'Adobe Illustrator <=CS1'),
(79, 'IllustratorCS2', 'Adobe Illustrator CS2'),
(80, 'IllustratorCS3', 'Adobe Illustrator CS3'),
(81, 'InDesignCS3-', 'Adobe InDesign <=CS(3.0)'),
(82, 'InDesignCS24', 'Adobe InDesign CS2(4.0)'),
(83, 'InDesignCS35', 'Adobe InDesign CS3(5.0)'),
(84, 'PageMaker7', 'Adobe PageMaker 7.0'),
(85, 'PhotoshopCS8-', 'Adobe Photoshop <=CS(8.0)'),
(86, 'PhotoshopCS29', 'Adobe Photoshop CS2(9.0)'),
(87, 'PhotoshopCS310', 'Adobe Photoshop CS3(10.0)'),
(88, 'PhotoshopElements', 'Adobe Photoshop Elements'),
(89, 'AutoCAD', 'AutoCAD'),
(90, 'CorelDRAWGraphicsSuiteX4', 'CorelDRAW Graphics Suite X4'),
(91, 'FilmMakerPro8.5', 'FilmMaker Pro 8.5'),
(92, 'FilmMakerPro9', 'FilmMaker Pro 9'),
(93, 'FilmMakerPro8-', 'FilmMaker Pro <=8'),
(94, 'Indesign', 'Indesign'),
(95, 'Interleaf-QuickSilver', 'Interleaf/QuickSilver'),
(96, 'Excel2004-', 'Microsoft Excel <=2004'),
(97, 'Excel2007', 'Microsoft Office Excel 2007'),
(98, 'Excel2008', 'Microsoft Office Excel 2008'),
(99, 'PowerPoint2007', 'Microsoft Office PowerPoint 2007'),
(100, 'PowerPoint2008', 'Microsoft Office PowerPoint 2008'),
(101, 'Visio2003', 'Microsoft Office Visio 2003'),
(102, 'Visio2007', 'Microsoft Office Visio 2007'),
(103, 'Word2007', 'Microsoft Office Word 2007'),
(104, 'Word2008', 'Microsoft Office Word 2008'),
(105, 'PowerPoint2004-', 'Microsoft PowerPoint <=2004'),
(106, 'Word2004-', 'Microsoft Word <=2004'),
(107, 'QuarkExpress7', 'Quark Express 7'),
(108, 'QuarkExpress8', 'Quark Express 8'),
(109, 'Acrobat8', 'Adobe Acrobat 8'),
(110, 'Acrobat9', 'Adobe Acrobat 9'),
(111, 'Acrobat7-', 'Adobe Acrobat <=7'),
(112, 'FrameMaker8', 'Adobe FrameMaker 8'),
(113, 'FrameMaker7-', 'Adobe FrameMaker <=7'),
(114, 'IllustratorCS1-', 'Adobe Illustrator <=CS1'),
(115, 'IllustratorCS2', 'Adobe Illustrator CS2'),
(116, 'IllustratorCS3', 'Adobe Illustrator CS3'),
(117, 'InDesignCS3-', 'Adobe InDesign <=CS(3.0)'),
(118, 'InDesignCS24', 'Adobe InDesign CS2(4.0)'),
(119, 'InDesignCS35', 'Adobe InDesign CS3(5.0)'),
(120, 'PageMaker7', 'Adobe PageMaker 7.0'),
(121, 'PhotoshopCS8-', 'Adobe Photoshop <=CS(8.0)'),
(122, 'PhotoshopCS29', 'Adobe Photoshop CS2(9.0)'),
(123, 'PhotoshopCS310', 'Adobe Photoshop CS3(10.0)'),
(124, 'PhotoshopElements', 'Adobe Photoshop Elements'),
(125, 'AutoCAD', 'AutoCAD'),
(126, 'CorelDRAWGraphicsSuiteX4', 'CorelDRAW Graphics Suite X4'),
(127, 'FilmMakerPro8.5', 'FilmMaker Pro 8.5'),
(128, 'FilmMakerPro9', 'FilmMaker Pro 9'),
(129, 'FilmMakerPro8-', 'FilmMaker Pro <=8'),
(130, 'Indesign', 'Indesign'),
(131, 'Interleaf-QuickSilver', 'Interleaf/QuickSilver'),
(132, 'Excel2004-', 'Microsoft Excel <=2004'),
(133, 'Excel2007', 'Microsoft Office Excel 2007'),
(134, 'Excel2008', 'Microsoft Office Excel 2008'),
(135, 'PowerPoint2007', 'Microsoft Office PowerPoint 2007'),
(136, 'PowerPoint2008', 'Microsoft Office PowerPoint 2008'),
(137, 'Visio2003', 'Microsoft Office Visio 2003'),
(138, 'Visio2007', 'Microsoft Office Visio 2007'),
(139, 'Word2007', 'Microsoft Office Word 2007'),
(140, 'Word2008', 'Microsoft Office Word 2008'),
(141, 'PowerPoint2004-', 'Microsoft PowerPoint <=2004'),
(142, 'Word2004-', 'Microsoft Word <=2004'),
(143, 'QuarkExpress7', 'Quark Express 7'),
(144, 'QuarkExpress8', 'Quark Express 8');

-- --------------------------------------------------------

--
-- Table structure for table `EmailTemplates`
--

CREATE TABLE IF NOT EXISTS `EmailTemplates` (
  `id` int(11) NOT NULL,
  `type_id` int(11) DEFAULT NULL,
  `content` longtext COLLATE utf8_unicode_ci NOT NULL,
  `subject` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `language` tinyint(1) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `EmailTemplates`
--

INSERT INTO `EmailTemplates` (`id`, `type_id`, `content`, `subject`, `language`) VALUES
(1, 1, '<h4 style="color: rgb(103, 106, 108);">Hello {{lastName}}, {{firstName}}!</h4><span style="line-height: 18.5714302062988px;">Welcome to PaperTask! </span><div><div><br style="line-height: 18.5714302062988px;"><span style="line-height: 18.5714302062988px;">If you need help or have any questions, please visit </span><a href="http://www.papertask.com/" style="line-height: 18.5714302062988px; background-color: rgb(255, 255, 255);">http://www.papertask.com</a><br style="line-height: 18.5714302062988px;"><br style="line-height: 18.5714302062988px;"><span style="line-height: 18.5714302062988px;">Thanks!</span><br style="line-height: 18.5714302062988px;"><span style="line-height: 18.5714302062988px;">PaperTask </span></div></div>', 'Welcome you to Papertask!', 0),
(2, 2, '<h4 style="color: rgb(103, 106, 108);">Hello {{lastName}}, {{firstName}}!</h4><h4 style="color: rgb(103, 106, 108);"><span style="font-family: ''open sans'', ''Helvetica Neue'', Helvetica, Arial, sans-serif; font-size: 13px; line-height: 18.5714302062988px;">Welcome to PaperTask! </span><br style="font-family: ''open sans'', ''Helvetica Neue'', Helvetica, Arial, sans-serif; font-size: 13px; line-height: 18.5714302062988px;"><br style="font-family: ''open sans'', ''Helvetica Neue'', Helvetica, Arial, sans-serif; font-size: 13px; line-height: 18.5714302062988px;"><span style="font-family: ''open sans'', ''Helvetica Neue'', Helvetica, Arial, sans-serif; font-size: 13px; line-height: 18.5714302062988px;">Could you please click </span><a href="http://%22.%24host.%22/" style="font-family: ''open sans'', ''Helvetica Neue'', Helvetica, Arial, sans-serif; font-size: 13px; line-height: 18.5714302062988px; background-color: rgb(255, 255, 255);"><strong>HERE</strong></a><span style="font-family: ''open sans'', ''Helvetica Neue'', Helvetica, Arial, sans-serif; font-size: 13px; line-height: 18.5714302062988px;"> or the link below to verify that this is your email address? </span><br style="font-family: ''open sans'', ''Helvetica Neue'', Helvetica, Arial, sans-serif; font-size: 13px; line-height: 18.5714302062988px;"><br style="font-family: ''open sans'', ''Helvetica Neue'', Helvetica, Arial, sans-serif; font-size: 13px; line-height: 18.5714302062988px;"><span style="font-family: ''open sans'', ''Helvetica Neue'', Helvetica, Arial, sans-serif; font-size: 13px; line-height: 18.5714302062988px;">{{link}}</span><br style="font-family: ''open sans'', ''Helvetica Neue'', Helvetica, Arial, sans-serif; font-size: 13px; line-height: 18.5714302062988px;"><br style="font-family: ''open sans'', ''Helvetica Neue'', Helvetica, Arial, sans-serif; font-size: 13px; line-height: 18.5714302062988px;"><span style="font-family: ''open sans'', ''Helvetica Neue'', Helvetica, Arial, sans-serif; font-size: 13px; line-height: 18.5714302062988px;">If you need help or have any questions, please visit </span><a href="http://www.papertask.com/" style="font-family: ''open sans'', ''Helvetica Neue'', Helvetica, Arial, sans-serif; font-size: 13px; line-height: 18.5714302062988px; background-color: rgb(255, 255, 255);">http://www.papertask.com</a><br style="font-family: ''open sans'', ''Helvetica Neue'', Helvetica, Arial, sans-serif; font-size: 13px; line-height: 18.5714302062988px;"><br style="font-family: ''open sans'', ''Helvetica Neue'', Helvetica, Arial, sans-serif; font-size: 13px; line-height: 18.5714302062988px;"><span style="font-family: ''open sans'', ''Helvetica Neue'', Helvetica, Arial, sans-serif; font-size: 13px; line-height: 18.5714302062988px;">Thanks!</span><br style="font-family: ''open sans'', ''Helvetica Neue'', Helvetica, Arial, sans-serif; font-size: 13px; line-height: 18.5714302062988px;"><span style="font-family: ''open sans'', ''Helvetica Neue'', Helvetica, Arial, sans-serif; font-size: 13px; line-height: 18.5714302062988px;">PaperTask </span><br></h4>', 'Please confirm your PaperTask account!', 0),
(3, 3, '<h4 style="color: rgb(103, 106, 108);">Hello {{lastName}}, {{firstName}}!</h4><span style="line-height: 18.5714302062988px;">PaperTask receive a request to reset the password of your account. Please click </span><a href="http://%22.%24host.%22/" style="line-height: 18.5714302062988px; background-color: rgb(255, 255, 255);"><strong>HERE</strong></a><span style="line-height: 18.5714302062988px;"> or the link below to reset your password. </span><br style="line-height: 18.5714302062988px;"><br style="line-height: 18.5714302062988px;">{{link}}<br style="line-height: 18.5714302062988px;"><br style="line-height: 18.5714302062988px;"><span style="line-height: 18.5714302062988px;">If you need help or have any questions, please visit </span><a href="http://www.papertask.com/" style="line-height: 18.5714302062988px; background-color: rgb(255, 255, 255);">http://www.papertask.com</a><br style="line-height: 18.5714302062988px;"><br style="line-height: 18.5714302062988px;"><span style="line-height: 18.5714302062988px;">Thanks!</span><br style="line-height: 18.5714302062988px;"><span style="line-height: 18.5714302062988px;">PaperTask </span>', 'Please reset your PaperTask password!', 0);

-- --------------------------------------------------------

--
-- Table structure for table `Employer`
--

CREATE TABLE IF NOT EXISTS `Employer` (
  `id` int(11) NOT NULL,
  `company_id` int(11) DEFAULT NULL,
  `pm` int(11) DEFAULT NULL,
  `sales` int(11) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `position` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `defaultServiceLevel` int(11) NOT NULL,
  `comments` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `contracted` int(11) DEFAULT NULL
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Employer`
--

INSERT INTO `Employer` (`id`, `company_id`, `pm`, `sales`, `name`, `position`, `defaultServiceLevel`, `comments`, `contracted`) VALUES
(1, 1, 1, 2, 'kjiang', 'Director, Business Development', 2, '', 1),
(2, 1, 1, 2, 'testclient1 testclient1', 'Marketing Manager', 2, '<p>21212</p><p>121</p><p><br></p>', 1),
(3, NULL, NULL, NULL, 'me gao', '', 1, NULL, NULL),
(4, NULL, NULL, NULL, '', '', 2, '<p><br></p>', 1),
(5, NULL, NULL, NULL, 'sdfsfsdf12132132', '', 2, '<p><br></p>', 1);

-- --------------------------------------------------------

--
-- Table structure for table `EngineeringCategory`
--

CREATE TABLE IF NOT EXISTS `EngineeringCategory` (
  `id` int(11) NOT NULL,
  `category` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `EngineeringCategory`
--

INSERT INTO `EngineeringCategory` (`id`, `category`) VALUES
(1, 'Engineering'),
(2, 'Testing'),
(3, 'Graphic'),
(4, 'Typing'),
(5, 'Engineering'),
(6, 'Testing'),
(7, 'Graphic'),
(8, 'Typing'),
(9, 'Engineering'),
(10, 'Testing'),
(11, 'Graphic'),
(12, 'Typing'),
(13, 'Engineering'),
(14, 'Testing'),
(15, 'Graphic'),
(16, 'Typing');

-- --------------------------------------------------------

--
-- Table structure for table `Field`
--

CREATE TABLE IF NOT EXISTS `Field` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Field`
--

INSERT INTO `Field` (`id`, `name`) VALUES
(1, 'Field 1'),
(2, 'Field 2'),
(3, 'Field 3'),
(4, 'Field 4');

-- --------------------------------------------------------

--
-- Table structure for table `File`
--

CREATE TABLE IF NOT EXISTS `File` (
  `id` int(11) NOT NULL,
  `project_id` int(11) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `path` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `size` int(11) NOT NULL,
  `time` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Freelancer`
--

CREATE TABLE IF NOT EXISTS `Freelancer` (
  `id` int(11) NOT NULL,
  `isSenior` tinyint(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `freelancer_resource`
--

CREATE TABLE IF NOT EXISTS `freelancer_resource` (
  `freelancer_id` int(11) NOT NULL,
  `resource_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `InterpretingService`
--

CREATE TABLE IF NOT EXISTS `InterpretingService` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `InterpretingService`
--

INSERT INTO `InterpretingService` (`id`, `name`) VALUES
(1, 'Service 1'),
(2, 'Service 2'),
(3, 'Simultaneous'),
(4, 'Consecutive'),
(5, 'Business'),
(6, 'Tourist'),
(7, 'Service 1'),
(8, 'Service 2'),
(9, 'Simultaneous'),
(10, 'Consecutive'),
(11, 'Business'),
(12, 'Tourist'),
(13, 'Service 1'),
(14, 'Service 2'),
(15, 'Simultaneous'),
(16, 'Consecutive'),
(17, 'Business'),
(18, 'Tourist'),
(19, 'Service 1'),
(20, 'Service 2'),
(21, 'Simultaneous'),
(22, 'Consecutive'),
(23, 'Business'),
(24, 'Tourist');

-- --------------------------------------------------------

--
-- Table structure for table `Iterm`
--

CREATE TABLE IF NOT EXISTS `Iterm` (
  `id` int(11) NOT NULL,
  `file_id` int(11) DEFAULT NULL,
  `language_id` int(11) DEFAULT NULL,
  `rate` decimal(10,0) NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Language`
--

CREATE TABLE IF NOT EXISTS `Language` (
  `id` int(11) NOT NULL,
  `code` varchar(2) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=337 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Language`
--

INSERT INTO `Language` (`id`, `code`, `name`) VALUES
(1, 'AF', 'Afrikaans'),
(2, 'AR', 'Arabic'),
(3, 'BE', 'Belarusian'),
(4, 'BA', 'Bosnian'),
(5, 'BU', 'Bulgarian'),
(6, 'MM', 'Burmese'),
(7, 'HC', 'Chinese (Hong Kong)'),
(8, 'SC', 'Chinese (Simplified)'),
(9, 'TC', 'Chinese (Traditional)'),
(10, 'HR', 'Croatian'),
(11, 'CZ', 'Czech'),
(12, 'DK', 'Danish'),
(13, 'DI', 'Dinka'),
(14, 'NL', 'Dutch'),
(15, 'DB', 'Dutch (Belgium)'),
(16, 'EN', 'English'),
(17, 'GB', 'English (British)'),
(18, 'US', 'English (United States)'),
(19, 'EE', 'Estonian'),
(20, 'FI', 'Finnish'),
(21, 'FL', 'Flemish'),
(22, 'FR', 'French'),
(23, 'GF', 'French (Algeria)'),
(24, 'BF', 'French (Belgium)'),
(25, 'CF', 'French (Canada)'),
(26, 'SF', 'French (Switzerland)'),
(27, 'DE', 'German'),
(28, 'AD', 'German (Austria)'),
(29, 'SD', 'German (Switzerland)'),
(30, 'GR', 'Greek'),
(31, 'HE', 'Hebrew'),
(32, 'HI', 'Hindi'),
(33, 'HM', 'Hmong'),
(34, 'HU', 'Hungarian'),
(35, 'IS', 'Icelandic'),
(36, 'ID', 'Indonesian'),
(37, 'IT', 'Italian'),
(38, 'JP', 'Japanese'),
(39, 'JV', 'Javanese'),
(40, 'KK', 'Kazakh'),
(41, 'KH', 'Khmer'),
(42, 'KO', 'Korean'),
(43, 'LO', 'Laothian'),
(44, 'LV', 'Latvian'),
(45, 'LT', 'Lithuanian'),
(46, 'MK', 'Macedonian'),
(47, 'MY', 'Malay'),
(48, 'MT', 'Maltese'),
(49, 'MI', 'Maori'),
(50, 'MN', 'Mongolian'),
(51, 'NO', 'Norwegian'),
(52, 'FA', 'Persian/Farsi'),
(53, 'PL', 'Polish'),
(54, 'PT', 'Portuguese'),
(55, 'BR', 'Portuguese (Brazil)'),
(56, 'RO', 'Romanian'),
(57, 'RU', 'Russian'),
(58, 'SM', 'Samoan'),
(59, 'CS', 'Serbian'),
(60, 'SK', 'Slovak'),
(61, 'SL', 'Slovenian'),
(62, 'SO', 'Somali'),
(63, 'ES', 'Spanish'),
(64, 'EC', 'Spanish (Chile)'),
(65, 'LS', 'Spanish (Colombia)'),
(66, 'IE', 'Spanish (International)'),
(67, 'AS', 'Spanish (Latin America)'),
(68, 'MS', 'Spanish (Mexico)'),
(69, 'PS', 'Spanish (Panama)'),
(70, 'EP', 'Spanish (Peru)'),
(71, 'SU', 'Sundanese'),
(72, 'SE', 'Swedish'),
(73, 'TL', 'Tagalog'),
(74, 'TA', 'Tamil'),
(75, 'TH', 'Thai'),
(76, 'BO', 'Tibetan'),
(77, 'TO', 'Tonga'),
(78, 'TR', 'Turkish'),
(79, 'UA', 'Ukrainian'),
(80, 'UZ', 'Uzbek'),
(81, 'VN', 'Vietnamese'),
(82, 'CY', 'Welsh'),
(83, 'XH', 'Xhosa'),
(84, 'ZU', 'Zulu'),
(85, 'AF', 'Afrikaans'),
(86, 'AR', 'Arabic'),
(87, 'BE', 'Belarusian'),
(88, 'BA', 'Bosnian'),
(89, 'BU', 'Bulgarian'),
(90, 'MM', 'Burmese'),
(91, 'HC', 'Chinese (Hong Kong)'),
(92, 'SC', 'Chinese (Simplified)'),
(93, 'TC', 'Chinese (Traditional)'),
(94, 'HR', 'Croatian'),
(95, 'CZ', 'Czech'),
(96, 'DK', 'Danish'),
(97, 'DI', 'Dinka'),
(98, 'NL', 'Dutch'),
(99, 'DB', 'Dutch (Belgium)'),
(100, 'EN', 'English'),
(101, 'GB', 'English (British)'),
(102, 'US', 'English (United States)'),
(103, 'EE', 'Estonian'),
(104, 'FI', 'Finnish'),
(105, 'FL', 'Flemish'),
(106, 'FR', 'French'),
(107, 'GF', 'French (Algeria)'),
(108, 'BF', 'French (Belgium)'),
(109, 'CF', 'French (Canada)'),
(110, 'SF', 'French (Switzerland)'),
(111, 'DE', 'German'),
(112, 'AD', 'German (Austria)'),
(113, 'SD', 'German (Switzerland)'),
(114, 'GR', 'Greek'),
(115, 'HE', 'Hebrew'),
(116, 'HI', 'Hindi'),
(117, 'HM', 'Hmong'),
(118, 'HU', 'Hungarian'),
(119, 'IS', 'Icelandic'),
(120, 'ID', 'Indonesian'),
(121, 'IT', 'Italian'),
(122, 'JP', 'Japanese'),
(123, 'JV', 'Javanese'),
(124, 'KK', 'Kazakh'),
(125, 'KH', 'Khmer'),
(126, 'KO', 'Korean'),
(127, 'LO', 'Laothian'),
(128, 'LV', 'Latvian'),
(129, 'LT', 'Lithuanian'),
(130, 'MK', 'Macedonian'),
(131, 'MY', 'Malay'),
(132, 'MT', 'Maltese'),
(133, 'MI', 'Maori'),
(134, 'MN', 'Mongolian'),
(135, 'NO', 'Norwegian'),
(136, 'FA', 'Persian/Farsi'),
(137, 'PL', 'Polish'),
(138, 'PT', 'Portuguese'),
(139, 'BR', 'Portuguese (Brazil)'),
(140, 'RO', 'Romanian'),
(141, 'RU', 'Russian'),
(142, 'SM', 'Samoan'),
(143, 'CS', 'Serbian'),
(144, 'SK', 'Slovak'),
(145, 'SL', 'Slovenian'),
(146, 'SO', 'Somali'),
(147, 'ES', 'Spanish'),
(148, 'EC', 'Spanish (Chile)'),
(149, 'LS', 'Spanish (Colombia)'),
(150, 'IE', 'Spanish (International)'),
(151, 'AS', 'Spanish (Latin America)'),
(152, 'MS', 'Spanish (Mexico)'),
(153, 'PS', 'Spanish (Panama)'),
(154, 'EP', 'Spanish (Peru)'),
(155, 'SU', 'Sundanese'),
(156, 'SE', 'Swedish'),
(157, 'TL', 'Tagalog'),
(158, 'TA', 'Tamil'),
(159, 'TH', 'Thai'),
(160, 'BO', 'Tibetan'),
(161, 'TO', 'Tonga'),
(162, 'TR', 'Turkish'),
(163, 'UA', 'Ukrainian'),
(164, 'UZ', 'Uzbek'),
(165, 'VN', 'Vietnamese'),
(166, 'CY', 'Welsh'),
(167, 'XH', 'Xhosa'),
(168, 'ZU', 'Zulu'),
(169, 'AF', 'Afrikaans'),
(170, 'AR', 'Arabic'),
(171, 'BE', 'Belarusian'),
(172, 'BA', 'Bosnian'),
(173, 'BU', 'Bulgarian'),
(174, 'MM', 'Burmese'),
(175, 'HC', 'Chinese (Hong Kong)'),
(176, 'SC', 'Chinese (Simplified)'),
(177, 'TC', 'Chinese (Traditional)'),
(178, 'HR', 'Croatian'),
(179, 'CZ', 'Czech'),
(180, 'DK', 'Danish'),
(181, 'DI', 'Dinka'),
(182, 'NL', 'Dutch'),
(183, 'DB', 'Dutch (Belgium)'),
(184, 'EN', 'English'),
(185, 'GB', 'English (British)'),
(186, 'US', 'English (United States)'),
(187, 'EE', 'Estonian'),
(188, 'FI', 'Finnish'),
(189, 'FL', 'Flemish'),
(190, 'FR', 'French'),
(191, 'GF', 'French (Algeria)'),
(192, 'BF', 'French (Belgium)'),
(193, 'CF', 'French (Canada)'),
(194, 'SF', 'French (Switzerland)'),
(195, 'DE', 'German'),
(196, 'AD', 'German (Austria)'),
(197, 'SD', 'German (Switzerland)'),
(198, 'GR', 'Greek'),
(199, 'HE', 'Hebrew'),
(200, 'HI', 'Hindi'),
(201, 'HM', 'Hmong'),
(202, 'HU', 'Hungarian'),
(203, 'IS', 'Icelandic'),
(204, 'ID', 'Indonesian'),
(205, 'IT', 'Italian'),
(206, 'JP', 'Japanese'),
(207, 'JV', 'Javanese'),
(208, 'KK', 'Kazakh'),
(209, 'KH', 'Khmer'),
(210, 'KO', 'Korean'),
(211, 'LO', 'Laothian'),
(212, 'LV', 'Latvian'),
(213, 'LT', 'Lithuanian'),
(214, 'MK', 'Macedonian'),
(215, 'MY', 'Malay'),
(216, 'MT', 'Maltese'),
(217, 'MI', 'Maori'),
(218, 'MN', 'Mongolian'),
(219, 'NO', 'Norwegian'),
(220, 'FA', 'Persian/Farsi'),
(221, 'PL', 'Polish'),
(222, 'PT', 'Portuguese'),
(223, 'BR', 'Portuguese (Brazil)'),
(224, 'RO', 'Romanian'),
(225, 'RU', 'Russian'),
(226, 'SM', 'Samoan'),
(227, 'CS', 'Serbian'),
(228, 'SK', 'Slovak'),
(229, 'SL', 'Slovenian'),
(230, 'SO', 'Somali'),
(231, 'ES', 'Spanish'),
(232, 'EC', 'Spanish (Chile)'),
(233, 'LS', 'Spanish (Colombia)'),
(234, 'IE', 'Spanish (International)'),
(235, 'AS', 'Spanish (Latin America)'),
(236, 'MS', 'Spanish (Mexico)'),
(237, 'PS', 'Spanish (Panama)'),
(238, 'EP', 'Spanish (Peru)'),
(239, 'SU', 'Sundanese'),
(240, 'SE', 'Swedish'),
(241, 'TL', 'Tagalog'),
(242, 'TA', 'Tamil'),
(243, 'TH', 'Thai'),
(244, 'BO', 'Tibetan'),
(245, 'TO', 'Tonga'),
(246, 'TR', 'Turkish'),
(247, 'UA', 'Ukrainian'),
(248, 'UZ', 'Uzbek'),
(249, 'VN', 'Vietnamese'),
(250, 'CY', 'Welsh'),
(251, 'XH', 'Xhosa'),
(252, 'ZU', 'Zulu'),
(253, 'AF', 'Afrikaans'),
(254, 'AR', 'Arabic'),
(255, 'BE', 'Belarusian'),
(256, 'BA', 'Bosnian'),
(257, 'BU', 'Bulgarian'),
(258, 'MM', 'Burmese'),
(259, 'HC', 'Chinese (Hong Kong)'),
(260, 'SC', 'Chinese (Simplified)'),
(261, 'TC', 'Chinese (Traditional)'),
(262, 'HR', 'Croatian'),
(263, 'CZ', 'Czech'),
(264, 'DK', 'Danish'),
(265, 'DI', 'Dinka'),
(266, 'NL', 'Dutch'),
(267, 'DB', 'Dutch (Belgium)'),
(268, 'EN', 'English'),
(269, 'GB', 'English (British)'),
(270, 'US', 'English (United States)'),
(271, 'EE', 'Estonian'),
(272, 'FI', 'Finnish'),
(273, 'FL', 'Flemish'),
(274, 'FR', 'French'),
(275, 'GF', 'French (Algeria)'),
(276, 'BF', 'French (Belgium)'),
(277, 'CF', 'French (Canada)'),
(278, 'SF', 'French (Switzerland)'),
(279, 'DE', 'German'),
(280, 'AD', 'German (Austria)'),
(281, 'SD', 'German (Switzerland)'),
(282, 'GR', 'Greek'),
(283, 'HE', 'Hebrew'),
(284, 'HI', 'Hindi'),
(285, 'HM', 'Hmong'),
(286, 'HU', 'Hungarian'),
(287, 'IS', 'Icelandic'),
(288, 'ID', 'Indonesian'),
(289, 'IT', 'Italian'),
(290, 'JP', 'Japanese'),
(291, 'JV', 'Javanese'),
(292, 'KK', 'Kazakh'),
(293, 'KH', 'Khmer'),
(294, 'KO', 'Korean'),
(295, 'LO', 'Laothian'),
(296, 'LV', 'Latvian'),
(297, 'LT', 'Lithuanian'),
(298, 'MK', 'Macedonian'),
(299, 'MY', 'Malay'),
(300, 'MT', 'Maltese'),
(301, 'MI', 'Maori'),
(302, 'MN', 'Mongolian'),
(303, 'NO', 'Norwegian'),
(304, 'FA', 'Persian/Farsi'),
(305, 'PL', 'Polish'),
(306, 'PT', 'Portuguese'),
(307, 'BR', 'Portuguese (Brazil)'),
(308, 'RO', 'Romanian'),
(309, 'RU', 'Russian'),
(310, 'SM', 'Samoan'),
(311, 'CS', 'Serbian'),
(312, 'SK', 'Slovak'),
(313, 'SL', 'Slovenian'),
(314, 'SO', 'Somali'),
(315, 'ES', 'Spanish'),
(316, 'EC', 'Spanish (Chile)'),
(317, 'LS', 'Spanish (Colombia)'),
(318, 'IE', 'Spanish (International)'),
(319, 'AS', 'Spanish (Latin America)'),
(320, 'MS', 'Spanish (Mexico)'),
(321, 'PS', 'Spanish (Panama)'),
(322, 'EP', 'Spanish (Peru)'),
(323, 'SU', 'Sundanese'),
(324, 'SE', 'Swedish'),
(325, 'TL', 'Tagalog'),
(326, 'TA', 'Tamil'),
(327, 'TH', 'Thai'),
(328, 'BO', 'Tibetan'),
(329, 'TO', 'Tonga'),
(330, 'TR', 'Turkish'),
(331, 'UA', 'Ukrainian'),
(332, 'UZ', 'Uzbek'),
(333, 'VN', 'Vietnamese'),
(334, 'CY', 'Welsh'),
(335, 'XH', 'Xhosa'),
(336, 'ZU', 'Zulu');

-- --------------------------------------------------------

--
-- Table structure for table `LanguageGroup`
--

CREATE TABLE IF NOT EXISTS `LanguageGroup` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `LanguageGroup`
--

INSERT INTO `LanguageGroup` (`id`, `name`) VALUES
(1, 'European/CE/Greek/Russian'),
(2, 'SC/TC/JP/KO'),
(3, 'TH/VN'),
(4, 'Others'),
(5, 'European/CE/Greek/Russian'),
(6, 'SC/TC/JP/KO'),
(7, 'TH/VN'),
(8, 'Others'),
(9, 'European/CE/Greek/Russian'),
(10, 'SC/TC/JP/KO'),
(11, 'TH/VN'),
(12, 'Others'),
(13, 'European/CE/Greek/Russian'),
(14, 'SC/TC/JP/KO'),
(15, 'TH/VN'),
(16, 'Others');

-- --------------------------------------------------------

--
-- Table structure for table `OperatingSystem`
--

CREATE TABLE IF NOT EXISTS `OperatingSystem` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `OperatingSystem`
--

INSERT INTO `OperatingSystem` (`id`, `name`) VALUES
(1, 'MAC'),
(2, 'PC'),
(3, 'MAC'),
(4, 'PC'),
(5, 'MAC'),
(6, 'PC'),
(7, 'MAC'),
(8, 'PC');

-- --------------------------------------------------------

--
-- Table structure for table `ProfileServiceDesktopPublishing`
--

CREATE TABLE IF NOT EXISTS `ProfileServiceDesktopPublishing` (
  `id` int(11) NOT NULL,
  `priceApplePerPage` decimal(19,2) NOT NULL,
  `priceWindowPerPage` decimal(19,2) NOT NULL,
  `priceApplePerHour` decimal(19,2) NOT NULL,
  `priceWindowPerHour` decimal(19,2) NOT NULL,
  `languageGroup_id` int(11) DEFAULT NULL,
  `desktopSoftware_id` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ProfileServiceEngineering`
--

CREATE TABLE IF NOT EXISTS `ProfileServiceEngineering` (
  `id` int(11) NOT NULL,
  `unit_id` int(11) DEFAULT NULL,
  `price` decimal(19,2) NOT NULL,
  `engineeringCategory_id` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ProfileServiceInterpreting`
--

CREATE TABLE IF NOT EXISTS `ProfileServiceInterpreting` (
  `id` int(11) NOT NULL,
  `pricePerDay` decimal(19,2) NOT NULL,
  `pricePerHalfDay` decimal(19,2) NOT NULL,
  `sourceLanguage_id` int(11) DEFAULT NULL,
  `targetLanguage_id` int(11) DEFAULT NULL,
  `interpretingService_id` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ProfileServiceTranslation`
--

CREATE TABLE IF NOT EXISTS `ProfileServiceTranslation` (
  `id` int(11) NOT NULL,
  `professionalPrice` decimal(19,2) NOT NULL,
  `businessPrice` decimal(19,2) NOT NULL,
  `premiumPrice` decimal(19,2) NOT NULL,
  `sourceLanguage_id` int(11) DEFAULT NULL,
  `targetLanguage_id` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ProfileServiceTranslationTM`
--

CREATE TABLE IF NOT EXISTS `ProfileServiceTranslationTM` (
  `id` int(11) NOT NULL,
  `template` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `rate` decimal(4,2) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=29 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `ProfileServiceTranslationTM`
--

INSERT INTO `ProfileServiceTranslationTM` (`id`, `template`, `rate`) VALUES
(1, 'Repetitions', '0.10'),
(2, '100%', '0.10'),
(3, '95%-99%', '0.10'),
(4, '85%-94%', '0.50'),
(5, '75%-84%', '0.50'),
(6, '50%-74%', '1.00'),
(7, 'No Match', '1.00'),
(8, 'Repetitions', '0.10'),
(9, '100%', '0.10'),
(10, '95%-99%', '0.10'),
(11, '85%-94%', '0.50'),
(12, '75%-84%', '0.50'),
(13, '50%-74%', '1.00'),
(14, 'No Match', '1.00'),
(15, 'Repetitions', '0.10'),
(16, '100%', '0.10'),
(17, '95%-99%', '0.10'),
(18, '85%-94%', '0.50'),
(19, '75%-84%', '0.50'),
(20, '50%-74%', '1.00'),
(21, 'No Match', '1.00'),
(22, 'Repetitions', '0.10'),
(23, '100%', '0.10'),
(24, '95%-99%', '0.10'),
(25, '85%-94%', '0.50'),
(26, '75%-84%', '0.50'),
(27, '50%-74%', '1.00'),
(28, 'No Match', '1.00');

-- --------------------------------------------------------

--
-- Table structure for table `Project`
--

CREATE TABLE IF NOT EXISTS `Project` (
  `id` int(11) NOT NULL,
  `field_id` int(11) DEFAULT NULL,
  `client_id` int(11) DEFAULT NULL,
  `sale_id` int(11) DEFAULT NULL,
  `pm_id` int(11) DEFAULT NULL,
  `status` int(11) NOT NULL,
  `reference` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `priority` int(11) NOT NULL,
  `startDate` datetime NOT NULL,
  `dueDate` datetime NOT NULL,
  `interpretingInfo` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `serviceLevel` int(11) NOT NULL,
  `duration` int(11) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL,
  `payStatus` int(11) NOT NULL,
  `types` tinytext COLLATE utf8_unicode_ci NOT NULL COMMENT '(DC2Type:array)',
  `sourceLanguage_id` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `project_language`
--

CREATE TABLE IF NOT EXISTS `project_language` (
  `project_id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Rating`
--

CREATE TABLE IF NOT EXISTS `Rating` (
  `id` int(11) NOT NULL,
  `value` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Rating`
--

INSERT INTO `Rating` (`id`, `value`, `name`) VALUES
(1, 1, 'B-'),
(2, 2, 'B'),
(3, 3, 'B+'),
(4, 4, 'A-'),
(5, 5, 'A'),
(6, 6, 'A+'),
(7, 1, 'B-'),
(8, 2, 'B'),
(9, 3, 'B+'),
(10, 4, 'A-'),
(11, 5, 'A'),
(12, 6, 'A+'),
(13, 1, 'B-'),
(14, 2, 'B'),
(15, 3, 'B+'),
(16, 4, 'A-'),
(17, 5, 'A'),
(18, 6, 'A+'),
(19, 1, 'B-'),
(20, 2, 'B'),
(21, 3, 'B+'),
(22, 4, 'A-'),
(23, 5, 'A'),
(24, 6, 'A+');

-- --------------------------------------------------------

--
-- Table structure for table `Resource`
--

CREATE TABLE IF NOT EXISTS `Resource` (
  `id` int(11) NOT NULL,
  `group_id` int(11) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=29 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Resource`
--

INSERT INTO `Resource` (`id`, `group_id`, `name`) VALUES
(1, 1, 'Translator'),
(2, 1, 'Proofreader'),
(3, 2, 'Desktop Publishing'),
(4, 3, 'Simultaneous'),
(5, 3, 'Consecutive'),
(6, 3, 'Business Escort'),
(7, 3, 'Tourism Escort'),
(8, 1, 'Translator'),
(9, 1, 'Proofreader'),
(10, 2, 'Desktop Publishing'),
(11, 3, 'Simultaneous'),
(12, 3, 'Consecutive'),
(13, 3, 'Business Escort'),
(14, 3, 'Tourism Escort'),
(15, 1, 'Translator'),
(16, 1, 'Proofreader'),
(17, 2, 'Desktop Publishing'),
(18, 3, 'Simultaneous'),
(19, 3, 'Consecutive'),
(20, 3, 'Business Escort'),
(21, 3, 'Tourism Escort'),
(22, 1, 'Translator'),
(23, 1, 'Proofreader'),
(24, 2, 'Desktop Publishing'),
(25, 3, 'Simultaneous'),
(26, 3, 'Consecutive'),
(27, 3, 'Business Escort'),
(28, 3, 'Tourism Escort');

-- --------------------------------------------------------

--
-- Table structure for table `ResourceGroup`
--

CREATE TABLE IF NOT EXISTS `ResourceGroup` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `ResourceGroup`
--

INSERT INTO `ResourceGroup` (`id`, `name`) VALUES
(1, 'Translation'),
(2, 'Desktop Publishing'),
(3, 'Interpreting'),
(4, 'Translation'),
(5, 'Desktop Publishing'),
(6, 'Interpreting'),
(7, 'Translation'),
(8, 'Desktop Publishing'),
(9, 'Interpreting'),
(10, 'Translation'),
(11, 'Desktop Publishing'),
(12, 'Interpreting');

-- --------------------------------------------------------

--
-- Table structure for table `Resume`
--

CREATE TABLE IF NOT EXISTS `Resume` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `workingExperiences` longtext COLLATE utf8_unicode_ci,
  `education` longtext COLLATE utf8_unicode_ci,
  `recommended` longtext COLLATE utf8_unicode_ci,
  `papertaskComments` longtext COLLATE utf8_unicode_ci,
  `cvUploaded` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Resume`
--

INSERT INTO `Resume` (`id`, `user_id`, `workingExperiences`, `education`, `recommended`, `papertaskComments`, `cvUploaded`) VALUES
(1, 3, NULL, NULL, NULL, NULL, NULL),
(2, 4, '1212121', '21212<div>121</div><div>121</div>', NULL, NULL, NULL),
(3, 8, NULL, NULL, NULL, NULL, NULL),
(4, 6, NULL, NULL, NULL, NULL, NULL),
(5, 9, NULL, NULL, NULL, NULL, NULL),
(6, 7, NULL, NULL, NULL, NULL, NULL),
(7, 10, NULL, NULL, NULL, NULL, NULL),
(8, 13, NULL, '121212<div>1212</div>', NULL, NULL, NULL),
(9, 17, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Roles`
--

CREATE TABLE IF NOT EXISTS `Roles` (
  `id` int(11) NOT NULL,
  `type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `subtype` int(11) DEFAULT NULL
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Roles`
--

INSERT INTO `Roles` (`id`, `type`, `subtype`) VALUES
(1, 'Admin', 0),
(2, 'General Manager', 0),
(3, 'Sales Director', 1),
(4, 'Sales', 1),
(5, 'Operation Manager', 2),
(6, 'Project Manager', 2),
(7, 'Financial Manager', 3),
(8, 'In-house Translator', 4),
(9, 'In-house DTP', 4),
(10, 'In-house Engineering', 4);

-- --------------------------------------------------------

--
-- Table structure for table `Specialism`
--

CREATE TABLE IF NOT EXISTS `Specialism` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=677 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Specialism`
--

INSERT INTO `Specialism` (`id`, `name`) VALUES
(1, 'Accounting'),
(2, 'Aero Engineering'),
(3, 'Aerospace'),
(4, 'Ad-hoc Interpreting'),
(5, 'Advertising'),
(6, 'Advertising(marketing)'),
(7, 'Advertising(media)'),
(8, 'Agriculture'),
(9, 'Annual Reports'),
(10, 'Archaeology'),
(11, 'Architecture & Town Planning'),
(12, 'Art/literary'),
(13, 'Automobile'),
(14, 'Automotive'),
(15, 'Aviation'),
(16, 'Banking'),
(17, 'Behavioural Sciences'),
(18, 'Biochemistry'),
(19, 'Biology'),
(20, 'Biomedicine'),
(21, 'Biotechnology'),
(22, 'Brewing & Distilling'),
(23, 'Broadcasting'),
(24, 'Building'),
(25, 'Cartography'),
(26, 'Ceramics'),
(27, 'Chemical Engineering'),
(28, 'Chemistry'),
(29, 'Cinema'),
(30, 'Civil & Structural Engineering'),
(31, 'Commerce'),
(32, 'Commercial'),
(33, 'Communications'),
(34, 'Computer Games'),
(35, 'Computer Hardware'),
(36, 'Computers & Data Processing'),
(37, 'Construction'),
(38, 'Consumer products'),
(39, 'Contracts'),
(40, 'Copywriting'),
(41, 'Cosmetics'),
(42, 'Crime Issues'),
(43, 'Culture'),
(44, 'Current Affairs'),
(45, 'Defense'),
(46, 'Dentistry'),
(47, 'Domestic Appliances'),
(48, 'Drama'),
(49, 'Economics'),
(50, 'Education'),
(51, 'Electrical Engineering'),
(52, 'Electronics'),
(53, 'Energy'),
(54, 'Engineering'),
(55, 'Entertainment'),
(56, 'Environment'),
(57, 'Environmental Science'),
(58, 'Environmental Engineering'),
(59, 'Equity Research'),
(60, 'ERP'),
(61, 'EU Affaris'),
(62, 'Fashion'),
(63, 'Finance/Banking/Accounting'),
(64, 'Financial/markets'),
(65, 'Food & Drinks Industry'),
(66, 'Freight'),
(67, 'Games & Puzzles'),
(68, 'Gas Industry'),
(69, 'Genealogy'),
(70, 'General'),
(71, 'General Engineering'),
(72, 'Geography'),
(73, 'Geology'),
(74, 'Government'),
(75, 'Hardware'),
(76, 'Healthcare'),
(77, 'Health & Safety'),
(78, 'History'),
(79, 'Homeopathy'),
(80, 'Horticulture'),
(81, 'Humanities'),
(82, 'Immigration'),
(83, 'Import/Export'),
(84, 'IND'),
(85, 'Industrial'),
(86, 'Information technology'),
(87, 'Insurance'),
(88, 'Interior Design'),
(89, 'Internet/E-commerce'),
(90, 'Investment Banking'),
(91, 'Investment/Securities'),
(92, 'Journalism'),
(93, 'Law/Legal'),
(94, 'Literature & Poetry'),
(95, 'Local Government'),
(96, 'Logistics'),
(97, 'Machinery'),
(98, 'Management'),
(99, 'Marine(shipping & shipbuilding'),
(100, 'Manufacturing/Industrial'),
(101, 'Marketing/Communications'),
(102, 'Market Research'),
(103, 'Materials'),
(104, 'Mathematics'),
(105, 'Mechanical Engineering'),
(106, 'Media'),
(107, 'Medical Equipment'),
(108, 'Medical/Life Science/Pharmaceu'),
(109, 'Medicine'),
(110, 'Metallurgy/Casting'),
(111, 'Military'),
(112, 'Mining'),
(113, 'Music'),
(114, 'News/Media'),
(115, 'Nuclear Energy'),
(116, 'Nutrition'),
(117, 'Oenology'),
(118, 'Oil Industry'),
(119, 'Orthopaedics'),
(120, 'Packaging'),
(121, 'Paper/Paper mills'),
(122, 'Patents'),
(123, 'Personnel'),
(124, 'Petrochemical'),
(125, 'Pharmaceutical'),
(126, 'Pharmaceutics'),
(127, 'Photography'),
(128, 'Philosophy'),
(129, 'Physical Sciences'),
(130, 'Physics'),
(131, 'Physiology'),
(132, 'Plastic & Polymer'),
(133, 'Politics'),
(134, 'Printing & Publishing'),
(135, 'Psychiatry'),
(136, 'Psychology'),
(137, 'Public Relations'),
(138, 'Publishing'),
(139, 'Quality Assurance'),
(140, 'Radio / TV'),
(141, 'Real estate'),
(142, 'Religion'),
(143, 'Robotics'),
(144, 'Safety'),
(145, 'SAP ERP'),
(146, 'Sciences'),
(147, 'Scrips'),
(148, 'Security'),
(149, 'Social sciences'),
(150, 'Software'),
(151, 'Software(educational)'),
(152, 'Software(games)'),
(153, 'Software(multimedia)'),
(154, 'Software Localization'),
(155, 'Sports'),
(156, 'Stock Marketing'),
(157, 'Subtitling'),
(158, 'Surgical'),
(159, 'Technical'),
(160, 'Technology'),
(161, 'Telecommunications'),
(162, 'Textiles'),
(163, 'Tourism/Travel'),
(164, 'Training/Education'),
(165, 'Transport'),
(166, 'Veterinary Science'),
(167, 'Water Treatment'),
(168, 'Web Pages'),
(169, 'Zoology'),
(170, 'Accounting'),
(171, 'Aero Engineering'),
(172, 'Aerospace'),
(173, 'Ad-hoc Interpreting'),
(174, 'Advertising'),
(175, 'Advertising(marketing)'),
(176, 'Advertising(media)'),
(177, 'Agriculture'),
(178, 'Annual Reports'),
(179, 'Archaeology'),
(180, 'Architecture & Town Planning'),
(181, 'Art/literary'),
(182, 'Automobile'),
(183, 'Automotive'),
(184, 'Aviation'),
(185, 'Banking'),
(186, 'Behavioural Sciences'),
(187, 'Biochemistry'),
(188, 'Biology'),
(189, 'Biomedicine'),
(190, 'Biotechnology'),
(191, 'Brewing & Distilling'),
(192, 'Broadcasting'),
(193, 'Building'),
(194, 'Cartography'),
(195, 'Ceramics'),
(196, 'Chemical Engineering'),
(197, 'Chemistry'),
(198, 'Cinema'),
(199, 'Civil & Structural Engineering'),
(200, 'Commerce'),
(201, 'Commercial'),
(202, 'Communications'),
(203, 'Computer Games'),
(204, 'Computer Hardware'),
(205, 'Computers & Data Processing'),
(206, 'Construction'),
(207, 'Consumer products'),
(208, 'Contracts'),
(209, 'Copywriting'),
(210, 'Cosmetics'),
(211, 'Crime Issues'),
(212, 'Culture'),
(213, 'Current Affairs'),
(214, 'Defense'),
(215, 'Dentistry'),
(216, 'Domestic Appliances'),
(217, 'Drama'),
(218, 'Economics'),
(219, 'Education'),
(220, 'Electrical Engineering'),
(221, 'Electronics'),
(222, 'Energy'),
(223, 'Engineering'),
(224, 'Entertainment'),
(225, 'Environment'),
(226, 'Environmental Science'),
(227, 'Environmental Engineering'),
(228, 'Equity Research'),
(229, 'ERP'),
(230, 'EU Affaris'),
(231, 'Fashion'),
(232, 'Finance/Banking/Accounting'),
(233, 'Financial/markets'),
(234, 'Food & Drinks Industry'),
(235, 'Freight'),
(236, 'Games & Puzzles'),
(237, 'Gas Industry'),
(238, 'Genealogy'),
(239, 'General'),
(240, 'General Engineering'),
(241, 'Geography'),
(242, 'Geology'),
(243, 'Government'),
(244, 'Hardware'),
(245, 'Healthcare'),
(246, 'Health & Safety'),
(247, 'History'),
(248, 'Homeopathy'),
(249, 'Horticulture'),
(250, 'Humanities'),
(251, 'Immigration'),
(252, 'Import/Export'),
(253, 'IND'),
(254, 'Industrial'),
(255, 'Information technology'),
(256, 'Insurance'),
(257, 'Interior Design'),
(258, 'Internet/E-commerce'),
(259, 'Investment Banking'),
(260, 'Investment/Securities'),
(261, 'Journalism'),
(262, 'Law/Legal'),
(263, 'Literature & Poetry'),
(264, 'Local Government'),
(265, 'Logistics'),
(266, 'Machinery'),
(267, 'Management'),
(268, 'Marine(shipping & shipbuilding'),
(269, 'Manufacturing/Industrial'),
(270, 'Marketing/Communications'),
(271, 'Market Research'),
(272, 'Materials'),
(273, 'Mathematics'),
(274, 'Mechanical Engineering'),
(275, 'Media'),
(276, 'Medical Equipment'),
(277, 'Medical/Life Science/Pharmaceu'),
(278, 'Medicine'),
(279, 'Metallurgy/Casting'),
(280, 'Military'),
(281, 'Mining'),
(282, 'Music'),
(283, 'News/Media'),
(284, 'Nuclear Energy'),
(285, 'Nutrition'),
(286, 'Oenology'),
(287, 'Oil Industry'),
(288, 'Orthopaedics'),
(289, 'Packaging'),
(290, 'Paper/Paper mills'),
(291, 'Patents'),
(292, 'Personnel'),
(293, 'Petrochemical'),
(294, 'Pharmaceutical'),
(295, 'Pharmaceutics'),
(296, 'Photography'),
(297, 'Philosophy'),
(298, 'Physical Sciences'),
(299, 'Physics'),
(300, 'Physiology'),
(301, 'Plastic & Polymer'),
(302, 'Politics'),
(303, 'Printing & Publishing'),
(304, 'Psychiatry'),
(305, 'Psychology'),
(306, 'Public Relations'),
(307, 'Publishing'),
(308, 'Quality Assurance'),
(309, 'Radio / TV'),
(310, 'Real estate'),
(311, 'Religion'),
(312, 'Robotics'),
(313, 'Safety'),
(314, 'SAP ERP'),
(315, 'Sciences'),
(316, 'Scrips'),
(317, 'Security'),
(318, 'Social sciences'),
(319, 'Software'),
(320, 'Software(educational)'),
(321, 'Software(games)'),
(322, 'Software(multimedia)'),
(323, 'Software Localization'),
(324, 'Sports'),
(325, 'Stock Marketing'),
(326, 'Subtitling'),
(327, 'Surgical'),
(328, 'Technical'),
(329, 'Technology'),
(330, 'Telecommunications'),
(331, 'Textiles'),
(332, 'Tourism/Travel'),
(333, 'Training/Education'),
(334, 'Transport'),
(335, 'Veterinary Science'),
(336, 'Water Treatment'),
(337, 'Web Pages'),
(338, 'Zoology'),
(339, 'Accounting'),
(340, 'Aero Engineering'),
(341, 'Aerospace'),
(342, 'Ad-hoc Interpreting'),
(343, 'Advertising'),
(344, 'Advertising(marketing)'),
(345, 'Advertising(media)'),
(346, 'Agriculture'),
(347, 'Annual Reports'),
(348, 'Archaeology'),
(349, 'Architecture & Town Planning'),
(350, 'Art/literary'),
(351, 'Automobile'),
(352, 'Automotive'),
(353, 'Aviation'),
(354, 'Banking'),
(355, 'Behavioural Sciences'),
(356, 'Biochemistry'),
(357, 'Biology'),
(358, 'Biomedicine'),
(359, 'Biotechnology'),
(360, 'Brewing & Distilling'),
(361, 'Broadcasting'),
(362, 'Building'),
(363, 'Cartography'),
(364, 'Ceramics'),
(365, 'Chemical Engineering'),
(366, 'Chemistry'),
(367, 'Cinema'),
(368, 'Civil & Structural Engineering'),
(369, 'Commerce'),
(370, 'Commercial'),
(371, 'Communications'),
(372, 'Computer Games'),
(373, 'Computer Hardware'),
(374, 'Computers & Data Processing'),
(375, 'Construction'),
(376, 'Consumer products'),
(377, 'Contracts'),
(378, 'Copywriting'),
(379, 'Cosmetics'),
(380, 'Crime Issues'),
(381, 'Culture'),
(382, 'Current Affairs'),
(383, 'Defense'),
(384, 'Dentistry'),
(385, 'Domestic Appliances'),
(386, 'Drama'),
(387, 'Economics'),
(388, 'Education'),
(389, 'Electrical Engineering'),
(390, 'Electronics'),
(391, 'Energy'),
(392, 'Engineering'),
(393, 'Entertainment'),
(394, 'Environment'),
(395, 'Environmental Science'),
(396, 'Environmental Engineering'),
(397, 'Equity Research'),
(398, 'ERP'),
(399, 'EU Affaris'),
(400, 'Fashion'),
(401, 'Finance/Banking/Accounting'),
(402, 'Financial/markets'),
(403, 'Food & Drinks Industry'),
(404, 'Freight'),
(405, 'Games & Puzzles'),
(406, 'Gas Industry'),
(407, 'Genealogy'),
(408, 'General'),
(409, 'General Engineering'),
(410, 'Geography'),
(411, 'Geology'),
(412, 'Government'),
(413, 'Hardware'),
(414, 'Healthcare'),
(415, 'Health & Safety'),
(416, 'History'),
(417, 'Homeopathy'),
(418, 'Horticulture'),
(419, 'Humanities'),
(420, 'Immigration'),
(421, 'Import/Export'),
(422, 'IND'),
(423, 'Industrial'),
(424, 'Information technology'),
(425, 'Insurance'),
(426, 'Interior Design'),
(427, 'Internet/E-commerce'),
(428, 'Investment Banking'),
(429, 'Investment/Securities'),
(430, 'Journalism'),
(431, 'Law/Legal'),
(432, 'Literature & Poetry'),
(433, 'Local Government'),
(434, 'Logistics'),
(435, 'Machinery'),
(436, 'Management'),
(437, 'Marine(shipping & shipbuilding'),
(438, 'Manufacturing/Industrial'),
(439, 'Marketing/Communications'),
(440, 'Market Research'),
(441, 'Materials'),
(442, 'Mathematics'),
(443, 'Mechanical Engineering'),
(444, 'Media'),
(445, 'Medical Equipment'),
(446, 'Medical/Life Science/Pharmaceu'),
(447, 'Medicine'),
(448, 'Metallurgy/Casting'),
(449, 'Military'),
(450, 'Mining'),
(451, 'Music'),
(452, 'News/Media'),
(453, 'Nuclear Energy'),
(454, 'Nutrition'),
(455, 'Oenology'),
(456, 'Oil Industry'),
(457, 'Orthopaedics'),
(458, 'Packaging'),
(459, 'Paper/Paper mills'),
(460, 'Patents'),
(461, 'Personnel'),
(462, 'Petrochemical'),
(463, 'Pharmaceutical'),
(464, 'Pharmaceutics'),
(465, 'Photography'),
(466, 'Philosophy'),
(467, 'Physical Sciences'),
(468, 'Physics'),
(469, 'Physiology'),
(470, 'Plastic & Polymer'),
(471, 'Politics'),
(472, 'Printing & Publishing'),
(473, 'Psychiatry'),
(474, 'Psychology'),
(475, 'Public Relations'),
(476, 'Publishing'),
(477, 'Quality Assurance'),
(478, 'Radio / TV'),
(479, 'Real estate'),
(480, 'Religion'),
(481, 'Robotics'),
(482, 'Safety'),
(483, 'SAP ERP'),
(484, 'Sciences'),
(485, 'Scrips'),
(486, 'Security'),
(487, 'Social sciences'),
(488, 'Software'),
(489, 'Software(educational)'),
(490, 'Software(games)'),
(491, 'Software(multimedia)'),
(492, 'Software Localization'),
(493, 'Sports'),
(494, 'Stock Marketing'),
(495, 'Subtitling'),
(496, 'Surgical'),
(497, 'Technical'),
(498, 'Technology'),
(499, 'Telecommunications'),
(500, 'Textiles'),
(501, 'Tourism/Travel'),
(502, 'Training/Education'),
(503, 'Transport'),
(504, 'Veterinary Science'),
(505, 'Water Treatment'),
(506, 'Web Pages'),
(507, 'Zoology'),
(508, 'Accounting'),
(509, 'Aero Engineering'),
(510, 'Aerospace'),
(511, 'Ad-hoc Interpreting'),
(512, 'Advertising'),
(513, 'Advertising(marketing)'),
(514, 'Advertising(media)'),
(515, 'Agriculture'),
(516, 'Annual Reports'),
(517, 'Archaeology'),
(518, 'Architecture & Town Planning'),
(519, 'Art/literary'),
(520, 'Automobile'),
(521, 'Automotive'),
(522, 'Aviation'),
(523, 'Banking'),
(524, 'Behavioural Sciences'),
(525, 'Biochemistry'),
(526, 'Biology'),
(527, 'Biomedicine'),
(528, 'Biotechnology'),
(529, 'Brewing & Distilling'),
(530, 'Broadcasting'),
(531, 'Building'),
(532, 'Cartography'),
(533, 'Ceramics'),
(534, 'Chemical Engineering'),
(535, 'Chemistry'),
(536, 'Cinema'),
(537, 'Civil & Structural Engineering'),
(538, 'Commerce'),
(539, 'Commercial'),
(540, 'Communications'),
(541, 'Computer Games'),
(542, 'Computer Hardware'),
(543, 'Computers & Data Processing'),
(544, 'Construction'),
(545, 'Consumer products'),
(546, 'Contracts'),
(547, 'Copywriting'),
(548, 'Cosmetics'),
(549, 'Crime Issues'),
(550, 'Culture'),
(551, 'Current Affairs'),
(552, 'Defense'),
(553, 'Dentistry'),
(554, 'Domestic Appliances'),
(555, 'Drama'),
(556, 'Economics'),
(557, 'Education'),
(558, 'Electrical Engineering'),
(559, 'Electronics'),
(560, 'Energy'),
(561, 'Engineering'),
(562, 'Entertainment'),
(563, 'Environment'),
(564, 'Environmental Science'),
(565, 'Environmental Engineering'),
(566, 'Equity Research'),
(567, 'ERP'),
(568, 'EU Affaris'),
(569, 'Fashion'),
(570, 'Finance/Banking/Accounting'),
(571, 'Financial/markets'),
(572, 'Food & Drinks Industry'),
(573, 'Freight'),
(574, 'Games & Puzzles'),
(575, 'Gas Industry'),
(576, 'Genealogy'),
(577, 'General'),
(578, 'General Engineering'),
(579, 'Geography'),
(580, 'Geology'),
(581, 'Government'),
(582, 'Hardware'),
(583, 'Healthcare'),
(584, 'Health & Safety'),
(585, 'History'),
(586, 'Homeopathy'),
(587, 'Horticulture'),
(588, 'Humanities'),
(589, 'Immigration'),
(590, 'Import/Export'),
(591, 'IND'),
(592, 'Industrial'),
(593, 'Information technology'),
(594, 'Insurance'),
(595, 'Interior Design'),
(596, 'Internet/E-commerce'),
(597, 'Investment Banking'),
(598, 'Investment/Securities'),
(599, 'Journalism'),
(600, 'Law/Legal'),
(601, 'Literature & Poetry'),
(602, 'Local Government'),
(603, 'Logistics'),
(604, 'Machinery'),
(605, 'Management'),
(606, 'Marine(shipping & shipbuilding'),
(607, 'Manufacturing/Industrial'),
(608, 'Marketing/Communications'),
(609, 'Market Research'),
(610, 'Materials'),
(611, 'Mathematics'),
(612, 'Mechanical Engineering'),
(613, 'Media'),
(614, 'Medical Equipment'),
(615, 'Medical/Life Science/Pharmaceu'),
(616, 'Medicine'),
(617, 'Metallurgy/Casting'),
(618, 'Military'),
(619, 'Mining'),
(620, 'Music'),
(621, 'News/Media'),
(622, 'Nuclear Energy'),
(623, 'Nutrition'),
(624, 'Oenology'),
(625, 'Oil Industry'),
(626, 'Orthopaedics'),
(627, 'Packaging'),
(628, 'Paper/Paper mills'),
(629, 'Patents'),
(630, 'Personnel'),
(631, 'Petrochemical'),
(632, 'Pharmaceutical'),
(633, 'Pharmaceutics'),
(634, 'Photography'),
(635, 'Philosophy'),
(636, 'Physical Sciences'),
(637, 'Physics'),
(638, 'Physiology'),
(639, 'Plastic & Polymer'),
(640, 'Politics'),
(641, 'Printing & Publishing'),
(642, 'Psychiatry'),
(643, 'Psychology'),
(644, 'Public Relations'),
(645, 'Publishing'),
(646, 'Quality Assurance'),
(647, 'Radio / TV'),
(648, 'Real estate'),
(649, 'Religion'),
(650, 'Robotics'),
(651, 'Safety'),
(652, 'SAP ERP'),
(653, 'Sciences'),
(654, 'Scrips'),
(655, 'Security'),
(656, 'Social sciences'),
(657, 'Software'),
(658, 'Software(educational)'),
(659, 'Software(games)'),
(660, 'Software(multimedia)'),
(661, 'Software Localization'),
(662, 'Sports'),
(663, 'Stock Marketing'),
(664, 'Subtitling'),
(665, 'Surgical'),
(666, 'Technical'),
(667, 'Technology'),
(668, 'Telecommunications'),
(669, 'Textiles'),
(670, 'Tourism/Travel'),
(671, 'Training/Education'),
(672, 'Transport'),
(673, 'Veterinary Science'),
(674, 'Water Treatment'),
(675, 'Web Pages'),
(676, 'Zoology');

-- --------------------------------------------------------

--
-- Table structure for table `Staff`
--

CREATE TABLE IF NOT EXISTS `Staff` (
  `id` int(11) NOT NULL,
  `client_id` int(11) DEFAULT NULL,
  `type_id` int(11) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Staff`
--

INSERT INTO `Staff` (`id`, `client_id`, `type_id`, `name`) VALUES
(1, 1, 6, 'ppp staff1'),
(2, 1, 6, 'teststaff111'),
(3, 5, NULL, 'a a'),
(4, 5, 6, 'a a a'),
(5, 5, 6, 'a a'),
(6, 1, 7, 'iuiuiu'),
(7, 5, 6, 'a'),
(8, 5, 6, 'a'),
(9, 1, 3, 'yesystaff1'),
(10, 1, 4, 'idsufuidy'),
(11, NULL, NULL, 'kevin, Jiang'),
(12, 1, 6, 'iuiuiyuyyujkh');

-- --------------------------------------------------------

--
-- Table structure for table `Task`
--

CREATE TABLE IF NOT EXISTS `Task` (
  `id` int(11) NOT NULL,
  `project_id` int(11) DEFAULT NULL,
  `language_id` int(11) DEFAULT NULL,
  `assignee_id` int(11) DEFAULT NULL,
  `type` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL,
  `is_completed` tinyint(1) NOT NULL,
  `is_specialism_pool` tinyint(1) NOT NULL,
  `is_client_pool` tinyint(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `TemplateType`
--

CREATE TABLE IF NOT EXISTS `TemplateType` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `code` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `updateTime` datetime DEFAULT NULL,
  `createdTime` datetime NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `TemplateType`
--

INSERT INTO `TemplateType` (`id`, `name`, `description`, `code`, `updateTime`, `createdTime`) VALUES
(1, 'Welcome Email', 'A welcome email send to user after activation', 'USER_WELCOME', NULL, '2014-09-30 01:43:09'),
(2, 'User registration confirm', 'Email to confirm after user register', 'USER_CONFIRM', NULL, '2014-09-30 01:43:09'),
(3, 'User password reset', 'Email send token to reset password', 'USER_RESET', NULL, '2014-09-30 01:43:09'),
(4, 'register-confirmation', 'register-confirmation', 'register-confirmation', '2014-09-30 01:01:01', '2014-09-30 01:01:01');

-- --------------------------------------------------------

--
-- Table structure for table `Unit`
--

CREATE TABLE IF NOT EXISTS `Unit` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Unit`
--

INSERT INTO `Unit` (`id`, `name`) VALUES
(1, 'Hour'),
(2, 'Day'),
(3, 'Month'),
(4, 'Word'),
(5, 'Graphic'),
(6, 'Page'),
(7, 'Hour'),
(8, 'Day'),
(9, 'Month'),
(10, 'Word'),
(11, 'Graphic'),
(12, 'Page'),
(13, 'Hour'),
(14, 'Day'),
(15, 'Month'),
(16, 'Word'),
(17, 'Graphic'),
(18, 'Page'),
(19, 'Hour'),
(20, 'Day'),
(21, 'Month'),
(22, 'Word'),
(23, 'Graphic'),
(24, 'Page');

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE IF NOT EXISTS `User` (
  `id` int(11) NOT NULL,
  `group_id` int(11) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `freelancer_id` int(11) DEFAULT NULL,
  `employer_id` int(11) DEFAULT NULL,
  `staff_id` int(11) DEFAULT NULL,
  `firstName` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `lastName` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `lastLogin` datetime NOT NULL,
  `createdTime` datetime NOT NULL,
  `isActive` tinyint(1) NOT NULL,
  `profileUpdated` tinyint(1) NOT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `gender` tinyint(1) NOT NULL,
  `currency` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `alias` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `cellphone` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`id`, `group_id`, `country_id`, `freelancer_id`, `employer_id`, `staff_id`, `firstName`, `lastName`, `email`, `password`, `phone`, `lastLogin`, `createdTime`, `isActive`, `profileUpdated`, `token`, `city`, `gender`, `currency`, `alias`, `cellphone`) VALUES
(1, 2, 156, NULL, 1, NULL, 'Kevin', 'Jiang111', 'kevin@papertask.com', 'sha256:1000:Bg3vjscrZAFW4oqiqFokwm9rEs9P9FNw:9AypH4VowxNpaIEj3ZAEMTsfNsJgcDDz', '8989898989', '2015-01-15 05:46:41', '2015-01-15 05:46:41', 1, 1, '', 'beijing', 1, 'usd', NULL, '1818181818'),
(2, 2, 156, NULL, 2, NULL, 'testclient1', 'testclient1', 'testclient1@p.com', 'sha256:1000:6N39BRUxgbw2lXqL1AqVGitAJv5evE2r:hBZomigBpBh0EdPQSceUaP8co1wCpuoQ', '1211212', '2015-01-15 05:49:16', '2015-01-15 05:49:16', 1, 1, NULL, 'Beijing', 0, 'cny', 'CL31484155', '1212121212e213123'),
(3, 3, 156, NULL, NULL, 1, 'ppp', 'staff1', 'staff1@p.com', 'sha256:1000:Zb6TWLf2CZqL6jmaJP1XGsIZlllSl8a/:OEm4Q4ycQR/X1qULMbsJs0YDkXzQ1eaZ', '21231231', '2015-01-15 05:52:44', '2015-01-15 05:52:44', 0, 0, NULL, 'dssdfsdf', 0, 'cny', 'PT19479961', '11111111'),
(4, 3, 156, NULL, NULL, 2, 'sfdkfj', 'sdfjas', 'staff2@p.com', 'sha256:1000:D/Vd2+9UhG3KEiyWcvfNMlhZm9RmqpDx:CmCNzPvPbkyPl5jnejOPyRK3uSDpIkC9', 'sfdlfkjs', '2015-01-15 05:53:48', '2015-01-15 05:53:48', 1, 1, NULL, 'sdfsdfs', 1, 'cny', 'PT47002311', 'sfdlkj'),
(5, 2, NULL, NULL, 3, NULL, 'me', 'gao', 'brogost@gmail.com', 'sha256:1000:03pFfakXizAXbt2g1EzoE/QSTzROHSJ9:gjJOi/NVyd5+u3aaWKqS33Yh4Kxs0Obr', '111', '2015-01-15 06:18:18', '2015-01-15 06:18:18', 1, 0, '', NULL, 0, 'cny', NULL, NULL),
(6, 3, 176, NULL, NULL, 3, 'a', 'a', 'brogost@gmail.com11', 'sha256:1000:qSNDGnlfjC8a3RXxPyGaXkUhpYicZkhp:s4pqmNMepk4dhKQqYEUJ+bqYpjApGqPD', 'a', '2015-01-15 06:19:17', '2015-01-15 06:19:17', 0, 0, NULL, 'a', 1, 'cny', 'PT70045042', 'a'),
(7, 3, 176, NULL, NULL, 4, 'a', 'a', 'brogost@gmail.com111', 'sha256:1000:ihXHqydNVtZXLJIdgFvyMICaqknCwTnZ:CoYmpAadKfiG4aCy2ItvCpDzmwHBnByd', 'a', '2015-01-15 06:19:52', '2015-01-15 06:19:52', 0, 1, NULL, 'a', 1, 'cny', 'PT91041042', 'a'),
(8, 3, 176, NULL, NULL, 5, 'a', 'a', 'brogost@gmail.com1111', 'sha256:1000:EQvjpBo1lPemRxZ5nAnn9oqt6bX1D2zb:iUz4i157bj5q1R12zaKDnO3mUnEp4ZqL', 'a', '2015-01-15 06:20:19', '2015-01-15 06:20:19', 0, 0, NULL, 'a', 1, 'cny', 'PT80109288', 'a'),
(9, 3, 156, NULL, NULL, 6, 'uuuu', 'uiiiii', 'uiui@u.com', 'sha256:1000:+D2mVZjblG7ECFEXCq51glarHiEsGHo2:zylBv8iAxyIy02l8WdoZM0XxV2AIqyoT', '8989898', '2015-01-16 02:02:39', '2015-01-16 02:02:39', 1, 1, NULL, 'Beijing', 0, 'cny', NULL, '1898989898'),
(10, 3, 175, NULL, NULL, 7, 'a', 'a', 'brogost@gmail.com112', 'sha256:1000:hn9XvPVjmzOyL9q06VBgqIlYOMe2k/iX:PeDS0kN6R7Tmd2RCPJsREKGCueiJwe+n', 'a', '2015-01-16 02:59:10', '2015-01-16 02:59:10', 0, 0, NULL, 'a', 1, 'cny', NULL, 'a'),
(11, 3, 192, NULL, NULL, 8, 'a', 'a', 'brogost@gmail.com123123', 'sha256:1000:gm+hd8KexDaua6jWxCaWODALfzsgCqs/:6313pgGes2OgsHJTGHuriuEQPfE0xQ6o', 'a', '2015-01-16 04:28:43', '2015-01-16 04:28:43', 0, 0, NULL, 'a', 0, 'cny', NULL, 'a'),
(12, 3, 156, NULL, NULL, 9, 'yuyu', 'usera112121', 'yuy@yy.com', 'sha256:1000:qfqK7B4de5LCxErEjlQFThJl9lCUzoxL:/kWXyjyCuzA8VU3zw6mCKfbF1EL44SEg', '989887987987', '2015-01-16 09:33:33', '2015-01-16 09:33:33', 0, 0, NULL, 'Beijing', 1, 'cny', NULL, '1898989'),
(13, 3, 162, NULL, NULL, 10, 'kkksdfk', 'dsfja;sl', 'yy@ysoausoduas.com', 'sha256:1000:nkH3LQb5IeEIWN4dUx6LoaGYgRnoXP8q:YW7thT+1xdQ3HuHmEJ2xyifq2VfnrhgG', '1287192873', '2015-01-16 09:34:46', '2015-01-16 09:34:46', 0, 1, NULL, 'Beijing', 1, 'cny', NULL, '11111898998'),
(14, 3, 156, NULL, NULL, 11, 'kevin', 'Jiang', '89@qq.com', 'sha256:1000:GLcIGNnS0cLDYCNeGKVJWqisc6BvGysF:AlNU8OmTauuWIHSpWdrsE5jyMb5IjXu0', '12981728712', '2015-01-16 09:37:58', '2015-01-16 09:37:58', 0, 0, NULL, 'Beijing', 0, 'cny', NULL, '1212331212'),
(15, 2, 156, NULL, 4, NULL, 'Kevin', 'fsdjfa', 'jdfoadsfak@p.com', 'sha256:1000:lRZVuBHjE1R1SOMbkxex+jImwgjYvjpC:J4chuDXBM5JYoneZBIB0lSEcSvZV+RVA', '1212323', '2015-01-16 09:46:22', '2015-01-16 09:46:22', 1, 0, NULL, 'Beijing', 0, 'usd', NULL, '12123123131'),
(16, 2, 156, NULL, 5, NULL, 'kuenen', 'dfasdk', 'yyuydiasu@u.com', 'sha256:1000:15g/VxNksCezKaxix6Tiu3Rqcr3LaJhT:11u8WL+wS4CHU3MsedPKs+OIsnO7QN16', '1231231', '2015-01-16 09:48:18', '2015-01-16 09:48:18', 1, 0, NULL, 'beijng', 0, 'usd', NULL, '23123123123'),
(17, 3, 156, NULL, NULL, 12, 'KKKKK', 'uiui', 'uuiuiuyt@q.com', 'sha256:1000:9fdjB4zYGu6sBJxcRMKmo4txV7xofdbH:QnD58c+pCmvd6WxTngMyt8QtgY+FUxHr', '1121888', '2015-01-19 02:24:33', '2015-01-19 02:24:33', 0, 0, NULL, 'Beijing', 1, 'cny', 'PT62863062', '18787878');

-- --------------------------------------------------------

--
-- Table structure for table `UserDesktopCatTools`
--

CREATE TABLE IF NOT EXISTS `UserDesktopCatTools` (
  `freelancer_id` int(11) NOT NULL,
  `cattool_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `UserDesktopPrice`
--

CREATE TABLE IF NOT EXISTS `UserDesktopPrice` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `language_id` int(11) DEFAULT NULL,
  `software_id` int(11) DEFAULT NULL,
  `priceMac` decimal(6,2) NOT NULL,
  `pricePc` decimal(6,2) NOT NULL,
  `priceHourMac` decimal(6,2) NOT NULL,
  `priceHourPc` decimal(6,2) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `UserEngineeringPrice`
--

CREATE TABLE IF NOT EXISTS `UserEngineeringPrice` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `engineeringcategory_id` int(11) DEFAULT NULL,
  `unit_id` int(11) DEFAULT NULL,
  `price` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `UserGroup`
--

CREATE TABLE IF NOT EXISTS `UserGroup` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `firstLoginUrl` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `UserGroup`
--

INSERT INTO `UserGroup` (`id`, `name`, `firstLoginUrl`) VALUES
(1, 'Freelancer', '/admin/freelancer/finishRegistration/'),
(2, 'Employer', '/admin/employer/finishRegistration/'),
(3, 'Admin', '/admin/admin/finishRegistration/');

-- --------------------------------------------------------

--
-- Table structure for table `UserInterpretingPrice`
--

CREATE TABLE IF NOT EXISTS `UserInterpretingPrice` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `service_id` int(11) DEFAULT NULL,
  `priceDay` decimal(6,2) NOT NULL,
  `priceHalfDay` decimal(6,2) NOT NULL,
  `sourceLanguage_id` int(11) DEFAULT NULL,
  `targetLanguage_id` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `UserInterpretingSpecialisms`
--

CREATE TABLE IF NOT EXISTS `UserInterpretingSpecialisms` (
  `freelancer_id` int(11) NOT NULL,
  `specialism_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `UserOperatingSystem`
--

CREATE TABLE IF NOT EXISTS `UserOperatingSystem` (
  `freelancer_id` int(11) NOT NULL,
  `operatingsystem_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `UserRating`
--

CREATE TABLE IF NOT EXISTS `UserRating` (
  `freelancer_id` int(11) NOT NULL,
  `rating_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `UserTmRatio`
--

CREATE TABLE IF NOT EXISTS `UserTmRatio` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `repetitions` int(11) DEFAULT NULL,
  `yibai` int(11) DEFAULT NULL,
  `jiuwu` int(11) DEFAULT NULL,
  `bawu` int(11) DEFAULT NULL,
  `qiwu` int(11) DEFAULT NULL,
  `wushi` int(11) DEFAULT NULL,
  `nomatch` int(11) DEFAULT NULL
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `UserTmRatio`
--

INSERT INTO `UserTmRatio` (`id`, `user_id`, `repetitions`, `yibai`, `jiuwu`, `bawu`, `qiwu`, `wushi`, `nomatch`) VALUES
(1, 2, 33, 33, 33, 33, 66, 100, 100),
(2, 1, 33, 33, 33, 66, 66, 100, 100),
(3, 15, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 16, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `UserTranslationCatTools`
--

CREATE TABLE IF NOT EXISTS `UserTranslationCatTools` (
  `freelancer_id` int(11) NOT NULL,
  `cattool_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `UserTranslationPrice`
--

CREATE TABLE IF NOT EXISTS `UserTranslationPrice` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `price` decimal(6,2) NOT NULL,
  `sourceLanguage_id` int(11) DEFAULT NULL,
  `targetLanguage_id` int(11) DEFAULT NULL
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `UserTranslationPrice`
--

INSERT INTO `UserTranslationPrice` (`id`, `user_id`, `price`, `sourceLanguage_id`, `targetLanguage_id`) VALUES
(1, 2, '11.00', 4, 6);

-- --------------------------------------------------------

--
-- Table structure for table `UserTranslationSpecialisms`
--

CREATE TABLE IF NOT EXISTS `UserTranslationSpecialisms` (
  `freelancer_id` int(11) NOT NULL,
  `specialism_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `BankInfo`
--
ALTER TABLE `BankInfo`
  ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `UNIQ_B5B834ABA76ED395` (`user_id`);

--
-- Indexes for table `CatTool`
--
ALTER TABLE `CatTool`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Company`
--
ALTER TABLE `Company`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Country`
--
ALTER TABLE `Country`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `CvFile`
--
ALTER TABLE `CvFile`
  ADD PRIMARY KEY (`id`), ADD KEY `IDX_43758A3CA76ED395` (`user_id`);

--
-- Indexes for table `DesktopSoftware`
--
ALTER TABLE `DesktopSoftware`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `EmailTemplates`
--
ALTER TABLE `EmailTemplates`
  ADD PRIMARY KEY (`id`), ADD KEY `IDX_51BDDDCC54C8C93` (`type_id`);

--
-- Indexes for table `Employer`
--
ALTER TABLE `Employer`
  ADD PRIMARY KEY (`id`), ADD KEY `IDX_273A9230979B1AD6` (`company_id`), ADD KEY `IDX_273A92305DE576EC` (`pm`), ADD KEY `IDX_273A92306B817044` (`sales`);

--
-- Indexes for table `EngineeringCategory`
--
ALTER TABLE `EngineeringCategory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Field`
--
ALTER TABLE `Field`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `File`
--
ALTER TABLE `File`
  ADD PRIMARY KEY (`id`), ADD KEY `IDX_2CAD992E166D1F9C` (`project_id`);

--
-- Indexes for table `Freelancer`
--
ALTER TABLE `Freelancer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `freelancer_resource`
--
ALTER TABLE `freelancer_resource`
  ADD PRIMARY KEY (`freelancer_id`,`resource_id`), ADD KEY `IDX_3E106CD18545BDF5` (`freelancer_id`), ADD KEY `IDX_3E106CD189329D25` (`resource_id`);

--
-- Indexes for table `InterpretingService`
--
ALTER TABLE `InterpretingService`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Iterm`
--
ALTER TABLE `Iterm`
  ADD PRIMARY KEY (`id`), ADD KEY `IDX_178AF5B493CB796C` (`file_id`), ADD KEY `IDX_178AF5B482F1BAF4` (`language_id`);

--
-- Indexes for table `Language`
--
ALTER TABLE `Language`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `LanguageGroup`
--
ALTER TABLE `LanguageGroup`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `OperatingSystem`
--
ALTER TABLE `OperatingSystem`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ProfileServiceDesktopPublishing`
--
ALTER TABLE `ProfileServiceDesktopPublishing`
  ADD PRIMARY KEY (`id`), ADD KEY `IDX_2805D4BCD7A78D38` (`languageGroup_id`), ADD KEY `IDX_2805D4BCA20324D4` (`desktopSoftware_id`);

--
-- Indexes for table `ProfileServiceEngineering`
--
ALTER TABLE `ProfileServiceEngineering`
  ADD PRIMARY KEY (`id`), ADD KEY `IDX_238BA388B7E18FC` (`engineeringCategory_id`), ADD KEY `IDX_238BA38F8BD700D` (`unit_id`);

--
-- Indexes for table `ProfileServiceInterpreting`
--
ALTER TABLE `ProfileServiceInterpreting`
  ADD PRIMARY KEY (`id`), ADD KEY `IDX_A26CD31E1B92B47F` (`sourceLanguage_id`), ADD KEY `IDX_A26CD31E55CA1DCA` (`targetLanguage_id`), ADD KEY `IDX_A26CD31E2289CFF5` (`interpretingService_id`);

--
-- Indexes for table `ProfileServiceTranslation`
--
ALTER TABLE `ProfileServiceTranslation`
  ADD PRIMARY KEY (`id`), ADD KEY `IDX_B8276CF91B92B47F` (`sourceLanguage_id`), ADD KEY `IDX_B8276CF955CA1DCA` (`targetLanguage_id`);

--
-- Indexes for table `ProfileServiceTranslationTM`
--
ALTER TABLE `ProfileServiceTranslationTM`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Project`
--
ALTER TABLE `Project`
  ADD PRIMARY KEY (`id`), ADD KEY `IDX_E00EE9721B92B47F` (`sourceLanguage_id`), ADD KEY `IDX_E00EE972443707B0` (`field_id`), ADD KEY `IDX_E00EE97219EB6921` (`client_id`), ADD KEY `IDX_E00EE9724A7E4868` (`sale_id`), ADD KEY `IDX_E00EE9726FBC242E` (`pm_id`);

--
-- Indexes for table `project_language`
--
ALTER TABLE `project_language`
  ADD PRIMARY KEY (`project_id`,`language_id`), ADD KEY `IDX_E995FA6E166D1F9C` (`project_id`), ADD KEY `IDX_E995FA6E82F1BAF4` (`language_id`);

--
-- Indexes for table `Rating`
--
ALTER TABLE `Rating`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Resource`
--
ALTER TABLE `Resource`
  ADD PRIMARY KEY (`id`), ADD KEY `IDX_45E79640FE54D947` (`group_id`);

--
-- Indexes for table `ResourceGroup`
--
ALTER TABLE `ResourceGroup`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Resume`
--
ALTER TABLE `Resume`
  ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `UNIQ_676DD596A76ED395` (`user_id`);

--
-- Indexes for table `Roles`
--
ALTER TABLE `Roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Specialism`
--
ALTER TABLE `Specialism`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Staff`
--
ALTER TABLE `Staff`
  ADD PRIMARY KEY (`id`), ADD KEY `IDX_83AFDC9619EB6921` (`client_id`), ADD KEY `IDX_83AFDC96C54C8C93` (`type_id`);

--
-- Indexes for table `Task`
--
ALTER TABLE `Task`
  ADD PRIMARY KEY (`id`), ADD KEY `IDX_F24C741B166D1F9C` (`project_id`), ADD KEY `IDX_F24C741B82F1BAF4` (`language_id`), ADD KEY `IDX_F24C741B59EC7D60` (`assignee_id`);

--
-- Indexes for table `TemplateType`
--
ALTER TABLE `TemplateType`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Unit`
--
ALTER TABLE `Unit`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `UNIQ_2DA17977E7927C74` (`email`), ADD UNIQUE KEY `UNIQ_2DA179778545BDF5` (`freelancer_id`), ADD UNIQUE KEY `UNIQ_2DA1797741CD9E7A` (`employer_id`), ADD UNIQUE KEY `UNIQ_2DA17977D4D57CD` (`staff_id`), ADD KEY `IDX_2DA17977FE54D947` (`group_id`), ADD KEY `IDX_2DA17977F92F3E70` (`country_id`);

--
-- Indexes for table `UserDesktopCatTools`
--
ALTER TABLE `UserDesktopCatTools`
  ADD PRIMARY KEY (`freelancer_id`,`cattool_id`), ADD KEY `IDX_3961A68C8545BDF5` (`freelancer_id`), ADD KEY `IDX_3961A68CA84F203A` (`cattool_id`);

--
-- Indexes for table `UserDesktopPrice`
--
ALTER TABLE `UserDesktopPrice`
  ADD PRIMARY KEY (`id`), ADD KEY `IDX_D90F0509A76ED395` (`user_id`), ADD KEY `IDX_D90F050982F1BAF4` (`language_id`), ADD KEY `IDX_D90F0509D7452741` (`software_id`);

--
-- Indexes for table `UserEngineeringPrice`
--
ALTER TABLE `UserEngineeringPrice`
  ADD PRIMARY KEY (`id`), ADD KEY `IDX_C7D0FB19A76ED395` (`user_id`), ADD KEY `IDX_C7D0FB19DE2972B` (`engineeringcategory_id`), ADD KEY `IDX_C7D0FB19F8BD700D` (`unit_id`);

--
-- Indexes for table `UserGroup`
--
ALTER TABLE `UserGroup`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `UserInterpretingPrice`
--
ALTER TABLE `UserInterpretingPrice`
  ADD PRIMARY KEY (`id`), ADD KEY `IDX_2544906CA76ED395` (`user_id`), ADD KEY `IDX_2544906C1B92B47F` (`sourceLanguage_id`), ADD KEY `IDX_2544906C55CA1DCA` (`targetLanguage_id`), ADD KEY `IDX_2544906CED5CA9E6` (`service_id`);

--
-- Indexes for table `UserInterpretingSpecialisms`
--
ALTER TABLE `UserInterpretingSpecialisms`
  ADD PRIMARY KEY (`freelancer_id`,`specialism_id`), ADD KEY `IDX_1F2D30F08545BDF5` (`freelancer_id`), ADD KEY `IDX_1F2D30F05601140F` (`specialism_id`);

--
-- Indexes for table `UserOperatingSystem`
--
ALTER TABLE `UserOperatingSystem`
  ADD PRIMARY KEY (`freelancer_id`,`operatingsystem_id`), ADD KEY `IDX_8371A4BF8545BDF5` (`freelancer_id`), ADD KEY `IDX_8371A4BF26B8E142` (`operatingsystem_id`);

--
-- Indexes for table `UserRating`
--
ALTER TABLE `UserRating`
  ADD PRIMARY KEY (`freelancer_id`,`rating_id`), ADD KEY `IDX_F88237008545BDF5` (`freelancer_id`), ADD KEY `IDX_F8823700A32EFC6` (`rating_id`);

--
-- Indexes for table `UserTmRatio`
--
ALTER TABLE `UserTmRatio`
  ADD PRIMARY KEY (`id`), ADD KEY `IDX_1FE21D51A76ED395` (`user_id`);

--
-- Indexes for table `UserTranslationCatTools`
--
ALTER TABLE `UserTranslationCatTools`
  ADD PRIMARY KEY (`freelancer_id`,`cattool_id`), ADD KEY `IDX_6FFCD7B98545BDF5` (`freelancer_id`), ADD KEY `IDX_6FFCD7B9A84F203A` (`cattool_id`);

--
-- Indexes for table `UserTranslationPrice`
--
ALTER TABLE `UserTranslationPrice`
  ADD PRIMARY KEY (`id`), ADD KEY `IDX_19CA7E48A76ED395` (`user_id`), ADD KEY `IDX_19CA7E481B92B47F` (`sourceLanguage_id`), ADD KEY `IDX_19CA7E4855CA1DCA` (`targetLanguage_id`);

--
-- Indexes for table `UserTranslationSpecialisms`
--
ALTER TABLE `UserTranslationSpecialisms`
  ADD PRIMARY KEY (`freelancer_id`,`specialism_id`), ADD KEY `IDX_3403D3928545BDF5` (`freelancer_id`), ADD KEY `IDX_3403D3925601140F` (`specialism_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `BankInfo`
--
ALTER TABLE `BankInfo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `CatTool`
--
ALTER TABLE `CatTool`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=113;
--
-- AUTO_INCREMENT for table `Company`
--
ALTER TABLE `Company`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `Country`
--
ALTER TABLE `Country`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=193;
--
-- AUTO_INCREMENT for table `CvFile`
--
ALTER TABLE `CvFile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `DesktopSoftware`
--
ALTER TABLE `DesktopSoftware`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=145;
--
-- AUTO_INCREMENT for table `EmailTemplates`
--
ALTER TABLE `EmailTemplates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `Employer`
--
ALTER TABLE `Employer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `EngineeringCategory`
--
ALTER TABLE `EngineeringCategory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `Field`
--
ALTER TABLE `Field`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `File`
--
ALTER TABLE `File`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `Freelancer`
--
ALTER TABLE `Freelancer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `InterpretingService`
--
ALTER TABLE `InterpretingService`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT for table `Iterm`
--
ALTER TABLE `Iterm`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `Language`
--
ALTER TABLE `Language`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=337;
--
-- AUTO_INCREMENT for table `LanguageGroup`
--
ALTER TABLE `LanguageGroup`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `OperatingSystem`
--
ALTER TABLE `OperatingSystem`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `ProfileServiceDesktopPublishing`
--
ALTER TABLE `ProfileServiceDesktopPublishing`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `ProfileServiceEngineering`
--
ALTER TABLE `ProfileServiceEngineering`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `ProfileServiceInterpreting`
--
ALTER TABLE `ProfileServiceInterpreting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `ProfileServiceTranslation`
--
ALTER TABLE `ProfileServiceTranslation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `ProfileServiceTranslationTM`
--
ALTER TABLE `ProfileServiceTranslationTM`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=29;
--
-- AUTO_INCREMENT for table `Project`
--
ALTER TABLE `Project`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `Rating`
--
ALTER TABLE `Rating`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT for table `Resource`
--
ALTER TABLE `Resource`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=29;
--
-- AUTO_INCREMENT for table `ResourceGroup`
--
ALTER TABLE `ResourceGroup`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `Resume`
--
ALTER TABLE `Resume`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `Roles`
--
ALTER TABLE `Roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `Specialism`
--
ALTER TABLE `Specialism`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=677;
--
-- AUTO_INCREMENT for table `Staff`
--
ALTER TABLE `Staff`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `Task`
--
ALTER TABLE `Task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `TemplateType`
--
ALTER TABLE `TemplateType`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `Unit`
--
ALTER TABLE `Unit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `UserDesktopPrice`
--
ALTER TABLE `UserDesktopPrice`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `UserEngineeringPrice`
--
ALTER TABLE `UserEngineeringPrice`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `UserGroup`
--
ALTER TABLE `UserGroup`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `UserInterpretingPrice`
--
ALTER TABLE `UserInterpretingPrice`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `UserTmRatio`
--
ALTER TABLE `UserTmRatio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `UserTranslationPrice`
--
ALTER TABLE `UserTranslationPrice`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
