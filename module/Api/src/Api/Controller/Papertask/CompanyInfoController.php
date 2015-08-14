<?php
/**
 * Created by PhpStorm.
 * User: hat.dao
 * Date: 10/22/2014
 * Time: 9:55 AM
 */

namespace Api\Controller\Papertask;

use Admin\Entity\ProfileService;
use Admin\Entity\ProfileInfo;
use Zend\View\Model\JsonModel;
use Application\Controller\AbstractRestfulController;
use Api\Controller\AbstractRestfulJsonController;
use User\Entity\Country;


class CompanyInfoController extends AbstractRestfulController{

	protected function cleanData(&$data){
		
		if(isset($data['name'])) {
			$data['name'] = $data['name'];
		}
		if(isset($data['telephone'])) {
			$data['telephone'] = $data['telephone'];
		}
		if(isset($data['address'])) {
			$data['address'] = $data['address'];
		}
		if(isset($data['city'])) {
			$data['city'] = $data['city'];
		}
		if(isset($data['fax'])) {
			$data['fax'] = $data['fax'];
		}
		
		if(isset($data['country'])) {
			$data['country'] = $this->getReference('\User\Entity\Country', $data['country']['id']);
		}
		if(isset($data['note'])) {
			$data['note'] = $data['note'];
		}
		
	}

    public function getList(){
		error_reporting(E_ALL);
		ini_set('display_errors', 1);
        $Companyinfo = $this->getAllData('\Admin\Entity\ProfileInfo');
        $data = [
            'companyinfo' => $Companyinfo,
        ];

        return new JsonModel($data);
    }


	public function update($id, $data){
	error_reporting(E_ALL);
		ini_set('display_errors', 1);
        $entityManager = $this->getEntityManager();
        $Companyinfo = $entityManager->find('\Admin\Entity\ProfileInfo', (int)$id);
        $this->cleanData($data);
        $Companyinfo->setData($data);
        $entityManager->merge($Companyinfo);
        $entityManager->flush();

       return new JsonModel([
            'companyinfo' => $Companyinfo->getData(),
        ]);
    }
	
    public function create($data){
    	//var_dump($data); exit;
    	$this->cleanData($data);
    	
    	$Companyinfo = new ProfileInfo();
    	$Companyinfo->setData($data);
    	$Companyinfo->save($this->getEntityManager());
    	return new JsonModel([
            'companyinfo' => $Companyinfo->getData(),
        ]);
    }
} 