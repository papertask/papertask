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

class CurrencyRateController extends AbstractRestfulController{

    public function getList(){
        $profileService = $this->getAllData('\Admin\Entity\ProfileService');
        $data = [
            'profileservice' => $profileService
        ];

        return new JsonModel($data);
    }

    public function update($id, $option){
        $entityManager = $this->getEntityManager();
        $profileService = $entityManager->find('\Admin\Entity\ProfileService', (int)$id);
        $profileService->setData($option);
        $entityManager->merge($profileService);
        $entityManager->flush();

        return new JsonModel([]);
    }

} 