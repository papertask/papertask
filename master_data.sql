INSERT INTO `papertask`.`UserGroup`(`id`,`name`,`firstLoginUrl`) VALUES ('1', 'Freelancer', '/admin/freelancer/finishRegistration/'),  
('2', 'Employer', '/admin/employer/finishRegistration/'),  ('3', 'Admin', '/admin/admin/finishRegistration/');

INSERT INTO `TemplateType` (`id`,`name`,`code`,`description`,`updateTime`,`createdTime`) VALUES (1,'Welcome Email','USER_WELCOME','A welcome email send to user after activation',NULL,'2014-09-30 01:43:09');
INSERT INTO `TemplateType` (`id`,`name`,`code`,`description`,`updateTime`,`createdTime`) VALUES (2,'User registration confirm','USER_CONFIRM','Email to confirm after user register',NULL,'2014-09-30 01:43:09');
INSERT INTO `TemplateType` (`id`,`name`,`code`,`description`,`updateTime`,`createdTime`) VALUES (3,'User password reset','USER_RESET','Email send token to reset password',NULL,'2014-09-30 01:43:09');
INSERT INTO `TemplateType` (`id`,`name`,`code`,`description`,`updateTime`,`createdTime`) VALUES (4,'New activity','ACTIVITY_NEW','New message or activity in project',NULL,'2014-09-30 01:43:09');
INSERT INTO `papertask`.`TemplateType` (`id`, `name`, `description`, `code`, `updateTime`, `createdTime`) VALUES ('1', 'register-confirmation', 'register-confirmation', 'register-confirmation', '2014-09-30 01:01:01', '2014-09-30 01:01:01');


INSERT INTO `papertask`.`ResourceGroup` (`name`) VALUES ('Translation');
INSERT INTO `papertask`.`ResourceGroup` (`name`) VALUES ('Desktop Publishing');
INSERT INTO `papertask`.`ResourceGroup` (`name`) VALUES ('Interpreting');

INSERT INTO `papertask`.`Resource` (`group_id`, `name`) VALUES ('1', 'Translator');
INSERT INTO `papertask`.`Resource` (`group_id`, `name`) VALUES ('1', 'Proofreader');
INSERT INTO `papertask`.`Resource` (`group_id`, `name`) VALUES ('2', 'Desktop Publishing');
INSERT INTO `papertask`.`Resource` (`group_id`, `name`) VALUES ('3', 'Simultaneous');
INSERT INTO `papertask`.`Resource` (`group_id`, `name`) VALUES ('3', 'Consecutive');
INSERT INTO `papertask`.`Resource` (`group_id`, `name`) VALUES ('3', 'Business Escort');
INSERT INTO `papertask`.`Resource` (`group_id`, `name`) VALUES ('3', 'Tourism Escort');


INSERT INTO `papertask`.`Language`(`code`, `name`) VALUES ('AF', 'Afrikaans'), ('AR', 'Arabic'), ('BE', 'Belarusian'), ('BA', 'Bosnian'), ('BU', 'Bulgarian'), ('MM', 'Burmese'), ('HC', 'Chinese (Hong Kong)'), ('SC', 'Chinese (Simplified)'), ('TC', 'Chinese (Traditional)'), ('HR', 'Croatian'), ('CZ', 'Czech'), ('DK', 'Danish'), ('DI', 'Dinka'), ('NL', 'Dutch'), ('DB', 'Dutch (Belgium)'), ('EN', 'English'), ('GB', 'English (British)'), ('US', 'English (United States)'), ('EE', 'Estonian'), ('FI', 'Finnish'), ('FL', 'Flemish'), ('FR', 'French'), ('GF', 'French (Algeria)'), ('BF', 'French (Belgium)'), ('CF', 'French (Canada)'), ('SF', 'French (Switzerland)'), ('DE', 'German'), ('AD', 'German (Austria)'), ('SD', 'German (Switzerland)'), ('GR', 'Greek'), ('HE', 'Hebrew'), ('HI', 'Hindi'), ('HM', 'Hmong'), ('HU', 'Hungarian'), ('IS', 'Icelandic'), ('ID', 'Indonesian'), ('IT', 'Italian'), ('JP', 'Japanese'), ('JV', 'Javanese'), ('KK', 'Kazakh'), ('KH', 'Khmer'), ('KO', 'Korean'), ('LO', 'Laothian'), ('LV', 'Latvian'), ('LT', 'Lithuanian'), ('MK', 'Macedonian'), ('MY', 'Malay'), ('MT', 'Maltese'), ('MI', 'Maori'), ('MN', 'Mongolian'), ('NO', 'Norwegian'), ('FA', 'Persian/Farsi'), ('PL', 'Polish'), ('PT', 'Portuguese'), ('BR', 'Portuguese (Brazil)'), ('RO', 'Romanian'), ('RU', 'Russian'), ('SM', 'Samoan'), ('CS', 'Serbian'), ('SK', 'Slovak'), ('SL', 'Slovenian'), ('SO', 'Somali'), ('ES', 'Spanish'), ('EC', 'Spanish (Chile)'), ('LS', 'Spanish (Colombia)'), ('IE', 'Spanish (International)'), ('AS', 'Spanish (Latin America)'), ('MS', 'Spanish (Mexico)'), ('PS', 'Spanish (Panama)'), ('EP', 'Spanish (Peru)'), ('SU', 'Sundanese'), ('SE', 'Swedish'), ('TL', 'Tagalog'), ('TA', 'Tamil'), ('TH', 'Thai'), ('BO', 'Tibetan'), ('TO', 'Tonga'), ('TR', 'Turkish'), ('UA', 'Ukrainian'), ('UZ', 'Uzbek'), ('VN', 'Vietnamese'), ('CY', 'Welsh'), ('XH', 'Xhosa'), ('ZU', 'Zulu');
INSERT INTO `papertask`.`CatTool`(`name`) VALUES ('Alchemy Catalyst'), ('Deja vu X'), ('Idiom WorldServer'), ('Kbabel'), ('Lingvo 12'), ('MemoQ'), ('Multilizer'), ('MultiTrans 4'), ('OmegaT'), ('SDL Passolo'), ('SDL Synergy'), ('SDL Trados 2009'), ('SDL Trados 2011'), ('SDL Trados 7'), ('SDL/Trados 2006'), ('SDL/Trados 2007'), ('SDLX 2007 Standard edition'), ('SDLX Lite'), ('Similis Freelance'), ('Similis Gratuiciel'), ('STAR Group Transit XV'), ('STAR Transit Satellite PE'), ('Swordfish'), ('Sun Open Language Tools(Java)'), ('Translation Office 3000'), ('Transolution'), ('WinTitus 1.0'), ('Wordfast');
INSERT INTO `papertask`.`DesktopSoftware`(`code`, `name`) VALUES ('Acrobat8', 'Adobe Acrobat 8'),('Acrobat9', 'Adobe Acrobat 9'),('Acrobat7-', 'Adobe Acrobat <=7'),('FrameMaker8', 'Adobe FrameMaker 8'),('FrameMaker7-', 'Adobe FrameMaker <=7'),('IllustratorCS1-', 'Adobe Illustrator <=CS1'),('IllustratorCS2', 'Adobe Illustrator CS2'),('IllustratorCS3', 'Adobe Illustrator CS3'),('InDesignCS3-', 'Adobe InDesign <=CS(3.0)'),('InDesignCS24', 'Adobe InDesign CS2(4.0)'),('InDesignCS35', 'Adobe InDesign CS3(5.0)'),('PageMaker7', 'Adobe PageMaker 7.0'),('PhotoshopCS8-', 'Adobe Photoshop <=CS(8.0)'),('PhotoshopCS29', 'Adobe Photoshop CS2(9.0)'),('PhotoshopCS310', 'Adobe Photoshop CS3(10.0)'),('PhotoshopElements', 'Adobe Photoshop Elements'),('AutoCAD', 'AutoCAD'),('CorelDRAWGraphicsSuiteX4', 'CorelDRAW Graphics Suite X4'),('FilmMakerPro8.5', 'FilmMaker Pro 8.5'),('FilmMakerPro9', 'FilmMaker Pro 9'),('FilmMakerPro8-', 'FilmMaker Pro <=8'),('Indesign', 'Indesign'),('Interleaf-QuickSilver', 'Interleaf/QuickSilver'),('Excel2004-', 'Microsoft Excel <=2004'),('Excel2007', 'Microsoft Office Excel 2007'),('Excel2008', 'Microsoft Office Excel 2008'),('PowerPoint2007', 'Microsoft Office PowerPoint 2007'),('PowerPoint2008', 'Microsoft Office PowerPoint 2008'),('Visio2003', 'Microsoft Office Visio 2003'),('Visio2007', 'Microsoft Office Visio 2007'),('Word2007', 'Microsoft Office Word 2007'),('Word2008', 'Microsoft Office Word 2008'),('PowerPoint2004-', 'Microsoft PowerPoint <=2004'),('Word2004-', 'Microsoft Word <=2004'),('QuarkExpress7', 'Quark Express 7'),('QuarkExpress8', 'Quark Express 8');
INSERT INTO `papertask`.`Specialism`(`name`) VALUES ('Accounting'),('Aero Engineering'),('Aerospace'),('Ad-hoc Interpreting'),('Advertising'),('Advertising(marketing)'),('Advertising(media)'),('Agriculture'),('Annual Reports'),('Archaeology'),('Architecture & Town Planning'),('Art/literary'),('Automobile'),('Automotive'),('Aviation'),('Banking'),('Behavioural Sciences'),('Biochemistry'),('Biology'),('Biomedicine'),('Biotechnology'),('Brewing & Distilling'),('Broadcasting'),('Building'),('Cartography'),('Ceramics'),('Chemical Engineering'),('Chemistry'),('Cinema'),('Civil & Structural Engineering'),('Commerce'),('Commercial'),('Communications'),('Computer Games'),('Computer Hardware'),('Computers & Data Processing'),('Construction'),('Consumer products'),('Contracts'),('Copywriting'),('Cosmetics'),('Crime Issues'),('Culture'),('Current Affairs'),('Defense'),('Dentistry'),('Domestic Appliances'),('Drama'),('Economics'),('Education'),('Electrical Engineering'),('Electronics'),('Energy'),('Engineering'),('Entertainment'),('Environment'),('Environmental Science'),('Environmental Engineering'),('Equity Research'),('ERP'),('EU Affaris'),('Fashion'),('Finance/Banking/Accounting'),('Financial/markets'),('Food & Drinks Industry'),('Freight'),('Games & Puzzles'),('Gas Industry'),('Genealogy'),('General'),('General Engineering'),('Geography'),('Geology'),('Government'),('Hardware'),('Healthcare'),('Health & Safety'),('History'),('Homeopathy'),('Horticulture'),('Humanities'),('Immigration'),('Import/Export'),('IND'),('Industrial'),('Information technology'),('Insurance'),('Interior Design'),('Internet/E-commerce'),('Investment Banking'),('Investment/Securities'),('Journalism'),('Law/Legal'),('Literature & Poetry'),('Local Government'),('Logistics'),('Machinery'),('Management'),('Marine(shipping & shipbuilding'),('Manufacturing/Industrial'),('Marketing/Communications'),('Market Research'),('Materials'),('Mathematics'),('Mechanical Engineering'),('Media'),('Medical Equipment'),('Medical/Life Science/Pharmaceu'),('Medicine'),('Metallurgy/Casting'),('Military'),('Mining'),('Music'),('News/Media'),('Nuclear Energy'),('Nutrition'),('Oenology'),('Oil Industry'),('Orthopaedics'),('Packaging'),('Paper/Paper mills'),('Patents'),('Personnel'),('Petrochemical'),('Pharmaceutical'),('Pharmaceutics'),('Photography'),('Philosophy'),('Physical Sciences'),('Physics'),('Physiology'),('Plastic & Polymer'),('Politics'),('Printing & Publishing'),('Psychiatry'),('Psychology'),('Public Relations'),('Publishing'),('Quality Assurance'),('Radio / TV'),('Real estate'),('Religion'),('Robotics'),('Safety'),('SAP ERP'),('Sciences'),('Scrips'),('Security'),('Social sciences'),('Software'),('Software(educational)'),('Software(games)'),('Software(multimedia)'),('Software Localization'),('Sports'),('Stock Marketing'),('Subtitling'),('Surgical'),('Technical'),('Technology'),('Telecommunications'),('Textiles'),('Tourism/Travel'),('Training/Education'),('Transport'),('Veterinary Science'),('Water Treatment'),('Web Pages'),('Zoology');
INSERT INTO `papertask`.`OperatingSystem`(`name`) VALUES ('MAC'), ('PC');




INSERT INTO `papertask`.`Field`(`name`) VALUES ('Advertising'),('Advertising(marketing)'),('Advertising(media)'),('Agriculture'),('Annual Reports'),('Archaeology'),('Architecture & Town Planning'),('Art/literary'),('Automobile'),('Automotive'),('Aviation'),('Banking'),('Behavioural Sciences'),('Biochemistry'),('Biology'),('Biomedicine'),('Biotechnology'),('Brewing & Distilling'),('Broadcasting'),('Building'),('Cartography'),('Ceramics'),('Chemical Engineering'),('Chemistry'),('Cinema'),('Civil & Structural Engineering'),('Commerce'),('Commercial'),('Communications'),('Computer Games'),('Computer Hardware'),('Computers & Data Processing'),('Construction'),('Consumer products'),('Contracts'),('Copywriting'),('Cosmetics'),('Crime Issues'),('Culture'),('Current Affairs'),('Defense'),('Dentistry'),('Domestic Appliances'),('Drama'),('Economics'),('Education'),('Electrical Engineering'),('Electronics'),('Energy'),('Engineering'),('Entertainment'),('Environment'),('Environmental Science'),('Environmental Engineering'),('Equity Research'),('ERP'),('EU Affaris'),('Fashion'),('Finance/Banking/Accounting'),('Financial/markets'),('Food & Drinks Industry'),('Freight'),('Games & Puzzles'),('Gas Industry'),('Genealogy'),('General'),('General Engineering'),('Geography'),('Geology'),('Government'),('Hardware'),('Healthcare'),('Health & Safety'),('History'),('Homeopathy'),('Horticulture'),('Humanities'),('Immigration'),('Import/Export'),('IND'),('Industrial'),('Information technology'),('Insurance'),('Interior Design'),('Internet/E-commerce'),('Investment Banking'),('Investment/Securities'),('Journalism'),('Law/Legal'),('Literature & Poetry'),('Local Government'),('Logistics'),('Machinery'),('Management'),('Marine(shipping & shipbuilding'),('Manufacturing/Industrial'),('Marketing/Communications'),('Market Research'),('Materials'),('Mathematics'),('Mechanical Engineering'),('Media'),('Medical Equipment'),('Medical/Life Science/Pharmaceu'),('Medicine'),('Metallurgy/Casting'),('Military'),('Mining'),('Music'),('News/Media'),('Nuclear Energy'),('Nutrition'),('Oenology'),('Oil Industry'),('Orthopaedics'),('Packaging'),('Paper/Paper mills'),('Patents'),('Personnel'),('Petrochemical'),('Pharmaceutical'),('Pharmaceutics'),('Photography'),('Philosophy'),('Physical Sciences'),('Physics'),('Physiology'),('Plastic & Polymer'),('Politics'),('Printing & Publishing'),('Psychiatry'),('Psychology'),('Public Relations'),('Publishing'),('Quality Assurance'),('Radio / TV'),('Real estate'),('Religion'),('Robotics'),('Safety'),('SAP ERP'),('Sciences'),('Scrips'),('Security'),('Social sciences'),('Software'),('Software(educational)'),('Software(games)'),('Software(multimedia)'),('Software Localization'),('Sports'),('Stock Marketing'),('Subtitling'),('Surgical'),('Technical'),('Technology'),('Telecommunications'),('Textiles'),('Tourism/Travel'),('Training/Education'),('Transport'),('Veterinary Science'),('Water Treatment'),('Web Pages'),('Zoology');


INSERT INTO `papertask`.`ProfileServiceTranslationTM` (`template`, `rate`) VALUES ('Repetitions', '0.1');
INSERT INTO `papertask`.`ProfileServiceTranslationTM` (`template`, `rate`) VALUES ('100%', '0.1');
INSERT INTO `papertask`.`ProfileServiceTranslationTM` (`template`, `rate`) VALUES ('95%-99%', '0.1');
INSERT INTO `papertask`.`ProfileServiceTranslationTM` (`template`, `rate`) VALUES ('85%-94%', '0.5');
INSERT INTO `papertask`.`ProfileServiceTranslationTM` (`template`, `rate`) VALUES ('75%-84%', '0.5');
INSERT INTO `papertask`.`ProfileServiceTranslationTM` (`template`, `rate`) VALUES ('50%-74%', '1');
INSERT INTO `papertask`.`ProfileServiceTranslationTM` (`template`, `rate`) VALUES ('No Match', '1');

INSERT INTO `papertask`.`LanguageGroup` (`name`) VALUES ('European/CE/Greek/Russian');
INSERT INTO `papertask`.`LanguageGroup` (`name`) VALUES ('SC/TC/JP/KO');
INSERT INTO `papertask`.`LanguageGroup` (`name`) VALUES ('TH/VN');
INSERT INTO `papertask`.`LanguageGroup` (`name`) VALUES ('Others');

INSERT INTO `papertask`.`Unit` (`name`) VALUES ('Hour');
INSERT INTO `papertask`.`Unit` (`name`) VALUES ('Day');
INSERT INTO `papertask`.`Unit` (`name`) VALUES ('Month');
INSERT INTO `papertask`.`Unit` (`name`) VALUES ('Word');
INSERT INTO `papertask`.`Unit` (`name`) VALUES ('Graphic');
INSERT INTO `papertask`.`Unit` (`name`) VALUES ('Page');

INSERT INTO `papertask`.`EngineeringCategory` (`category`) VALUES ('Engineering');
INSERT INTO `papertask`.`EngineeringCategory` (`category`) VALUES ('Testing');
INSERT INTO `papertask`.`EngineeringCategory` (`category`) VALUES ('Graphic');
INSERT INTO `papertask`.`EngineeringCategory` (`category`) VALUES ('Typing');

INSERT INTO `papertask`.`InterpretingService` (`name`) VALUES ('Simultaneous');
INSERT INTO `papertask`.`InterpretingService` (`name`) VALUES ('Consecutive');
INSERT INTO `papertask`.`InterpretingService` (`name`) VALUES ('Business');
INSERT INTO `papertask`.`InterpretingService` (`name`) VALUES ('Tourist');

INSERT INTO `papertask`.`Rating` (`value`, `name`) VALUES (1, 'B-');
INSERT INTO `papertask`.`Rating` (`value`, `name`) VALUES (2, 'B');
INSERT INTO `papertask`.`Rating` (`value`, `name`) VALUES (3, 'B+');
INSERT INTO `papertask`.`Rating` (`value`, `name`) VALUES (4, 'A-');
INSERT INTO `papertask`.`Rating` (`value`, `name`) VALUES (5, 'A');
INSERT INTO `papertask`.`Rating` (`value`, `name`) VALUES (6, 'A+');

INSERT INTO `papertask`.`Country`(id,name) VALUES (1,'Zambia');
INSERT INTO `papertask`.`Country`(id,name) VALUES (2,'Zaire');
INSERT INTO `papertask`.`Country`(id,name) VALUES (3,'Zimbabwe');
INSERT INTO `papertask`.`Country`(id,name) VALUES (35,'South Africa');
INSERT INTO `papertask`.`Country`(id,name) VALUES (5,'Yugoslavia');
INSERT INTO `papertask`.`Country`(id,name) VALUES (6,'Yemen');
INSERT INTO `papertask`.`Country`(id,name) VALUES (7,'Vietnam');
INSERT INTO `papertask`.`Country`(id,name) VALUES (8,'Uzbekistan');
INSERT INTO `papertask`.`Country`(id,name) VALUES (9,'Uruguay');
INSERT INTO `papertask`.`Country`(id,name) VALUES (10,'United States of America');
INSERT INTO `papertask`.`Country`(id,name) VALUES (11,'United Kingdom');
INSERT INTO `papertask`.`Country`(id,name) VALUES (12,'United Arab Emirates');
INSERT INTO `papertask`.`Country`(id,name) VALUES (13,'Ukraine');
INSERT INTO `papertask`.`Country`(id,name) VALUES (14,'Uganda');
INSERT INTO `papertask`.`Country`(id,name) VALUES (15,'Turkmenistan');
INSERT INTO `papertask`.`Country`(id,name) VALUES (16,'Turkey');
INSERT INTO `papertask`.`Country`(id,name) VALUES (17,'Tunisia');
INSERT INTO `papertask`.`Country`(id,name) VALUES (18,'Trinidad and Tobago');
INSERT INTO `papertask`.`Country`(id,name) VALUES (19,'Tonga');
INSERT INTO `papertask`.`Country`(id,name) VALUES (20,'Togo');
INSERT INTO `papertask`.`Country`(id,name) VALUES (21,'Thailand');
INSERT INTO `papertask`.`Country`(id,name) VALUES (22,'Tanzania');
INSERT INTO `papertask`.`Country`(id,name) VALUES (23,'Tajikstan');
INSERT INTO `papertask`.`Country`(id,name) VALUES (24,'Taiwan (China)');
INSERT INTO `papertask`.`Country`(id,name) VALUES (25,'Syria');
INSERT INTO `papertask`.`Country`(id,name) VALUES (26,'Switzerland');
INSERT INTO `papertask`.`Country`(id,name) VALUES (27,'Sweden');
INSERT INTO `papertask`.`Country`(id,name) VALUES (28,'Swaziland');
INSERT INTO `papertask`.`Country`(id,name) VALUES (29,'Suriname');
INSERT INTO `papertask`.`Country`(id,name) VALUES (30,'Sudan');
INSERT INTO `papertask`.`Country`(id,name) VALUES (31,'St.Vincent');
INSERT INTO `papertask`.`Country`(id,name) VALUES (32,'St.Lucia');
INSERT INTO `papertask`.`Country`(id,name) VALUES (33,'Sri Lanka');
INSERT INTO `papertask`.`Country`(id,name) VALUES (34,'Spain');
INSERT INTO `papertask`.`Country`(id,name) VALUES (36,'Somali');
INSERT INTO `papertask`.`Country`(id,name) VALUES (37,'Solomon Is');
INSERT INTO `papertask`.`Country`(id,name) VALUES (38,'Slovenia');
INSERT INTO `papertask`.`Country`(id,name) VALUES (39,'Slovakia');
INSERT INTO `papertask`.`Country`(id,name) VALUES (40,'Singapore');
INSERT INTO `papertask`.`Country`(id,name) VALUES (41,'Sierra Leone');
INSERT INTO `papertask`.`Country`(id,name) VALUES (42,'Seychelles');
INSERT INTO `papertask`.`Country`(id,name) VALUES (43,'Senegal');
INSERT INTO `papertask`.`Country`(id,name) VALUES (44,'Saudi Arabia');
INSERT INTO `papertask`.`Country`(id,name) VALUES (45,'Sao Tome and Principe');
INSERT INTO `papertask`.`Country`(id,name) VALUES (46,'San Marino');
INSERT INTO `papertask`.`Country`(id,name) VALUES (47,'Samoa Western');
INSERT INTO `papertask`.`Country`(id,name) VALUES (48,'Samoa Eastern');
INSERT INTO `papertask`.`Country`(id,name) VALUES (49,'Saint Vincent');
INSERT INTO `papertask`.`Country`(id,name) VALUES (50,'Saint Lueia');
INSERT INTO `papertask`.`Country`(id,name) VALUES (51,'Russia');
INSERT INTO `papertask`.`Country`(id,name) VALUES (52,'Romania');
INSERT INTO `papertask`.`Country`(id,name) VALUES (53,'Reunion');
INSERT INTO `papertask`.`Country`(id,name) VALUES (54,'Qatar');
INSERT INTO `papertask`.`Country`(id,name) VALUES (55,'PuertoRico');
INSERT INTO `papertask`.`Country`(id,name) VALUES (56,'Portugal');
INSERT INTO `papertask`.`Country`(id,name) VALUES (57,'French Polynesia');
INSERT INTO `papertask`.`Country`(id,name) VALUES (58,'Poland');
INSERT INTO `papertask`.`Country`(id,name) VALUES (59,'Philippines');
INSERT INTO `papertask`.`Country`(id,name) VALUES (60,'Peru');
INSERT INTO `papertask`.`Country`(id,name) VALUES (61,'Paraguay');
INSERT INTO `papertask`.`Country`(id,name) VALUES (62,'Papua New Cuinea');
INSERT INTO `papertask`.`Country`(id,name) VALUES (63,'Panama');
INSERT INTO `papertask`.`Country`(id,name) VALUES (64,'Pakistan');
INSERT INTO `papertask`.`Country`(id,name) VALUES (65,'Oman');
INSERT INTO `papertask`.`Country`(id,name) VALUES (66,'Norway');
INSERT INTO `papertask`.`Country`(id,name) VALUES (67,'North Korea');
INSERT INTO `papertask`.`Country`(id,name) VALUES (68,'Nigeria');
INSERT INTO `papertask`.`Country`(id,name) VALUES (69,'Niger');
INSERT INTO `papertask`.`Country`(id,name) VALUES (70,'Nicaragua');
INSERT INTO `papertask`.`Country`(id,name) VALUES (71,'NewZealand');
INSERT INTO `papertask`.`Country`(id,name) VALUES (72,'Netherlands');
INSERT INTO `papertask`.`Country`(id,name) VALUES (73,'Netheriands Antilles');
INSERT INTO `papertask`.`Country`(id,name) VALUES (74,'Nepal');
INSERT INTO `papertask`.`Country`(id,name) VALUES (75,'Nauru');
INSERT INTO `papertask`.`Country`(id,name) VALUES (76,'Namibia');
INSERT INTO `papertask`.`Country`(id,name) VALUES (77,'Mozambique');
INSERT INTO `papertask`.`Country`(id,name) VALUES (78,'Morocco');
INSERT INTO `papertask`.`Country`(id,name) VALUES (79,'Montserrat Is');
INSERT INTO `papertask`.`Country`(id,name) VALUES (80,'Mongolia');
INSERT INTO `papertask`.`Country`(id,name) VALUES (81,'Monaco');
INSERT INTO `papertask`.`Country`(id,name) VALUES (82,'Moldova, Republic of');
INSERT INTO `papertask`.`Country`(id,name) VALUES (83,'Mexico');
INSERT INTO `papertask`.`Country`(id,name) VALUES (84,'Mauritius');
INSERT INTO `papertask`.`Country`(id,name) VALUES (85,'Martinique');
INSERT INTO `papertask`.`Country`(id,name) VALUES (86,'Mariana Is');
INSERT INTO `papertask`.`Country`(id,name) VALUES (87,'Malta');
INSERT INTO `papertask`.`Country`(id,name) VALUES (88,'Mali');
INSERT INTO `papertask`.`Country`(id,name) VALUES (89,'Maldives');
INSERT INTO `papertask`.`Country`(id,name) VALUES (90,'Malaysia');
INSERT INTO `papertask`.`Country`(id,name) VALUES (91,'Malawi');
INSERT INTO `papertask`.`Country`(id,name) VALUES (92,'Madagascar');
INSERT INTO `papertask`.`Country`(id,name) VALUES (93,'Macao (China)');
INSERT INTO `papertask`.`Country`(id,name) VALUES (94,'Luxembourg');
INSERT INTO `papertask`.`Country`(id,name) VALUES (95,'Lithuania');
INSERT INTO `papertask`.`Country`(id,name) VALUES (96,'Liechtenstein');
INSERT INTO `papertask`.`Country`(id,name) VALUES (97,'Libya');
INSERT INTO `papertask`.`Country`(id,name) VALUES (98,'Liberia');
INSERT INTO `papertask`.`Country`(id,name) VALUES (99,'Lesotho');
INSERT INTO `papertask`.`Country`(id,name) VALUES (100,'Lebanon');
INSERT INTO `papertask`.`Country`(id,name) VALUES (101,'Latvia');
INSERT INTO `papertask`.`Country`(id,name) VALUES (102,'Laos');
INSERT INTO `papertask`.`Country`(id,name) VALUES (103,'Kyrgyzstan');
INSERT INTO `papertask`.`Country`(id,name) VALUES (104,'Kuwait');
INSERT INTO `papertask`.`Country`(id,name) VALUES (105,'Korea');
INSERT INTO `papertask`.`Country`(id,name) VALUES (106,'Kenya');
INSERT INTO `papertask`.`Country`(id,name) VALUES (107,'Kazakstan');
INSERT INTO `papertask`.`Country`(id,name) VALUES (108,'Kampuchea (Cambodia)');
INSERT INTO `papertask`.`Country`(id,name) VALUES (109,'Jordan');
INSERT INTO `papertask`.`Country`(id,name) VALUES (110,'Japan');
INSERT INTO `papertask`.`Country`(id,name) VALUES (111,'Jamaica');
INSERT INTO `papertask`.`Country`(id,name) VALUES (112,'IvoryCoast');
INSERT INTO `papertask`.`Country`(id,name) VALUES (113,'Italy');
INSERT INTO `papertask`.`Country`(id,name) VALUES (114,'Israel');
INSERT INTO `papertask`.`Country`(id,name) VALUES (115,'Ireland');
INSERT INTO `papertask`.`Country`(id,name) VALUES (116,'Iraq');
INSERT INTO `papertask`.`Country`(id,name) VALUES (117,'Iran');
INSERT INTO `papertask`.`Country`(id,name) VALUES (118,'Indonesia');
INSERT INTO `papertask`.`Country`(id,name) VALUES (119,'India');
INSERT INTO `papertask`.`Country`(id,name) VALUES (120,'Iceland');
INSERT INTO `papertask`.`Country`(id,name) VALUES (121,'Hungary');
INSERT INTO `papertask`.`Country`(id,name) VALUES (122,'Hongkong (China)');
INSERT INTO `papertask`.`Country`(id,name) VALUES (123,'Honduras');
INSERT INTO `papertask`.`Country`(id,name) VALUES (124,'Haiti');
INSERT INTO `papertask`.`Country`(id,name) VALUES (125,'Guyana');
INSERT INTO `papertask`.`Country`(id,name) VALUES (126,'Guinea');
INSERT INTO `papertask`.`Country`(id,name) VALUES (127,'Guatemala');
INSERT INTO `papertask`.`Country`(id,name) VALUES (128,'Guam');
INSERT INTO `papertask`.`Country`(id,name) VALUES (129,'Grenada');
INSERT INTO `papertask`.`Country`(id,name) VALUES (130,'Greece');
INSERT INTO `papertask`.`Country`(id,name) VALUES (131,'Gibraltar');
INSERT INTO `papertask`.`Country`(id,name) VALUES (132,'Ghana');
INSERT INTO `papertask`.`Country`(id,name) VALUES (133,'Germany');
INSERT INTO `papertask`.`Country`(id,name) VALUES (134,'Georgia');
INSERT INTO `papertask`.`Country`(id,name) VALUES (135,'Gambia');
INSERT INTO `papertask`.`Country`(id,name) VALUES (136,'Gabon');
INSERT INTO `papertask`.`Country`(id,name) VALUES (137,'French Guiana');
INSERT INTO `papertask`.`Country`(id,name) VALUES (138,'France');
INSERT INTO `papertask`.`Country`(id,name) VALUES (139,'Finland');
INSERT INTO `papertask`.`Country`(id,name) VALUES (140,'Fiji');
INSERT INTO `papertask`.`Country`(id,name) VALUES (141,'Ethiopia');
INSERT INTO `papertask`.`Country`(id,name) VALUES (142,'Estonia');
INSERT INTO `papertask`.`Country`(id,name) VALUES (143,'EISalvador');
INSERT INTO `papertask`.`Country`(id,name) VALUES (144,'Egypt');
INSERT INTO `papertask`.`Country`(id,name) VALUES (145,'Ecuador');
INSERT INTO `papertask`.`Country`(id,name) VALUES (146,'Dominica Rep.');
INSERT INTO `papertask`.`Country`(id,name) VALUES (147,'Djibouti');
INSERT INTO `papertask`.`Country`(id,name) VALUES (148,'Denmark');
INSERT INTO `papertask`.`Country`(id,name) VALUES (149,'Czech Republic');
INSERT INTO `papertask`.`Country`(id,name) VALUES (150,'Cyprus');
INSERT INTO `papertask`.`Country`(id,name) VALUES (151,'Cuba');
INSERT INTO `papertask`.`Country`(id,name) VALUES (152,'Costa Rica');
INSERT INTO `papertask`.`Country`(id,name) VALUES (153,'Cook Is.');
INSERT INTO `papertask`.`Country`(id,name) VALUES (154,'Congo');
INSERT INTO `papertask`.`Country`(id,name) VALUES (155,'Colombia');
INSERT INTO `papertask`.`Country`(id,name) VALUES (156,'China');
INSERT INTO `papertask`.`Country`(id,name) VALUES (157,'Chile');
INSERT INTO `papertask`.`Country`(id,name) VALUES (158,'Chad');
INSERT INTO `papertask`.`Country`(id,name) VALUES (159,'Central African Republic');
INSERT INTO `papertask`.`Country`(id,name) VALUES (160,'Cayman Is.');
INSERT INTO `papertask`.`Country`(id,name) VALUES (161,'Canada');
INSERT INTO `papertask`.`Country`(id,name) VALUES (162,'Cameroon');
INSERT INTO `papertask`.`Country`(id,name) VALUES (163,'Burundi');
INSERT INTO `papertask`.`Country`(id,name) VALUES (164,'Burma');
INSERT INTO `papertask`.`Country`(id,name) VALUES (165,'Burkina-faso');
INSERT INTO `papertask`.`Country`(id,name) VALUES (166,'Bulgaria');
INSERT INTO `papertask`.`Country`(id,name) VALUES (167,'Brunei');
INSERT INTO `papertask`.`Country`(id,name) VALUES (168,'Brazil');
INSERT INTO `papertask`.`Country`(id,name) VALUES (169,'Botswana');
INSERT INTO `papertask`.`Country`(id,name) VALUES (170,'Bolivia');
INSERT INTO `papertask`.`Country`(id,name) VALUES (171,'Bermuda Is.');
INSERT INTO `papertask`.`Country`(id,name) VALUES (172,'Benin');
INSERT INTO `papertask`.`Country`(id,name) VALUES (173,'Belize');
INSERT INTO `papertask`.`Country`(id,name) VALUES (174,'Belgium');
INSERT INTO `papertask`.`Country`(id,name) VALUES (175,'Belarus');
INSERT INTO `papertask`.`Country`(id,name) VALUES (176,'Barbados');
INSERT INTO `papertask`.`Country`(id,name) VALUES (177,'Bangladesh');
INSERT INTO `papertask`.`Country`(id,name) VALUES (178,'Bahrain');
INSERT INTO `papertask`.`Country`(id,name) VALUES (179,'Bahamas');
INSERT INTO `papertask`.`Country`(id,name) VALUES (180,'Azerbaijan');
INSERT INTO `papertask`.`Country`(id,name) VALUES (181,'Austria');
INSERT INTO `papertask`.`Country`(id,name) VALUES (182,'Australia');
INSERT INTO `papertask`.`Country`(id,name) VALUES (183,'Ascension');
INSERT INTO `papertask`.`Country`(id,name) VALUES (184,'Armenia');
INSERT INTO `papertask`.`Country`(id,name) VALUES (185,'Argentina');
INSERT INTO `papertask`.`Country`(id,name) VALUES (186,'Antigua and Barbuda');
INSERT INTO `papertask`.`Country`(id,name) VALUES (187,'Anguilla');
INSERT INTO `papertask`.`Country`(id,name) VALUES (188,'Andorra');
INSERT INTO `papertask`.`Country`(id,name) VALUES (189,'Algeria');
INSERT INTO `papertask`.`Country`(id,name) VALUES (190,'Albania');
INSERT INTO `papertask`.`Country`(id,name) VALUES (191,'Afghanistan');
INSERT INTO `papertask`.`Country`(id,name) VALUES (192,'Angola');

INSERT INTO `papertask`.`roles` (`id`, `type`, `subtype`) VALUES ('1', 'Admin', NULL), ('2', 'General Manager', '1');
INSERT INTO `papertask`.`roles` (`id`, `type`, `subtype`) VALUES ('3', 'Financial Manager', NULL);
INSERT INTO `papertask`.`roles` (`id`, `type`, `subtype`) VALUES ('4', 'Sales Director', NULL), ('5', 'Sales', '4');
INSERT INTO `papertask`.`roles` (`id`, `type`, `subtype`) VALUES ('6', 'Operation Manager', NULL), ('7', 'Project Manager', '6');

INSERT INTO `papertask`.`roles` (`id`, `type`, `subtype`) VALUES ('8', 'Admin', NULL);
INSERT INTO `papertask`.`roles` (`id`, `type`, `subtype`) VALUES ('9', 'Financial Manager', NULL);
INSERT INTO `papertask`.`roles` (`id`, `type`, `subtype`) VALUES ('10', 'Sales Director', NULL);
INSERT INTO `papertask`.`roles` (`id`, `type`, `subtype`) VALUES ('11', 'Operation Manager', NULL);

INSERT INTO `papertask`.`profileservice` (`id`, `name`, `currencyRate`) VALUES ('1', 'CNY', 6.3);

INSERT INTO `papertask`.`profileinfo` (`id`, `name`, `telephone`, `fax`, `address`, `city`, `country`, `website`, `note`) VALUES ('1', 'PaperTask', '090002323', '090002323', 'dsadadsadad', 'dasdada', 'dadadad', 'dsada', 'ddsdcc');
INSERT INTO `papertask`.`profileinfo` (`id`, `name`, `telephone`, `fax`, `address`, `city`, `country`, `website`, `note`) VALUES ('2', 'PaperTask', '090002323', '090002323', 'dsadadsadad', 'dasdada', 'dadadad', 'dsada', 'ddsdcc');

INSERT INTO `papertask`.`profilebank` (`id`, `account`, `address`, `city`, `country`, `swift`, `name`, `accountNo`, `routingNumber`) 
VALUES ('1', '', 'Shops 110-120, 1/F Emperor Group Centre, 288 Hennessy Road', 'Wanchai', 'Hong Kong', 'HSBCHKHHHKH', 'HSBC Hong Kong', '', '');

INSERT INTO `papertask`.`Style`(`name`,`name_cn`) 
VALUES ('Contract and certificate','�X�P�M??'),('Business documents','��?���'),('Instructions & manuals','�ϥ�?���M��?'),('Reports','?�i'),('Localization','���g��'),('Comprehensive documents','?�X�ʤ��'),('Personal documents','?�H��?');

INSERT INTO `EmailTemplates` (`id`,`type_id`,`subject`,`content`,`language`) VALUES (1,1,'Welcome you to Papertask!','<h4 style=\"color: rgb(103, 106, 108);\">Hello {{lastName}}, {{firstName}}!</h4><span style=\"line-height: 18.5714302062988px;\">Welcome to PaperTask!?</span><div><div><br style=\"line-height: 18.5714302062988px;\"><span style=\"line-height: 18.5714302062988px;\">If you need help or have any questions, please visit?</span><a href=\"http://www.papertask.com/\" style=\"line-height: 18.5714302062988px; background-color: rgb(255, 255, 255);\">http://www.papertask.com</a><br style=\"line-height: 18.5714302062988px;\"><br style=\"line-height: 18.5714302062988px;\"><span style=\"line-height: 18.5714302062988px;\">Thanks!</span><br style=\"line-height: 18.5714302062988px;\"><span style=\"line-height: 18.5714302062988px;\">PaperTask?</span></div></div>',0);
INSERT INTO `EmailTemplates` (`id`,`type_id`,`subject`,`content`,`language`) VALUES (2,2,'Please confirm your PaperTask account!','<h4 style=\"color: rgb(103, 106, 108);\">Hello {{lastName}}, {{firstName}}!</h4><h4 style=\"color: rgb(103, 106, 108);\"><span style=\"font-family: \'open sans\', \'Helvetica Neue\', Helvetica, Arial, sans-serif; font-size: 13px; line-height: 18.5714302062988px;\">Welcome to PaperTask!?</span><br style=\"font-family: \'open sans\', \'Helvetica Neue\', Helvetica, Arial, sans-serif; font-size: 13px; line-height: 18.5714302062988px;\"><br style=\"font-family: \'open sans\', \'Helvetica Neue\', Helvetica, Arial, sans-serif; font-size: 13px; line-height: 18.5714302062988px;\"><span style=\"font-family: \'open sans\', \'Helvetica Neue\', Helvetica, Arial, sans-serif; font-size: 13px; line-height: 18.5714302062988px;\">Could you please click?</span><a href=\"http://%22.%24host.%22/\" style=\"font-family: \'open sans\', \'Helvetica Neue\', Helvetica, Arial, sans-serif; font-size: 13px; line-height: 18.5714302062988px; background-color: rgb(255, 255, 255);\"><strong>HERE</strong></a><span style=\"font-family: \'open sans\', \'Helvetica Neue\', Helvetica, Arial, sans-serif; font-size: 13px; line-height: 18.5714302062988px;\">?or the link below to verify that this is your email address??</span><br style=\"font-family: \'open sans\', \'Helvetica Neue\', Helvetica, Arial, sans-serif; font-size: 13px; line-height: 18.5714302062988px;\"><br style=\"font-family: \'open sans\', \'Helvetica Neue\', Helvetica, Arial, sans-serif; font-size: 13px; line-height: 18.5714302062988px;\"><span style=\"font-family: \'open sans\', \'Helvetica Neue\', Helvetica, Arial, sans-serif; font-size: 13px; line-height: 18.5714302062988px;\">{{link}}</span><br style=\"font-family: \'open sans\', \'Helvetica Neue\', Helvetica, Arial, sans-serif; font-size: 13px; line-height: 18.5714302062988px;\"><br style=\"font-family: \'open sans\', \'Helvetica Neue\', Helvetica, Arial, sans-serif; font-size: 13px; line-height: 18.5714302062988px;\"><span style=\"font-family: \'open sans\', \'Helvetica Neue\', Helvetica, Arial, sans-serif; font-size: 13px; line-height: 18.5714302062988px;\">If you need help or have any questions, please visit?</span><a href=\"http://www.papertask.com/\" style=\"font-family: \'open sans\', \'Helvetica Neue\', Helvetica, Arial, sans-serif; font-size: 13px; line-height: 18.5714302062988px; background-color: rgb(255, 255, 255);\">http://www.papertask.com</a><br style=\"font-family: \'open sans\', \'Helvetica Neue\', Helvetica, Arial, sans-serif; font-size: 13px; line-height: 18.5714302062988px;\"><br style=\"font-family: \'open sans\', \'Helvetica Neue\', Helvetica, Arial, sans-serif; font-size: 13px; line-height: 18.5714302062988px;\"><span style=\"font-family: \'open sans\', \'Helvetica Neue\', Helvetica, Arial, sans-serif; font-size: 13px; line-height: 18.5714302062988px;\">Thanks!</span><br style=\"font-family: \'open sans\', \'Helvetica Neue\', Helvetica, Arial, sans-serif; font-size: 13px; line-height: 18.5714302062988px;\"><span style=\"font-family: \'open sans\', \'Helvetica Neue\', Helvetica, Arial, sans-serif; font-size: 13px; line-height: 18.5714302062988px;\">PaperTask?</span><br></h4>',0);
INSERT INTO `EmailTemplates` (`id`,`type_id`,`subject`,`content`,`language`) VALUES (3,3,'Please reset your PaperTask password!','<h4 style=\"color: rgb(103, 106, 108);\">Hello {{lastName}}, {{firstName}}!</h4><span style=\"line-height: 18.5714302062988px;\">PaperTask receive a request to reset the password of your account. Please click?</span><a href=\"http://%22.%24host.%22/\" style=\"line-height: 18.5714302062988px; background-color: rgb(255, 255, 255);\"><strong>HERE</strong></a><span style=\"line-height: 18.5714302062988px;\">?or the link below to reset your password.?</span><br style=\"line-height: 18.5714302062988px;\"><br style=\"line-height: 18.5714302062988px;\">{{link}}<br style=\"line-height: 18.5714302062988px;\"><br style=\"line-height: 18.5714302062988px;\"><span style=\"line-height: 18.5714302062988px;\">If you need help or have any questions, please visit?</span><a href=\"http://www.papertask.com/\" style=\"line-height: 18.5714302062988px; background-color: rgb(255, 255, 255);\">http://www.papertask.com</a><br style=\"line-height: 18.5714302062988px;\"><br style=\"line-height: 18.5714302062988px;\"><span style=\"line-height: 18.5714302062988px;\">Thanks!</span><br style=\"line-height: 18.5714302062988px;\"><span style=\"line-height: 18.5714302062988px;\">PaperTask?</span>',0);
INSERT INTO `EmailTemplates` (`id`,`type_id`,`subject`,`content`,`language`) VALUES (4,4,'Update on your project','<h4 style=\"color: rgb(103, 106, 108);\"><span style=\"font-family: \'open sans\', \'Helvetica Neue\', \'Microsoft YaHei\', Helvetica, Arial, sans-serif; font-size: 13px; line-height: 18.5714302062988px;\">PaperTask project that you\'re involved in is updated. Please click&nbsp;</span><a href=\"{{projectLink}}\" style=\"font-family: \'open sans\', \'Helvetica Neue\', \'Microsoft YaHei\', Helvetica, Arial, sans-serif; font-size: 13px; line-height: 18.5714302062988px; background-color: rgb(255, 255, 255);\"><strong>HERE</strong></a><span style=\"font-family: \'open sans\', \'Helvetica Neue\', \'Microsoft YaHei\', Helvetica, Arial, sans-serif; font-size: 13px; line-height: 18.5714302062988px;\">&nbsp;or the link below to see the latest updates.&nbsp;</span><br></h4><br style=\"line-height: 18.5714302062988px;\">{{projectLink}}<br style=\"line-height: 18.5714302062988px;\"><br style=\"line-height: 18.5714302062988px;\"><span style=\"line-height: 18.5714302062988px;\">If you need help or have any questions, please visit&nbsp;</span><a href=\"http://www.papertask.com/\" style=\"line-height: 18.5714302062988px; background-color: rgb(255, 255, 255);\">http://www.papertask.com</a><br style=\"line-height: 18.5714302062988px;\"><br style=\"line-height: 18.5714302062988px;\"><span style=\"line-height: 18.5714302062988px;\">Thanks!</span><br style=\"line-height: 18.5714302062988px;\"><span style=\"line-height: 18.5714302062988px;\">PaperTask&nbsp;</span>',0);



