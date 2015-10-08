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

use DoctrineORMModule\Paginator\Adapter\DoctrinePaginator as DoctrineAdapter;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
use Doctrine\ORM\Query\ResultSetMapping;
use Zend\Paginator\Paginator;

use Admin\Model\Helper;
use User\Entity\User;
use User\Entity\Project;
use User\Entity\Task;
use User\Entity\UserGroup;
use User\Entity\UserDesktopPrice;
use User\Entity\UserTranslationPrice;
use User\Entity\UserInterpretingPrice;
use User\Entity\UserTmRatio;
use User\Entity\UserEngineeringPrice;
use User\Entity\Outtransaction;

use Zend\View\Model\JsonModel;
use User\Entity\Company;

class FinanceController extends AbstractActionController {
    protected $requiredLogin = true;
    
    
    public function transactionAction() {
        $lang_code = $this->params()->fromRoute('lang');
		return new ViewModel(array(
			"lang_code" => $lang_code
        ));

    } 
    public function clientTransactionAction() {
        $lang_code = $this->params()->fromRoute('lang');
		return new ViewModel(array(
			"lang_code" => $lang_code
        ));

    } 
    public function reportAction() {
    	$lang_code = $this->params()->fromRoute('lang');
    	return new ViewModel(array(
    			"lang_code" => $lang_code
    	));
    
    }
	public function incommingDetailAction(){
		error_reporting(E_ALL);
		ini_set('display_errors', 1);
		
		 $lang_code = $this->params()->fromRoute('lang');
		 $transid = (int)$this->getRequest()->getQuery('id');
		return new ViewModel(array(
			"lang_code" => $lang_code,
			"transid" => $transid,
        ));
	}
	public function outgoingDetailAction(){
		$lang_code = $this->params()->fromRoute('lang');
		$transid = (int)$this->getRequest()->getQuery('id'); 
		return new ViewModel(array(
			"lang_code" => $lang_code,
			"transid" => $transid,
        ));
	}
	public function getTransactionAction(){
		//get tran saction
		$id = (int)$this->getRequest()->getQuery('id');
		$entityManager = $this->getEntityManager();
        $transaction = $this->find('User\Entity\Transaction', $id);
		//get project
		$data = $transaction->getData();
		$projects = array();

		foreach ($data['items'] as $item){
			$project = $this->find('User\Entity\Project', $item);
			$projects[] = $project->getData();
		}
		return new JsonModel(array(
			"projects" => $projects,
			'transaction' => $data,
        ));
	
	}
	public function getTransactionTaskAction(){
		//get tran saction
		$id = (int)$this->getRequest()->getQuery('id');
		$entityManager = $this->getEntityManager();
        $transaction = $this->find('User\Entity\Transaction', $id);
		//get project
		$data = $transaction->getData();
		$tasks = array();

		foreach ($data['items'] as $item){
			$task = $this->find('User\Entity\Task', $item);
			$tasks[] = $task->getData();
		}
		return new JsonModel(array(
			"tasks" => $tasks,
			'transaction' => $data,
        ));
	}
	public function addIncommingAction() {
        $lang_code = $this->params()->fromRoute('lang');
		$userid = (int)$this->getRequest()->getQuery('id');
		return new ViewModel(array(
			"lang_code" => $lang_code,
			"userid" => $userid
        ));
    }
    public function addOutgoingAction() {
        $lang_code = $this->params()->fromRoute('lang');
		$userid = (int)$this->getRequest()->getQuery('id');
		return new ViewModel(array(
			"lang_code" => $lang_code,
			"userid" => $userid
        ));
    }
    public function clientUnpaidAction() {
        $lang_code = $this->params()->fromRoute('lang');
		return new ViewModel(array(
			"lang_code" => $lang_code
        ));

    } 
	public function freelancerUnpaidAction() {
	
        $lang_code = $this->params()->fromRoute('lang');
		return new ViewModel(array(
			"lang_code" => $lang_code
        ));

    } 
	public function getClientTransactionListAction() {
		$currentUserId = User::currentLoginId();
		$currentUser = $this->find('User\Entity\User',$currentUserId);
		//$employer = ($currentUser->getEmployer())?$currentUser->getEmployer():null;
		
		$entityManager = $this->getEntityManager();
		$transactionList = $entityManager->getRepository('User\Entity\Transaction');
		$queryBuilder = $transactionList->createQueryBuilder('transaction');
		$queryBuilder->andWhere('transaction.is_deleted = 0');
		if($trans_no = $this->params()->fromQuery('trans_no')){
            $queryBuilder->andWhere(
                $queryBuilder->expr()->like('transaction.intrans_no',
                $queryBuilder->expr()->literal("%$trans_no%")));
        }
		if($trans_id = $this->params()->fromQuery('trans_id')){
            $queryBuilder->andWhere($queryBuilder->expr()->eq('transaction.id', $trans_id));
        }
		if($fapiao_no = $this->params()->fromQuery('fapiao_no')){
            $queryBuilder->andWhere(
                $queryBuilder->expr()->like('transaction.fapiao_no',
                $queryBuilder->expr()->literal("%$fapiao_no%")));
        }
		if($typeStatus = $this->params()->fromQuery('typeStatus')){
            $queryBuilder->andWhere($queryBuilder->expr()->eq('transaction.typeStatus', $typeStatus));
        }
		$queryBuilder->andWhere('transaction.client = ?1')->setParameter(1, $currentUser);
		
		$adapter = new DoctrineAdapter(new ORMPaginator($queryBuilder));
        $paginator = new Paginator($adapter);
        $paginator->setDefaultItemCountPerPage(10);

        $page = (int)$this->getRequest()->getQuery('page');
        if($page) $paginator->setCurrentPageNumber($page);
		$data = array();
        //$helper = new Helper();
        foreach($paginator as $user){
            $userData = $user->getData();
			$data[] = $userData;
        }
		return new JsonModel(array(
            'transactionlist' => $data,
            'pages' => $paginator->getPages(),
        ));
	}
	public function getTransactionListAction() {
		error_reporting(E_ALL);
		ini_set('display_errors', 1);
		
		$currentUserId = User::currentLoginId();
		$currentUser = $this->find('User\Entity\User',$currentUserId);
		$employer = ($currentUser->getEmployer())?$currentUser->getEmployer():null;
		//var_dump($currentUser); exit;
		
		$entityManager = $this->getEntityManager();
		$transactionList = $entityManager->getRepository('User\Entity\Transaction');
		$queryBuilder = $transactionList->createQueryBuilder('transaction');
		$queryBuilder->andWhere('transaction.is_deleted = 0');
		if($trans_no = $this->params()->fromQuery('trans_no')){
            $queryBuilder->andWhere(
                $queryBuilder->expr()->like('transaction.intrans_no',
                $queryBuilder->expr()->literal("%$trans_no%")));
        }
		if($trans_id = $this->params()->fromQuery('trans_id')){
            $queryBuilder->andWhere($queryBuilder->expr()->eq('transaction.id', $trans_id));
        }
		if($fapiao_no = $this->params()->fromQuery('fapiao_no')){
            $queryBuilder->andWhere(
                $queryBuilder->expr()->like('transaction.fapiao_no',
                $queryBuilder->expr()->literal("%$fapiao_no%")));
        }
		if($typeStatus = $this->params()->fromQuery('typeStatus')){
            $queryBuilder->andWhere($queryBuilder->expr()->eq('transaction.typeStatus', $typeStatus));
        }
		
		$adapter = new DoctrineAdapter(new ORMPaginator($queryBuilder));
        $paginator = new Paginator($adapter);
        $paginator->setDefaultItemCountPerPage(10);

        $page = (int)$this->getRequest()->getQuery('page');
        if($page) $paginator->setCurrentPageNumber($page);
		$data = array();
        //$helper = new Helper();
        foreach($paginator as $user){
            $userData = $user->getData();
			$data[] = $userData;
        }
		
		$countProjectUnpaid = $entityManager->getRepository('User\Entity\Project');
		$num_pu = $countProjectUnpaid->createQueryBuilder('project')
			  ->select('COUNT(project.id) as num_pu, SUM(project.total_tmp) as balance_pu')
			  ->andWhere('project.is_deleted = 0')
			  ->andWhere('project.payStatus = 1')
			  ->andWhere('project.currency = ?1')->setParameter(1, 'cny');
			if($employer) $num_pu->andWhere('project.client = :pu_cny_client')->setParameter('pu_cny_client', $currentUser); //$currentUser
		$count_pu_cny = $num_pu->getQuery()->getResult();
		
		$num_pu = $countProjectUnpaid->createQueryBuilder('project')
			  ->select('COUNT(project.id) as num_pu, SUM(project.total_tmp) as balance_pu')
			  ->andWhere('project.is_deleted = 0')
			  ->andWhere('project.payStatus = 1')
			  ->andWhere('project.currency = ?1')->setParameter(1, 'usd');
			if($employer) $num_pu->andWhere('project.client = :pu_usd_client')->setParameter('pu_usd_client', $currentUser);
		$count_pu_usd = $num_pu->getQuery()->getResult();
		
		$countProjectPaid = $entityManager->getRepository('User\Entity\Project');
		
		$num_pp = $countProjectPaid->createQueryBuilder('project')
			  ->select('COUNT(project.id) as num_pp, SUM(project.total_tmp) as balance_pp ')
			  ->andWhere('project.is_deleted = 0')
			  ->andWhere('project.payStatus = 2')
			  ->andWhere('project.currency = ?1')->setParameter(1, 'cny');
			if($employer) $num_pp->andWhere('project.client = :pp_cny_client')->setParameter('pp_cny_client', $currentUser);
		$count_pp_cny = $num_pp->getQuery()->getResult();
		
		$num_pp = $countProjectPaid->createQueryBuilder('project')
			  ->select('COUNT(project.id) as num_pp, SUM(project.total_tmp) as balance_pp ')
			  ->andWhere('project.is_deleted = 0')
			  ->andWhere('project.payStatus = 2')
			  ->andWhere('project.currency = ?1')->setParameter(1, 'usd');
			if($employer) $num_pp->andWhere('project.client = :pp_usd_client')->setParameter('pp_usd_client', $currentUser);
		$count_pp_usd = $num_pp->getQuery()->getResult();
		
		
		//$dql = "SELECT SUM(e.total_tmp) AS balance FROM 'User\Entity\Project project " .
		//	   "WHERE project.account = ?1";
		//$balance = $em->createQuery($dql)
		//			  ->setParameter(1, $myAccountId)
		//			  ->getSingleScalarResult();
		//var_dump($count_pu);
		//var_dump($count_pp);exit;
		
		
		return new JsonModel(array(
            'transactionlist' => $data,
            'pages' => $paginator->getPages(),
			'count_pu_cny' => $count_pu_cny,
			'count_pu_usd' => $count_pu_usd,
			'count_pp_cny' => $count_pp_cny,
			'count_pp_usd' => $count_pp_usd,
        ));
	}
	public function getTaskUnpaidListAction() {
		
		$params = $this->getRequest()->getQuery();
		foreach($params as $key => $value){
			if (strpos( $value,'{') !== false) {
				$params->$key = json_decode($value);
			}
		}
		
		error_reporting(E_ALL);
		ini_set('display_errors', 1);
		
		$entityManager = $this->getEntityManager();
        $freelancerGroup = $entityManager->find('User\Entity\UserGroup', UserGroup::FREELANCER_GROUP_ID);
        $freelancerList = $entityManager->getRepository('User\Entity\User');
        $queryBuilder = $freelancerList->createQueryBuilder('user');
		$queryBuilder->where("user.group=?1")->setParameter(1, $freelancerGroup);

		if($params->email !=null & $params->email != ''){
			$queryBuilder->andWhere("user.email LIKE :email")->setParameter('email', "%".$params->email."%");
		}
		
		
		
		$adapter = new DoctrineAdapter(new ORMPaginator($queryBuilder));
        $paginator = new Paginator($adapter);
        $paginator->setDefaultItemCountPerPage(10);
		
		$page = (int)$this->getRequest()->getQuery('page');
        if($page) $paginator->setCurrentPageNumber($page);
        $data = array();
		
        
        
        foreach($paginator as $user){
			
			//get list project
			$userdata = $user->getData();
			
			$taskList = $entityManager->getRepository('User\Entity\Task');
			//->findBy(array('group' => $freelancerGroup));
			$queryBuilder_tmp = $taskList->createQueryBuilder('task');
			//$queryBuilder_tmp->select('task.project');
			$queryBuilder_tmp->andWhere('task.is_deleted = 0');
			$queryBuilder_tmp->andWhere('task.payStatus = 1');
			$queryBuilder_tmp->andWhere('task.assignee = ?1')->setParameter(1, $user->getFreelancer());	//
			$queryBuilder_tmp->distinct();
			
			if(($params->field !=null && $params->field != '') || ($params->pm !=null & $params->pm != '') || ($params->sale !=null && $params->sale != '')){
				$queryBuilder_tmp->innerJoin('User\Entity\Project','p','WITH','task.project = p.id');
			}
			
			if($params->task_id !=null && $params->task_id != ''){
				$queryBuilder_tmp->andWhere('task.task_number = :task_number');
				$queryBuilder_tmp->setParameter('task_number', $params->task_id);
				$queryBuilder_tmp->distinct();
			}
			
			if($params->freelancerId !=null & $params->freelancerId != ''){
				$queryBuilder_tmp->andWhere('task.assignee = :freelancerId');
				$queryBuilder_tmp->setParameter('freelancerId', $params->freelancerId);	
				
			}
			
			if($params->status !=null && $params->status != ''){
				$queryBuilder_tmp->andWhere('task.status = :status')->setParameter('status', $params->status->id);
			}
			
			if($params->field !=null && $params->field != ''){
				$queryBuilder_tmp->andWhere('p.field = :field')->setParameter('field', $params->field->id);//
			}
			
        	if($params->startDate !=null && $params->startDate != ''){
    			$time=strtotime($params->startDate);
    			$time = date("Y-m-d", $time);
    			$begin = $time." 00:00:00";
    			$end = $time." 23:59:59";
    			$queryBuilder_tmp->andWhere('task.startDate BETWEEN ?6 AND ?7')
    			->setParameter(6, $begin)
    			->setParameter(7, $end);
    		}
			
    		if($params->dueDate !=null && $params->dueDate != ''){
    			$time=strtotime($params->dueDate);
    			$time = date("Y-m-d", $time);
    			$begin = $time." 00:00:00";
    			$end = $time." 23:59:59";
    			$queryBuilder_tmp->andWhere('task.dueDate BETWEEN ?8 AND ?9')
    			->setParameter(8, $begin)
    			->setParameter(9, $end);
    		}
    		
    		if($params->pm !=null && $params->pm != ''){
    			$queryBuilder_tmp->andWhere('p.pm = :pm')->setParameter('pm', $params->pm->id);//
    		}
    		
    		if($params->sale !=null && $params->sale != ''){
    			$queryBuilder_tmp->andWhere('p.sale = :sale')->setParameter('sale', $params->sale->id);//
    		}
    		
    		
    		
			$query = $queryBuilder_tmp->getQuery();
			//var_dump($query); exit;
			//var_dump($query); exit;
			$result = $query->getArrayResult();
			//var_dump($result); exit;
			if($result!= null){
			$data[$userdata['id']]['task'] = $result;
			$data[$userdata['id']]['freelancer'] = $userdata;
			}
			
        }
		//var_dump($data);exit;
		return new JsonModel(array(
            'tus' => $data,
            'pages' => $paginator->getPages()
        ));
		
       /* $projectList = $entityManager->getRepository('User\Entity\Project');
        $queryBuilder = $projectList->createQueryBuilder('project');
        $queryBuilder->andWhere('project.is_deleted = 0');
		$queryBuilder->andWhere('project.payStatus = 1');
        if($project_id = $this->params()->fromQuery('project_id')){
            $queryBuilder->andWhere($queryBuilder->expr()->eq('project.id', $project_id));
        }
        if($reference = $this->params()->fromQuery('reference')){
            $queryBuilder->andWhere(
                $queryBuilder->expr()->like('project.reference',
                $queryBuilder->expr()->literal("%$reference%")));
        }
        if($field = $this->params()->fromQuery('field')){
            $queryBuilder->andWhere(
                $queryBuilder->expr()->eq('project.field', $field['id'])
            );
        }
        if($status = $this->params()->fromQuery('status')){
            $queryBuilder->andWhere(
                $queryBuilder->expr()->eq('project.status', $status['id'])
            );
        }
        
        if($sale = $this->params()->fromQuery('sale')){
            $queryBuilder->andWhere(
                $queryBuilder->expr()->eq('project.sale', $sale['id'])
            );
        }
        if($pm = $this->params()->fromQuery('pm')){
            $queryBuilder->andWhere(
                $queryBuilder->expr()->eq('project.pm', $pm['id'])
            );
        }
        if($clientId = $this->params()->fromQuery('clientId')){
            $queryBuilder->andWhere(
                $queryBuilder->expr()->eq('project.client', $clientId)
            );
        }
        if($startDate = $this->params()->fromQuery('startDate')){
            $queryBuilder->andWhere(
                $queryBuilder->expr()->gte('project.startDate', $startDate)
            );
        }
        if($dueDate = $this->params()->fromQuery('dueDate')){
            $queryBuilder->andWhere(
                $queryBuilder->expr()->gte('project.dueDate', $dueDate)
            );
        }
        if($source = $this->params()->fromQuery('source')){
            $queryBuilder->andWhere(
                $queryBuilder->expr()->gte('project.sourceLanguage', $source['id'])
            );
        }
        if($target = $this->params()->fromQuery('target')){
        }
		$queryBuilder->orderBy('project.client', 'DESC');
        $adapter = new DoctrineAdapter(new ORMPaginator($queryBuilder));
        $paginator = new Paginator($adapter);
        $paginator->setDefaultItemCountPerPage(10);

        $page = (int)$this->getRequest()->getQuery('page');
        if($page) $paginator->setCurrentPageNumber($page);
        $data = array();
		$client = array();
        $helper = new Helper();
        foreach($paginator as $user){
            $userData = $user->getData();
            $data[$userData['userid']][] = $userData;
			if(!in_array($userData['userid'],$client) && $userData['userid'] > 0)
				$client[] = $userData['userid']; 
        }*/
        //var_dump($paginator);die;
        
    }

	public function getClientUnpaidAction() {
		$user = $this->getCurrentUser();
		if($user->isEmployer()){
	
			$entityManager = $this->getEntityManager();
				
			//get all project
			$projectList = $entityManager->getRepository('User\Entity\Project');
			$queryBuilder_tmp = $projectList->createQueryBuilder('project');
			$queryBuilder_tmp->andWhere('project.is_deleted = 0');
			$queryBuilder_tmp->andWhere('project.payStatus = 1');
			$queryBuilder_tmp->andWhere('project.client = ?1')->setParameter(1, $user);	
			$query = $queryBuilder_tmp->getQuery();
			$result = $query->getArrayResult();
		} else{
			$userId = (int)$this->getRequest()->getQuery('id');
			$entityManager = $this->getEntityManager();
			$client = $this->getUserById($userId);
		
			//get all project
			$projectList = $entityManager->getRepository('User\Entity\Project');
			$queryBuilder_tmp = $projectList->createQueryBuilder('project');
			$queryBuilder_tmp->andWhere('project.is_deleted = 0');
			$queryBuilder_tmp->andWhere('project.payStatus = 1');
			$queryBuilder_tmp->andWhere('project.client = ?1')->setParameter(1, $client);	
			$query = $queryBuilder_tmp->getQuery();
			$result = $query->getArrayResult();
			//$result = null;
		}
		
		return new JsonModel(array(
            'projectlist' => $result,
        ));
		
	}
	
	public function clientUnpaidProjectAction(){
		$lang_code = $this->params()->fromRoute('lang');
		return new ViewModel(array(
				"lang_code" => $lang_code
		));
	}
	public function getFreelancerUnpaidAction() {
		error_reporting(E_ALL);
		ini_set('display_errors', 1);
		$userId = (int)$this->getRequest()->getQuery('id');
        $entityManager = $this->getEntityManager();
        $user = $this->getUserById($userId);
		
		//get all project
		$taskList = $entityManager->getRepository('User\Entity\Task')->findBy(array('is_deleted' => 0,'payStatus'=>1,"assignee"=>$user->getFreelancer()));
		/*$queryBuilder_tmp = $taskList->createQueryBuilder('task');
		$queryBuilder_tmp->andWhere('task.is_deleted = 0');
		$queryBuilder_tmp->andWhere('task.payStatus = 1');
		$queryBuilder_tmp->andWhere('task.assignee = ?1')->setParameter(1, $user->getFreelancer());	
		$query = $queryBuilder_tmp->getQuery();*/
		//var_dump($taskList); exit;
		foreach ( $taskList as $k => $v ) {
            
			$project = $v->getProject()->getData();
			$result[$k] = $v->getData();
			$result[$k]["project_tmp"] = $project;
        }
		
		//$result = $query->getArrayResult();
		
		
		return new JsonModel(array(
            'tasklist' => $result,
        ));
		
	}
	public function getProjectUnpaidListAction() {
		$params = $this->getRequest()->getQuery();
		foreach($params as $key => $value){
			if (strpos( $value,'{') !== false) {
				$params->$key = json_decode($value);
			}
		}
		
		
		
		$entityManager = $this->getEntityManager();
        $employerGroup = $entityManager->find('User\Entity\UserGroup', UserGroup::EMPLOYER_GROUP_ID);
        $employerList = $entityManager->getRepository('User\Entity\User');
        $queryBuilder = $employerList->createQueryBuilder('user');
		$queryBuilder->where("user.group=?1")->setParameter(1, $employerGroup);
        
		if($params->email !=null & $params->email != ''){
			$queryBuilder->andWhere("user.email LIKE :email")->setParameter('email', "%$params->email%");
		}
		
		$adapter = new DoctrineAdapter(new ORMPaginator($queryBuilder));
        $paginator = new Paginator($adapter);
        $paginator->setDefaultItemCountPerPage(10);
		
		$page = (int)$this->getRequest()->getQuery('page');
        if($page) $paginator->setCurrentPageNumber($page);
        $data = array();
		
        
        foreach($paginator as $user){
			
			//get list project
			$userdata = $user->getData();
			
			$projectList = $entityManager->getRepository('User\Entity\Project');
			//->findBy(array('group' => $freelancerGroup));
			$queryBuilder_tmp = $projectList->createQueryBuilder('project');
			$queryBuilder_tmp->andWhere('project.is_deleted = 0');
			$queryBuilder_tmp->andWhere('project.payStatus = 1');
			$queryBuilder_tmp->andWhere('project.client = ?1')->setParameter(1, $user);	
			$queryBuilder_tmp->distinct();
			
			if($params->project_id !=null && $params->project_id != ''){
				$queryBuilder_tmp->andWhere('project.id LIKE :project_id')->setParameter('project_id', $params->project_id);
        }
		
			if($params->clientId !=null && $params->clientId != ''){
				$queryBuilder_tmp->andWhere('project.client = :clientId')->setParameter('clientId', $params->clientId);
        }
			
			if($params->reference !=null && $params->reference != ''){
				$queryBuilder_tmp->andWhere('project.reference LIKE :reference')->setParameter('reference', '%'.$params->reference.'%');
        }
        
			if($params->status !=null && $params->status != ''){
				$queryBuilder_tmp->andWhere('project.status = :status')->setParameter('status', $params->status->id);
        }
			 
			if($params->field !=null && $params->field != ''){
				$queryBuilder_tmp->andWhere('project.field = :field')->setParameter('field', $params->field->id);
        }
			 
			 
			 
			if($params->startDate !=null && $params->startDate != ''){
				$time=strtotime($params->startDate);
				$time = date("Y-m-d", $time);
				$begin = $time." 00:00:00";
				$end = $time." 23:59:59";
				$queryBuilder_tmp->andWhere('project.startDate BETWEEN ?6 AND ?7')
				->setParameter(6, $begin)
				->setParameter(7, $end);
        }
			 
			if($params->dueDate !=null && $params->dueDate != ''){
				$time=strtotime($params->dueDate);
				$time = date("Y-m-d", $time);
				$begin = $time." 00:00:00";
				$end = $time." 23:59:59";
				$queryBuilder_tmp->andWhere('project.dueDate BETWEEN ?8 AND ?9')
				->setParameter(8, $begin)
				->setParameter(9, $end);
        }
			 
			if($params->pm !=null && $params->pm != ''){
				$queryBuilder_tmp->andWhere('project.pm = :pm')->setParameter('pm', $params->pm);
        }
			 
			if($params->sale !=null && $params->sale != ''){
				$queryBuilder_tmp->andWhere('project.sale = :sale')->setParameter('sale', $params->sale->id);
        }
			
			
			//var_dump($queryBuilder_tmp->getQuery()); exit;
			$query = $queryBuilder_tmp->getQuery();
			$result = $query->getArrayResult();
			if($result != null){ 
				$data[$userdata['id']]['project'] = $result;
				$data[$userdata['id']]['client'] = $userdata;
        }

		}
		//var_dump($data);exit;
		return new JsonModel(array(
				'pus' => $data,
				'pages' => $paginator->getPages()
		));
        
    }
   
    public function listAction() {
        $lang_code = $this->params()->fromRoute('lang');
		return new ViewModel(array(
			"lang_code" => $lang_code
        ));
    }
    
    public function detailAction() {
        $userId = (int)$this->getRequest()->getQuery('id');
        $entityManager = $this->getEntityManager();
        $user = $this->getUserById($userId);
        
        // Get Interpreting Price
        $repository = $entityManager->getRepository('User\Entity\UserInterpretingPrice');
        $interPretingPrices = $repository->findBy( array('user'=>$user) );
        $pInterPretingPrices = array();
        foreach ( $interPretingPrices as $k => $v ) {
            $pInterPretingPrices[$k] = $v->getData();
        }         
        // Get EngeeringPrice
        $repository = $entityManager->getRepository('User\Entity\UserEngineeringPrice');
        $engineeringPrices = $repository->findBy(array('user'=>$user));
        $pEngineeringPrices = array();
        foreach ($engineeringPrices as $k => $v ) {
            $pEngineeringPrices[$k] = $v->getData();
        }
         
        // Get Translation Price
        $repository = $entityManager->getRepository('User\Entity\UserTranslationPrice');
        $translationPrices = $repository->findBy(array('user'=>$user));
        $pTranslationPrices = array();
        foreach ( $translationPrices as $k => $v ) {
            $pTranslationPrices[$k] = $v->getData();
        }
         
        // Get DesktopPrices
        $repository = $entityManager->getRepository('User\Entity\UserDesktopPrice');
        $dtpPrices = $repository->findBy(array('user'=>$user));
        $pDtpPrices = array();
        foreach ( $dtpPrices as $k => $v) {
            $pDtpPrices[$k]=$v->getData();
        }
         
        // Get Translation Ratio
        $repository = $entityManager->getRepository('User\Entity\UserTmRatio');
        $tmRatios = $repository->findBy(array('user'=>$user));
        $pTmRatios = array();
        foreach ( $tmRatios as $k => $v) {
            $pTmRatios[$k] = $v->getData();
        }
		$lang_code = $this->params()->fromRoute('lang');
        return new ViewModel(array('user'=>$user->getData(), 
                'employer' => $user->getEmployer()->getData(),
                'interpretingPrices'=>$pInterPretingPrices,
                'engineeringPrices'=>$pEngineeringPrices,
                'translationPrices'=>$pTranslationPrices,
                'dptPrices'=>$pDtpPrices,
                'tmRatios'=>$pTmRatios,
				"lang_code" => $lang_code
        ));
    }
    
    public function freelancerTransactionAction(){
    	$lang_code = $this->params()->fromRoute('lang');
    	$currentUserId = User::currentLoginId();
    	$currentUser = $this->find('User\Entity\User',$currentUserId);
    	$freelancer = $currentUser->getFreelancer();
    	
    	return new ViewModel([
    			'freelancer_id' => $freelancer->getId(),
    			"lang_code" => $lang_code
    	]);
    }
    
    public function getFreelancerOutTransactionListAction(){    	
		error_reporting(E_ALL);
		ini_set('display_errors', 1);
		
    	$params = $this->getRequest()->getQuery();
    	foreach($params as $key => $value){
    		if (strpos( $value,'{') !== false) {
    			$params->$key = json_decode($value);
    		}
    	}
    	
    	//var_dump($params);exit;
    	
    	$currentUserId = User::currentLoginId();
    	$currentUser = $this->find('User\Entity\User',$currentUserId);
    	$freelancer = $currentUser->getFreelancer();
    	$freelancer_id = $freelancer->getId();
    	
    	$entityManager = $this->getEntityManager();
    	$freelancerList = $entityManager->getRepository('User\Entity\Outtransaction');
    	$queryBuilder = $freelancerList->createQueryBuilder('outtr');
    	$queryBuilder->where("outtr.client=?1")->setParameter(1,$freelancer_id); // 4 = Pooling
    	$queryBuilder->andWhere('outtr.is_deleted = 0');
    	
    	if($params->bsearch !=null && $params->bsearch != ''){
    		$queryBuilder->andWhere('outtr.intrans_no LIKE :outtrId');
    			$queryBuilder->setParameter('outtrId', '%'.$params->bsearch.'%');
    	
    	} else {
    		// Advance Search
    	
    		if($params->outtrId !=null && $params->outtrId != ''){
    			$queryBuilder->andWhere('outtr.intrans_no LIKE :outtrId');
    			$queryBuilder->setParameter('outtrId', '%'.$params->outtrId.'%');
    			//echo 'hi';exit;
    			//$queryBuilder_tmp->distinct();
    		}   	
    		 

    	
    		if($params->payMonth !=null && $params->payMonth != ''){
    			$time=strtotime($params->payMonth);
    			//$time = date("Y-m-d", $time);
    			$begin = date("Y-m-d", $time)." 00:00:00";
    			$end = date("Y-m-t", $time)." 23:59:59";

    			$queryBuilder->andWhere('outtr.payDate BETWEEN :begin AND :end')
    			->setParameter('begin', $begin)
    			->setParameter('end', $end);
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

    	foreach($paginator as $outtransaction){  
    		//var_dump($outtransaction); exit;	
    		//$data[]  = $outtransaction->getData(); 
    		$outtr = array();
    		$outtr = $outtransaction->getData();
    		
    		// Get Currency
    		$taskIDs = $outtransaction->getTasks();
    		$taskID  =  $taskIDs[0];
    		$task = $this->find('User\Entity\Task',$taskID);
    		$project = $task->getProject();
    		$currency = $project->getCurrency();
    		if($currency==null) $currency='CNY';
    		$outtr['currency'] =$currency;
    		$data[] = $outtr;
    		//var_dump($currency); exit;			
    	}
    	
    	return new JsonModel(array(
    			'outtrs' => $data,
    			'pages' => $paginator->getPages()
    	));
    }
    
    public function FreelancerUnpaidTaskAction(){
    	$lang_code = $this->params()->fromRoute('lang');
    	$currentUserId = User::currentLoginId();
    	$currentUser = $this->find('User\Entity\User',$currentUserId);
    	$freelancer = $currentUser->getFreelancer();
    
    	return new ViewModel([
    			'freelancer_id' => ($freelancer)?$freelancer->getId():null,
    			"lang_code" => $lang_code
    			]);
    }
}
