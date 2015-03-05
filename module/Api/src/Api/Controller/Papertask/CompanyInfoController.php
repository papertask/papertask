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

class CompanyInfoController extends AbstractRestfulController{

    public function getList(){
        $Companyinfo = $this->getAllData('\Admin\Entity\ProfileInfo');
        $data = [
            'companyinfo' => $Companyinfo
        ];

        return new JsonModel($data);
    }

    public function update($id, $option){
        $entityManager = $this->getEntityManager();
        $Companyinfo = $entityManager->find('\Admin\Entity\ProfileInfo', (int)$id);
        $Companyinfo->setData($option);
        $entityManager->merge($Companyinfo);
        $entityManager->flush();

        return new JsonModel([]);
    }

} 