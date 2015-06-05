<?php 

namespace Landing\Controller;

use Zend\View\Model\ViewModel;
use Zend\View\Model\JsonModel;
use Zend\View\Renderer\PhpRenderer;
use Application\Controller\AbstractActionController;
use User\Entity\File;
use User\Entity\User;
use Application\Controller\AbstractRestfulController;

class FileController extends AbstractActionController
{
	public function uploadFileAction(){
		error_reporting(E_ALL);
		ini_set('display_errors', 1);
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
	
	public function wordcountAction(){
		$file_id = $this->params()->fromQuery('fileId');
		$file = $this->find('User\Entity\File',$file_id);
		//var_dump($file);
		$datawordcount = $file->file_word_count();
		
		$answer = [
		'datawordcount' => $datawordcount,
		'success' => true,
		];
		$json = json_encode( $answer );
		
		echo $json;
		die;
	}
}

?>