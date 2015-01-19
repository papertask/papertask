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

class Module
{
    public function onBootstrap(MvcEvent $e)
    {
        $eventManager        = $e->getApplication()->getEventManager();
        $moduleRouteListener = new ModuleRouteListener();
        $moduleRouteListener->attach($eventManager);

        $eventManager->getSharedManager()->attach(__NAMESPACE__, 'dispatch', function($e) {
            $e->getTarget()->layout('layout/layout');
        });
		
		// Init ACL 
		//var_dump("initAcl started ACL setup");
		$this -> initAcl($e);
		//var_dump("initAcl finished ACL setup");
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
		//test
		//var_dump($acl->isAllowed('admin','home'));
		//true
	 
		//setting to view
		$e -> getViewModel() -> acl = $acl;
	 
	}
 
	// Check ACL
	public function checkAcl(MvcEvent $e) 
	{
		$params = $e->getRouteMatch()->getParams();
		if(isset($params['__CONTROLLER__']))
			$route = $params['__CONTROLLER__']."\\".$params['action'];
		else
			$route = $e->getRouteMatch()->getMatchedRouteName();
		$route = strtolower($route);
		//set role here
		$userRole = 'admin';
		
		var_dump($route);
		var_dump($e->getRouteMatch()->getParams());
		var_dump($route);
		// Allow all undefined routes
		//if ($e -> getViewModel() -> acl ->hasResource($route) && !$e -> getViewModel() -> acl -> isAllowed($userRole, $route)) 
		if (!$e -> getViewModel() -> acl ->hasResource($route) || !$e -> getViewModel() -> acl -> isAllowed($userRole, $route)) 
		{
			$response = $e -> getResponse();
			//location to page or what ever
			$response -> getHeaders() -> addHeaderLine('Location', $e -> getRequest() -> getBaseUrl() . '/404');
			$response -> setStatusCode(404);
	 
		}
	}
}
