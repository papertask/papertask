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

class ProjectItermengineeringController extends AbstractRestfulJsonController
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
		$iterm = new Itermengineering();
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
		$engineeringcategory = $this->find('\Common\Entity\EngineeringCategory', $data['engineeringcategory']['id']); 
		//$unit = ($data['unit'] == 'Hour')?1:2;
		
		//var_dump($data['unit']);exit;
		$iterm->setData([
			'name' => $data['name'],
			'unit' => $data['unit']['id'],
			'file' => ($file)?$file:null,
			'rate' => $data['rate'],
			'quantity' => $data['quantity'],
			'total' => $data['total'],
			'language' => $language,
			'engineeringcategory' => $engineeringcategory,
		]);
		$iterm->save($this->getEntityManager());
		//add task if have not
		$entityManager = $this->getEntityManager();
		$repository = $entityManager->getRepository('User\Entity\Task');
        $task = $repository->findBy(array('project'=>$project, 'language'=>$language, 'type'=>6));
		if(!$task){
			$task = new Task();
			$task->setData([
                    'project' => $project,
                    'language' => $language,
                    'type' => 6,
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
        $Itermengineering = $entityManager->getRepository('\User\Entity\Itermengineering')->findBy(array('project'=>$project));
        $Itermengineerings = array();
        foreach( $Itermengineering as $k => $v ) 
        {
            $Itermengineerings[$k] = $v->getData();
        }
        return new JsonModel(['Itermengineerings'=>$Itermengineerings]);
    }

    public function get($id){
		
    }

    public function delete($id){
        $entityManager = $this->getEntityManager();
        $itermengineering = $entityManager->find('\User\Entity\Itermengineering', $id);
        $entityManager->remove($itermengineering);
        $entityManager->flush();
        return new JsonModel([]);
    }

    public function update($id, $data){
       $entityManager = $this->getEntityManager();
		   if($data['file']['id'])
			 $file = $this->find('\User\Entity\File', $data['file']['id']);
			 
			$engineeringcategory = $this->find('\Common\Entity\EngineeringCategory', $data['engineeringcategory']['id']); 
           $itermengineering = $entityManager->find('\User\Entity\Itermengineering', $id);
           $itermengineering->setData([
				'name' => $data['name'],
				'unit' => $data['unit']['id'],
				'file' => ($file)?$file:null,
				'rate' => $data['rate'],
				'quantity' => $data['quantity'],
				'total' => $data['total'],
				'engineeringcategory' => $engineeringcategory,
           ]);
           
           $itermengineering->save($entityManager);
           
           return new JsonModel([
               'itermengineering' => $itermengineering->getData(),
           ]);
    }
}