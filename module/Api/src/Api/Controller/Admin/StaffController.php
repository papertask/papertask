<?php
namespace Api\Controller\Admin;

use Zend\View\Model\JsonModel;

use Api\Controller\AbstractRestfulJsonController;

class StaffController extends AbstractRestfulJsonController
{
    public function getList(){
        $params = [];
        if($type = $this->params()->fromQuery('type')){
            $params['type'] = (int) $type;
        }
        if(empty($params)){
            $staffs = $this->getAllData('\User\Entity\Staff');
        } else {
            $staffs = $this->getAllDataBy('\User\Entity\Staff', $params);
        }

        return new JsonModel(array(
            'staffs' => $staffs
        ));
    }
}