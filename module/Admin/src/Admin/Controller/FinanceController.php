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
use Zend\View\Model\JsonModel;
use User\Entity\Company;

class FinanceController extends AbstractActionController {
    protected $requiredLogin = true;
    
    
    public function addIncommingAction() {
        $lang_code = $this->params()->fromRoute('lang');
		$userid = (int)$this->getRequest()->getQuery('id');
		return new ViewModel(array(
			"lang_code" => $lang_code,
			"userid" => $userid
        ));
    }
    public function addOutcommingAction() {
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
	public function getTaskUnpaidListAction() {
		error_reporting(E_ALL);
		ini_set('display_errors', 1);
		
		$entityManager = $this->getEntityManager();
        $freelancerGroup = $entityManager->find('User\Entity\UserGroup', UserGroup::FREELANCER_GROUP_ID);
        $freelancerList = $entityManager->getRepository('User\Entity\User');
        $queryBuilder = $freelancerList->createQueryBuilder('user');
		$queryBuilder->where("user.group=?1")->setParameter(1, $freelancerGroup);
        
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
			$queryBuilder_tmp->andWhere('task.is_deleted = 0');
			$queryBuilder_tmp->andWhere('task.payStatus = 1');
			$queryBuilder_tmp->andWhere('task.assignee = ?1')->setParameter(1, $user->getFreelancer());	
			$query = $queryBuilder_tmp->getQuery();
			$result = $query->getArrayResult();
			$data[$userdata['id']]['task'] = $result;
			$data[$userdata['id']]['freelancer'] = $userdata;
			
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
	
		$userId = (int)$this->getRequest()->getQuery('id');
        $entityManager = $this->getEntityManager();
        $user = $this->getUserById($userId);
		//get all project
		$projectList = $entityManager->getRepository('User\Entity\Project');
		$queryBuilder_tmp = $projectList->createQueryBuilder('project');
		$queryBuilder_tmp->andWhere('project.is_deleted = 0');
		$queryBuilder_tmp->andWhere('project.payStatus = 1');
		$queryBuilder_tmp->andWhere('project.client = ?1')->setParameter(1, $user);	
		$query = $queryBuilder_tmp->getQuery();
		$result = $query->getArrayResult();
		return new JsonModel(array(
            'projectlist' => $result,
        ));
		
	}
	public function getFreelancerUnpaidAction() {
	
		$userId = (int)$this->getRequest()->getQuery('id');
        $entityManager = $this->getEntityManager();
        $user = $this->getUserById($userId);
		
		//get all project
		$taskList = $entityManager->getRepository('User\Entity\Task');
		$queryBuilder_tmp = $taskList->createQueryBuilder('task');
		$queryBuilder_tmp->andWhere('task.is_deleted = 0');
		$queryBuilder_tmp->andWhere('task.payStatus = 1');
		$queryBuilder_tmp->andWhere('task.assignee = ?1')->setParameter(1, $user->getFreelancer());	
		$query = $queryBuilder_tmp->getQuery();
		$result = $query->getArrayResult();
		return new JsonModel(array(
            'tasklist' => $result,
        ));
		
	}
	public function getProjectUnpaidListAction() {
		error_reporting(E_ALL);
		ini_set('display_errors', 1);
		
		$entityManager = $this->getEntityManager();
        $employerGroup = $entityManager->find('User\Entity\UserGroup', UserGroup::EMPLOYER_GROUP_ID);
        $employerList = $entityManager->getRepository('User\Entity\User');
        $queryBuilder = $employerList->createQueryBuilder('user');
		$queryBuilder->where("user.group=?1")->setParameter(1, $employerGroup);
        
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
			$query = $queryBuilder_tmp->getQuery();
			$result = $query->getArrayResult();
			$data[$userdata['id']]['project'] = $result;
			$data[$userdata['id']]['client'] = $userdata;
			
        }
		//var_dump($data);exit;
		return new JsonModel(array(
            'pus' => $data,
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
}
