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

class FreelancerController extends AbstractActionController
{
    protected $requiredLogin = true;

    public function indexAction(){
        return new ViewModel();
    }

    public function finishRegistrationAction()
    {
        return new ViewModel(array(
            "user" => $this->getCurrentUser(),
        ));
    }

    public function updateInfoAction(){
        return $this->finishRegistrationAction();
    }

    public function viewAction(){
        $entityManager = $this->getEntityManager();
        $id = $this->getRequest()->getQuery('id');
        $user = $entityManager->find('\User\Entity\User', (int)$id);
        if($entityManager->find('\User\Entity\Freelancer', $user->getFreelancer())){
            return new ViewModel([
                "user" => $user->getData()
            ]);
        }
    }
	public function detailAction() {
		error_reporting(E_ALL);
		ini_set('display_errors', 1);
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
        
        return new ViewModel(array('user'=>$user->getData(), 
                'freelancer' => $user->getFreelancer()->getData(),
                'interpretingPrices'=>$pInterPretingPrices,
                'engineeringPrices'=>$pEngineeringPrices,
                'translationPrices'=>$pTranslationPrices,
                'dptPrices'=>$pDtpPrices,
                'tmRatios'=>$pTmRatios
        ));
    }

    public function newAction(){
        return new ViewModel(array(
            "user" => '',
        ));
    }

    public function editPaymentInfoAction(){
        $entityManager = $this->getEntityManager();
        $id = $this->getRequest()->getQuery('id');
        $user = $entityManager->find('\User\Entity\User', (int)$id);
        if($entityManager->find('\User\Entity\Freelancer', $user->getFreelancer())){
            return new ViewModel([
                "user" => $user->getData()
            ]);
        }
    }

    public function editProfileAction(){
        $entityManager = $this->getEntityManager();
        $id = $this->getRequest()->getQuery('id');
        $user = $entityManager->find('\User\Entity\User', (int)$id);
        if($entityManager->find('\User\Entity\Freelancer', $user->getFreelancer())){
            return new ViewModel([
                "user" => $user->getData()
            ]);
        }
    }
}
