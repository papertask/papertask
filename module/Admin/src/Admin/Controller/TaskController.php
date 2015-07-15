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

use Application\Controller\AbstractActionController;
use User\Entity\User;
use User\Entity\Project;
use User\Entity\Task;
// Pagination
use DoctrineORMModule\Paginator\Adapter\DoctrinePaginator as DoctrineAdapter;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
use Doctrine\ORM\Query\ResultSetMapping;
use Zend\Paginator\Paginator;


class TaskController extends AbstractActionController
{
    protected $requiredLogin = true;

    public function indexAction()
    {
    	//echo 'hi'; exit;
        $lang_code = $this->params()->fromRoute('lang');
		return new ViewModel(array(
			"lang_code" => $lang_code,
        ));
    }

    public function newAction()
    {
        return new ViewModel(array());
    }

    public function detailAction(){
        $id = $this->params()->fromQuery('id');
		$lang_code = $this->params()->fromRoute('lang');
		
		$currentUserId = User::currentLoginId();
    	$currentUser = $this->find('User\Entity\User',$currentUserId);
        
		return new ViewModel([
		
            'id' => $id,
			"lang_code" => $lang_code,
			'isStaff' => $currentUser->isStaff(),
        ]);
    }
    
    public function freelancertaskviewAction(){
    	$lang_code = $this->params()->fromRoute('lang');
    	$currentUserId = User::currentLoginId();
    	$currentUser = $this->find('User\Entity\User',$currentUserId);    	
    	$freelancer = $currentUser->getFreelancer();

    	//var_dump($freelancer->getId());exit;
    	
    	// Count task	
    	$entityManager = $this->getEntityManager();
    	$taskList = $entityManager->createQueryBuilder()
    					->select("COUNT(task.id)")
    					->from('User\Entity\Task','task')
    					//->where("task.assignee=?1")->setParameter(1, $freelancer->getId())
    					->where("task.assignee=?1")->setParameter(1, 2)
    					->andWhere('task.is_deleted = 0');
    	$taskNum = $taskList->getQuery()->getSingleScalarResult();
    	

    	return new ViewModel([
    			'freelancer_id' => $freelancer->getId(),
    			"lang_code" => $lang_code,
    			'taskNum' => $taskNum
    	]);
    }
    
    public function getFreelancerTaskListAction(){
    	$freelancerId = (int)$this->getRequest()->getQuery('freelancer_id');
    	
    	$params = $this->getRequest()->getQuery();
    	foreach($params as $key => $value){
    		if (strpos( $value,'{') !== false) {
    			$params->$key = json_decode($value);
    		}
    	}   	    	
    	//var_dump($params); exit;
    	
    	$entityManager = $this->getEntityManager();
    	$freelancerList = $entityManager->getRepository('User\Entity\Task');
    	$queryBuilder = $freelancerList->createQueryBuilder('task');
    	$queryBuilder->where("task.assignee=?1")->setParameter(1, $freelancerId);
    	$queryBuilder->andWhere('task.is_deleted = 0');
    	
    	// Unpaid Task
    	if($params->paystatus !=null && $params->paystatus != ''){
    		$queryBuilder->andWhere('task.payStatus = :paystatus');
    		$queryBuilder->setParameter('paystatus', $params->paystatus);
    	
    	}
    	//get task base on status
		if($params->statustask !=null && $params->statustask != ''){
    			$queryBuilder->andWhere('task.status = :status');
    			$queryBuilder->setParameter('status', $params->statustask);
    	}
		
		
    	if($params->bsearch !=null && $params->bsearch != ''){
    		$queryBuilder->andWhere('task.name LIKE :name');
    		$queryBuilder->setParameter('name', "%".$params->bsearch."%");

    	} else {
    		// Advance Search
    		if($params->status !=null && $params->status != ''){
    			$queryBuilder->andWhere('task.status = :status');
    			$queryBuilder->setParameter('status', $params->status->id);
    		}
    		
    		if($params->task_id !=null && $params->task_id != ''){
    			$queryBuilder->andWhere('task.task_number = :task_number');
    			$queryBuilder->setParameter('task_number', $params->task_id);
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
    		
    		if($params->dueMonth !=null && $params->dueMonth != ''){
    			$time=strtotime($params->dueMonth);
    			//$time = date("Y-m-d", $time);
    			$begin = date("Y-m-d", $time)." 00:00:00";
    			$end = date("Y-m-t", $time)." 23:59:59";
    			
    			
    	
    			//var_dump($begin); var_dump($end); exit;
    			
    			$queryBuilder->andWhere('task.dueDate BETWEEN :begin AND :end')
    			->setParameter('begin', $begin)
    			->setParameter('end', $end);    		
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
    	
    	
    	
    	
    	$query = $queryBuilder->getQuery();
    	//$result = $query->getArrayResult();
    	//var_dump($result); exit;
    	
    	$adapter = new DoctrineAdapter(new ORMPaginator($query));
    	$paginator = new Paginator($adapter);
    	$paginator->setDefaultItemCountPerPage(10);
    	
    	$page = (int)$this->getRequest()->getQuery('page');
    	if($page) $paginator->setCurrentPageNumber($page);
    	$data = array();

    	foreach($paginator as $task){  
    		$task_data = $task->getData();
    		$project = $this->find('User\Entity\Project',$task_data['project']);
    		$task_data['project'] = $project->getData();
    		$data[] = $task_data; 			
    	}
    	
    	return new JsonModel(array(
    			'tasks' => $data,
    			'pages' => $paginator->getPages()
    	));
    }
    
    public function getFreelancerAssigningTaskListAction(){
    	$freelancerId = (int)$this->getRequest()->getQuery('freelancer_id');
    	
    	
    	$entityManager = $this->getEntityManager();
    	
    	$freelancer = $entityManager->getRepository('User\Entity\User')->findOneBy(array('freelancer'=>$freelancerId));
    	//var_dump($freelancer); exit;
    	
    	$taskEntity = $entityManager->getRepository('User\Entity\Task');
    	
    	$tasks =  $taskEntity->findBy(array('status'=>6));
    	$taskArr = array();
    	foreach ($tasks as $task){
    		$project = $task->getProject();
    		$client = $project->getClient();
    		$FreelancerPool = $client->getFreelancerPool();
    		if(in_array($freelancer->getId(), $FreelancerPool)){
    			$data = $task->getData();
    			$data['project'] = $project->getData();
    			$taskArr[]=$data;
    		}
    		//var_dump($client->getFreelancerPool()); 
    	}
    	
    	return new JsonModel(array(
    			'tasks' => $taskArr
    	));
    	
    }
    
    public function FreelancerAcceptTaskAction(){
		error_reporting(E_ALL);
		ini_set('display_errors', 1);
		$currentUserId = User::currentLoginId();
    	$currentUser = $this->find('User\Entity\User',$currentUserId);
    	$freelancer = $currentUser->getFreelancer();
    	$freelancer_id = $freelancer->getId();
		//get task accept
		$entityManager = $this->getEntityManager();
		$freelancerList = $entityManager->getRepository('User\Entity\Task');
    	$queryBuilder = $freelancerList->createQueryBuilder('task');
    	$queryBuilder->where("task.status=?1")->setParameter(1, '2'); // 2 = accept
    	$queryBuilder->andWhere("task.assignee=?2")->setParameter(2, $freelancer_id);
    	$queryBuilder->andWhere('task.is_deleted = 0');
		$query = $queryBuilder->getQuery();
		$result = $query->getArrayResult();
	
		if(count($result) > 0){
			return new JsonModel(array(
    			'status' => "have ongoing task",
			));
		}
			
    	else{
			$taskId = (int)$this->getRequest()->getQuery('id');
			$currentTask = $this->find('User\Entity\Task',$taskId);
			//$currentTask->setStatus(2);
			$currentTask->setData([
					'status' => 2,
					'assignee' => $freelancer,
					]);
			
			$entityManager->persist($currentTask);
			$entityManager->flush();
			
			$project = $currentTask->getProject();
			$project->setData([
					'status' => 3,
					]);
			$project->save($entityManager);
			

			return new JsonModel(array(
    			'status' => "ok",
			));
		}
		return new JsonModel(array(
    			'status' => "fail",
				//'task' => $currentTask->getData();
			));
    }
    
    public function submitTaskAction(){
    	$currentUserId = User::currentLoginId();
    	$currentUser = $this->find('User\Entity\User',$currentUserId);
    	$freelancer = $currentUser->getFreelancer();
    	
    	// only Freelancer Can submit
    	if($freelancer){
    		$taskId = (int)$this->getRequest()->getQuery('id');
    		$currentTask = $this->find('User\Entity\Task',$taskId);
    		$currentTask->setStatus(7);
    		
    		$entityManager = $this->getEntityManager();
    		$entityManager->persist($currentTask);
    		$entityManager->flush();
    		$project = $currentTask->getProject();
    		$project->setData([
    					'status' => 4,
    				]);
    		$project->save($entityManager);
    		return new JsonModel(array(
    				'status' => "ok",
    				//'task' => 
    		));
    	}
    	
    	return new JsonModel(array(
    			'status' => "error",
    			//'task' =>
    	));
    	
    }
    
    public function FreelancerAcceptPoolingTaskAction(){
    	$currentUserId = User::currentLoginId();
    	$currentUser = $this->find('User\Entity\User',$currentUserId);
    	$freelancer = $currentUser->getFreelancer();
    	$freelancer_id = $freelancer->getId();
    	
    	$taskId = (int)$this->getRequest()->getQuery('id');
    	$currentTask = $this->find('User\Entity\Task',$taskId);
    	$currentTask->setStatus(2);
    	$currentTask->setAssignee($freelancer);
    	$entityManager = $this->getEntityManager();
    	$entityManager->persist($currentTask);
    	$entityManager->flush();
    	exit;
    }
    
    public function TaskPoolAction(){
    	//echo 'hi';exit;
    	$lang_code = $this->params()->fromRoute('lang');

    	return new ViewModel([
    			
    			"lang_code" => $lang_code
    	]);
    }
    
    public function getTaskPoolListAction(){
    	$entityManager = $this->getEntityManager();
    	$freelancerList = $entityManager->getRepository('User\Entity\Task');
    	$queryBuilder = $freelancerList->createQueryBuilder('task');
    	$queryBuilder->where("task.status=?1")->setParameter(1, '4'); // 4 = Pooling
    	$queryBuilder->andWhere('task.is_deleted = 0');
		$query = $queryBuilder->getQuery();
    	//$result = $query->getArrayResult();
    	//var_dump($result); exit;
    	
    	$adapter = new DoctrineAdapter(new ORMPaginator($query));
    	$paginator = new Paginator($adapter);
    	$paginator->setDefaultItemCountPerPage(10);
    	
    	$page = (int)$this->getRequest()->getQuery('page');
    	if($page) $paginator->setCurrentPageNumber($page);
    	$data = array();

    	foreach($paginator as $task){  
    		$task_data = $task->getData();
    		$project = $this->find('User\Entity\Project',$task_data['project']);
    		$task_data['project'] = $project->getData();
    		$data[] = $task_data; 			
    	}
    	
    	return new JsonModel(array(
    			'tasks' => $data,
    			'pages' => $paginator->getPages()
    	));
    }
    
    public function FreelancerUnpaidTaskAction(){
    	$lang_code = $this->params()->fromRoute('lang');
    	$currentUserId = User::currentLoginId();
    	$currentUser = $this->find('User\Entity\User',$currentUserId);    	
    	$freelancer = $currentUser->getFreelancer();

    	return new ViewModel([
    			'freelancer_id' => $freelancer->getId(),
    			"lang_code" => $lang_code
    	]);
    }
    

}
