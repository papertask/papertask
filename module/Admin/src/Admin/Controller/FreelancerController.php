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

use User\Entity\UserGroup;


use Zend\View\Model\JsonModel;

use Zend\Http\Headers;
use Zend\Http\Response\Stream;

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
		$lang_code = $this->params()->fromRoute('lang');
        return new ViewModel(array(
			"lang_code" => $lang_code,
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

        if($userId){
        $user = $this->getUserById($userId);
        } else {
            $user = $this->getCurrentUser();
        }
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
                'isAdmin' => $this->getCurrentUser()->isAdmin(),
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

        if($id){
            $user = $this->getUserById($id);
        } else {
            $user = $this->getCurrentUser();
        }
        //$user = $entityManager->find('\User\Entity\User', (int)$id);

        $isAdmin = false;
        if($this->getCurrentUser()->isAdmin()){
            $isAdmin = true;
        }

        if($entityManager->find('\User\Entity\Freelancer', $user->getFreelancer())){
            return new ViewModel([
                "user" => $user->getData(),
                "isAdmin" => $isAdmin,
            ]);
        }
    }

    public function editProfileAction(){
        $entityManager = $this->getEntityManager();
        $id = $this->getRequest()->getQuery('id');
        // $user = $entityManager->find('\User\Entity\User', (int)$id);
        if($id){
            $user = $this->getUserById($id);
        } else {
            $user = $this->getCurrentUser();
        }

		$lang_code = $this->params()->fromRoute('lang');

        if($entityManager->find('\User\Entity\Freelancer', $user->getFreelancer())){
            return new ViewModel([
                "user" => $user->getData(),
				"lang_code" => $lang_code,
                "isAdmin" => $this->getCurrentUser()->isAdmin(),
            ]);
        }
    }

    public function editPriceAction(){
        $entityManager = $this->getEntityManager();
        $id = $this->getRequest()->getQuery('id');
        // $user = $entityManager->find('\User\Entity\User', (int)$id);
        if($id){
            $user = $this->getUserById($id);
        } else {
            $user = $this->getCurrentUser();
        }

        $lang_code = $this->params()->fromRoute('lang');

        if($entityManager->find('\User\Entity\Freelancer', $user->getFreelancer())){
            return new ViewModel([
                "user" => $user->getData(),
                "lang_code" => $lang_code,
                "isAdmin" => $this->getCurrentUser()->isAdmin(),
            ]);
        }
    }
	public function getFreelancesListAction() {
        $entityManager = $this->getEntityManager();
		$freelancerGroup = $entityManager->find('User\Entity\UserGroup', UserGroup::FREELANCER_GROUP_ID);

		$freelancerList = $entityManager->getRepository('User\Entity\User');
                                //->findBy(array('group' => $freelancerGroup));
        $queryBuilder = $freelancerList->createQueryBuilder('user');
		$queryBuilder->select(array('user.firstName','user.id userid','user.lastName','freelancer.id freelancerid'));
		$queryBuilder->innerJoin('user.freelancer', 'freelancer');
        $queryBuilder->where("user.group = :group1")->setParameter('group1', $freelancerGroup);
		$queryBuilder->andWhere("user.isActive = ?1")
                    ->setParameter(1, 1);
					
		
		
        $query = $queryBuilder->getQuery();
        $result = $query->getArrayResult();
        return new JsonModel([
            'freelancerslist' => $result
        ]);
    }
	
	public function downloadAction(){
	//error_reporting(E_ALL);
	//ini_set('display_errors', 1);
	//ignore_user_abort(true);
	set_time_limit(0); // disable the time limit for this script
	$id_file = $this->getRequest()->getQuery('path');
	$entityManager = $this->getEntityManager();
	$cvfile = $entityManager->getRepository('\User\Entity\CvFile')
                        ->findBy(['id' => $id_file]);
	foreach ( $cvfile as $k => $v ) {
            $cvfiles[$k] = $v->getData();
        }					
	$path = BASE_PATH . '/public/uploads/'.$cvfiles[0]['name'];
	if (!is_readable($path))
    die('File is not readable or not exists!');
 
	$filename = pathinfo($path, PATHINFO_BASENAME);
	 
	// get mime type of file by extension
	$mime_type = $this->getMimeType($filename);
	 
	// set headers
	header('Pragma: public');
	header('Expires: -1');
	header('Cache-Control: public, must-revalidate, post-check=0, pre-check=0');
	header('Content-Transfer-Encoding: binary');
	header("Content-Disposition: attachment; filename=\"$filename\"");
	header("Content-Length: " . filesize($path));
	header("Content-Type: $mime_type");
	header("Content-Description: File Transfer");
	 
	// read file as chunk
	if ( $fp = fopen($path, 'rb') ) {
		ob_end_clean();
	 
		while( !feof($fp) and (connection_status()==0) ) {
			print(fread($fp, 8192));
			flush();
		}
	 
		@fclose($fp);
		exit;
	}
	}
	
	public function getMimeType($filename){
		$ext = pathinfo($filename, PATHINFO_EXTENSION);
		$ext = strtolower($ext);
	 
		$mime_types=array(
			"pdf" => "application/pdf",
			"txt" => "text/plain",
			"html" => "text/html",
			"htm" => "text/html",
			"exe" => "application/octet-stream",
			"zip" => "application/zip",
			"doc" => "application/msword",
			"xls" => "application/vnd.ms-excel",
			"ppt" => "application/vnd.ms-powerpoint",
			"gif" => "image/gif",
			"png" => "image/png",
			"jpeg"=> "image/jpg",
			"jpg" =>  "image/jpg",
			"php" => "text/plain",
			"csv" => "text/csv",
			"xlsx" => "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			"pptx" => "application/vnd.openxmlformats-officedocument.presentationml.presentation",
			"docx" => "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
		);
	 
		if(isset($mime_types[$ext])){
			return $mime_types[$ext];
		} else {
			return 'application/octet-stream';
		}
	}


}
