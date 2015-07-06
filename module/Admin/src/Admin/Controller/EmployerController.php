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

use DoctrineORMModule\Paginator\Adapter\DoctrinePaginator as DoctrineAdapter;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
use Zend\Paginator\Paginator;

use Admin\Model\Helper;
use User\Entity\User;
use User\Entity\UserGroup;
use User\Entity\UserDesktopPrice;
use User\Entity\UserTranslationPrice;
use User\Entity\UserInterpretingPrice;
use User\Entity\UserTmRatio;
use User\Entity\UserEngineeringPrice;
use Zend\View\Model\JsonModel;
use User\Entity\Company;

class EmployerController extends AbstractActionController {
    protected $requiredLogin = true;
    public function editAction() {
        $lang_code = $this->params()->fromRoute('lang');
        $userId = $this->getRequest()->getQuery('userId');
        $user = $this->getUserById($userId);
        $employer = $user->getEmployer();
		
        return new ViewModel( array (
                "user" => $user->getData(),
                'employer'=> $employer->getData(),
				"lang_code" => $lang_code
        ));
    }
    
    public function profileAction() {
        $user = $this->getCurrentUser();
        $employer = $user->getEmployer();
        $entityManager = $this->getEntityManager();
        $pCompanies = $entityManager->getRepository('User\Entity\Company')->findAll();
        $companies = array();
        foreach ($pCompanies as $k => $v) {
            $companies[$k] = $v->getData();
        }
        return new ViewModel( array (
                "user" => $user->getData(),
                "employer" => $employer->getData(),
                'companies' => $companies
        ));
    }
    
    public function newAction() {
        $lang_code = $this->params()->fromRoute('lang');
		return new ViewModel(array(
			"lang_code" => $lang_code
        ));

    } 
   
    public function listAction() {
        $lang_code = $this->params()->fromRoute('lang');
		return new ViewModel(array(
			"lang_code" => $lang_code
        ));
    }
    
    public function detailAction() {
        $userId = (int)$this->getRequest()->getQuery('id');
        $entityManager = $this->getEntityManager();
        $user = $this->getUserById($userId);
        
        // Get Interpreting Price
        $repository = $entityManager->getRepository('User\Entity\UserInterpretingPrice');
        $interPretingPrices = $repository->findBy( array('user'=>$user) );
        $pInterPretingPrices = array();
        foreach ( $interPretingPrices as $k => $v ) {
            $pInterPretingPrices[$k] = $v->getData();
        }         
        // Get EngeeringPrice
        $repository = $entityManager->getRepository('User\Entity\UserEngineeringPrice');
        $engineeringPrices = $repository->findBy(array('user'=>$user));
        $pEngineeringPrices = array();
        foreach ($engineeringPrices as $k => $v ) {
            $pEngineeringPrices[$k] = $v->getData();
        }
         
        // Get Translation Price
        $repository = $entityManager->getRepository('User\Entity\UserTranslationPrice');
        $translationPrices = $repository->findBy(array('user'=>$user));
        $pTranslationPrices = array();
        foreach ( $translationPrices as $k => $v ) {
            $pTranslationPrices[$k] = $v->getData();
        }
         
        // Get DesktopPrices
        $repository = $entityManager->getRepository('User\Entity\UserDesktopPrice');
        $dtpPrices = $repository->findBy(array('user'=>$user));
        $pDtpPrices = array();
        foreach ( $dtpPrices as $k => $v) {
            $pDtpPrices[$k]=$v->getData();
        }
         
        // Get Translation Ratio
        $repository = $entityManager->getRepository('User\Entity\UserTmRatio');
        $tmRatios = $repository->findBy(array('user'=>$user));
        $pTmRatios = array();
        foreach ( $tmRatios as $k => $v) {
            $pTmRatios[$k] = $v->getData();
        }
		$lang_code = $this->params()->fromRoute('lang');
        return new ViewModel(array('user'=>$user->getData(), 
                'employer' => $user->getEmployer()->getData(),
                'interpretingPrices'=>$pInterPretingPrices,
                'engineeringPrices'=>$pEngineeringPrices,
                'translationPrices'=>$pTranslationPrices,
                'dptPrices'=>$pDtpPrices,
                'tmRatios'=>$pTmRatios,
				"lang_code" => $lang_code
        ));
    }
    
    public function removeTranslatorPoolAction(){
    	
    	$id = $this->params()->fromQuery('id');
    	$freelancer_id = $this->params()->fromQuery('freelancer_id');
    	
    	$user= $this->getEntityManager()->find('User\Entity\User',$id);
    	$user->removeTranslatorPool($freelancer_id, $this);
    	$user->save($this->getEntityManager());
    	return new JsonModel();
    }
}
