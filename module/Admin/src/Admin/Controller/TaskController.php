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
        return new ViewModel([
            'id' => $id,
			"lang_code" => $lang_code
        ]);
    }
    
    public function freelancertaskviewAction(){
    	$lang_code = $this->params()->fromRoute('lang');
    	$currentUserId = User::currentLoginId();
    	$currentUser = $this->find('User\Entity\User',$currentUserId);    	
    	$freelancer = $currentUser->getFreelancer();

    	return new ViewModel([
    			'freelancer_id' => $freelancer->getId(),
    			"lang_code" => $lang_code
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
    	
    	if($params->bsearch !=null && $params->bsearch != ''){
    		$queryBuilder->andWhere('task.name LIKE :name');
    		$queryBuilder->setParameter('name', "%".$params->bsearch."%");

    	} else {
    		// Advance Search
    		if($params->status !=null && $params->status != ''){
    			$queryBuilder->andWhere('task.status = :status');
    			$queryBuilder->setParameter('status', $params->status->id);
    			//$queryBuilder_tmp->distinct();
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
    		
    		$data[] = $task->getData(); 			
    	}
    	
    	return new JsonModel(array(
    			'tasks' => $data,
    			'pages' => $paginator->getPages()
    	));
    }
    
    public function FreelancerAcceptTaskAction(){
    	$taskId = (int)$this->getRequest()->getQuery('id');
    	$currentTask = $this->find('User\Entity\Task',$taskId);
    	$currentTask->setStatus(2);
    	$entityManager = $this->getEntityManager();
    	$entityManager->persist($currentTask);
    	$entityManager->flush();
    	exit;
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
    		
    		$data[] = $task->getData(); 			
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
