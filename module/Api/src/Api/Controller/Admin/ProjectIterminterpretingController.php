<?php
namespace Api\Controller\Admin;

use Zend\View\Model\JsonModel;
use Zend\Paginator\Paginator;

use DoctrineORMModule\Paginator\Adapter\DoctrinePaginator as DoctrineAdapter;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;

use Admin\Model\Helper;
use Api\Controller\AbstractRestfulJsonController;
use User\Entity\Iterm;
use User\Entity\Itermdtpmac;
use User\Entity\Itermdtppc;
use User\Entity\Itermengineering;
use User\Entity\Iterminterpreting;
use User\Entity\Itermtm;
use User\Entity\Itermnotm;

use User\Entity\Project;

use User\Entity\UserGroup;
use User\Entity\Task;

class ProjectIterminterpretingController extends AbstractRestfulJsonController
{
    /**
     * Clean data from angular
     * @param $data
     */
    protected function cleanData(&$data){
       
    }

    public function create($data)
    {
		$projectid = $this->getRequest()->getQuery('projectid');
		$iterm = new Iterminterpreting();
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
		if($data['rate_client']){
		$iterm->setData([
			'name' => $data['name'],
			'file' => ($file)?$file:null,
			'rate' => $data['rate_client'],
			'quantity' => $data['quantity'],
			'total' => $data['total'],
			'language' => $language,
		]);
		}else{
		$iterm->setData([
			'name' => $data['name'],
			'file' => ($file)?$file:null,
			'rate_freelancer' => $data['rate'],
			'quantity' => $data['quantity'],
			'total_freelancer' => $data['total'],
			'language' => $language,
		]);
		}
		$iterm->save($this->getEntityManager());
		//add task if have not
		$entityManager = $this->getEntityManager();
		$repository = $entityManager->getRepository('User\Entity\Task');
        $task = $repository->findBy(array('project'=>$project, 'language'=>$language, 'type'=>1));
		if(!$task){
			$task = new Task();
			$task->setData([
                    'project' => $project,
                    'language' => $language,
                    'type' => 1,
                    'status' => 3,
					'task_number' => $task_number,
                ]);
			$task->save($this->getEntityManager());
		}
		return new JsonModel([
            'iterm' => $iterm->getData(),
        ]);
    }

    public function getList(){
        $entityManager = $this->getEntityManager();
        $projectId = $this->getRequest()->getQuery('projectId');
        $project = $entityManager->getRepository('\User\Entity\Project')->find( $projectId );
        $Iterminterpreting = $entityManager->getRepository('\User\Entity\Iterminterpreting')->findBy(array('project'=>$project));
        $Iterminterpretings = array();
        foreach( $Iterminterpreting as $k => $v ) 
        {
            $Iterminterpretings[$k] = $v->getData();
        }
        return new JsonModel(['Iterminterpretings'=>$Iterminterpretings]);
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
        $iterminterpreting = $entityManager->find('\User\Entity\Iterminterpreting', $id);
        $entityManager->remove($iterminterpreting);
        $entityManager->flush();
        return new JsonModel([]);
    }

    public function update($id, $data){
			$entityManager = $this->getEntityManager();
		   if($data['file'])
			 $file = $this->find('\User\Entity\File', $data['file']['id']);
           $iterminterpreting = $entityManager->find('\User\Entity\Iterminterpreting', $id);
		   if($data['rate_client']){
           $iterminterpreting->setData([
				'name' => $data['name'],
				'file' => ($file)?$file:null,
				'rate' => $data['rate'],
				'quantity' => $data['quantity'],
				'total' => $data['total'],
           ]);
		   }else{
		   $iterminterpreting->setData([
				'name' => $data['name'],
				'file' => ($file)?$file:null,
				'rate_freelancer' => $data['rate'],
				'quantity' => $data['quantity'],
				'total_freelancer' => $data['total'],
           ]);
		   }
           
           $iterminterpreting->save($entityManager);
           
           return new JsonModel([
               'iterminterpreting' => $iterminterpreting->getData(),
           ]);
    }
}