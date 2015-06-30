<?php
/**
 * Created by PhpStorm.
 * User: hat.dao
 * Date: 10/22/2014
 * Time: 9:55 AM
 */

namespace Api\Controller\Papertask;

use Admin\Entity\ProfileService;
use Admin\Entity\ProfileBank;
use Zend\View\Model\JsonModel;
use Application\Controller\AbstractRestfulController;
use Api\Controller\AbstractRestfulJsonController;
use User\Entity\Country;

class BankInfoController extends AbstractRestfulController{
	
	protected function cleanData(&$data){
		if(isset($data['name'])) {
			$data['name'] = $data['name'];
		}
		if(isset($data['beneficiar_name'])) {
			$data['beneficiar_name'] = $data['beneficiar_name'];
		}
		if(isset($data['swift'])) {
			$data['swift'] = $data['swift'];
		}
		if(isset($data['routingNumber'])) {
			$data['routingNumber'] = $data['routingNumber'];
		}
		if(isset($data['address'])) {
			$data['address'] = $data['address'];
		}
		if(isset($data['city'])) {
			$data['city'] = $data['city'];
		}
		if(isset($data['country'])) {
			$data['country'] = $this->getReference('\User\Entity\Country', $data['country']['id']);
		}
		if(isset($data['note'])) {
			$data['note'] = $data['note'];
		}
		if(isset($data['account'])) {
			$data['account'] = $data['account'];
		}
		if(isset($data['paypal'])) {
			$data['paypal'] = $data['paypal'];
		}
		if(isset($data['alipay'])) {
			$data['alipay'] = $data['alipay'];
		}
	}

    public function getList(){
        $Bankinfo = $this->getAllData('\Admin\Entity\ProfileBank');
        $data = [
            'bankinfo' => $Bankinfo
        ];

        return new JsonModel($data);
    }

    public function update($id, $data){
        $entityManager = $this->getEntityManager();
        $Bankinfo = $entityManager->find('\Admin\Entity\ProfileBank', (int)$id);
        $this->cleanData($data);
        $Bankinfo->setData($data);
        $entityManager->merge($Bankinfo);
        $entityManager->flush();

       return new JsonModel([
            'bankinfo' => $Bankinfo->getData(),
        ]);
    }
	
    public function create($data){
    	//var_dump($data); exit;
    	$this->cleanData($data);
    	
    	$profileBank = new ProfileBank();
    	$profileBank->setData($data);
    	$profileBank->save($this->getEntityManager());
    	return new JsonModel([
            'bankinfo' => $profileBank->getData(),
        ]);
    }
    

} 