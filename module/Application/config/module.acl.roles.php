<?php
$allow_employer = array(
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
	'dashboard\client-dashboard',

	// -- Task

	//'task\detail',
	'task\getFreelancerTaskList',
	'task\FreelancerAcceptTask',
	'task\submitTask',
	'task\getTaskPoolList',
	'task\freelancer-unpaid-task',
		'task\getFreelancerAssigningTaskList',

	// -- Project

	'project\detail', // Quotes in menu
	'project\uploadFile',
	'project\quoteprint',
	'project\quotedownload',
	'project\invoiceprint',
	'project\invoicedownload',
	'project\order-translation',
	'project\need-quote',
	'project\order-translation-non-contract',
	'project\client-projects',
	'project\client-ongoing-projects',
	'project\client-review-projects',
	'project\client-completed-projects',
	'project\client-quotes',
	'project\quote-detail',
	'project\wordcount',
	'project\uploadtemp',
	'project\getClientProjectList',

	// -- Quote
	'quote\index',
	'project\index',

	// -- Freelancer
	'freelancer\download',

	'freelancer\new',
	'freelancer\uploadFile',
	'freelancer\getFreelancesList',
	'freelancer\finishRegistration',
	'freelancer\getuserbyfreelancerid',

	// -- Employer (Client)
	'employer\profile',
	'employer\detail',
	'employer\edit',
	'employer\removeResource',
	'employer\addResource',
	// -- Staff
	'staff\getPmList',
	'staff\getSalesList',
	'staff\view',
	'staff\uploadFile',
	//finance
	'finance\client-unpaid-project',
	'finance\add-incomming',
	'finance\add-outgoing',
	'finance\getProjectUnpaidList',
	'finance\getTaskUnpaidList',
	'finance\getClientUnpaid',
	'finance\getFreelancerUnpaid',
	'finance\getClientTransactionList',
	'finance\incomming-detail',
	'finance\outgoing-detail',
	'finance\getTransaction',
	'finance\getTransactionTask',
	'finance\client-transaction',

	'finance\searchProjectUnpaidList',
	'finance\advsearchProjectUnpaidList',
	'finance\getFreelancerOutTransactionList',
	'finance\transaction',
	'finance\unpaid-project',
	'profile\index',
	'reset-password\index',

	// -- Email
	'email\loadTemplate',
	'email\check',
	// -- Profile
	'resetpassword\index',
	// -- API
	'api/common',
	'api/user',
	'api/data',
	'api/admin',
	'api/papertask',
	'api/companyinfo',
	'api/user_child',
);
$allow_freelancer = array(
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
	'dashboard\freelancer-dashboard',

	// -- Task

	'task\detail',
	'task\freelancer-task-view',
	'task\getFreelancerTaskList',
	'task\FreelancerAcceptTask',
	'task\submitTask',
	'task\task-pool',
	'task\getTaskPoolList',
	'task\freelancer-unpaid-task',
		'task\getFreelancerAssigningTaskList',

	// -- Project

	'project\detail', // Quotes in menu
	'project\uploadFile',
	'project\quoteprint',
	'project\quotedownload',
	'project\invoiceprint',
	'project\invoicedownload',
	'project\order-translation-non-contract',
	'project\wordcount',
	'project\uploadtemp',
	'project\getClientProjectList',
	'project\downloadFile',

	// -- Quote


	// -- Freelancer
	'freelancer\download',
	'freelancer\detail',
	'freelancer\edit-profile',
	'freelancer\uploadFile',
	'freelancer\getFreelancesList',
	'freelancer\edit-payment-info',
	'freelancer\edit-price',
	'freelancer\finishRegistration',
	'freelancer\getuserbyfreelancerid',

	// -- Employer (Client)
	'employer\detail',
	'employer\edit',
	'employer\removeResource',
	'employer\addResource',
	// -- Staff
	'staff\getPmList',
	'staff\getSalesList',
	'staff\view',
	'staff\uploadFile',
	//finance
	'finance\add-incomming',
	'finance\add-outgoing',
	'finance\getProjectUnpaidList',
	'finance\getTaskUnpaidList',
	'finance\getClientUnpaid',
	'finance\getFreelancerUnpaid',
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
	'email\loadTemplate',
	'email\check',
	// -- Profile
	// -- API
	'api/common',
	'api/user',
	'api/data',
	'api/admin',
	'api/papertask',
	'api/companyinfo',
	'api/user_child',
);
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
	'dashboard\admin-pm-dashboard',
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
		'task\getFreelancerAssigningTaskList',

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
	'project\need-quote',
	'project\order-translation-non-contract',
	'project\client-projects',
	'project\client-ongoing-projects',
	'project\client-review-projects',
	'project\client-completed-projects',
	'project\client-quotes',
	'project\quote-detail',
	'project\wordcount',
	'project\uploadtemp',
	'project\getClientProjectList',

	// -- Quote
	'quote\detail',
	'quote\new',


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
	'freelancer\getuserbyfreelancerid',

	// -- Employer (Client)
	'employer\list',
	'employer\new',
	'employer\profile',
	'employer\detail',
	'employer\edit',
	'employer\removeResource',
	'employer\addResource',
	// -- Staff
	'staff\index',
	'staff\new',
	'staff\getPmList',
	'staff\getSalesList',
	'staff\view',
	'staff\edit-profile',
	'staff\uploadFile',
	'staff\getUserByPm',
	//finance
	'finance\client-unpaid',
		'finance\client-unpaid-project',
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
		'index\pay',
		'index\done',
		'index\done-alipay',
		'index\pay-alipay',
		//'index\alipay',
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

		'payment/capture',
		'payment/done',
    ),
	'Freelancer'=> $allow_freelancer,
	'Employer'=> $allow_employer,
    'Admin'=> $allow_all,
);
