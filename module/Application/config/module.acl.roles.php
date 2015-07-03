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
	'resetpassword\index',

	// Dashboard Panel
	'dashboard\index',
	'dashboard\client-dashboard',
	'dashboard\freelancer-dashboard',
	// -- Task
	'task\index',
	'task\detail',
	'task\freelancer-task-view',
	'task\getFreelancerTaskList',
	'task\FreelancerAcceptTask',
	'task\submitTask',
	'task\task-pool',
	'task\getTaskPoolList',
	'task\freelancer-unpaid-task',
		
	// -- Project
	'project\index',
	'project\new',
	'project\quote', // Quotes in menu
	'project\detail', // Quotes in menu
	'project\uploadFile',
	'project\quoteprint',
	'project\quotedownload',
	'project\invoiceprint',
	'project\invoicedownload',
	'project\quoteedit',
	'project\order-translation',
	'project\order-translation-non-contract',
	'project\client-projects',
	'project\client-ongoing-projects',
	'project\client-review-projects',
	'project\client-completed-projects',
	'project\client-quotes',
	'project\quote-detail',
	'project\wordcount',
	'project\uploadtemp',
	
	
	// -- Freelancer
	'freelancer\index',
	'freelancer\download',
	
	'freelancer\new',
	'freelancer\detail',
	'freelancer\edit-profile',
	'freelancer\uploadFile',
	'freelancer\getFreelancesList',
	'freelancer\edit-payment-info',
	'freelancer\edit-price',
	'freelancer\finishRegistration',
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
	//finance
	'finance\client-unpaid',
	'finance\freelancer-unpaid',
	'finance\add-incomming',
	'finance\add-outgoing',
	'finance\getProjectUnpaidList',
	'finance\getTaskUnpaidList',
	'finance\getClientUnpaid',
	'finance\getFreelancerUnpaid',
	'finance\transaction',
	'finance\report',
	'finance\getTransactionList',
	'finance\incomming-detail',
	'finance\outgoing-detail',
	'finance\getTransaction',
	'finance\getTransactionTask',
	
	'finance\searchProjectUnpaidList',
	'finance\advsearchProjectUnpaidList',
	'finance\freelancer-transaction',
	'finance\getFreelancerOutTransactionList',
	'finance\freelancer-unpaid-task',
	
	// -- Email
	'email\index',
	'email\new',
	'email\edit',
	'email\loadTemplate',
	'email\check',
	// -- Profile
	'papertask\profile',
	// -- API
	'api/common',
	'api/user',
	'api/data',
	'api/admin',
	'api/papertask',
	'api/companyinfo',
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
    		
    	// Project Order	
    	'project',
    	'project/uploadFile',
		
    	'admin',
    	'admin/project',
    	'admin/project/wordcount',
    	'project/wordcount',
    		
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
    	'api/data',
    	'api/admin',
     		
     	// Landing
		'landing/file',
     		'file/wordcount',
    ),
	'Freelancer'=> $allow_all,
	'Employer'=> $allow_all,
    'Admin'=> $allow_all,
);
