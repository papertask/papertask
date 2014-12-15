<?php
namespace Api\Controller\Admin;

use Zend\View\Model\JsonModel;

use Api\Controller\AbstractRestfulJsonController;

class RolesController extends AbstractRestfulJsonController
{
    public function getList(){
        $roles = $this->getAllData('\User\Entity\Roles');

        return new JsonModel(array(
            'types' => $roles
        ));
    }
}