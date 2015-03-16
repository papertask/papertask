<?php
namespace Api\Controller\Admin;

use Zend\View\Model\JsonModel;
use Zend\Paginator\Paginator;

use DoctrineORMModule\Paginator\Adapter\DoctrinePaginator as DoctrineAdapter;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;

use Admin\Model\Helper;
use Api\Controller\AbstractRestfulJsonController;
use User\Entity\Itermnotm;
use User\Entity\Project;
use User\Entity\UserGroup;

class ProjectItermnotmController extends AbstractRestfulJsonController
{
    /**
     * Clean data from angular
     * @param $data
     */
    protected function cleanData(&$data){
       
    }

    public function create($data)
    {
		//var_dump($data['laguageid']);exit;
		$projectid = $this->getRequest()->getQuery('projectid');
		$iterm = new Itermnotm();
		if($data['file']['id'])
			$file = $this->find('\User\Entity\File', $data['file']['id']);
		$project = $this->find('User\Entity\Project', $projectid);
		$iterm->setProject($project);
		$language = $this->find('User\Entity\Language', $data['languageid']);
		
		$iterm->setData([
			'name' => $data['name'],
			'file' => ($file)?$file:null,
			'rate' => $data['rate'],
			'quantity' => $data['quantity'],
			'total' => $data['total'],
			'language' => $language,
		]);
		$iterm->save($this->getEntityManager());
		return new JsonModel([
            'iterm' => $iterm->getData(),
        ]);
    }

    public function getList(){
        $entityManager = $this->getEntityManager();
        $projectId = $this->getRequest()->getQuery('projectId');
        $project = $entityManager->getRepository('\User\Entity\Project')->find( $projectId );
        $Itermnotm = $entityManager->getRepository('\User\Entity\Itermnotm')->findBy(array('project'=>$project));
        $Itermnotms = array();
        foreach( $Itermnotm as $k => $v ) 
        {
            $Itermnotms[$k] = $v->getData();
        }
        return new JsonModel(['Itermnotms'=>$Itermnotms]);
    }

    public function get($id){
		//error_reporting(E_ALL);
		//ini_set('display_errors', 1);
		$entityManager = $this->getEntityManager();
        $project = $this->find('User\Entity\Itermnotm', $id);
        $Itermnotm = $entityManager->getRepository('\User\Entity\Itermnotm')->findBy(array('project'=>$project));
        $Itermnotms = array();
        foreach( $Itermnotm as $k => $v ) 
        {
            $Itermnotms[$k] = $v->getData();
        }
		var_dump($Itermnotms);exit;
		return new JsonModel([
            'project' => $project->getData(),
			'itermnotms' => $Itermnotms,
			
        ]);
    }

    public function delete($id){
	
		$entityManager = $this->getEntityManager();
        $Itermnotm = $entityManager->find('\User\Entity\Itermnotm', $id);
        $entityManager->remove($Itermnotm);
        $entityManager->flush();
        return new JsonModel([]);
    }


	
	 public function update( $id, $data ) {
           $entityManager = $this->getEntityManager();
		   if($data['file']['id'])
			 $file = $this->find('\User\Entity\File', $data['file']['id']);
           $itermnotm = $entityManager->find('\User\Entity\Itermnotm', $id);
           $itermnotm->setData([
				'name' => $data['name'],
				'file' => ($file)?$file:null,
				'rate' => $data['rate'],
				'quantity' => $data['quantity'],
				'total' => $data['total'],
           ]);
           
           $itermnotm->save($entityManager);
           
           return new JsonModel([
               'itermnotm' => $itermnotm->getData(),
           ]);
       }
}