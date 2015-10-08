<?php
namespace Api\Controller\Admin;

use Zend\View\Model\JsonModel;
use Zend\Paginator\Paginator;

use DoctrineORMModule\Paginator\Adapter\DoctrinePaginator as DoctrineAdapter;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;

use Admin\Model\Helper;
use Api\Controller\AbstractRestfulJsonController;

use User\Entity\Project;
use User\Entity\UserGroup;
use User\Entity\Transaction;
use User\Entity\Activity;

class TransactionController extends AbstractRestfulJsonController
{
    /**
     * Clean data from angular
     * @param $data
     */
    protected function cleanData(&$data){
        if(isset($data['client'])){
            $data['client'] = $this->getReference('\User\Entity\User', $data['client']['id']);
        }
        if(isset($data['payDate'])){
            $data['payDate'] = new \DateTime($data['payDate']);
        }
		//$data['createDate'] = new \DateTime();
        if(isset($data['types'])){
            $arr = [];
            foreach($data['projectlist'] as $project){
                $arr[] = $project['id'];
            }
            $data['projects'] = $arr;
        }
    }

    public function create($data)
    {
		error_reporting(E_ALL);
		ini_set('display_errors', 1);
		$transaction = new Transaction();
		//var_dump($data);exit;
		if(isset($data['itemlist'])){
            $arr = [];
            foreach($data['itemlist'] as $item){
                $arr[] = $item['id'];
            }
            $data['items'] = $arr;
        }
		$payDate = new \DateTime($data['payDate']);
		$createDate = new \DateTime("now");
		
		if(isset($data['bankinfouser'])){
			$data["bankinfouser"] = $data['bankinfo']['name'];
		}
		$currency = '';
        if($data['typeStatus'] == 1) // incoming
		{
			$client = $this->getReference('\User\Entity\User', $data['userid']);
			$currency = $client->getCurrency();
			$freelancer = null;
		}
		else {// out going
			$freelancer = $this->getReference('\User\Entity\User', $data['userid']);
			$currency = $freelancer->getCurrency();
			$client = null;
		}
			
		$transaction->setData([
			'intrans_no' => $data["transactionno"],
			'fapiao_no'  => $data["fapiaono"],
			'total' => ($data["total"])?$data["total"]:0.00,
			'subtotal' => ($data["subtotal"])?$data["subtotal"]:0.00,
			'fee' => ($data["transactionfee"])?$data["transactionfee"]:0.00,
            'bank' => $this->getReference('Admin\Entity\ProfileBank', $data['bankinfo']['id']),
			'bankuser' => $data["bankinfouser"],
			'is_deleted' => 0,
			'client' => $client,
			'freelancer' => $freelancer,
			'payDate' =>  $payDate,
			'createDate' => $createDate,
			'typeStatus' => $data['typeStatus'],
			'currency' => $currency,
			'items' => ($data['items'])?$data['items']:null,
			
        ]);
		$transaction->save($this->getEntityManager());
		//update status project to pay
		if($data['typeStatus'] == 1){
			foreach($data['itemlist'] as $pr){
				$project = $this->find('\User\Entity\Project',$pr['id']);
				$project->setData([
					'payStatus' => 2,
				]);
				$project->save($this->getEntityManager());
			}
		}
		else if($data['typeStatus'] == 2){
			foreach($data['itemlist'] as $ta){
			$task = $this->find('\User\Entity\Task',$ta['id']);
			$task->setData([
				'payStatus' => 2,
			]);
			$task->save($this->getEntityManager());
			}
		}	
		
        return new JsonModel([
            //'transaction' => $transaction->getData(),
            'success' => true,
        ]);
    }

    public function getList(){
		//error_reporting(E_ALL);
		//ini_set('display_errors', 1);
        $entityManager = $this->getEntityManager();

        // Get freelancer group
        $projectList = $entityManager->getRepository('User\Entity\Project');
        //->findBy(array('group' => $freelancerGroup));
        $queryBuilder = $projectList->createQueryBuilder('project');
        $queryBuilder->andWhere('project.is_deleted = 0');

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
            // TODO: Many to many problem
        }
        /** end filter */
		$queryBuilder->orderBy('project.id', 'DESC');
        $adapter = new DoctrineAdapter(new ORMPaginator($queryBuilder));
        $paginator = new Paginator($adapter);
        $paginator->setDefaultItemCountPerPage(10);

        $page = (int)$this->getRequest()->getQuery('page');
        if($page) $paginator->setCurrentPageNumber($page);
        $data = array();
        $helper = new Helper();
        foreach($paginator as $user){
            $userData = $user->getData();
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
		return new JsonModel([
            'project' => $project->getData(),
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
        return new JsonModel([
            'project' => $project->getData(),
        ]);
    }

    public function update($id, $data){
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