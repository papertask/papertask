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
use Zend\View\Renderer\PhpRenderer;
use Application\Controller\AbstractActionController;
use User\Entity\File;

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

    public function newAction()
    {
        $lang_code = $this->params()->fromRoute('lang');
		return new ViewModel(array(
			"lang_code" => $lang_code,
        ));
    }
	

    public function uploadFileAction(){
        if ( !empty( $_FILES ) ) {

            $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
            $name = $_FILES[ 'file' ][ 'name' ];

            $uploadPath = 'public/uploads' . DIRECTORY_SEPARATOR . $name;

            move_uploaded_file( $tempPath, $uploadPath );
            $file = new File();
            $file->setData([
                'name' => $_FILES[ 'file' ][ 'name' ],
                'path' => $uploadPath,
                'size' => $_FILES['file']['size'],
                'time' => time(),
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


    public function detailAction(){
        $id = $this->params()->fromQuery('id');
		$lang_code = $this->params()->fromRoute('lang');
        return new ViewModel([
            'id' => $id,
			"lang_code" => $lang_code
        ]);
    }
	
	public function quoteprintAction(){
		error_reporting(E_ALL);
		ini_set('display_errors', 1);
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
            $iterm_translationtms[$k] = $v->getData();
			if($hasTypeTranslationUseTM == 1)
				$subtotal = $subtotal +  $iterm_translationtms[$k]['total'];
        } 
		
		//get iterm iterm_dtppcs
        $repository = $entityManager->getRepository('User\Entity\Itermdtppc');
        $iterm_dtppc = $repository->findBy( array('project'=>$project) );
        $iterm_dtppcs = array();
        foreach ( $iterm_dtppc as $k => $v ) {
            $iterm_dtppcs[$k] = $v->getData();
			if($hasTypeDesktopPublishingWin == 1)
				$subtotal = $subtotal +  $iterm_dtppcs[$k]['total'];	
        } 
		
		//get iterm iterm_dtpmac
        $repository = $entityManager->getRepository('User\Entity\Itermdtpmac');
        $iterm_dtpmac = $repository->findBy( array('project'=>$project) );
        $iterm_dtpmacs = array();
        foreach ( $iterm_dtpmac as $k => $v ) {
            $iterm_dtpmacs[$k] = $v->getData();
			if($hasTypeDesktopPublishingMac == 1)
				$subtotal = $subtotal +  $iterm_dtpmacs[$k]['total'];	
        } 
		//var_dump($iterm_dtpmacs);exit;
		// Get Interpreting Price
        $repository = $entityManager->getRepository('User\Entity\Iterminterpreting');
        $iterm_interpreting = $repository->findBy( array('project'=>$project) );
        $iterm_interpretings = array();
        foreach ( $iterm_interpreting as $k => $v ) {
            $iterm_interpretings[$k] = $v->getData();
			if($hasTypeDesktopPublishingInterpreting == 1)
				$subtotal = $subtotal +  $iterm_interpretings[$k]['total'];
        } 	
		
		// Get Itermengineering 
        $repository = $entityManager->getRepository('User\Entity\Itermengineering');
        $iterm_engineering = $repository->findBy( array('project'=>$project) );
        $iterm_engineerings = array();
        foreach ( $iterm_engineering as $k => $v ) {
            $iterm_engineerings[$k] = $v->getData();
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
				))
				->setTerminal(true);
		//return $viewModel;
		$content = $view->render($viewModel);
		//$uri = $this->getRequest()->getUri();
		//$scheme = $uri->getScheme();
		//$host = $uri->getHost();
		//$base = sprintf('%s://%s', $scheme, $host);
		//$base = $base.':8080/';
		//var_dump($base);exit;
		//$content .= '<style>'.file_get_contents('http://papertask.local:8080/assets/plugins/bootstrap/css/bootstrap.min.css').'</style>';
		//$content .= '<style>'.file_get_contents('http://papertask.local:8080/assets/css/style.css').'</style>';
		//$content .= '<style>'.file_get_contents('http://papertask.local:8080/assets/plugins/font-awesome/css/font-awesome.css').'</style>';

		
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
		//exit;
    }
	public function invoiceprintAction(){
		error_reporting(E_ALL);
		ini_set('display_errors', 1);
		$id = $this->params()->fromQuery('id');
		$lang_code = $this->params()->fromRoute('lang');
		$viewModel = new ViewModel();
		$viewModel->setVariables(array('id' => $id, 'lang_code' => $lang_code))
             ->setTerminal(true);
        return $viewModel;
    }
}
