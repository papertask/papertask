<?php
/**
 * Created by PhpStorm.
 * User: hat.dao
 * Date: 10/22/2014
 * Time: 9:55 AM
 */

namespace Api\Controller\Papertask;

use Admin\Entity\ProfileService;
use Zend\View\Model\JsonModel;

use Application\Controller\AbstractRestfulController;

class BankInfoController extends AbstractRestfulController{

    public function getList(){
        $Bankinfo = $this->getAllData('\Admin\Entity\ProfileBank');
        $data = [
            'bankinfo' => $Bankinfo
        ];

        return new JsonModel($data);
    }

    public function update($id, $option){
        $entityManager = $this->getEntityManager();
        $Bankinfo = $entityManager->find('\Admin\Entity\ProfileBank', (int)$id);
        $Bankinfo->setData($option);
        $entityManager->merge($Bankinfo);
        $entityManager->flush();

        return new JsonModel([]);
    }

} 