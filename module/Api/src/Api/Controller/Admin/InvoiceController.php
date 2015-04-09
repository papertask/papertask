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
        $Invoice = $entityManager->getRepository('\User\Entity\Invoice')->findBy(array('project'=>$project));
        //$Invoices = array();
        //foreach( $Invoice as $k => $v )
        //{
        //    $Invoices[$k] = $v->getData();
        //}
        return new JsonModel(['invoices'=> count($Invoice) > 0 ? $Invoice[0]->getData() : array()]);
    }

    public function get($id){

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
		//var_dump($data['invoiceDate']);exit;
		$invoice = $this->find('\User\Entity\Invoice', $id);
		if($action == 1)
		{
			if(isset($data['invoiceDate'])){
				$data['invoiceDate'] = new \DateTime($data['invoiceDate']);
			}
			if(isset($data['dueDate'])){
				$data['dueDate'] = new \DateTime($data['dueDate']);
			}
			$invoice->setData([
				'invoiceDate' =>  $data['invoiceDate'],
				'dueDate' =>  $data['dueDate'],
			]);
			$invoice->save($this->getEntityManager());
        }
        return new JsonModel([
            'invoice' => $invoice->getData(),
        ]);
    }
}
