<?php
namespace Api\Controller\Admin;

use Zend\View\Model\JsonModel;
use Zend\Paginator\Paginator;

use DoctrineORMModule\Paginator\Adapter\DoctrinePaginator as DoctrineAdapter;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;

use Admin\Model\Helper;
use Api\Controller\AbstractRestfulJsonController;
use User\Entity\Itermnotm;
use User\Entity\Project;
use User\Entity\UserGroup;
use User\Entity\Task;

class ProjectItermnotmController extends AbstractRestfulJsonController
{
    /**
     * Clean data from angular
     * @param $data
     */
    protected function cleanData(&$data){
       
    }

    public function create($data)
    {
		//error_reporting(E_ALL);
		//ini_set('display_errors', 1);
		//var_dump($data['laguageid']);exit;
		$projectid = $this->getRequest()->getQuery('projectid');
		
		$projectid = $this->getRequest()->getQuery('projectid');

		$iterm = new Itermnotm();
		if($data['file'])
			$file = $this->find('\User\Entity\File', $data['file']['id']);
		$project = $this->find('User\Entity\Project', $projectid);
		$taskList = $this->getEntityManager()->getRepository('User\Entity\Task')->findBy(array('project' => $project));
		$taskOrderArr = array();
		foreach ($taskList as $task){
			$order = explode('-',$task->getTaskNumber());
			$order = $order[1];
			$taskOrderArr[] = (int)$order;
		}		
		$max = max($taskOrderArr);
		$max++;
		$task_number = $project->getProjectNo().'-'.$max;
		
		$iterm->setProject($project);
		$language = $this->find('User\Entity\Language', $data['languageid']);
		if($data['task_id']){
			$task = $this->find('User\Entity\Task', $data['task_id']);
			$iterm->setData([
				'name' => $data['name'],
				'file' => ($file)?$file:null,
				'rate_freelancer' => $data['rate'],
				'quantity' => $data['quantity'],
				'total_freelancer' => $data['total'],
				'language' => $language,
				'task' => $task,
				'of_freelancer' => ($data['of_freelancer'])?$data['of_freelancer']:0,
			]);
			
		}
		else{
			$iterm->setData([
				'name' => $data['name'],
				'file' => ($file)?$file:null,
				'rate_freelancer' => $data['rate'],
				'quantity' => $data['quantity'],
				'total_freelancer' => $data['total'],
				'language' => $language,
				'of_freelancer' => ($data['of_freelancer'])?$data['of_freelancer']:0,
			]);
		}
		$iterm->save($this->getEntityManager());
		//add task if have not
		$entityManager = $this->getEntityManager();
		$repository = $entityManager->getRepository('User\Entity\Task');
		
        //$task = $repository->findBy(array('project'=>$project, 'language'=>$language, 'type'=>1));
		//if(!$task){
			$task = new Task();
			$task->setData([
                    'project' => $project,
                    'language' => $language,
                    'type' => 1,
                    'status' => 3,
					'task_number' => $task_number,
                ]);
			$task->save($this->getEntityManager());
		//}
		return new JsonModel([
            'iterm' => $iterm->getData(),
        ]);
    }

    public function getList(){
        $entityManager = $this->getEntityManager();
        $projectId = $this->getRequest()->getQuery('projectId');
        $taskId = $this->getRequest()->getQuery('taskId');
        $project = $entityManager->getRepository('\User\Entity\Project')->find( $projectId );
		if($taskId){
			$task = $entityManager->getRepository('\User\Entity\Task')->find( $taskId );
			$Itermnotm = $entityManager->getRepository('\User\Entity\Itermnotm')->findBy(array('project'=>$project,'task'=>$task));
		}	
		else {
	        $Itermnotm = $entityManager->getRepository('\User\Entity\Itermnotm')->findBy(array('project'=>$project));
		}	
        $Itermnotms = array();
        foreach( $Itermnotm as $k => $v ) 
        {
            $Itermnotms[$k] = $v->getData();
        }
        return new JsonModel(['Itermnotms'=>$Itermnotms]);
    }

    public function get($id){
		//error_reporting(E_ALL);
		//ini_set('display_errors', 1);
		$entityManager = $this->getEntityManager();
        $project = $this->find('User\Entity\Itermnotm', $id);
        $Itermnotm = $entityManager->getRepository('\User\Entity\Itermnotm')->findBy(array('project'=>$project));
        $Itermnotms = array();
        foreach( $Itermnotm as $k => $v ) 
        {
            $Itermnotms[$k] = $v->getData();
        }
		var_dump($Itermnotms);exit;
		return new JsonModel([
            'project' => $project->getData(),
			'itermnotms' => $Itermnotms,
			
        ]);
    }

    public function delete($id){
	
		$entityManager = $this->getEntityManager();
        $Itermnotm = $entityManager->find('\User\Entity\Itermnotm', $id);
        $entityManager->remove($Itermnotm);
        $entityManager->flush();
        return new JsonModel([]);
    }


	
	 public function update( $id, $data ) {
           $entityManager = $this->getEntityManager();
		   if($data['file']['id'])
			 $file = $this->find('\User\Entity\File', $data['file']['id']);
           $itermnotm = $entityManager->find('\User\Entity\Itermnotm', $id);
           $itermnotm->setData([
				'name' => $data['name'],
				'file' => ($file)?$file:null,
				'rate_freelancer' => $data['rate'],
				'quantity' => $data['quantity'],
				'total_freelancer' => $data['total'],
           ]);
           
           $itermnotm->save($entityManager);
           
           return new JsonModel([
               'itermnotm' => $itermnotm->getData(),
           ]);
       }
}