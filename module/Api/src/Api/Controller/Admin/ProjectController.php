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
use User\Entity\Invoice;

use User\Entity\Activity;
use User\Entity\User;
use User\Entity\Company;

class ProjectController extends AbstractRestfulJsonController
{
    /**
     * Clean data from angular
     * @param $data
     */
    protected function cleanData(&$data){
        if(isset($data['field'])){
            $data['field'] = $this->getReference('User\Entity\Field', $data['field']['id']);
        }
        if(isset($data['sale'])){
            $data['sale'] = $this->getReference('User\Entity\Staff', $data['sale']['id']);
        }
        if(isset($data['pm'])){
            $data['pm'] = $this->getReference('User\Entity\Staff', $data['pm']['id']);
        }
        if(isset($data['client'])){
            $data['client'] = $this->getReference('\User\Entity\User', $data['client']['id']);
        }
        if(isset($data['sourceLanguage'])){
            $data['sourceLanguage'] = $this->getReference('\User\Entity\Language', $data['sourceLanguage']['id']);
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
        if(isset($data['priority'])){
            $data['priority'] = $data['priority']['id'];
        }
        if(isset($data['serviceLevel'])) {
            $data['serviceLevel'] = $data['serviceLevel'];
        }
        if(isset($data['invoiceinfo'])) {
        	$data['invoiceinfo'] = $data['invoiceinfo'];
        }
        if(isset($data['types'])){
            $arr = [];
            foreach($data['types'] as $type){
                $arr[] = $type['id'];
            }
            $data['types'] = $arr;
        }
    }

    public function create($data)
    {
		//error_reporting(E_ALL);
		//ini_set('display_errors', 1);
        
    	
		$this->cleanData($data);


        $targetLanguages = [];
        foreach($data['targetLanguages'] as $targetLanguage){
            $targetLanguages[$targetLanguage['id']] = $this->getReference('\User\Entity\Language', $targetLanguage['id']);
        }
        $data['targetLanguages'] = $targetLanguages;
		
		if($data['status'] == 2){//set odered
			$data['quote_no'] = "QUO-".date("Ymd").mt_rand(0,9).mt_rand(0,9).mt_rand(0,9).mt_rand(0,9);
		}
		
		$project = new Project();
		if(($data['client'] == null || $data['client'] == '')&&$data['newClient']!=null){			
			// Create User
			$Udata = array();
			$Udata['isActive'] = 1;
			$Udata['profileUpdated'] = null;
			$Udata['city'] = null;
			
			$Udata['currency'] = $data['currency'];
			$Udata['createdTime'] = new \DateTime('now');
			//$Udata['lastLogin'] = new \DateTime('now');
			$Udata['email'] = $data['newClient']['Email'];
			$Udata['firstName'] = $data['newClient']['FirstName'];
			$Udata['lastName'] = $data['newClient']['LastName'];
			$Udata['password'] = $data['newClient']['Pass'];
			$Udata['phone'] = $data['newClient']['CellPhone'];
			$Udata['cellphone'] = $data['newClient']['CellPhone'];
			$Udata['gender'] = null;
			$Udata['comments'] = null;
			$Udata['position'] = null;
			$Udata['contracted'] = 0;
			$Udata['name'] = $data['newClient']['Email'];
			$UserEntityManager = $this->getEntityManager();
			$Udata['company_id'] = $UserEntityManager->getRepository('User\Entity\Company')->findOneBy(array('name' => $data['newClient']['CompanyName']));
			if(!$Udata['company_id']){
				$Udata['company_id'] =  null;
			}
			$Udata['country'] = $UserEntityManager->getRepository('User\Entity\Country')->findOneBy(array('id' => $data['newClient']['Country']['id']));
			$Udata['pm'] = null;
			$Udata['sales'] = null;
			$userExist = $UserEntityManager->getRepository('User\Entity\User')->findOneBy(array('email'=>$data['newClient']['Email']));
				
			if ( $userExist ) {
				
				$data['client'] = $userExist;				
				$userExist->createEmployer( $this, $Udata, $UserEntityManager, null);				
				$employer = $userExist->getEmployer();
				$employer->updateData(array(
						'position'=>null,
						'company'=>$data['company_id'],
						'defaultServiceLevel'=>null,
						'comments'=>null,
						'contracted'=> '0',
						'pm' => null,
						'name' => $data['newClient']['Email'],
						'sales' => null,
				));
				$employer->save($UserEntityManager);
				
			} else {
				$user = new User();
				$user->setData( $Udata );
				$user->save($UserEntityManager);								
				$user->createEmployer( $this, $Udata, $UserEntityManager, null);
				
				$employer = $user->getEmployer();
				$employer->updateData(array(
						'position'=>null,
						'company'=>$data['company_id'],
						'defaultServiceLevel'=>null,
						'comments'=>null,
						'contracted'=> '0',
						'pm' => null,
						'name' => $data['newClient']['Email'],
						'sales' => null,
						));
				$employer->save($UserEntityManager);
				$data['client'] = $user;
			}
			// End Create User
		} else {
			//$employer = $this->find('User\Entity\Employer', $data['client']->getId());
			//$client = $this->getEntityManager()->getRepository('User\Entity\User')->findOneBy(array('employer' => $employer));			
			//$data['client'] = $client;
		}
		

        $project->setData($data);
		$project->save($this->getEntityManager());
        $files = [];
        if(isset($data['files'])){
            foreach($data['files'] as $file){
                $id = $file['id'];
                $file = $this->find('\User\Entity\File', $id);
                if($file->getProject() == null){
                    $file->setProject($project);
                    $file->save($this->getEntityManager());
                    $files[$file->getId()] = $file;
                }
            }
        }
        // Create new Tasks
        $i = 0;
        foreach ($targetLanguages as $key => $targetLang){
        	$i++;
        	$task = new Task();
        	$taskArrData = array(
        		//'type' => $data['types'][0],        		
        		'language' => 	$targetLang,
        		'status' => 3, // unassigned
        		'project' => $project,
        		'startDate' => $data['startDate'],
        		'dueDate' => $data['dueDate'],
        		//'name' => $data['reference'],
        		'task_number' => $project->getId().'-'.$i,
        		
        	);
        	
        	$taskArrData['type'] = (is_array($data['types'])&&count($data['types'])>0)?$data['types'][0]: null;
        	$taskArrData['name'] = (array_key_exists('reference',$data))?$data['reference']:'nul';
        	
        	$task->setData( $taskArrData );
			$task->save($this->getEntityManager());
        }
        
		//invoice
		$invoice = new Invoice();
		$invoice_no = "INV-".date("Ymd").mt_rand(0,9).mt_rand(0,9).mt_rand(0,9).mt_rand(0,9);
		$invoice->setData(
		[
			'invoice_no' => $invoice_no,
			'dueDate' => $data['dueDate'],
			'subtotal' => $data['invoiceinfo']['subtotal'],
			'tax' => $data['invoiceinfo']['tax'],
			'discount' => $data['invoiceinfo']['discount'],
			'total' => $data['invoiceinfo']['total'],
		]);
		$invoice->setProject($project);
		$invoice->save($this->getEntityManager());
		//
		 if(isset($data['data'])){
        foreach($data['data'] as $iterms){
            $identifier = $iterms['identifier'];
            $type = $identifier[0];
            $languageId = $identifier[1]['id'];
			if ($type == 'translationNoTM'){
				
				foreach($iterms['items'] as $item){
					$iterm = new Itermnotm();
					$iterm->setProject($project);
					$iterm->setData([
						'name' => $item['name'],
						'file' => $files[$item['file']['id']],
						'unit' => $item['unit']['id'],
						'rate' => $item['rate'],
						'quantity' => $item['quantity'],
						'total' => $item['total'],
						'language' => $targetLanguages[$languageId]
					]);
				}
				$iterm->save($this->getEntityManager());
			}
			else if ($type == 'translationTM'){
				
				//foreach($iterms['itemtm'] as $item){
					$iterm = new Itermtm();
					$iterm->setProject($project);
					$iterm->setData([
						'name' => $iterms['itemtm']['name'],
						'file' => $files[$item['file']['id']],
						'sourcebawu' => $iterms['itemtm']['sourcebawu'],
						'sourcejiuwu' => $iterms['itemtm']['sourcejiuwu'],
						'sourcenomatch' => $iterms['itemtm']['sourcenomatch'],
						'sourceqiwu' => $iterms['itemtm']['sourceqiwu'],
						'sourcerepetitions' => $iterms['itemtm']['sourcerepetitions'],
						'sourcewushi' => $iterms['itemtm']['sourcewushi'],
						'sourceyibai' => $iterms['itemtm']['sourceyibai'],
						'raterepetitions' => $iterms['itemtm']['raterepetitions'],
						'ratewushi' => $iterms['itemtm']['ratewushi'],
						'rateyibai' => $iterms['itemtm']['rateyibai'],
						'ratebawu' => $iterms['itemtm']['ratebawu'],
						'ratejiuwu' => $iterms['itemtm']['ratejiuwu'],
						'ratenomatch' => $iterms['itemtm']['ratenomatch'],
						'rateqiwu' => $iterms['itemtm']['rateqiwu'],
						'total' => $iterms['itemtm']['total'],
						'rate' => $iterms['itemtm']['rate'],
						'language' => $targetLanguages[$languageId]
					]);
				//}
				$iterm->save($this->getEntityManager());
			}
			else if ($type == 'dtpMac'){
				
				foreach($iterms['items'] as $item){
					$iterm = new Itermdtpmac();
					$iterm->setProject($project);
					$iterm->setData([
						'name' => $item['name'],
						'file' => $files[$item['file']['id']],
						'unit' => $item['unit']['id'],
						'rate' => $item['rate'],
						'quantity' => $item['quantity'],
						'total' => $item['total'],
						'software' => $this->getReference('\User\Entity\DesktopSoftware', $item['software']['id']), //$item['software'],
						'language' => $targetLanguages[$languageId],
					]);
				}
				$iterm->save($this->getEntityManager());
			
			}
			else if ($type == 'dtpPc'){
				
				foreach($iterms['items'] as $item){
					$iterm = new Itermdtppc();
					$iterm->setProject($project);
					$iterm->setData([
						'name' => $item['name'],
						'file' => $files[$item['file']['id']],
						'unit' => $item['unit']['id'],
						'rate' => $item['rate'],
						'quantity' => $item['quantity'],
						'total' => $item['total'],
						'software' => $this->getReference('\User\Entity\DesktopSoftware', $item['software']['id']), 
						'language' => $targetLanguages[$languageId],
					]);
				}
				$iterm->save($this->getEntityManager());
			}
			else if ($type == 'engineering'){
				
				foreach($iterms['items'] as $item){
					$iterm = new Itermengineering();
					$iterm->setProject($project);
					$iterm->setData([
						'name' => $item['name'],
						'file' => $files[$item['file']['id']],
						'unit' => $item['unit']['id'],
						'rate' => $item['rate'],
						'quantity' => $item['quantity'],
						'total' => $item['total'],
						'engineeringcategory' => $this->getReference('\Common\Entity\EngineeringCategory', $item['category']['id']), 
						'language' => $targetLanguages[$languageId],
					]);
				}
				$iterm->save($this->getEntityManager());
			}
			else{
				
				foreach($iterms['items'] as $item){
					$iterm = new Iterminterpreting();
					$iterm->setProject($project);
					$iterm->setData([
						'name' => $item['name'],
						'file' => $files[$item['file']['id']],
						'unit' => $item['unit']['id'],
						'rate' => $item['rate'],
						'quantity' => $item['quantity'],
						'total' => $item['total'],
						'language' => $targetLanguages[$languageId],
					]);
				}
				$iterm->save($this->getEntityManager());
			}
        }
        $project->save($this->getEntityManager());
		foreach($data['data'] as $iterms){
            $identifier = $iterms['identifier'];
            $type = $identifier[0];
			if ($type == 'translationNoTM'){
				$type = 1;
			}
			else if ($type == 'translationTM'){
				$type = 2;
			}
			else if ($type == 'dtpMac'){
				$type = 4;
			}
			else if ($type == 'dtpPc'){
				$type = 5;
			}
			else if ($type == 'engineering'){
				$type = 6;
			}
			else{
				$type = $data['types'][0]['id'];
			}
            $languageId = $identifier[1]['id'];
			
			$task = new Task();
			
			$task->setData([
                    'project' => $project,
                    'language' => $targetLanguages[$languageId],
                    'type' => $type,
                    'status' => 3,
					'name' => $data['reference'] . '-' . $identifier[0],
					'startDate' => $data['startDate'],
					'dueDate' => $data['dueDate'], 
					
                ]);
			$task->save($this->getEntityManager());
		}	
		}
		
		$ActiDataArr = [
            'activityDate' => new \DateTime('NOW'),
            'project' => $project,
            'type' => "create_quote",
		];
		
		if( array_key_exists('pm', $data))
			$ActiDataArr['sender'] = $data['pm'];
		if( array_key_exists('description', $data))
			$ActiDataArr['message'] = $data['description'];
		
		
        $activity = new Activity();
        $activity->setData($ActiDataArr);
        //$activity->save($this->getEntityManager());
		//var_dump($project); exit;
        return new JsonModel([
            'project' => $project->getData(),
            'success' => true,
        ]);
    }

    public function getList(){
		error_reporting(E_ALL);
		ini_set('display_errors', 1);
		$entityManager = $this->getEntityManager();

		//var_dump($this->params()->fromQuery()); exit;

        // Get freelancer group
        $projectList = $entityManager->getRepository('User\Entity\Project');
        //->findBy(array('group' => $freelancerGroup));
        $queryBuilder = $projectList->createQueryBuilder('project');
        $queryBuilder->andWhere('project.is_deleted = 0');

		if($q = $this->params()->fromQuery('q')){
			$queryBuilder->andWhere($queryBuilder->expr()->orX(
				$queryBuilder->expr()->like('project.reference',$queryBuilder->expr()->literal("%$q%")),
				$queryBuilder->expr()->like('project.id',$queryBuilder->expr()->literal("%$q%"))
			)
		
            //$queryBuilder->andWhere("project.reference like %?% OR project.id like %?%", array($q, $q)
			
			);
        }
		
        /** start filter */
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
        if($payStatus = $this->params()->fromQuery('payStatus')){
            $queryBuilder->andWhere(
                $queryBuilder->expr()->eq('project.payStatus', $payStatus['id'])
            );
        }
		if($unpay = $this->params()->fromQuery('unpay')){
            $queryBuilder->andWhere(
                $queryBuilder->expr()->eq('project.payStatus', $unpay)
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
		$currentUserId = User::currentLoginId();
		$currentUser = $this->find('User\Entity\User',$currentUserId);
		if($currentUser->isEmployer()){
			 $queryBuilder->andWhere(
                $queryBuilder->expr()->eq('project.client', $currentUserId)
            );
		}
		
        if($clientId = $this->params()->fromQuery('clientId')){
            $queryBuilder->andWhere(
                $queryBuilder->expr()->eq('project.client', $clientId)
            );
        }
		if($statusproject = $this->params()->fromQuery('statusproject')){
			if($statusproject == '7and8'){
				$queryBuilder->andWhere("project.status = 7 or project.status = 8");
			} else {
            $queryBuilder->andWhere(
                $queryBuilder->expr()->eq('project.status', $statusproject)
            );
        }
            
        }
		if($getQuote = $this->params()->fromQuery('quote')){
			//echo 'hi'; exit;
			if($getQuote == 1){
				$queryBuilder->andWhere("project.status = 1 or project.status = 0");
			} else {
				$queryBuilder->andWhere(
						$queryBuilder->expr()->like('project.status', $getQuote)
            );
        }
		
			//$queryBuilder->andWhere("project.status = 2");
			
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
            // TODO: Many to many problem
        }
        /** end filter */
		$queryBuilder->orderBy('project.id', 'DESC');
        $adapter = new DoctrineAdapter(new ORMPaginator($queryBuilder));
        $paginator = new Paginator($adapter);
		 
		$number = $this->params()->fromQuery('number'); 
		if(!$number){
            $number = 10;
        }
        $paginator->setDefaultItemCountPerPage($number);

        $page = (int)$this->getRequest()->getQuery('page');
        if($page) $paginator->setCurrentPageNumber($page);
        $data = array();
        $helper = new Helper();
        
        foreach($paginator as $user){
            $userData = $user->getData();
           // var_dump($userData); exit;
            $data[] = $userData;
        }
        //var_dump($paginator);die;
        return new JsonModel(array(
            'projects' => $data,
            'pages' => $paginator->getPages()
        ));
    }

    public function get($id){
		
		$entityManager = $this->getEntityManager();
        $project = $this->find('User\Entity\Project', $id);
        /*$Itermnotm = $entityManager->getRepository('User\Entity\Itermnotm')->findBy(array('project'=>$project));
        $Itermnotms = array();
        foreach( $Itermnotm as $k => $v ) 
        {
            $Itermnotms[$k] = $v->getData();
        }*/
		//var_dump($Itermnotms);exit;
        $projectData = $project->getData();
        //$files = $project->getFiles($this);
        //$projectData ['files'] = $files;
		return new JsonModel([
            'project' => $projectData,
			//'itermnotms' => $Itermnotms,
			
        ]);
    }

    public function delete($id){
        /** @var \User\Entity\Project $project */
        $project = $this->find('\User\Entity\Project', $id);
        $project->setData([
            'is_deleted' => true
        ]);
        $project->save($this->getEntityManager());
        
        // Delete Task
        $entityManager = $this->getEntityManager();
        //$tasks = $entityManager->getRepository('User\Entity\Task');
        //->findBy(array('group' => $freelancerGroup));
        $queryBuilder = $entityManager->createQueryBuilder()
        				->update('\User\Entity\Task', 'task')
        				->set('task.is_deleted', 1)
        				->where('task.project = :project')
        				->setParameter('project', $id);
        $result = $queryBuilder->getQuery()->execute();
        
        //var_dump($result);
        			
        			
        
        return new JsonModel([
            'project' => $project->getData(),
        ]);
    }

    public function update($id, $data){
    	$lang_code = $this->params()->fromQuery('lang_code');
		$action = $this->params()->fromQuery('action');
		$project = $this->find('\User\Entity\Project', $id);
		if($action==1)
		{
			$project->setData([
				'tax' => $data['tax'],
				'discount' =>  $data['discount'],
			]);
			$project->save($this->getEntityManager());
        }
		if($action==2){//quote accept
			$project->setData([
				'status' => 2,
				'total_tmp' => $data['total_tmp'],
			]);
			$project->save($this->getEntityManager());

            $activity = new Activity();
            $activity->setData([
                'activityDate' => new \DateTime('NOW'),
                'project' => $project,
                'type' => "accept_quote",
                'sender' => $this->getReference('\User\Entity\User', $data['userid'])
            ]);
            $activity->save($this->getEntityManager());
            //$activity->sendNewActivityMail($this,$lang_code);
            $activity->sendNewActivityMail($this,$lang_code);
		}
		if($action==3){
			 $arr = [];
            foreach($data['types'] as $type){
                $arr[] = $type['id'];
            }
            $data['types'] = $arr;
			
			$project->setData([
				'tax' => $data['tax'],
				'discount' =>  $data['discount'],
				'duration' =>  $data['duration'],
				'serviceLevel' =>  $data['serviceLevel'],
				'types' => $data['types'],
			]);
			$project->save($this->getEntityManager());
		}
        return new JsonModel([
            'project' => $project->getData(),
        ]);
    }
}