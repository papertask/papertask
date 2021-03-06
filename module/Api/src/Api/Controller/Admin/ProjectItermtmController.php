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

class ProjectItermtmController extends AbstractRestfulJsonController
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
		$iterm = new Itermtm();

		if(array_key_exists('file', $data)){
		if($data['file']['id'])
			$file = $this->find('\User\Entity\File', $data['file']['id']);
		}

		$project = $this->find('User\Entity\Project', $projectid);
		$iterm->setProject($project);
		$language = $this->find('User\Entity\Language', $data['languageid']);

		if($data['rate_client']){
		$DataArr = array(
			'name' => $data['name'],
			'rate' => $data['rate_client'],
			'sourcebawu' => $data['sourcebawu'],
			'sourcejiuwu' => $data['sourcejiuwu'],
			'sourcenomatch' => $data['sourcenomatch'],
			'sourceqiwu' => $data['sourceqiwu'],
			'sourcerepetitions' => $data['sourcerepetitions'],
			'sourcewushi' => $data['sourcewushi'],
			'sourceyibai' => $data['sourceyibai'],
				'total' => $data['total'],
				'language' => $language,
		);
		}else{
		$DataArr = array(
			'name' => $data['name'],
			'rate_freelancer' => $data['rate'],
			'sourcebawu' => $data['sourcebawu'],
			'sourcejiuwu' => $data['sourcejiuwu'],
			'sourcenomatch' => $data['sourcenomatch'],
			'sourceqiwu' => $data['sourceqiwu'],
			'sourcerepetitions' => $data['sourcerepetitions'],
			'sourcewushi' => $data['sourcewushi'],
			'sourceyibai' => $data['sourceyibai'],
				'total_freelancer' => $data['total'],
				'language' => $language,


		);
		}

		$DataArr['raterepetitions'] = ($data['raterepetitions'] != null)? 	$data['raterepetitions'] : 0;
		$DataArr['rateyibai'] = ($data['rateyibai'] != null)? 	$data['rateyibai'] : 0;
		$DataArr['ratejiuwu'] = ($data['ratejiuwu'] != null)? 	$data['ratejiuwu'] : 0;
		$DataArr['ratebawu'] = ($data['ratebawu'] != null)? 	$data['ratebawu'] : 0;
		$DataArr['rateqiwu'] = ($data['rateqiwu'] != null)? 	$data['rateqiwu'] : 0;
		$DataArr['ratewushi'] = ($data['ratewushi'] != null)? 	$data['ratewushi'] : 0;
		$DataArr['ratenomatch'] = ($data['ratenomatch'] != null)? 	$data['ratenomatch'] : 0;

		$iterm->setData($DataArr);

		$iterm->save($this->getEntityManager());
		//add task if have not
		$entityManager = $this->getEntityManager();
		$repository = $entityManager->getRepository('User\Entity\Task');
        $task = $repository->findBy(array('project'=>$project, 'language'=>$language, 'type'=>2));

      //var_dump($data['total']);exit;
		if(!$task){
			$task = new Task();
			$task->setData([
                    'project' => $project,
                    'language' => $language,
                    'type' => 2,
                    'status' => 3,
					'startDate' => new \DateTime('now'),
					'dueDate' => $project->getDueDate(),
					'total' => $data['total'],
					'task_number' => $project->getProjectNo() . '-1',
                ]);
			$task->save($this->getEntityManager());
		}
		return new JsonModel([
            'iterm' => $iterm->getData(),
        ]);
    }

    public function getList(){
      error_reporting(E_ALL);
  		ini_set('display_errors', 1);
      //var_dump("dsadada");exit;
        $entityManager = $this->getEntityManager();
        $projectId = $this->getRequest()->getQuery('projectId');
        $project = $entityManager->getRepository('\User\Entity\Project')->find( $projectId );
        $Itermtm = $entityManager->getRepository('\User\Entity\Itermtm')->findBy(array('project'=>$project));
        $Itermtms = array();
        foreach( $Itermtm as $k => $v )
        {
            $Itermtms[$k] = $v->getData();
        }
        return new JsonModel(['Itermtms'=>$Itermtms]);
    }

    public function get($id){
		error_reporting(E_ALL);
		ini_set('display_errors', 1);
    //var_dump("dsadada");exit;
		$entityManager = $this->getEntityManager();
        $project = $this->find('User\Entity\Itermnotm', $id);
        $Itermnotm = $entityManager->getRepository('\User\Entity\Itermnotm')->findBy(array('project'=>$project));
        $Itermnotms = array();
        foreach( $Itermnotm as $k => $v )
        {
            $Itermnotms[$k] = $v->getData();
        }
		//var_dump($Itermnotms);exit;
		return new JsonModel([
            'project' => $project->getData(),
			'itermnotms' => $Itermnotms,

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
      //error_reporting(E_ALL);
  		//ini_set('display_errors', 1);
		$entityManager = $this->getEntityManager();
		if($data['file']['id'])
			 $file = $this->find('\User\Entity\File', $data['file']['id']);
        $itermtm = $entityManager->find('\User\Entity\Itermtm', $id);
        if($data['rate_client']){
		$itermtm->setData([
				'name' => $data['name'],
				'rate' => $data['rate_client'],
				'sourcebawu' => $data['sourcebawu'],
				'sourcejiuwu' => $data['sourcejiuwu'],
				'sourcenomatch' => $data['sourcenomatch'],
				'sourceqiwu' => $data['sourceqiwu'],
				'sourcerepetitions' => $data['sourcerepetitions'],
				'sourcewushi' => $data['sourcewushi'],
				'sourceyibai' => $data['sourceyibai'],
				'total' => $data['total'],
           ]);
         }else{
		$itermtm->setData([
				'name' => $data['name'],
				'rate_freelancer' => $data['rate'],
				'sourcebawu' => $data['sourcebawu'],
				'sourcejiuwu' => $data['sourcejiuwu'],
				'sourcenomatch' => $data['sourcenomatch'],
				'sourceqiwu' => $data['sourceqiwu'],
				'sourcerepetitions' => $data['sourcerepetitions'],
				'sourcewushi' => $data['sourcewushi'],
				'sourceyibai' => $data['sourceyibai'],
				'total_freelancer' => $data['total'],
           ]);
		}
        $itermtm->save($entityManager);

        $repository = $entityManager->getRepository('User\Entity\Task');

        $projectid = $itermtm->getProject()->getId();
        $languageid = $itermtm->getLanguage()->getId();
        $project = $this->find('User\Entity\Project', $projectid);
    		$language = $this->find('User\Entity\Language', $languageid);

        $task = $repository->findBy(array('project'=>$project, 'language'=>$language, 'type'=>2));

        $total = $itermtm->getTotal();
				$total_freelancer = $itermtm->getTotalFreelancer();

        //update total task
        //var_dump($task);//exit;
        //return;
        if($task){
          $task_tmp = $task[0];
     		   if($data['rate_client']){
     				//$itermnotm = $entityManager->find('\User\Entity\Itermnotm', $id);
     				$task_tmp->setData([
                         'total' => $total,
                     ]);
     				$task_tmp->save($this->getEntityManager());
     		   }else{
     				$task_tmp->setData([
                         'total_freelancer' => $total_freelancer,
                     ]);
     				$task_tmp->save($this->getEntityManager());
          }
        }

        return new JsonModel([
               'itermtm' => $itermtm->getData(),
               '$task_tmp' => $task_tmp->getData(),
           ]);
    }
}
