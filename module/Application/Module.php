<?php
/**
* Zend Framework (http://framework.zend.com/)
*
* @link      http://github.com/zendframework/ZendSkeletonApplication for the canonical source repository
* @copyright Copyright (c) 2005-2014 Zend Technologies USA Inc. (http://www.zend.com)
* @license   http://framework.zend.com/license/new-bsd New BSD License
*/

namespace Application;

use Zend\Mvc\ModuleRouteListener;
use Zend\Mvc\MvcEvent;
use Zend\ServiceManager\ServiceManager;
use Zend\Session\Container;

class Module
{
    public function onBootstrap(MvcEvent $e)
    {
        $eventManager        = $e->getApplication()->getEventManager();
        $routeCallback = function ($e) {
            $availableLanguages = array ('en-US', 'zh-CN');
            $defaultLanguage = 'en-US';
            $language = "";
            $fromRoute = false;

            //see if language could be find in url
            if ($e->getRouteMatch()->getParam('lang')) {
                $language = $e->getRouteMatch()->getParam('lang');
                $fromRoute = true;
                //or use language from http accept
            } else {
                $headers = $e->getApplication()->getRequest()->getHeaders();

                if ($headers->has('Accept-Language')) {
                    $headerLocale = $headers->get('Accept-Language')->getPrioritized();
                    $language = substr($headerLocale[0]->getLanguage(), 0,2);
                    if($language == 'zh' || $language == 'zh-CN')
                    $language = 'zh-CN';
                }
            }
            if(!in_array($language, $availableLanguages) ) {
                $language = $defaultLanguage;
            }
            $e->getApplication()->getServiceManager()->get('translator')->setLocale($language);
            //->setFallbackLocale('en_US');
            //forward to localized url if not called with language parameter

            if($fromRoute !== true) {
                //var_dump(strpos($e->getRouteMatch()->getMatchedRouteName(), 'api'));exit;
                if(strpos($e->getRouteMatch()->getMatchedRouteName(), 'api') !== false)
                {
                }
                else{

                    //var_dump(strpos($e->getRouteMatch()->getMatchedRouteName(), 'api'));exit;
                    $actual_link = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
                    $newUrl = $actual_link.$language;
                    header("Location: $newUrl");
                    exit;
                }
            }

        };

        $eventManager->attach(\Zend\Mvc\MvcEvent::EVENT_ROUTE, $routeCallback);
        $moduleRouteListener = new ModuleRouteListener();
        $moduleRouteListener->attach($eventManager);

        $eventManager->getSharedManager()->attach(__NAMESPACE__, 'dispatch', function($e) {
            $e->getTarget()->layout('layout/layout');
        });

        // Init ACL
        $this -> initAcl($e);
        $eventManager -> attach('route', array($this, 'checkAcl'));
    }

    public function getConfig()
    {
        return include __DIR__ . '/config/module.config.php';
    }

    public function getAutoloaderConfig()
    {
        return array(
        'Zend\Loader\StandardAutoloader' => array(
        'namespaces' => array(
        __NAMESPACE__ => __DIR__ . '/src/' . __NAMESPACE__,
        ),
        ),
        );
    }

    // Init ACL
    public function initAcl(MvcEvent $e)
    {
        $acl = new \Zend\Permissions\Acl\Acl();
        $roles = include __DIR__ . '/config/module.acl.roles.php';

        foreach ($roles as $role => $resources)
        {
            $role = new \Zend\Permissions\Acl\Role\GenericRole($role);
            $acl -> addRole($role);

            //adding resources
            foreach ($resources as $resource) {

                $resource = strtolower($resource);
                if(!$acl ->hasResource($resource))
                $acl -> addResource(new \Zend\Permissions\Acl\Resource\GenericResource($resource));
            }
            //adding restrictions
            foreach ($resources as $resource) {
                $acl -> allow($role, strtolower($resource));
            }
        }

        //setting to view
        $e -> getViewModel() -> acl = $acl;

    }

    // Check ACL
    public function checkAcl(MvcEvent $e)
    {
        $params = $e->getRouteMatch()->getParams();
        if(isset($params['__CONTROLLER__']) && isset($params['action']))
        $route = $params['__CONTROLLER__']."\\".$params['action'];
        else
        $route = $e->getRouteMatch()->getMatchedRouteName();
        $route = strtolower($route);

        //set role here
        $userSession = new Container('user');
        $userRole = $userSession->user_group['name'] == null ? 'Guest' : $userSession->user_group['name'];
		
        if (!$e -> getViewModel() -> acl ->hasResource($route) || !$e -> getViewModel() -> acl -> isAllowed($userRole, $route))
        {
			var_dump($e -> getViewModel() -> acl);
			var_dump($route);
			exit;
            $response = $e -> getResponse();
            //location to page or what ever
            $response -> getHeaders() -> addHeaderLine('Location', $e -> getRequest() -> getBaseUrl() . '/404');
            $response -> setStatusCode(404);

        }
    }
}
