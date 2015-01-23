<?php
/**
 * Zend Framework (http://framework.zend.com/)
 *
 * @link       for the canonical source repository
 * @copyright Copyright (c) 2005-2014 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */
namespace Landing;
return array(
    'router' => array(
        'routes' => array(
            'landding' => array(
                'type'    => 'Segment',
                'options' => array(
                    'route'    => '/[:lang]/landing/[:controller[/[:action[/]]]]',
                    'defaults' => array(
                        '__NAMESPACE__' => 'Landing\Controller',
                        'controller'    => 'Index',
                        'action'        => 'index',
                        'lang'=>'en-US'
                    ),
                    'constraints' => array(
                        'controller' => '[a-zA-Z][a-zA-Z0-9_-]*',
                        'action'     => '[a-zA-Z][a-zA-Z0-9_-]*',
                    ),
                ),
            ),
            'home' => array(
                'type' => 'Segment',
                'options' => array(
                    'route'    => '/[:lang]',
                    'defaults' => array(
                        '__NAMESPACE__' => 'Landing\Controller',
                        'controller' => 'Index',
                        'action'     => 'index',
                    ),
                ),
            ),
            'freelancer' => array(
                'type' => 'Segment',
                'options' => array(
                    'route'    => '/:lang/freelancer/',
                    'defaults' => array(
                        '__NAMESPACE__' => 'Landing\Controller',
                        'controller' => 'Index',
                        'action'     => 'freelancer',
                        'lang'=>'en-US'
                    ),
                ),
            ),
            'languages' => array(
                'type' => 'Segment',
                'options' => array(
                    'route'    => '/:lang/languages/',
                    'defaults' => array(
                        '__NAMESPACE__' => 'Landing\Controller',
                        'controller' => 'Index',
                        'action'     => 'languages',
                        'lang'=>'en-US'
                    ),
                ),
            ),
            'contact' => array(
                'type' => 'Segment',
                'options' => array(
                    'route'    => '/:lang/contact/',
                    'defaults' => array(
                        '__NAMESPACE__' => 'Landing\Controller',
                        'controller' => 'Index',
                        'action'     => 'contact',
                        'lang'=>'en-US'
                    ),
                ),
            ),
            'order' => array(
                'type' => 'Segment',
                'options' => array(
                    'route'    => '/:lang/order/',
                    'defaults' => array(
                        '__NAMESPACE__' => 'Landing\Controller',
                        'controller' => 'Index',
                        'action'     => 'order',
                        'lang'=>'en-US'
                    ),
                ),
            ),
            'terms' => array(
                'type' => 'Segment',
                'options' => array(
                    'route'    => '/:lang/terms/',
                    'defaults' => array(
                        '__NAMESPACE__' => 'Landing\Controller',
                        'controller' => 'Index',
                        'action'     => 'terms',
                        'lang'=>'en-US'
                    ),
                ),
            ),
            'privacy' => array(
                'type' => 'Segment',
                'options' => array(
                    'route'    => '/:lang/privacy/',
                    'defaults' => array(
                        '__NAMESPACE__' => 'Landing\Controller',
                        'controller' => 'Index',
                        'action'     => 'privacy',
                        'lang'=>'en-US'
                    ),
                ),
            ),
        ),
    ),
    'controllers' => array(
        'invokables' => array(
            'Landing\Controller\Index' => 'Landing\Controller\IndexController'
        ),
    ),
    'view_manager' => array(
        'display_not_found_reason' => true,
        'display_exceptions'       => true,
        'doctype'                  => 'HTML5',
        'not_found_template'       => 'error/404',
        'exception_template'       => 'error/index',
        'template_map' => array(
            'landing/index/index' => __DIR__ . '/../view/landing/index/index.phtml',
            'landing/index/freelancer' => __DIR__ . '/../view/landing/index/freelancer.phtml',
            'landing/index/languages' => __DIR__ . '/../view/landing/index/languages.phtml',
            'landing/index/order' => __DIR__ . '/../view/landing/index/order.phtml',
            'landing/index/contact' => __DIR__ . '/../view/landing/index/contact.phtml',
            'landing/index/terms' => __DIR__ . '/../view/landing/index/terms.phtml',
            'landing/index/privacy' => __DIR__ . '/../view/landing/index/privacy.phtml',
            'error/404'               => __DIR__ . '/../../Application/view/error/404.phtml',
            'error/index'             => __DIR__ . '/../../Application/view/error/index.phtml',
        ),
        'template_path_stack' => array(
            __DIR__ . '/../view',
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
    // Placeholder for console routes
    'console' => array(
        'router' => array(
            'routes' => array(
            ),
        ),
    ),

    // Doctrine
    'doctrine' => array(
        'driver' => array(
            'landing_entities' => array(
                'class' => 'Doctrine\ORM\Mapping\Driver\AnnotationDriver',
                'cache' => 'array',
                'paths' => array(__DIR__ . '/../src/Landing/Entity')
            ),
            'orm_default' => array(
                'drivers' => array(
                    'Landing\Entity' => 'landing_entities'
                )
            ))),
);