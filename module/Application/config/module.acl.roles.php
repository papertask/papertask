<?php

$allow_all = array(
	// Static pages
	'index\index',
	'index\home',
	'index\languages',
	'index\freelancer',
	'index\contact',

	'index\contact-post',

	'index\order',
	'index\privacy',
	'index\terms',
	'home',
	'languages',
	'freelancer',
	'contact',
	'order',
	'privacy',
	'terms',

	// Login & Register
	'login\index',
	'login\form',
	'forgotpassword\index',
	'forgotpassword\reset',
	'forgotpassword\resetpassword',
	'login\social',
	'logout\index',
	'register\index',
	'register\confirm',
	'register\social',
	'register\employer',
	'register\freelancer',

	// Dashboard Panel
	'dashboard\index',
	// -- Task
	'task\index',
	// -- Project
	'project\index',
	'project\new',
	'project\quote', // Quotes in menu
	'project\detail', // Quotes in menu
	'project\uploadFile',
	// -- Freelancer
	'freelancer\index',
	'freelancer\new',
	'freelancer\detail',
	'freelancer\edit-profile',
	'freelancer\uploadFile',
	// -- Employer (Client)
	'employer\list',
	'employer\new',
	'employer\profile',
	'employer\detail',
	'employer\edit',
	// -- Staff
	'staff\index',
	'staff\new',
	'staff\getPmList',
	'staff\getSalesList',
	'staff\view',
	'staff\edit-profile',
	'staff\uploadFile',
	// -- Email
	'email\index',
	'email\new',
	'email\edit',
	'email\loadTemplate',
	// -- Profile
	'papertask\profile',
	// -- API
	'api/common',
	'api/user',
	'api/data',
	'api/admin',
	'api/papertask',
	'api/user_child',
);

return array(
    'Guest'=> array(
        // Static pages
		'index\index',
		'index\home',
		'index\languages',
		'index\freelancer',
		'index\contact',
		'index\order',
		'index\privacy',
		'index\terms',
		'index\contact-post',
		'home',
		'languages',
		'freelancer',
		'contact',
		'order',
		'privacy',
		'terms',

		// Login & Register
		'login\index',
		'login\form',
		'forgotpassword\index',
		'forgotpassword\reset',
		'forgotpassword\resetpassword',
		'login\social',
		'logout\index',
		'register\index',
		'register\confirm',
		'register\social',
		'register\employer',
		'register\freelancer',

		// API
		'api/common',
		'api/papertask',
    ),
	'Freelancer'=> $allow_all,
	'Employer'=> $allow_all,
    'Admin'=> $allow_all,
);
