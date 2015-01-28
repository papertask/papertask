<?php

$allow_all = array(
	// Static pages
	'index\index',
	'index\home',
	'index\languages',
	'index\freelancer',
	'index\contact',
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
	'forgotpassword\index',
	'login\social',
	'register\index',
	'register\employer',
	'register\freelancer',
	'logout\index',

	// Dashboard Panel
	'dashboard\index',
	// -- Task
	'task\index',
	// -- Project
	'project\index',
	'project\new',
	'project\quote', // Quotes in menu
	// -- Freelancer
	'freelancer\index',
	'freelancer\new',
	'freelancer\detail',
	'freelancer\edit-profile',
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
	// -- Email
	'email\index',
	'email\new',
	// -- Profile
	'papertask\profile',
	// -- API
	'api/common',
	'api/user',
	'api/data',
	'api/admin',
	'api/papertask',
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
		'home',
		'languages',
		'freelancer',
		'contact',
		'order',
		'privacy',
		'terms',

		// Login & Register
		'login\index',
		'forgotpassword\index',
		'login\social',
		'logout\index',
		'register\index',
		'register\employer',
		'register\freelancer',
    ),
	'Freelancer'=> $allow_all,
	'Employer'=> $allow_all,
    'Admin'=> $allow_all,
);
