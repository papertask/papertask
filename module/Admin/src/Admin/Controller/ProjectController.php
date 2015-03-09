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
		$lang_code = $this->params()->fromRoute('lang');
		$viewModel = new ViewModel();
		$viewModel->setVariables(array('id' => $id, 'lang_code' => $lang_code))
             ->setTerminal(true);
        return $viewModel;
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
