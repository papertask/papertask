<?php
namespace Api\Controller\Admin;

use Zend\View\Model\JsonModel;
use Zend\Paginator\Paginator;

use DoctrineORMModule\Paginator\Adapter\DoctrinePaginator as DoctrineAdapter;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;

use Admin\Model\Helper;
use Api\Controller\AbstractRestfulJsonController;
use User\Entity\File;
use User\Entity\Project;
use User\Entity\UserGroup;
use User\Entity\Task;


class FileController extends AbstractRestfulJsonController
{
    /**
     * Clean data from angular
     * @param $data
     */
    protected function cleanData(&$data){
    }

    public function create($data)
    {
    }

    public function getList(){
        $entityManager = $this->getEntityManager();
        $projectId = $this->getRequest()->getQuery('projectId');
        $project = $entityManager->getRepository('\User\Entity\Project')->find( $projectId );
        $file = $entityManager->getRepository('\User\Entity\File')->findBy(array('project'=>$project));
        $files = array();
        foreach( $file as $k => $v ) 
        {
            $files[$k] = $v->getData();
        }
        return new JsonModel(['files'=>$files]);
    }

    public function get($id){
		
    }

    public function delete($id){
        $entityManager = $this->getEntityManager();
        $file = $entityManager->find('\User\Entity\File', $id);
        $entityManager->remove($file);
        $entityManager->flush();
        return new JsonModel([]);
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
		if($action==2){
			$project->setData([
				'status' => 2,
			]);
			$project->save($this->getEntityManager());

            $activity = new Activity();
            $activity->setData([
                'activityDate' => new \DateTime('NOW'),
                'project' => $project,
                'type' => "accept_quote",
                'sender' => $this->getReference('\User\Entity\User', $data['client']['id'])
            ]);
            //$activity->save($this->getEntityManager());
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