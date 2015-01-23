<?php

$allow_all = array(
	// Static pages
	'index\index',
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
	// -- Employer (Client)
	'employer\list',
	'employer\new',
	'employer\profile',
	// -- Staff
	'staff\index',
	'staff\new',
	// -- Email
	'email\index',
	'email\new',
	// -- Profile
	'papertask\profile',
);

return array(
    'Guest'=> array(
        // Static pages
		'index\index',
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
    ),
	'Freelancer'=> $allow_all,
	'Employer'=> $allow_all,
    'Admin'=> $allow_all,
);

