<?php
/**
 * Zend Framework (http://framework.zend.com/)
 *
 * @link      http://github.com/zendframework/ZendSkeletonAdmin for the canonical source repository
 * @copyright Copyright (c) 2005-2014 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */
namespace Employer;
return array(
    'router' => array(
        'routes' => array(
            // The following is a route to simplify getting started creating
            // new controllers and actions without needing to create a new
            // module. Simply drop new controllers in, and you can access them
            // using the path /admin/:controller/:action
            'employer' => array(
                'type'    => 'Segment',
                'options' => array(
                    'route'    => '/:lang/employer/[:controller[/[:action[/]]]]',
                    'defaults' => array(
                        '__NAMESPACE__' => 'Employer\Controller',
                        'controller'    => 'Dashboard',
                        'action'        => 'index',
                        'lang'=>'en-US'
                    ),
                    'constraints' => array(
                        'controller' => '[a-zA-Z][a-zA-Z0-9_-]*',
                        'action'     => '[a-zA-Z][a-zA-Z0-9_-]*',
                    ),
                ),
            ),
        ),
    ),
    'service_manager' => array(
        'abstract_factories' => array(
            'Zend\Cache\Service\StorageCacheAbstractServiceFactory',
            'Zend\Log\LoggerAbstractServiceFactory',
        ),
        'aliases' => array(
            'translator' => 'MvcTranslator',
        ),
    ),
	'translator' => array(
        'locale' => 'en-US',
        'translation_file_patterns' => array(
            array(
                'type'     => 'gettext',
                'base_dir' => __DIR__ . '/../language',
                'pattern'  => '%s.mo',
				'text_domain' => __NAMESPACE__,
            ),
        ),
    ),
    'controllers' => array(
        'invokables' => array(
                'Employer\Controller\Dashboard' => 'Employer\Controller\DashboardController',
			           'Employer\Controller\Quote' => 'Employer\Controller\QuoteController',
			           'Employer\Controller\Project' => 'Employer\Controller\ProjectController',
                 'Employer\Controller\Finance' => 'Employer\Controller\FinanceController',
        ),
    ),
    'view_manager' => array(
        'display_not_found_reason' => true,
        'display_exceptions'       => true,
        'doctype'                  => 'HTML5',
        'not_found_template'       => 'error/404',
        'exception_template'       => 'error/index',
        'template_map' => array(
			'employer/dashboard/client-dashboard' => __DIR__ . '/../view/employer/dashboard/client-dashboard.phtml',
			'employer/quotes' => __DIR__ . '/../view/employer/quote/index.phtml',
			'employer/projects' => __DIR__ . '/../view/employer/project/index.phtml',
      'employer/finance/transaction' => __DIR__ . '/../view/employer/finance/transaction.phtml',


        ),
        'layout' => 'layout/admin',
        'template_path_stack' => array(
            __DIR__ . '/../view',
        ),
    ),
    // Placeholder for console routes
    'console' => array(
        'router' => array(
            'routes' => array(
            ),
        ),
    ),

    // Doctrine
    /*'doctrine' => array(
        'driver' => array(
            'employer_entities' => array(
                'class' => 'Doctrine\ORM\Mapping\Driver\AnnotationDriver',
                'cache' => 'array',
                'paths' => array(__DIR__ . '/../src/Employer/Entity')
            ),
            'orm_default' => array(
                'drivers' => array(
                    'Employer\Entity' => 'employer_entities'
                )
            ))),*/
);
