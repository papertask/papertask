<?php
namespace Api\Controller\Admin;

use Zend\View\Model\JsonModel;
use Zend\Paginator\Paginator;

use DoctrineORMModule\Paginator\Adapter\DoctrinePaginator as DoctrineAdapter;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;

use Admin\Model\Helper;
use Api\Controller\AbstractRestfulJsonController;
use User\Entity\Itermdtppc;
use User\Entity\Project;

use User\Entity\UserGroup;
use User\Entity\Task;

class ProjectItermdtppcController extends AbstractRestfulJsonController
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
		$iterm = new Itermdtppc();
		if($data['file']['id'])
			$file = $this->find('\User\Entity\File', $data['file']['id']);
		$project = $this->find('User\Entity\Project', $projectid);
		$iterm->setProject($project);
		$language = $this->find('User\Entity\Language', $data['languageid']);
		$software = $this->find('\User\Entity\DesktopSoftware', $data['software']['id']); 
		$iterm->setData([
			'name' => $data['name'],
			'unit' => $data['unit']['id'],
			'file' => ($file)?$file:null,
			'rate' => $data['rate'],
			'quantity' => $data['quantity'],
			'total' => $data['total'],
			'language' => $language,
			'software' => $software,
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
        $Itermdtppc = $entityManager->getRepository('\User\Entity\Itermdtppc')->findBy(array('project'=>$project));
        $Itermdtppcs = array();
        foreach( $Itermdtppc as $k => $v ) 
        {
            $Itermdtppcs[$k] = $v->getData();
        }
        return new JsonModel(['Itermdtppcs'=>$Itermdtppcs]);
    }

    public function get($id){
    }

    public function delete($id){
        $entityManager = $this->getEntityManager();
        $itermdtppc = $entityManager->find('\User\Entity\Itermdtppc', $id);
        $entityManager->remove($itermdtppc);
        $entityManager->flush();
        return new JsonModel([]);
    }

    public function update($id, $data){
			$entityManager = $this->getEntityManager();
			if($data['file']['id']){
				$file = $this->find('\User\Entity\File', $data['file']['id']);
			} 
			$software = $this->find('\User\Entity\DesktopSoftware', $data['software']['id']); 
			$itermdtppc = $entityManager->find('\User\Entity\Itermdtppc', $id);
			$itermdtppc->setData([
				'name' => $data['name'],
				'unit' => $data['unit']['id'],
				'file' => ($file)?$file:null,
				'rate' => $data['rate'],
				'quantity' => $data['quantity'],
				'total' => $data['total'],
				'software' => $software,
           ]);
           
			$itermdtppc->save($entityManager);
           
			return new JsonModel([
               'itermdtppc' => $itermdtppc->getData(),
           ]);
    }
}