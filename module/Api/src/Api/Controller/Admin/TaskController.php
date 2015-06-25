<?php
namespace Api\Controller\Admin;

use Zend\View\Model\JsonModel;
use Zend\Paginator\Paginator;

use DoctrineORMModule\Paginator\Adapter\DoctrinePaginator as DoctrineAdapter;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;

use Api\Controller\AbstractRestfulJsonController;
use User\Entity\Task;
use User\Entity\Activity;
use User\Entity\Language;
use User\Entity\User;

class TaskController extends AbstractRestfulJsonController
{
    protected function clearData(&$data){
        if(isset($data['type'])){
            $data['type'] = $data['type']['id'];
        }
        if(isset($data['language']['id'])){
            $data['language'] = $this->getReference('\User\Entity\Language', $data['language']['id']);
        } else if(isset($data['language'])){
        	$data['language'] = $this->getReference('\User\Entity\Language', $data['language']);
        }
        if(isset($data['project_id'])){
            $data['project'] = $this->getReference('\User\Entity\Project', $data['project_id']);
            unset($data['project_id']);
        }
        if(isset($data['startDate'])){
            $data['startDate'] = new \DateTime($data['startDate']);
        }
        if(isset($data['dueDate'])){
            $data['dueDate'] = new \DateTime($data['dueDate']);
        }
        if(isset($data['status'])){
            $data['status'] = $data['status']['id'];
        }
    }

    public function create($data){
		error_reporting(E_ALL);
		ini_set('display_errors', 1);
        
		$this->clearData($data);

		
        $task = new Task();
        $task->setData($data);
        $task->save($this->getEntityManager());

        $activity = new Activity();
        $activity->setData([
            'activityDate' => new \DateTime('NOW'),
            'project' => $data['project'],
            'task' => $task,
            'type' => "create_task",
            'sender' => $this->getCurrentUser()
        ]);
        $activity->save($this->getEntityManager());

        return new JsonModel([
            'task' => $task->getData(),
        ]);
    }
	
	public function get($id){
		$entityManager = $this->getEntityManager();
        $task = $this->find('User\Entity\Task', $id);
		return new JsonModel([
            'task' => $task->getData(),
			
        ]);
    }
	
    public function getList(){
        $projectId = $this->params()->fromQuery('project_id');
        
        $params = $this->getRequest()->getQuery();
        
        foreach($params as $key => $value){
        	if (strpos( $value,'{') !== false) {
        		$params->$key = json_decode($value);
        	}
        }
        
        //var_dump($params); exit;
        
        if($projectId){
        $tasks = $this->getAllDataBy('\User\Entity\Task', [
            'is_deleted' => false,
            'project' => $projectId
        ], ['id' => 'ASC']);
        return new JsonModel([
            'tasks' => $tasks,
        ]);
        } else {

        	$entityManager = $this->getEntityManager();
        	$projectList = $entityManager->getRepository('User\Entity\Task');
        	//->findBy(array('group' => $freelancerGroup));
        	$queryBuilder = $projectList->createQueryBuilder('task');
        	$queryBuilder->andWhere('task.is_deleted = 0');
        	
        	if($params->search == 1){
        		// Unpaid Task
        		if($params->payStatus !=null && $params->payStatus != ''){
        			$queryBuilder->andWhere('task.payStatus = :paystatus');
        			$queryBuilder->setParameter('paystatus', $params->payStatus->id);
        			 
        		}
        		//get task base on status
        		if($params->status !=null && $params->statustask != ''){
        			$queryBuilder->andWhere('task.status = :status');
        			$queryBuilder->setParameter('status', $params->status);
        		}
        		
        		if($params->task_id !=null && $params->task_id != ''){
        			$queryBuilder->andWhere('task.id = :task_id');
        			$queryBuilder->setParameter('task_id', $params->task_id);
        			//$queryBuilder_tmp->distinct();
        		}
        		
        		if($params->startDate !=null && $params->startDate != ''){
        			$time=strtotime($params->startDate);
        			$time = date("Y-m-d", $time);
        			$begin = $time." 00:00:00";
        			$end = $time." 23:59:59";
        			$queryBuilder->andWhere('task.startDate BETWEEN ?6 AND ?7')
        			->setParameter(6, $begin)
        			->setParameter(7, $end);
        		}
        		 
        		if($params->dueDate !=null && $params->dueDate != ''){
        			$time=strtotime($params->dueDate);
        			$time = date("Y-m-d", $time);
        			$begin = $time." 00:00:00";
        			$end = $time." 23:59:59";
        			$queryBuilder->andWhere('task.dueDate BETWEEN ?8 AND ?9')
        			->setParameter(8, $begin)
        			->setParameter(9, $end);
        		}
        		
        		
        		if(($params->reference !=null && $params->reference != '')) {
        			$entityManagerP = $this->getEntityManager();
        			$ProjectList = $entityManagerP->getRepository('User\Entity\Project');
        			$queryBuilderProject = $ProjectList->createQueryBuilder('project');
        			$queryBuilderProject->where("project.reference LIKE :reference")->setParameter('reference', '%'.$params->reference.'%');
        			$queryProject = $queryBuilderProject->getQuery();
        			$resultProject = $queryProject->getArrayResult();
        			$statement = "";
        			foreach($resultProject as $project){
        				//echo $project['id'];
        				$statement = $statement."task.project = ".$project['id']." OR ";
        			}
        			$statement = substr($statement, 0, -3);
        			$queryBuilder->andWhere($statement);
        			//var_dump($statement); exit;
        		}
        	}
        	
        	$adapter = new DoctrineAdapter(new ORMPaginator($queryBuilder));
        	$paginator = new Paginator($adapter);
        		
        	
        	$paginator->setDefaultItemCountPerPage(10);
        	
        	$page = (int)$this->getRequest()->getQuery('page');
        	if($page) $paginator->setCurrentPageNumber($page);
        	$data = array();
        	//$helper = new Helper();
        	foreach($paginator as $task){
        		$userData = $task->getData();
        		// Get Employer
        		$freelancerId = $userData['assignee']['id'];
        		$user = $entityManager->getRepository('User\Entity\User')->findOneBy(array('freelancer'=>$freelancerId));
        		$userData['assignee'] = $user->getData();
        		
        		$project = $this->find('User\Entity\Project',$userData['project']);
        		$userData['project'] = $project->getData();
        		// Get Project
        		//var_dump($user); exit;
        		$data[] = $userData;
        	}
        	//var_dump($paginator);die;
        	return new JsonModel(array(
        			'tasks' => $data,
        			'pages' => $paginator->getPages()
        	));
        }
        
    }

    public function delete($id){
        /** @var \User\Entity\Task $task */
        $task = $this->find('\User\Entity\Task', $id);
        $task->setData([
            'is_deleted' => true,
        ]);
        $task->save($this->getEntityManager());

        return new JsonModel([
            'task' => $task->getData(),
        ]);
    }

    public function update($id, $data){
        $task = $this->find('\User\Entity\Task', $id);
        $updateData = [];
		$action = $this->params()->fromQuery('action');
		if($action==1)
		{
			$task->setData([
				'name' => $data['name'],
				'startDate' =>  new \DateTime($data['startDate']),
				'dueDate' =>  new \DateTime($data['dueDate']),
			]);
        }
		else if($action==2)
		{
			$freelancer = $this->find('\User\Entity\Freelancer', $data['freelancerid']);
			$task->setData([
					'status' => 6,
				'assignee' => $freelancer,
				'total' => $data['total'],
			]);
        }
		else if($action==3)//sendToSpecialismPool
		{
			$task->setData([
				'is_specialism_pool' => 1,
				'is_client_pool' => 0,
			]);
        }
		else if($action==4)//sendToClientPool
		{
			$task->setData([
				'is_specialism_pool' => 0,
				'is_client_pool' => 1,
			]);
        }
        if(isset($data['is_specialism_pool'])){
            $updateData['is_specialism_pool'] = (bool) $data['is_specialism_pool'];
            $updateData['is_client_pool'] = !$updateData['is_specialism_pool'];
			$task->setData($updateData);
        } else if (isset($data['is_client_pool'])){
            $updateData['is_client_pool'] = (bool) $data['is_client_pool'];
            $updateData['is_specialism_pool'] = !$updateData['is_client_pool'];
			$task->setData($updateData);
        }
       
        if(isset($data['status_id'])){
            $updateData['status'] = (int) $data['status_id'];
            $task->setData($updateData);
        }

        $task->save($this->getEntityManager());

        return new JsonModel([
            'task' => $task->getData(),
        ]);
    }
}