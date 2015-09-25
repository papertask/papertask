<?php
namespace Api\Controller\Admin;

use Zend\View\Model\JsonModel;
use Zend\Paginator\Paginator;

use DoctrineORMModule\Paginator\Adapter\DoctrinePaginator as DoctrineAdapter;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;

use Admin\Model\Helper;
use Api\Controller\AbstractRestfulJsonController;
use User\Entity\Itermdtpmac;
use User\Entity\Project;

use User\Entity\UserGroup;
use User\Entity\Task;

class ProjectItermdtpmacController extends AbstractRestfulJsonController
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
		$iterm = new Itermdtpmac();
		if($data['file'])
			$file = $this->find('\User\Entity\File', $data['file']['id']);
		$project = $this->find('User\Entity\Project', $projectid);
		$iterm->setProject($project);
		$language = $this->find('User\Entity\Language', $data['languageid']);
		$software = $this->find('\User\Entity\DesktopSoftware', $data['software']['id']); 
		
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
		if($data['rate_client']){
		$iterm->setData([
			'name' => $data['name'],
			'unit' => $data['unit']['id'],
			'file' => ($file)?$file:null,
			'rate' => $data['rate_client'],
			'quantity' => $data['quantity'],
			'total' => $data['total'],
			'language' => $language,
			'software' => $software,
		]);
		}else{
		$iterm->setData([
			'name' => $data['name'],
			'unit' => $data['unit']['id'],
			'file' => ($file)?$file:null,
			'rate_freelancer' => $data['rate'],
			'quantity' => $data['quantity'],
			'total_freelancer' => $data['total'],
			'language' => $language,
			'software' => $software,
		]);
		}
		$iterm->save($this->getEntityManager());
		//add task if have not
		$entityManager = $this->getEntityManager();
		$repository = $entityManager->getRepository('User\Entity\Task');
        $task = $repository->findBy(array('project'=>$project, 'language'=>$language, 'type'=>4));
		if(!$task){
			$task = new Task();
			$task->setData([
					
                    'project' => $project,
                    'language' => $language,
                    'type' => 4,
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
        $Itermdtpmac = $entityManager->getRepository('\User\Entity\Itermdtpmac')->findBy(array('project'=>$project));
        $Itermdtpmacs = array();
        foreach( $Itermdtpmac as $k => $v ) 
        {
            $Itermdtpmacs[$k] = $v->getData();
        }
        return new JsonModel(['Itermdtpmacs'=>$Itermdtpmacs]);
    }

    public function get($id){
		
    }

    public function delete($id){
        $entityManager = $this->getEntityManager();
        $itermdtpmac = $entityManager->find('\User\Entity\Itermdtpmac', $id);
        $entityManager->remove($itermdtpmac);
        $entityManager->flush();
        return new JsonModel([]);
    }

    public function update($id, $data){
          $entityManager = $this->getEntityManager();
		   if($data['file'])
			 $file = $this->find('\User\Entity\File', $data['file']['id']);
			 
			$software = $this->find('\User\Entity\DesktopSoftware', $data['software']['id']); 
           $itermdtpmac = $entityManager->find('\User\Entity\Itermdtpmac', $id);
           if($data['rate_client']){
		   $itermdtpmac->setData([
				'name' => $data['name'],
				'unit' => $data['unit']['id'],
				'file' => ($file)?$file:null,
				'rate' => $data['rate'],
				'quantity' => $data['quantity'],
				'total' => $data['total'],
				'software' => $software,
           ]);
		   }else{
		   $itermdtpmac->setData([
				'name' => $data['name'],
				'unit' => $data['unit']['id'],
				'file' => ($file)?$file:null,
				'rate_freelancer' => $data['rate'],
				'quantity' => $data['quantity'],
				'total_freelancer' => $data['total'],
				'software' => $software,
           ]);
		   }
           
           $itermdtpmac->save($entityManager);
           
           return new JsonModel([
               'itermdtpmac' => $itermdtpmac->getData(),
           ]);
    }
}