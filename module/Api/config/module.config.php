<?php

return array(
    'router' => array(
        'routes' => array(
            'api' => array(
                'type' => 'Literal',
                'options' => array(
                    'route'    => '/api',
                    'constraints' => array(
                    ),
                    'defaults' => array(
                        '__NAMESPACE__' => 'Api\Controller',
                        'controller' => 'Index',
                    ),
                ),
                'child_routes' => array(
                    'admin' => array(
                        'type'    => 'Segment',
                        'options' => array(
                            'route'    => '/admin/[:controller[/[:id[/]]]]',
                            'constraints' => array(
                                'controller' => '[a-zA-Z][a-zA-Z0-9_-]*',
                            ),
                            'defaults' => array(
                                '__NAMESPACE__' => 'Api\Controller\Admin',
                            ),
                        ),
                    ),
                    'common' => array(
                        'type'    => 'Segment',
                        'options' => array(
                            'route'    => '/common/[:controller[/]]',
                            'constraints' => array(
                                'controller' => '[a-zA-Z][a-zA-Z0-9_-]*',
                            ),
                            'defaults' => array(
                                '__NAMESPACE__' => 'Api\Controller\Common',
                            ),
                        ),
                    ),
                    'user' => array(
                        'type'    => 'Segment',
                        'options' => array(
                            'route'    => '/user/[[:id[/]][:controller[/]]]',
                            'constraints' => array(
                                'controller' => '[a-zA-Z][a-zA-Z0-9_-]*',
                                'id' => '[0-9]*',
                            ),
                            'defaults' => array(
                                '__NAMESPACE__' => 'Api\Controller\User',
                            ),
                        ),
                    ),
                    'data' => array(
                        'type'    => 'Segment',
                        'options' => array(
                            'route'    => '/data/[:controller[/]]',
                            'constraints' => array(
                                'controller' => '[a-zA-Z][a-zA-Z0-9_-]*',
                            ),
                            'defaults' => array(
                                '__NAMESPACE__' => 'Api\Controller\Data',
                            ),
                        ),
                    ),
                    'papertask' => array(
                        'type'    => 'Segment',
                        'options' => array(
                            'route'    => '/papertask/[:controller[[/][:id[/]]]]',
                            'constraints' => array(
                                'controller' => '[a-zA-Z][a-zA-Z0-9_-]*',
                                'id' => '[0-9]*',
                            ),
                            'defaults' => array(
                                '__NAMESPACE__' => 'Api\Controller\Papertask',
                            ),
                        ),
                    ),
                    'user_child' => array(
                        'type'    => 'Segment',
                        'options' => array(
                            'route'    => '/user/:user_id/:controller/:id[/]',
                            'constraints' => array(
                                'controller' => '[a-zA-Z][a-zA-Z0-9_-]*',
                                'user_id' => '[0-9]*',
                                'id' => '[0-9]*',
                            ),
                            'defaults' => array(
                                '__NAMESPACE__' => 'Api\Controller\User',
                            ),
                        ),
                    ),
                ),
            ),
        ),
    ),
    'controllers' => array(
        'invokables' => array(
            'Api\Controller\Admin\Client' => 'Api\Controller\Admin\ClientController',
            'Api\Controller\Admin\Field' => 'Api\Controller\Admin\FieldController',
            'Api\Controller\Admin\Language' => 'Api\Controller\Admin\LanguageController',
            'Api\Controller\Admin\Project' => 'Api\Controller\Admin\ProjectController',
            'Api\Controller\Admin\Staff' => 'Api\Controller\Admin\StaffController',
            'Api\Controller\Admin\Task' => 'Api\Controller\Admin\TaskController',
            'Api\Controller\Admin\Roles' => 'Api\Controller\Admin\RolesController',
            'Api\Controller\Common\Company' => 'Api\Controller\Common\CompanyController',
            'Api\Controller\Common\Country' => 'Api\Controller\Common\CountryController',
            'Api\Controller\Common\Role' => 'Api\Controller\Common\RoleController',
			'Api\Controller\Common\Rating' => 'Api\Controller\Common\RatingController',
            'Api\Controller\Common\EngineeringCategory' => 'Api\Controller\Common\EngineeringCategoryController',
            'Api\Controller\Common\Language' => 'Api\Controller\Common\LanguageController',
            'Api\Controller\Common\LanguageGroup' => 'Api\Controller\Common\LanguageGroupController',
            'Api\Controller\Common\Unit' => 'Api\Controller\Common\UnitController',
			'Api\Controller\Data\Project' => 'Api\Controller\Data\ProjectController',
            'Api\Controller\Index' => 'Api\Controller\IndexController',
            'Api\Controller\Papertask\DesktopPublishing' => 'Api\Controller\Papertask\DesktopPublishingController',
            'Api\Controller\Papertask\Engineering' => 'Api\Controller\Papertask\EngineeringController',
            'Api\Controller\Papertask\Interpreting' => 'Api\Controller\Papertask\InterpretingController',
            'Api\Controller\Papertask\Translation' => 'Api\Controller\Papertask\TranslationController',
            'Api\Controller\Papertask\Translationtm' => 'Api\Controller\Papertask\TranslationtmController',
            'Api\Controller\User\BankInfo' => 'Api\Controller\User\BankInfoController',
            'Api\Controller\User\Current' => 'Api\Controller\User\CurrentController',
            'Api\Controller\User\DesktopPrice' => 'Api\Controller\User\DesktopPriceController',
			'Api\Controller\User\DesktopPriceP' => 'Api\Controller\User\DesktopPricePController',
            'Api\Controller\User\Employer' => 'Api\Controller\User\EmployerController',
            'Api\Controller\User\EmployerData' => 'Api\Controller\User\EmployerDataController',
            'Api\Controller\User\Freelancer' => 'Api\Controller\User\FreelancerController',
            'Api\Controller\User\FreelancerData' => 'Api\Controller\User\FreelancerDataController',
            'Api\Controller\User\Index' => 'Api\Controller\User\IndexController',
            'Api\Controller\User\InterpretingPrice' => 'Api\Controller\User\InterpretingPriceController',
			'Api\Controller\User\InterpretingPriceP' => 'Api\Controller\User\InterpretingPricePController',
            'Api\Controller\User\PriceData' => 'Api\Controller\User\PriceDataController',
            'Api\Controller\User\ResetPassword' => 'Api\Controller\User\ResetPasswordController',
            'Api\Controller\User\Resource' => 'Api\Controller\User\ResourceController',
            'Api\Controller\User\Resume' => 'Api\Controller\User\ResumeController',
            'Api\Controller\User\Staff' => 'Api\Controller\User\StaffController',
			'Api\Controller\User\CvFiles' => 'Api\Controller\User\CvFilesController',
            'Api\Controller\User\TranslationPrice' => 'Api\Controller\User\TranslationPriceController',
            'Api\Controller\User\EngineeringPrice' => 'Api\Controller\User\EngineeringPriceController',
			'Api\Controller\User\TranslationPriceP' => 'Api\Controller\User\TranslationPricePController',
            'Api\Controller\User\EngineeringPriceP' => 'Api\Controller\User\EngineeringPricePController',
            'Api\Controller\User\TmRatio' => 'Api\Controller\User\TmRatioController',
			'Api\Controller\User\ClientDesktop' => 'Api\Controller\User\ClientDesktopController',
			'Api\Controller\User\ClientTranslation' => 'Api\Controller\User\ClientTranslationController',
			'Api\Controller\User\ClientInterpreting' => 'Api\Controller\User\ClientInterpretingController',
            'Api\Controller\Papertask\DesktopPublishing' => 'Api\Controller\Papertask\DesktopPublishingController',
            'Api\Controller\Papertask\Engineering' => 'Api\Controller\Papertask\EngineeringController',
            'Api\Controller\Papertask\Interpreting' => 'Api\Controller\Papertask\InterpretingController',
            'Api\Controller\Papertask\Translation' => 'Api\Controller\Papertask\TranslationController',
            'Api\Controller\Papertask\Translationtm' => 'Api\Controller\Papertask\TranslationtmController',

        ),
    ),
    'view_manager' => array(
        'strategies' => array(
            'ViewJsonStrategy',
        ),
    ),
    'countries' => [
        'US' => 'United State',
        'VN' => 'Vietnam',
        'CN' => 'China',
        'EN' => 'England',
    ],
    'project_create' => [
        'statuses' => [
            ['id' => 1, 'name' => 'Quote', 'decorator' => 'info'],
            ['id' => 2, 'name' => 'Ordered', 'decorator' => 'danger'],
        ],
        'priorities' => [
            ['id' => 1, 'name' => 'Normal', 'decorator' => 'primary'],
            ['id' => 2, 'name' => 'High', 'decorator' => 'danger'],
        ],
        'levels' => [
            ['id' => 1, 'name' => 'Professional', 'price' => [
                'USD' => 1.00,
                'CNY' => 10.00,
            ]],
            ['id' => 2, 'name' => 'Business', 'price' => [
                'USD' => 2.00,
                'CNY' => 20.00,
            ]],
            ['id' => 3, 'name' => 'Premium', 'price' => [
                'USD' => 3.00,
                'CNY' => 30.00,
            ]],
        ],
        'interpretingUnits' => [
            ['id' => 1, 'name' => 'Day'],
            ['id' => 2, 'name' => 'Half Day'],
        ],
        'engineeringUnits' => [
            ['id' => 1, 'name' => 'Page'],
            ['id' => 2, 'name' => 'Graphic'],
            ['id' => 3, 'name' => 'Hour'],
            ['id' => 4, 'name' => 'Day'],
            ['id' => 5, 'name' => 'Month'],
        ],
        'dtpUnits' => [
            ['id' => 1, 'name' => 'Hour'],
            ['id' => 2, 'name' => 'Page'],
        ],
    ],
);
