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

use User\Entity\Resume;

use User\Entity\CvFile;


use Zend\View\Model\JsonModel;

class FreelancerController extends AbstractActionController
{
    protected $requiredLogin = true;
	
    public function indexAction(){
        $lang_code = $this->params()->fromRoute('lang');
		return new ViewModel(array(
			"lang_code" => $lang_code,
        ));
    }

    public function finishRegistrationAction()
    {
        return new ViewModel(array(
            "user" => $this->getCurrentUser(),
        ));
    }
	
	public function uploadFileAction() {
        if ( !empty( $_FILES ) ) {

            $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
            $name = $_FILES[ 'file' ][ 'name' ];

            $uploadPath = 'public/uploads' . DIRECTORY_SEPARATOR . $name;

            move_uploaded_file( $tempPath, $uploadPath );
            $file = new CvFile();
           
            $file->setData([
                'name' => $_FILES[ 'file' ][ 'name' ],
                'path' => $uploadPath,
                'size' => $_FILES['file']['size'],
                'time' => time(),
            ]);
            $file->save( $this->getEntityManager() );
            $answer = [
                'file' => $file->getData(),
                'success' => true,
            ];
            return new JsonModel( $answer );

        } else {
            $answer = ['success' => false];
            return new JsonModel( $answer );
        }
    }
    
    public function deleteFileAction( ) {
        $entityManager = $this->getEntityManager();
        $fid = $this->getRequest()->getQuery('fid');
        $cvfile = $entityManager->find('\User\Entity\CvFile', (int)$fid);
        $entityManager->remove( $cvfile );
        $entityManager->flush();
        $answer = ["success" => true];
        
        return new JsonModel( $answer );
    }
	
    public function updateInfoAction(){
        return $this->finishRegistrationAction();
    }

    public function viewAction(){
        $entityManager = $this->getEntityManager();
        $id = $this->getRequest()->getQuery('id');
        $user = $entityManager->find('\User\Entity\User', (int)$id);
		$lang_code = $this->params()->fromRoute('lang');
        if($entityManager->find('\User\Entity\Freelancer', $user->getFreelancer())){
            return new ViewModel([
                "user" => $user->getData(),
				"lang_code" => $lang_code,
            ]);
        }
    }
	public function detailAction() {
		//error_reporting(E_ALL);
		//ini_set('display_errors', 1);
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
        $cvfile = $entityManager->getRepository('\User\Entity\CvFile')
                        ->findBy(['user' => $user]);
        $cvfiles = array();
        foreach ( $cvfile as $k => $v ) {
            $cvfiles[$k] = $v->getData();
        }
		
		//Get resume
		$resume = $entityManager->getRepository('\User\Entity\Resume')
                        ->findOneBy(['user' => $user]);
						
		//var_dump($user->getFreelancer()->getData());exit;
			
        $lang_code = $this->params()->fromRoute('lang');
		return new ViewModel(array('user'=>$user->getData(), 
                'freelancer' => $user->getFreelancer()->getData(),
                'interpretingPrices'=>$pInterPretingPrices,
                'engineeringPrices'=>$pEngineeringPrices,
                'translationPrices'=>$pTranslationPrices,
                'dptPrices'=>$pDtpPrices,
                'tmRatios'=>$pTmRatios,
				'lang_code' => $lang_code,
				'cvfiles' => $cvfiles,
				'resume' => $resume?$resume->getData():null,
        ));
    }

    public function newAction(){
        $lang_code = $this->params()->fromRoute('lang');
		return new ViewModel(array(
			"lang_code" => $lang_code
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
		$lang_code = $this->params()->fromRoute('lang');
        if($entityManager->find('\User\Entity\Freelancer', $user->getFreelancer())){
            return new ViewModel([
                "user" => $user->getData(),
				"lang_code" => $lang_code
            ]);
        }
    }
}
