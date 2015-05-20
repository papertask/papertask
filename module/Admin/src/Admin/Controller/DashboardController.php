<?php
/**
 * Zend Framework (http://framework.zend.com/)
 *
 * @link      http://github.com/zendframework/ZendSkeletonAdmin for the canonical source repository
 * @copyright Copyright (c) 2005-2014 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace Admin\Controller;

use Zend\View\Model\ViewModel;

use Application\Controller\AbstractActionController;

class DashboardController extends AbstractActionController
{
    protected $requiredLogin = true;

    public function indexAction()
    {
		//error_reporting(E_ALL);
		//ini_set('display_errors', 1);
        $user = $this->getCurrentUser();
		$lang_code = $this->params()->fromRoute('lang');
        if($user->isFreelancer() && !$user->isProfileUpdated()){
           $this->redirect()->toUrl('/' . $lang_code . $user->getGroup()->getFirstLoginUrl());
        }
		else if($user->isFreelancer() && $user->isProfileUpdated()){
			$this->redirect()->toUrl('/' . $lang_code . '/admin/dashboard/freelancer-dashboard');
		}
		else if($user->isEmployer()){
			$url = "/" . $lang_code . '/admin/dashboard/client-dashboard';
			$this->redirect()->toUrl($url);
		}
        return new ViewModel(array());
    }
	public function clientDashboardAction()
	{	
		//error_reporting(E_ALL);
		//ini_set('display_errors', 1);
		$lang_code = $this->params()->fromRoute('lang');
        return new ViewModel([
			"lang_code" => $lang_code
        ]);
	}
	public function freelancerDashboardAction(){
    	$lang_code = $this->params()->fromRoute('lang');
    	//$currentUserId = User::currentLoginId();
    	//$currentUser = $this->find('User\Entity\User',$currentUserId);    
		$user = $this->getCurrentUser();		
    	$freelancer = $user->getFreelancer();
		//var_dump($freelancer->getId());exit;
    	return new ViewModel([
    			'freelancer_id' => $freelancer->getId(),
    			"lang_code" => $lang_code
    	]);
    }
}
