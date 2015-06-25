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
use Zend\View\Model\JsonModel;
use Zend\View\Renderer\PhpRenderer;
use Application\Controller\AbstractActionController;
use User\Entity\File;
use User\Entity\User;
use Application\Controller\AbstractRestfulController;

class ProjectController extends AbstractActionController
{
    protected $requiredLogin = true;

    public function indexAction()
    {
        $lang_code = $this->params()->fromRoute('lang');
		return new ViewModel(array(
			"lang_code" => $lang_code,
        ));
    }
	public function clientProjectsAction()
	{
		$lang_code = $this->params()->fromRoute('lang');
		//$currentUserId = User::currentLoginId();
    	//$currentUser = $this->find('User\Entity\User',$currentUserId);
		//$client = $currentUser->isEmployer();
		//var_dump($client);
		//var_dump($currentUserId);
		//var_dump($currentUser);exit;
		return new ViewModel(array(
			"lang_code" => $lang_code,
        ));
	}
	public function clientOngoingProjectsAction()
	{
		$lang_code = $this->params()->fromRoute('lang');
		return new ViewModel(array(
			"lang_code" => $lang_code,
        ));
	}
	public function clientReviewProjectsAction()
	{
		$lang_code = $this->params()->fromRoute('lang');
		return new ViewModel(array(
			"lang_code" => $lang_code,
        ));
	}
	public function clientCompletedProjectsAction()
	{
		$lang_code = $this->params()->fromRoute('lang');
		return new ViewModel(array(
			"lang_code" => $lang_code,
        ));
	}
	public function clientQuotesAction()
	{
		$lang_code = $this->params()->fromRoute('lang');
		return new ViewModel(array(
			"lang_code" => $lang_code,
        ));
	}
	public function quoteDetailAction()
	{	
		$id = $this->params()->fromQuery('id');
		$lang_code = $this->params()->fromRoute('lang');
        return new ViewModel([
            'id' => $id,
			"lang_code" => $lang_code
        ]);
	}
    public function orderTranslationAction(){
    	$lang_code = $this->params()->fromRoute('lang');
    	
    	$currentUserId = User::currentLoginId();
    	$currentUser = $this->find('User\Entity\User',$currentUserId);
    	$employer = $currentUser->getEmployer();
    	$isContracted = $employer->getContract();
    	if($isContracted == 1){
    		$view =  new ViewModel(array(
    				"lang_code" => $lang_code,
    		));
    		$view->setTemplate('admin/project/order-translation.phtml');
    		return $view;
    	} else{
    		$view =  new ViewModel(array(
    			"lang_code" => $lang_code,
    	));
    		$view->setTemplate('admin/project/order-translation-non-contract.phtml');
    		return $view;
    	}
    }	
    
    public function orderTranslationNonContractAction(){
    	$lang_code = $this->params()->fromRoute('lang');
    	return new ViewModel(array(
    			"lang_code" => $lang_code,
    	));
    }
    
    public function newAction()
    {
    	
    	$lang_code = $this->params()->fromRoute('lang');
    	 
    	$currentUserId = User::currentLoginId();
    	$currentUser = $this->find('User\Entity\User',$currentUserId);
    	
    	if($currentUser->isAdmin()){
    		$view =  new ViewModel(array(
    				"lang_code" => $lang_code,
    		));
    		$view->setTemplate('admin/project/new.phtml');
    		return $view;
    	} else if ($currentUser->isEmployer()){
    		$view =  new ViewModel(array(
    				"lang_code" => $lang_code,
    		));
    		$view->setTemplate('admin/project/client-new.phtml');
    		return $view;
    	}
    	
        $lang_code = $this->params()->fromRoute('lang');
		return new ViewModel(array(
			"lang_code" => $lang_code,
        ));
    }
	


    public function uploadFileAction(){
		//error_reporting(E_ALL);
		//ini_set('display_errors', 1);
		$this->requiredLogin = false;
		//$projectId = $this->params()->fromQuery('projectId');
		//$taskId = $this->params()->fromQuery('taskId');
		$projectId = $this->getRequest()->getPost('projectId');
		$taskId = $this->getRequest()->getPost('taskId');
		$langId = $this->getRequest()->getPost('langId');
		//var_dump($projectId);
		//var_dump($taskId);exit;
		
		$entityManager = $this->getEntityManager();
		$project = $entityManager->find('\User\Entity\Project', (int)$projectId);
		
		$task = $entityManager->find('\User\Entity\Task', (int)$taskId);
		
		$lang = $entityManager->find('\User\Entity\Language', (int)$langId);

        if ( !empty( $_FILES ) ) {

            $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
            $name = $_FILES[ 'file' ][ 'name' ];

            // added rand number to prevent errors if users upload same named files
            $token = "". time() . rand(11, 99);
            $uploadPath = 'public/uploads' . DIRECTORY_SEPARATOR . $token . basename( $name );

            move_uploaded_file( $tempPath, $uploadPath );
            $file = new File();
            $file->setData([
                'name' => $_FILES[ 'file' ][ 'name' ],
                'path' => $uploadPath,
                'token' => $token,
                'size' => $_FILES['file']['size'],
                'time' => time(),
				'project' => $project,
				'task' => $task,
				'language' => $lang,
            ]);
            $file->save($this->getEntityManager());
            $answer = [
                'file' => $file->getData(),
                'success' => true,
            ];
            $json = json_encode( $answer );

            echo $json;
            die;

        } else {
            $answer = ['success' => false];
            $json = json_encode( $answer );
            die($json);
        }
    }

    public function downloadFileAction(){
        if ( $token = $this->params()->fromQuery('token') ) {
            $entityManager = $this->getEntityManager();
            $file = $entityManager->getRepository('\User\Entity\File')->findOneBy(
    array('token' => $token));

            $downloadPath = $file->getPath();
            // ob_end_clean();

            // var_dump($downloadPath);
            if(!is_file($downloadPath)) {
                $answer = ['success' => false];
                $json = json_encode( $answer );
                die($json);
            }

            $fileContents = file_get_contents($downloadPath);

            $response = $this->getResponse();
            $response->setContent($fileContents);
            $response->setStatusCode(200);

            $headers = $response->getHeaders();
            $headers->clearHeaders()
                ->addHeaderLine('Content-Type', 'application/octet-stream')
                ->addHeaderLine('Content-Disposition', 'attachment; filename="' . $file->getName() . '"')
                ->addHeaderLine('Content-Length', strlen($fileContents));

            // var_dump($file->getData());
            $response->setHeaders($headers);
            return $response;
        } else {
            $answer = ['success' => false];
            $json = json_encode( $answer );
            die($json);
        }
    }

    public function getFilesListAction(){
        if ( $id = $this->params()->fromQuery('project_id') ) {
            $entityManager = $this->getEntityManager();
            $project = $entityManager->find('User\Entity\Project', (int)$id);
            $repository = $entityManager->getRepository('User\Entity\File');
            $files = $repository->findBy( array('project'=>$project) );

            $json = array();

            foreach ($files as $file){
                $d = $file->getData();
                $json[] = [
                	'id'  => $d['id'],
                    'token' => $d['token'],
        			"name" => $d['name'],
        			"time" => $d['time'],
        			"size" => $d['size'],
                    "task" => $d['task'],
                    "language" => $d['language'],
                ];
                // $json[] = $d;
            }

            $json = json_encode( $json );
            echo $json;
            die;
        } else {
            $answer = ['success' => false];
            $json = json_encode( $answer );
            die($json);
        }
    }


    public function detailAction(){
        $id = $this->params()->fromQuery('id');
		$lang_code = $this->params()->fromRoute('lang');
		
		$currentUserId = User::currentLoginId();
		$currentUser = $this->find('User\Entity\User',$currentUserId);
		return new ViewModel([
            'id' => $id,
			"lang_code" => $lang_code,
			"isemployer" => $currentUser->isEmployer(),
        ]);
    }
	public function quoteeditAction(){
        $id = $this->params()->fromQuery('id');
		$lang_code = $this->params()->fromRoute('lang');
        return new ViewModel([
            'id' => $id,
			"lang_code" => $lang_code
        ]);
    }
	
	public function quoteprintAction(){
		$id = $this->params()->fromQuery('id');
		//$id= 35;
		$lang_code = $this->params()->fromRoute('lang');
		$viewModel = new ViewModel();
		$viewModel->setVariables(array('id' => $id, 'lang_code' => $lang_code))
             ->setTerminal(true);
        return $viewModel;
    }
	public function quotedownloadAction(){
		//error_reporting(E_ALL);
		//ini_set('display_errors', 1);
		$renderer = new PhpRenderer();
		//whole TCPDF's settings goes here
		$id = $this->params()->fromQuery('id');
		$lang_code = $this->params()->fromRoute('lang');
		// Get Project
		$entityManager = $this->getEntityManager();
		$project = $entityManager->find('\User\Entity\Project', (int)$id);
		$project_data = $project->getData();
		$dueDate = $project_data["dueDate"]->format('d M Y');
		$startDate = $project_data["startDate"]->format('d M Y');
		$types = $project_data['types'];
		$hasTypeTranslationNoTM = 0;
		$hasTypeTranslationUseTM = 0;
		$hasTypeDesktopPublishingWin = 0;
		$hasTypeDesktopPublishingMac = 0;	
		$hasTypeDesktopPublishingEngineer = 0;			
		$hasTypeDesktopPublishingInterpreting = 0;		
		foreach($types as $type)
		{
			if($type == 1)
				$hasTypeTranslationNoTM = 1;
			else if($type == 2)
				$hasTypeTranslationUseTM = 1;
			else if($type == 3)
				$hasTypeDesktopPublishingWin = 1;
			else if($type == 4)
				$hasTypeDesktopPublishingMac = 1;		
			else if($type == 5)
				$hasTypeDesktopPublishingEngineer = 1;		
			else if($type > 5)
				$hasTypeDesktopPublishingInterpreting = 1;	
		}
		if($project_data['serviceLevel']==1)
			$serviceLevel = "Professional";
		else if($project_data['serviceLevel']==2)	
			$serviceLevel = "Business";
		else if($project_data['serviceLevel']==3)	
			$serviceLevel = "Premium";	
		
		//var_dump($project->getData()->);exit;
		//Get company info
		$companyinfo = $entityManager->find('\Admin\Entity\ProfileInfo', 1);
		$subtotal = 0;
		//get iterm translation
        $repository = $entityManager->getRepository('User\Entity\Itermnotm');
        $iterm_translation = $repository->findBy( array('project'=>$project) );
        $iterm_translations = array();
        foreach ( $iterm_translation as $k => $v ) {
            $iterm_translations[$k] = $v->getData();
			if($hasTypeTranslationNoTM == 1)
				$subtotal = $subtotal +  $iterm_translations[$k]['total'];
        } 

		//get iterm translationtm
        $repository = $entityManager->getRepository('User\Entity\Itermtm');
        $iterm_translationtm = $repository->findBy( array('project'=>$project) );
        $iterm_translationtms = array();
        foreach ( $iterm_translationtm as $k => $v ) {
			$tmp = $v->getData();
            $iterm_translationtms[$tmp['language']['id']] = $v->getData();
			if($hasTypeTranslationUseTM == 1)
				$subtotal = $subtotal +  $iterm_translationtms[$k]['total'];
        } 
		//var_dump($iterm_translationtms);exit;
		//get iterm iterm_dtppcs
        $repository = $entityManager->getRepository('User\Entity\Itermdtppc');
        $iterm_dtppc = $repository->findBy( array('project'=>$project) );
        $iterm_dtppcs = array();
        foreach ( $iterm_dtppc as $k => $v ) {
			$tmp = $v->getData();
			if($tmp['unit'] == 1)
				$tmp['unit']= 'Day';
			else $tmp['unit']= 'Half Day';	
            $iterm_dtppcs[$k] = $tmp;
			if($hasTypeDesktopPublishingWin == 1)
				$subtotal = $subtotal +  $iterm_dtppcs[$k]['total'];	
        } 
		
		//get iterm iterm_dtpmac
        $repository = $entityManager->getRepository('User\Entity\Itermdtpmac');
        $iterm_dtpmac = $repository->findBy( array('project'=>$project) );
        $iterm_dtpmacs = array();
        foreach ( $iterm_dtpmac as $k => $v ) {
			$tmp = $v->getData();
			if($tmp['unit'] == 1)
				$tmp['unit']= 'Day';
			else $tmp['unit']= 'Half Day';	
            $iterm_dtpmacs[$k] = $tmp;
			if($hasTypeDesktopPublishingMac == 1)
				$subtotal = $subtotal +  $iterm_dtpmacs[$k]['total'];	
        } 
		//var_dump($iterm_dtpmacs);exit;
		// Get Interpreting Price
        $repository = $entityManager->getRepository('User\Entity\Iterminterpreting');
        $iterm_interpreting = $repository->findBy( array('project'=>$project) );
        $iterm_interpretings = array();
        foreach ( $iterm_interpreting as $k => $v ) {
			$tmp = $v->getData();
			if($tmp['unit'] == 1) 
				$tmp['unit'] = 'Day';
			else if($tmp['unit'] == 2) 
				$tmp['unit'] = 'Half Day';
				
            $iterm_interpretings[$k] = $tmp;
			if($hasTypeDesktopPublishingInterpreting == 1)
				$subtotal = $subtotal +  $iterm_interpretings[$k]['total'];
        } 	
		
		// Get Itermengineering 
        $repository = $entityManager->getRepository('User\Entity\Itermengineering');
        $iterm_engineering = $repository->findBy( array('project'=>$project) );
        $iterm_engineerings = array();
        foreach ( $iterm_engineering as $k => $v ) {
			$tmp = $v->getData();
			if($tmp['unit'] == 1) 
				$tmp['unit'] = 'Hour';
			else if($tmp['unit'] == 2) 
				$tmp['unit'] = 'Day';
			else if($tmp['unit'] == 3) 
				$tmp['unit'] = 'Month';
			else  if($tmp['unit'] == 4) 
				$tmp['unit'] = 'Word';	
			else  if($tmp['unit'] == 5) 
				$tmp['unit'] = 'Graphic';				
			else $tmp['unit'] = 'Page';			
            $iterm_engineerings[$k] = $tmp;
			if($hasTypeDesktopPublishingEngineer == 1)
				$subtotal = $subtotal +  $iterm_engineerings[$k]['total'];
        } 	

		
		$view = $this->getServiceLocator()->get('Zend\View\Renderer\RendererInterface');
		$viewModel = new ViewModel();
		$template = '/admin/project/quotedownload';
		$viewModel->setTemplate($template)
				->setVariables(array(
				'id' => $id, 
				'lang_code' => $lang_code,
				'project' => $project->getData(),
				'companyinfo' => $companyinfo->getData(),
				'hasTypeTranslationNoTM' => $hasTypeTranslationNoTM,
				'hasTypeTranslationUseTM' => $hasTypeTranslationUseTM,
				'hasTypeDesktopPublishingWin' => $hasTypeDesktopPublishingWin,
				'hasTypeDesktopPublishingMac' => $hasTypeDesktopPublishingMac,	
				'hasTypeDesktopPublishingEngineer' => $hasTypeDesktopPublishingEngineer,			
				'hasTypeDesktopPublishingInterpreting' => $hasTypeDesktopPublishingInterpreting,	
				'iterm_translations' => $iterm_translations,
				'iterm_translationtms' => $iterm_translationtms,
				'iterm_dtppcs' => $iterm_dtppcs,
				'iterm_dtpmacs' => $iterm_dtpmacs,
				'iterm_interpretings' => $iterm_interpretings,
				'iterm_engineerings' => $iterm_engineerings,
				'serviceLevel' => $serviceLevel,
				'subtotal' => $subtotal,
				'dueDate' => $dueDate,
				'startDate' => $startDate
				))
				->setTerminal(true);
		//return $viewModel;
		$content = $view->render($viewModel);
		// set array for viewer preferences
		$pdf = new \TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
		$preferences = array(
			'HideToolbar' => true,
			'HideMenubar' => true,
			'HideWindowUI' => true,
			'FitWindow' => true,
			'CenterWindow' => true,
			'DisplayDocTitle' => true,
			'NonFullScreenPageMode' => 'UseNone', // UseNone, UseOutlines, UseThumbs, UseOC
			'ViewArea' => 'CropBox', // CropBox, BleedBox, TrimBox, ArtBox
			'ViewClip' => 'CropBox', // CropBox, BleedBox, TrimBox, ArtBox
			'PrintArea' => 'CropBox', // CropBox, BleedBox, TrimBox, ArtBox
			'PrintClip' => 'CropBox', // CropBox, BleedBox, TrimBox, ArtBox
			'PrintScaling' => 'AppDefault', // None, AppDefault
			'Duplex' => 'DuplexFlipLongEdge', // Simplex, DuplexFlipShortEdge, DuplexFlipLongEdge
			'PickTrayByPDFSize' => true,
			'PrintPageRange' => array(1,1,2,3),
			'NumCopies' => 2
		);

		// Check the example n. 60 for advanced page settings

		// set pdf viewer preferences
		$pdf->setViewerPreferences($preferences);
		// add a page
		$pdf->AddPage();
		// output the HTML content
		$pdf->writeHTML($content, true, false, true, false, '');
		$pdf->lastPage();
		$pdf->Output("pdf-name.pdf", 'D');
		exit;
    }
	public function invoiceprintAction(){
		//error_reporting(E_ALL);
		//ini_set('display_errors', 1);
		$id = $this->params()->fromQuery('id');
		$lang_code = $this->params()->fromRoute('lang');
		$viewModel = new ViewModel();
		$viewModel->setVariables(array('id' => $id, 'lang_code' => $lang_code))
             ->setTerminal(true);
        return $viewModel;
    }
	
	public function invoicedownloadAction(){
		//error_reporting(E_ALL);
		//ini_set('display_errors', 1);
		$renderer = new PhpRenderer();
		//whole TCPDF's settings goes here
		$id = $this->params()->fromQuery('id');
		$lang_code = $this->params()->fromRoute('lang');
		// Get Project
		$entityManager = $this->getEntityManager();
		$project = $entityManager->find('\User\Entity\Project', (int)$id);
		$project_data = $project->getData();
		$types = $project_data['types'];
		$hasTypeTranslationNoTM = 0;
		$hasTypeTranslationUseTM = 0;
		$hasTypeDesktopPublishingWin = 0;
		$hasTypeDesktopPublishingMac = 0;	
		$hasTypeDesktopPublishingEngineer = 0;			
		$hasTypeDesktopPublishingInterpreting = 0;		
		foreach($types as $type)
		{
			if($type == 1)
				$hasTypeTranslationNoTM = 1;
			else if($type == 2)
				$hasTypeTranslationUseTM = 1;
			else if($type == 3)
				$hasTypeDesktopPublishingWin = 1;
			else if($type == 4)
				$hasTypeDesktopPublishingMac = 1;		
			else if($type == 5)
				$hasTypeDesktopPublishingEngineer = 1;		
			else if($type > 5)
				$hasTypeDesktopPublishingInterpreting = 1;	
		}
		if($project_data['serviceLevel']==1)
			$serviceLevel = "Professional";
		else if($project_data['serviceLevel']==2)	
			$serviceLevel = "Business";
		else if($project_data['serviceLevel']==3)	
			$serviceLevel = "Premium";	
		
		//get invoice
        $repository = $entityManager->getRepository('User\Entity\Invoice');
        $invoice = $repository->findBy( array('project'=>$project) );
        $invoices = array();
        foreach ( $invoice as $k => $v ) {
            $invoices[$k] = $v->getData();
        } 
		$invoices = $invoices[0];
		$invoiceDate = '';
		$dueDate = '';
		if($invoices['invoiceDate'])
			$invoiceDate = $invoices['invoiceDate']->format('d M Y');
		if($invoices['dueDate'])
			$dueDate = $invoices['dueDate']->format('d M Y');
		//Get company info
		$companyinfo = $entityManager->find('\Admin\Entity\ProfileInfo', 1);
		//Get bank info
		$bankinfo = $entityManager->find('\Admin\Entity\ProfileBank', 1);
		$subtotal = 0;
		//get iterm translation
        $repository = $entityManager->getRepository('User\Entity\Itermnotm');
        $iterm_translation = $repository->findBy( array('project'=>$project) );
        $iterm_translations = array();
        foreach ( $iterm_translation as $k => $v ) {
            $iterm_translations[$k] = $v->getData();
			if($hasTypeTranslationNoTM == 1)
				$subtotal = $subtotal +  $iterm_translations[$k]['total'];
        } 

		//get iterm translationtm
        $repository = $entityManager->getRepository('User\Entity\Itermtm');
        $iterm_translationtm = $repository->findBy( array('project'=>$project) );
        $iterm_translationtms = array();
        foreach ( $iterm_translationtm as $k => $v ) {
			$tmp = $v->getData();
            $iterm_translationtms[$tmp['language']['id']] = $v->getData();
			if($hasTypeTranslationUseTM == 1)
				$subtotal = $subtotal +  $iterm_translationtms[$k]['total'];
        } 
		//get iterm iterm_dtppcs
        $repository = $entityManager->getRepository('User\Entity\Itermdtppc');
        $iterm_dtppc = $repository->findBy( array('project'=>$project) );
        $iterm_dtppcs = array();
        foreach ( $iterm_dtppc as $k => $v ) {
			$tmp = $v->getData();
			if($tmp['unit'] == 1)
				$tmp['unit']= 'Day';
			else $tmp['unit']= 'Half Day';	
            $iterm_dtppcs[$k] = $tmp;
			if($hasTypeDesktopPublishingWin == 1)
				$subtotal = $subtotal +  $iterm_dtppcs[$k]['total'];	
        } 
		
		//get iterm iterm_dtpmac
        $repository = $entityManager->getRepository('User\Entity\Itermdtpmac');
        $iterm_dtpmac = $repository->findBy( array('project'=>$project) );
        $iterm_dtpmacs = array();
        foreach ( $iterm_dtpmac as $k => $v ) {
			$tmp = $v->getData();
			if($tmp['unit'] == 1)
				$tmp['unit']= 'Day';
			else $tmp['unit']= 'Half Day';	
            $iterm_dtpmacs[$k] = $tmp;
			if($hasTypeDesktopPublishingMac == 1)
				$subtotal = $subtotal +  $iterm_dtpmacs[$k]['total'];	
        } 
		// Get Interpreting Price
        $repository = $entityManager->getRepository('User\Entity\Iterminterpreting');
        $iterm_interpreting = $repository->findBy( array('project'=>$project) );
        $iterm_interpretings = array();
        foreach ( $iterm_interpreting as $k => $v ) {
			$tmp = $v->getData();
			if($tmp['unit'] == 1) 
				$tmp['unit'] = 'Day';
			else if($tmp['unit'] == 2) 
				$tmp['unit'] = 'Half Day';
				
            $iterm_interpretings[$k] = $tmp;
			if($hasTypeDesktopPublishingInterpreting == 1)
				$subtotal = $subtotal +  $iterm_interpretings[$k]['total'];
        } 	
		
		// Get Itermengineering 
        $repository = $entityManager->getRepository('User\Entity\Itermengineering');
        $iterm_engineering = $repository->findBy( array('project'=>$project) );
        $iterm_engineerings = array();
        foreach ( $iterm_engineering as $k => $v ) {
			$tmp = $v->getData();
			if($tmp['unit'] == 1) 
				$tmp['unit'] = 'Hour';
			else if($tmp['unit'] == 2) 
				$tmp['unit'] = 'Day';
			else if($tmp['unit'] == 3) 
				$tmp['unit'] = 'Month';
			else  if($tmp['unit'] == 4) 
				$tmp['unit'] = 'Word';	
			else  if($tmp['unit'] == 5) 
				$tmp['unit'] = 'Graphic';				
			else $tmp['unit'] = 'Page';			
            $iterm_engineerings[$k] = $tmp;
			if($hasTypeDesktopPublishingEngineer == 1)
				$subtotal = $subtotal +  $iterm_engineerings[$k]['total'];
        } 	

		
		$view = $this->getServiceLocator()->get('Zend\View\Renderer\RendererInterface');
		$viewModel = new ViewModel();
		$template = '/admin/project/invoicedownload';
		$viewModel->setTemplate($template)
				->setVariables(array(
				'id' => $id, 
				'lang_code' => $lang_code,
				'project' => $project->getData(),
				'companyinfo' => $companyinfo->getData(),
				'bankinfo' => $bankinfo?$bankinfo->getData():null,
				'hasTypeTranslationNoTM' => $hasTypeTranslationNoTM,
				'hasTypeTranslationUseTM' => $hasTypeTranslationUseTM,
				'hasTypeDesktopPublishingWin' => $hasTypeDesktopPublishingWin,
				'hasTypeDesktopPublishingMac' => $hasTypeDesktopPublishingMac,	
				'hasTypeDesktopPublishingEngineer' => $hasTypeDesktopPublishingEngineer,			
				'hasTypeDesktopPublishingInterpreting' => $hasTypeDesktopPublishingInterpreting,	
				'iterm_translations' => $iterm_translations,
				'iterm_translationtms' => $iterm_translationtms,
				'iterm_dtppcs' => $iterm_dtppcs,
				'iterm_dtpmacs' => $iterm_dtpmacs,
				'iterm_interpretings' => $iterm_interpretings,
				'iterm_engineerings' => $iterm_engineerings,
				'serviceLevel' => $serviceLevel,
				'subtotal' => $subtotal,
				'invoices' => $invoices,
				'dueDate' => $dueDate,
				'invoiceDate' => $invoiceDate
				))
				->setTerminal(true);
		//return $viewModel;
		$content = $view->render($viewModel);
		// set array for viewer preferences
		$pdf = new \TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
		$preferences = array(
			'HideToolbar' => true,
			'HideMenubar' => true,
			'HideWindowUI' => true,
			'FitWindow' => true,
			'CenterWindow' => true,
			'DisplayDocTitle' => true,
			'NonFullScreenPageMode' => 'UseNone', // UseNone, UseOutlines, UseThumbs, UseOC
			'ViewArea' => 'CropBox', // CropBox, BleedBox, TrimBox, ArtBox
			'ViewClip' => 'CropBox', // CropBox, BleedBox, TrimBox, ArtBox
			'PrintArea' => 'CropBox', // CropBox, BleedBox, TrimBox, ArtBox
			'PrintClip' => 'CropBox', // CropBox, BleedBox, TrimBox, ArtBox
			'PrintScaling' => 'AppDefault', // None, AppDefault
			'Duplex' => 'DuplexFlipLongEdge', // Simplex, DuplexFlipShortEdge, DuplexFlipLongEdge
			'PickTrayByPDFSize' => true,
			'PrintPageRange' => array(1,1,2,3),
			'NumCopies' => 2
		);
		// set pdf viewer preferences
		$pdf->setViewerPreferences($preferences);
		// add a page
		$pdf->AddPage();
		// output the HTML content
		$pdf->writeHTML($content, true, false, true, false, '');
		$pdf->lastPage();
		$pdf->Output("pdf-name.pdf", 'D');
		exit;
    }
    
	
    public function wordcountAction(){
    	$file_id = $this->params()->fromQuery('fileId');
    	$file = $this->find('User\Entity\File',$file_id);
    	//var_dump($file);
    	$datawordcount = $file->file_word_count();
    	return new JsonModel(array(
    			'datawordcount' => $datawordcount
    	));
    }

}
