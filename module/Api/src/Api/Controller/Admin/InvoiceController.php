<?php
namespace Api\Controller\Admin;

use Zend\View\Model\JsonModel;
use Zend\Paginator\Paginator;

use DoctrineORMModule\Paginator\Adapter\DoctrinePaginator as DoctrineAdapter;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;

use Admin\Model\Helper;
use Api\Controller\AbstractRestfulJsonController;
use User\Entity\Invoice;
use User\Entity\Project;
use User\Entity\UserGroup;

class InvoiceController extends AbstractRestfulJsonController
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
        $Itermdtpmac = $entityManager->getRepository('\User\Entity\Itermdtpmac')->findBy(array('project'=>$project));
        $Itermdtpmacs = array();
        foreach( $Itermdtpmac as $k => $v ) 
        {
            $Itermdtpmacs[$k] = $v->getData();
        }
        return new JsonModel(['Itermdtpmacs'=>$Itermdtpmacs]);
    }

    public function get($id){
		//error_reporting(E_ALL);
		//ini_set('display_errors', 1);
		$entityManager = $this->getEntityManager();
        $project = $this->find('User\Entity\Project', $id);
        $Invoice = $entityManager->getRepository('\User\Entity\Itermnotm')->findBy(array('project'=>$project));
        $Invoices = array();
        foreach( $Invoice as $k => $v ) 
        {
            $Invoices[$k] = $v->getData();
        }
		return new JsonModel([
			'invoices' => $Invoices,
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
        $this->cleanData($data);

        /** @var \User\Entity\Project $project */
        $project = $this->find('\User\Entity\Project', $id);
        $project->setData($data);
        $project->save($this->getEntityManager());
        return new JsonModel([
            'project' => $project->getData(),
        ]);
    }
}