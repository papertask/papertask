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
		$id= 35;
		$lang_code = $this->params()->fromRoute('lang');
		$viewModel = new ViewModel();
		$viewModel->setVariables(array('id' => $id, 'lang_code' => $lang_code))
             ->setTerminal(true);
        return $viewModel;
    }
	public function quotedownloadAction(){
		error_reporting(E_ALL);
		ini_set('display_errors', 1);
		$renderer = new PhpRenderer();
		//whole TCPDF's settings goes here
		$id = $this->params()->fromQuery('id');
		$lang_code = $this->params()->fromRoute('lang');
		 // Get Project
		
		$entityManager = $this->getEntityManager();
		$project = $entityManager->find('\User\Entity\Project', (int)$id);
		
		$companyinfo = $entityManager->find('\Admin\Entity\ProfileInfo', 1);

		$view = $this->getServiceLocator()->get('Zend\View\Renderer\RendererInterface');
		$viewModel = new ViewModel();
		$template = '/admin/project/quotedownload';
		$viewModel->setTemplate($template)
				->setVariables(array(
				'id' => $id, 
				'lang_code' => $lang_code,
				'project' => $project->getData(),
				'companyinfo' => $companyinfo->getData(),
				))
				->setTerminal(true);
		return $viewModel;
		$content = $view->render($viewModel);
		//$uri = $this->getRequest()->getUri();
		//$scheme = $uri->getScheme();
		//$host = $uri->getHost();
		//$base = sprintf('%s://%s', $scheme, $host);
		//$base = $base.':8080/';
		//var_dump($base);exit;
		$content .= '<style>'.file_get_contents('http://papertask.local:8080/assets/plugins/bootstrap/css/bootstrap.min.css').'</style>';
		$content .= '<style>'.file_get_contents('http://papertask.local:8080/assets/css/style.css').'</style>';
		$content .= '<style>'.file_get_contents('http://papertask.local:8080/assets/plugins/font-awesome/css/font-awesome.css').'</style>';

		
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
